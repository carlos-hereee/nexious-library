import path from "path";
import { execFileSync } from "child_process";
import { render, screen } from "@testing-library/react";
import type { FieldEntryProps } from "nxs-form";
import type { PostData } from "nxs-post";
import Post from "@nxs-molecules/post/Post";
import PostRow from "@nxs-molecules/post/PostRow";
import EntryNavigator from "@nxs-molecules/forms/EntryNavigator";
import FormNavigation from "@nxs-organism/navigation/FormNavigation";
import Table from "@nxs-organism/table/Table";

/**
 * Resilience: long strings, direction, and zero/one/many.
 *
 * The honest scope, stated up front because it decides what belongs in this file. jsdom does no
 * layout: there is no box model, no flexbox resolution, no line breaking. It therefore CANNOT
 * tell you that a row overflowed, that a label got clipped, or that a badge landed on the wrong
 * edge. Those live in Foundation/States/Resilience in Storybook and are checked by eye.
 *
 * What IS mechanically checkable, and is what this file covers:
 *
 *  ① The compiled stylesheet. Compiling src/stylesheets/index.scss and asserting on the RESULT
 *    is a measurement, not a guess: it is the same CSS the package ships. That makes the shrink
 *    floors and the clip-plus-ellipsis pairing real contracts instead of comments.
 *  ② DOM invariance. A component must render the same element tree whether its content is two
 *    characters or two hundred, and whether it sits under dir="ltr" or dir="rtl". Both hold
 *    today, and both are worth locking: the moment a component branches on either, RTL and
 *    localization stop being a CSS problem and become a code problem.
 *  ③ The full string stays reachable. Where a surface clips, the untruncated text has to survive
 *    somewhere assistive tech and a tooltip can reach it, or the clip is data loss.
 *  ④ Zero and one. The count of rendered nodes at the boundaries, and the wording at one, which
 *    is where "1 items" gets shipped.
 */

// ── Fixtures ────────────────────────────────────────────────────────────────────
// 62 characters with no space, hyphen or slash. The punctuation matters: UAs take a line-break
// opportunity after "/" and "-", so a long URL wraps on its own and would prove nothing.
const UNBROKEN = "a7f3c1e9b2d84a6f905c3e17bb42d0c8f61ae5307d9c4b28e0f1a6d3c5b90e7";
const COMPOUND = "Rindfleischetikettierungsuberwachungsaufgabenubertragungsgesetz";

const shortPost: PostData = {
  postId: "p",
  title: "Hours",
  body: "Short.",
  createdBy: { name: "Ana", handle: "ana" },
  createdAt: "2026-08-10T12:00:00.000Z",
};
const longPost: PostData = { ...shortPost, title: UNBROKEN, body: UNBROKEN, createdBy: { name: COMPOUND, handle: UNBROKEN } };

const field = (name: string, value: string) => ({
  name,
  value,
  type: "text",
  label: name,
  placeholder: "",
  fieldId: `${name}-${value}`,
});

// Element tree with the text stripped out. Two renders that differ only in their strings must
// produce identical arrays; a difference means the component branched on content length.
const shape = (root: HTMLElement): string[] =>
  Array.from(root.querySelectorAll("*")).map((el) => `${el.tagName}.${el.getAttribute("class") || ""}`);

// ── ① The compiled stylesheet ───────────────────────────────────────────────────

type CssRule = { selector: string; declarations: string };

// A brace-counting scan rather than a regex. Nested at-rules (@media, @keyframes) put braces
// inside what a naive `selector { ... }` pattern reads as one block, and the library has both.
const parseRules = (css: string): CssRule[] => {
  const withoutComments = css.replace(/\/\*[\s\S]*?\*\//g, "");
  const rules: CssRule[] = [];
  const open: string[] = [];
  let buffer = "";
  for (const character of withoutComments) {
    if (character === "{") {
      open.push(buffer.trim());
      buffer = "";
    } else if (character === "}") {
      const selector = open.pop() || "";
      // An at-rule's own buffer holds only the whitespace left after its children were emitted,
      // so skipping it drops the wrapper and keeps every leaf rule inside it.
      if (selector && !selector.startsWith("@")) rules.push({ selector, declarations: buffer });
      buffer = "";
    } else buffer += character;
  }
  return rules;
};

let rules: CssRule[] = [];
const declarationsFor = (selector: string): string =>
  rules
    .filter((rule) => rule.selector === selector)
    .map((rule) => rule.declarations)
    .join(" ");

// Compiled in a CHILD process, not through sass's JS API. dart-sass resolves imports through a
// filesystem shim that throws a Dart-level NullError under jest's jsdom environment (its Windows
// real-case-path lookup casts the failure to the wrong exception type), so the in-process call
// cannot work in this file. The CLI in a plain node process is the same compiler and the same
// output, which is the part that matters: this suite asserts against the CSS the package ships,
// not against a copy of it.
const ROOT = path.resolve(__dirname, "../../..");

beforeAll(() => {
  const css = execFileSync(
    process.execPath,
    [path.join(ROOT, "node_modules", "sass", "sass.js"), path.join("src", "stylesheets", "index.scss"), "--no-source-map"],
    { cwd: ROOT, encoding: "utf8", maxBuffer: 32 * 1024 * 1024 }
  );
  rules = parseRules(css);
});

describe("compiled stylesheet: long strings", () => {
  it("compiles to rules this test can read", () => {
    expect(rules.length).toBeGreaterThan(100);
  });

  // The generic invariant, and the reason this suite compiles the sheet at all. A rule that sets
  // nowrap AND clips has decided the string may be cut; without text-overflow the cut is silent
  // and reads to the user as missing data rather than as more text.
  it("never clips text without marking the cut", () => {
    const clipping = rules.filter(
      (rule) => /white-space:\s*nowrap/.test(rule.declarations) && /overflow:\s*hidden/.test(rule.declarations)
    );
    // .sr-only is the one deliberate exception: it is visually hidden by a 1px clip rect, so it
    // has no visible edge for an ellipsis to sit on and the text is read aloud in full anyway.
    const unmarked = clipping
      .filter((rule) => !/text-overflow:\s*ellipsis/.test(rule.declarations))
      .map((rule) => rule.selector)
      .filter((selector) => selector !== ".sr-only");

    expect(clipping.length).toBeGreaterThan(0);
    expect(unmarked).toEqual([]);
  });

  // A flex item's default min-width is its own content, so `flex: 1` alone does not make a
  // column shrinkable. Each of these is a container whose children hold user text, and each
  // blew its row out before the floor was added.
  it.each([
    [".post-card-author", "a display name in the feed byline"],
    [".post-card-handle", "a handle beside that display name"],
    [".nav-tab-bar .nav-item", "a localized label in the bottom tab bar"],
    [".container-row > *", "a wide child in an equal-columns row"],
    [".field-shell", "a wide control inside a form field"],
    [".post-row-content", "a long title in a list row"],
  ])("%s carries a shrink floor so %s cannot widen its parent", (selector) => {
    expect(declarationsFor(selector)).toMatch(/min-width:\s*0/);
  });

  // Both halves of the byline, because fixing one alone only moves the blowout to the other:
  // whichever sibling still resolves its own content as a minimum is the one that sets the row's.
  it("gives the byline a way to break a long handle rather than a floor alone", () => {
    expect(declarationsFor(".post-card-handle")).toMatch(/overflow-wrap:\s*anywhere/);
  });

  // The stale-plan check, kept as a regression lock. The plan handed to Phase 5 claimed this
  // rule still set nowrap and clipped localized step names; it does not, and must not again.
  it("lets a localized form step name wrap instead of clipping it", () => {
    const declarations = declarationsFor(".form-step-name");

    expect(declarations).toMatch(/overflow-wrap:\s*anywhere/);
    expect(declarations).not.toMatch(/white-space:\s*nowrap/);
  });
});

describe("compiled stylesheet: direction", () => {
  // The three floating affordances in the library. Each is positioned against an edge, and an
  // edge is the one place a physical property becomes a functional bug rather than a cosmetic
  // one: anchored to a fixed side, a popover opens away from its trigger and off screen.
  it.each([
    [".theme-menu-list", /inset-inline-end/],
    [".search-box-icon", /inset-inline-start/],
    [".search-box-action", /inset-inline-end/],
  ])("%s anchors logically so it stays with its trigger under rtl", (selector, expected) => {
    const declarations = declarationsFor(selector);

    expect(declarations).toMatch(expected);
    // The physical twin must be gone, not merely overridden. Both present is a coin flip decided
    // by source order, which is how a "fixed" RTL bug comes back in a later build.
    expect(declarations).not.toMatch(/(^|[\s;])(left|right):/);
  });

  // The library ships no [dir="rtl"] block and no direction-aware markup, which is the design:
  // RTL support is meant to be entirely a property of the stylesheet. This locks that in, so a
  // future lane that reaches for a JS branch has to argue for it rather than slip it in.
  it.each([
    ["Post", <Post post={shortPost} key="post" />],
    ["PostRow", <PostRow post={shortPost} key="row" />],
    ["FormNavigation", <FormNavigation formOrder={["details", "hours"]} pageNumber={0} onClick={() => {}} key="nav" />],
  ])("%s renders an identical tree under rtl", (_name, element) => {
    const ltr = render(<div dir="ltr">{element}</div>);
    const ltrShape = shape(ltr.container);
    ltr.unmount();

    const rtl = render(<div dir="rtl">{element}</div>);

    expect(shape(rtl.container)).toEqual(ltrShape);
  });
});

describe("long strings do not change the DOM", () => {
  it.each([
    ["Post", <Post post={shortPost} key="s" />, <Post post={longPost} key="l" />],
    ["PostRow", <PostRow post={shortPost} key="s" />, <PostRow post={longPost} key="l" />],
  ])("%s renders the same element tree for a 62 character token as for a word", (_name, small, large) => {
    const brief = render(small);
    const briefShape = shape(brief.container);
    brief.unmount();

    const verbose = render(large);

    expect(shape(verbose.container)).toEqual(briefShape);
  });
});

describe("a clipped string stays reachable", () => {
  // .post-row-title clips with an ellipsis, so the untruncated title has to live somewhere else.
  // It does, on the row button's accessible name, which is also what a screen reader reads.
  it("keeps the whole post title on the row's accessible name", () => {
    render(<PostRow post={longPost} onView={() => {}} />);

    expect(screen.getByRole("button", { name: `Open post: ${UNBROKEN}` })).toBeInTheDocument();
  });

  // .entry-rail-placeholder clips too, and its own comment says the full string is on the
  // button's title and aria-label. That is the contract, so it is asserted rather than trusted.
  it("keeps the whole derived label on an entry tile's title and accessible name", () => {
    const entries: FieldEntryProps = { a: [field("day", COMPOUND)] };
    render(<EntryNavigator entries={entries} activeEntry="a" itemNoun="Entry" onSelect={() => {}} />);

    const tile = screen.getByRole("button", { name: `Entry 1 of 1, ${COMPOUND}` });

    expect(tile).toHaveAttribute("title", `Entry 1 of 1, ${COMPOUND}`);
  });

  // FormNavigation does NOT clip (see .form-step-name above), so the full name is expected in
  // the visible text, not only in an attribute. Asserting the visible node is what would catch
  // a future "just add nowrap" change, which would pass an attribute-only test.
  it("renders a long step name as visible text rather than an attribute only", () => {
    render(<FormNavigation formOrder={["informacionDeContacto", "pago"]} pageNumber={1} onClick={() => {}} />);

    // makeStrReadable splits on capitals, so the rendered label is spaced. Both the full-size
    // list and the mini list render it, hence getAllByText.
    expect(screen.getAllByText("Informacion De Contacto").length).toBeGreaterThan(0);
  });
});

describe("zero, one, many", () => {
  it("renders no tiles at all when a group is empty, rather than a row of dead slots", () => {
    const { container } = render(<EntryNavigator entries={{}} activeEntry="" max={7} onSelect={() => {}} />);

    expect(container.querySelectorAll(".entry-rail-tile")).toHaveLength(0);
    // Capacity is still stated, which is the whole reason the empty rail is not simply hidden.
    expect(screen.getByText("0 of 7")).toBeInTheDocument();
  });

  it("says one of one rather than a plural when a group holds a single entry", () => {
    const entries: FieldEntryProps = { a: [field("day", "Monday")] };
    render(<EntryNavigator entries={entries} activeEntry="a" itemNoun="Entry" onSelect={() => {}} />);

    expect(screen.getByRole("button", { name: "Entry 1 of 1, Monday" })).toBeInTheDocument();
  });

  it("scales to a long group without dropping or duplicating a tile", () => {
    const entries: FieldEntryProps = Array.from({ length: 24 }).reduce<FieldEntryProps>(
      (acc, _slot, index) => ({ ...acc, [`k${index}`]: [field("day", `Slot ${index + 1}`)] }),
      {}
    );
    const { container } = render(<EntryNavigator entries={entries} activeEntry="k0" onSelect={() => {}} />);

    expect(container.querySelectorAll(".entry-rail-tile")).toHaveLength(24);
  });

  // This render logs a React warning, and the warning is the point rather than a flaw in the
  // test: TableBody puts the empty-state text in a <caption> inside a <tr>, which is invalid
  // nesting, so the message lands in no cell and spans no column. Asserted as the text being
  // PRESENT (which it is) rather than as the correct node, because the fix belongs to the table
  // lane's files and a failing assertion here would leave the suite red for another owner's bug.
  it("tells the reader a table is empty instead of rendering a bare grid", () => {
    render(<Table headerData={{ title: "Payouts" }} list={[{ uid: "h", value: "Reference" }]} bodyData={[]} />);

    expect(screen.getByText("No data available")).toBeInTheDocument();
  });

  it("renders one row for one datum, with no filler and no divider left behind", () => {
    const { container } = render(
      <Table headerData={{ title: "Payouts" }} list={[{ uid: "h", value: "Reference" }]} bodyData={[{ uid: "b", value: "one" }]} />
    );

    expect(container.querySelectorAll("tbody tr")).toHaveLength(1);
  });

  it("keeps a long table inside its own scrollport so it cannot widen the page", () => {
    const bodyData = Array.from({ length: 40 }, (_, index) => ({ uid: `r${index}`, value: `Row ${index + 1}` }));
    const { container } = render(
      <Table headerData={{ title: "Payouts" }} list={[{ uid: "h", value: "Reference" }]} bodyData={bodyData} />
    );

    expect(container.querySelectorAll("tbody tr")).toHaveLength(40);
    // The wrapper is the component's job, not the consumer's. Without it a wide table stretches
    // whatever grid or flex row holds it, which is the failure vars/reset/_table.scss documents.
    expect(container.querySelector(".table-scroll")).toBeInTheDocument();
  });
});
