import "@testing-library/jest-dom";
import type { ReactElement } from "react";
import { render } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import Skeleton from "@nxs-molecules/errors/Skeleton";
import Loading from "@nxs-molecules/errors/Loading";
import EmptyState from "@nxs-molecules/errors/EmptyState";
import EmptySection from "@nxs-molecules/errors/EmptySection";
import ComingSoon from "@nxs-molecules/errors/ComingSoon";
import PageNotFound from "@nxs-molecules/errors/PageNotFound";
import Post from "@nxs-molecules/post/Post";
import type { SkeletonShape } from "nxs-errors";
import type { PostData } from "nxs-post";

expect.extend(toHaveNoViolations);

// Companion to axe.test.tsx, which owns the Button/Form/Dialog family. This file covers the
// surfaces Phase 4 added or rebuilt: skeletons, the shared empty-state pattern, Loading's two
// modes, the table markup and the post card. Split by surface rather than folded in because one
// file carrying both would be the longest test in the repo by a factor of two.

// Same harness as axe.test.tsx, and deliberately the same: an isolated component render is not a
// whole page, so the landmark/region rule would false-positive on every case below.
const AXE_OPTIONS = { rules: { region: { enabled: false } } };

// React's useId mints a document-unique id per render, so the same tree rendered twice differs by
// that string alone. The comparison below has to blank those out or it reports a difference that
// has nothing to do with theme. Same normalizer as axe.test.tsx; see the note there.
const normalizeGeneratedIds = (html?: string): string =>
  (html ?? "").replace(/:r[0-9a-z]+:|_r_[0-9a-z]+_/g, "generated-id");

/**
 * Renders the same tree twice, once bare and once inside a `.dark-mode` subtree, and asserts
 * both are axe-clean AND that the two subtrees are byte-identical markup.
 *
 * Read what this does NOT prove. jsdom applies no external stylesheet, so `.dark-mode` resolves
 * to no styles at all here and axe's color-contrast rule cannot run (it needs computed colors and
 * silently reports "incomplete" without them). A dark render in this environment therefore says
 * nothing whatsoever about dark contrast; contrast is asserted against the real token values in a
 * separate suite. What it DOES prove is that no component branches on theme to emit different
 * markup, different roles or different accessible names, which is the failure this catches: a
 * component that swaps an icon-only control in for a labelled one under a dark class.
 */
const checkBothThemes = async (ui: ReactElement) => {
  const light = render(ui).container;
  const dark = render(<div className="dark-mode">{ui}</div>).container;

  expect(await axe(light, AXE_OPTIONS)).toHaveNoViolations();
  expect(await axe(dark, AXE_OPTIONS)).toHaveNoViolations();
  expect(normalizeGeneratedIds(dark.firstElementChild?.innerHTML)).toBe(normalizeGeneratedIds(light.innerHTML));
};

// Every node in a subtree that exposes an accessible name of its own. Counting these is stricter
// than counting role="status" nodes: the regression that matters for a placeholder is a BAR
// gaining a title or an aria-label, which announces "loading" N times without adding a second
// status region.
const namedNodes = (root: HTMLElement) => root.querySelectorAll("[aria-label],[aria-labelledby],[title]");

const skeletonShapes: SkeletonShape[] = ["row", "block", "page", "text"];

describe("axe: Skeleton", () => {
  it.each(skeletonShapes)("shape %s has no violations in either theme", async (shape) => {
    await checkBothThemes(<Skeleton shape={shape} count={3} />);
  });

  it.each([1, 3, 7])("announces the region exactly once with %i bars", async (count) => {
    // The assertion that matters, and the one "no violations" would not make: axe is happy with
    // seven named boxes, a screen reader user is not.
    const { container } = render(<Skeleton shape="row" count={count} label="Loading orders" />);

    expect(container.querySelectorAll(".skeleton-bar")).toHaveLength(count);
    expect(namedNodes(container)).toHaveLength(1);
    expect(container.querySelector('[role="status"]')).toHaveAccessibleName("Loading orders");
  });

  it("a page skeleton still announces once even with its extra header bar", async () => {
    const { container } = render(<Skeleton shape="page" count={4} />);

    expect(container.querySelectorAll(".skeleton-bar")).toHaveLength(5);
    expect(namedNodes(container)).toHaveLength(1);
    expect(await axe(container, AXE_OPTIONS)).toHaveNoViolations();
  });
});

describe("axe: Loading", () => {
  it("spinner mode has no violations in either theme", async () => {
    await checkBothThemes(<Loading message="Loading posts" />);
  });

  it("skeleton mode has no violations in either theme", async () => {
    await checkBothThemes(<Loading skeleton="row" skeletonCount={3} message="Loading posts" />);
  });

  it("skeleton mode names the wait once, not once per bar and once for the message", async () => {
    // Loading duplicates its message into the skeleton's label, so the visible <p> is aria-hidden.
    // Un-hiding it would read the message twice, which is the whole reason that attribute is there.
    const { container } = render(<Loading skeleton="page" skeletonCount={4} message="Loading posts" />);

    expect(namedNodes(container)).toHaveLength(1);
    expect(container.querySelector('[role="status"]')).toHaveAccessibleName("Loading posts");
  });
});

describe("axe: the shared empty-state pattern", () => {
  it("EmptyState without an action has no violations in either theme", async () => {
    await checkBothThemes(
      <EmptyState icon="star" heading="No pages yet" message="Pages are how visitors find your work." />
    );
  });

  it("EmptyState with an action has no violations in either theme", async () => {
    await checkBothThemes(
      <EmptyState
        icon="star"
        heading="No pages yet"
        message="Pages are how visitors find your work."
        actionLabel="Create a page"
        actionVariant="primary"
        onAction={() => {}}
      />
    );
  });

  it("the action button takes its accessible name from actionLabel", async () => {
    // The action is a Button, and Button derives its aria-label from title, then label, then
    // name. An empty-state action passes only a label, so this is the one prop standing between
    // the primary next step and an unnamed control.
    const { container } = render(<EmptyState heading="No pages yet" actionLabel="Create a page" onAction={() => {}} />);

    expect(container.querySelector(".empty-state-action")).toHaveAccessibleName("Create a page");
  });

  it("EmptySection has no violations with or without an action", async () => {
    await checkBothThemes(<EmptySection message="Nothing has been posted yet." />);
    await checkBothThemes(
      <EmptySection message="Nothing has been posted yet." actionLabel="Add a post" handleClick={() => {}} />
    );
  });

  it("ComingSoon has no violations with or without an action", async () => {
    await checkBothThemes(<ComingSoon heading="Analytics" message="More coming soon" />);
    await checkBothThemes(<ComingSoon heading="Analytics" actionLabel="Join the waitlist" handleClick={() => {}} />);
  });

  it("PageNotFound has no violations in its button mode", async () => {
    // No timer: the message BECOMES the button, so this is the shape where the accessible name
    // and the visible text are the same string and a missing label would be invisible in review.
    await checkBothThemes(<PageNotFound to="/" handleClick={() => {}} />);
  });

  it("PageNotFound has no violations in its timer mode", async () => {
    // A large timer so the redirect never fires mid-test; cleanup unmounts and clears it.
    await checkBothThemes(<PageNotFound to="/" timer={100000} handleClick={() => {}} />);
  });

  it("PageNotFound's button carries the message as its name", async () => {
    const { container } = render(<PageNotFound to="/" handleClick={() => {}} />);

    expect(container.querySelector("button")).toHaveAccessibleName("Page not found go to homepage");
  });
});

// ── Table markup ──────────────────────────────────────────────────────────────
// Built inline rather than imported. TableHeader, TableBody and TableFooter are commented out of
// the organism barrel and Table is not exported at all (filed in TECH_DEBT), so importing any of
// them would test something no consumer can reach. What Phase 4 actually reworked is the
// ELEMENT-level reset in vars/reset/_table.scss, whose contract is exactly this markup: a thead,
// .cell-numeric cells and the .table-dense modifier on the table element.
const tableMarkup = (isDense?: boolean): ReactElement => (
  <div className="table-scroll">
    <table className={isDense ? "table table-dense" : "table"}>
      <caption className="table-title">Quarterly revenue</caption>
      <thead>
        <tr>
          <th scope="col">Product</th>
          <th scope="col" className="cell-numeric">
            Units
          </th>
          <th scope="col" className="cell-numeric">
            Revenue
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">Studio</th>
          <td className="cell-numeric">1204</td>
          <td className="cell-numeric">48160</td>
        </tr>
        <tr>
          <th scope="row">Pro</th>
          <td className="cell-numeric">318</td>
          <td className="cell-numeric">6042</td>
        </tr>
      </tbody>
    </table>
  </div>
);

describe("axe: table markup", () => {
  it("a comfortable table has no violations in either theme", async () => {
    await checkBothThemes(tableMarkup());
  });

  it("a dense table has no violations in either theme", async () => {
    // Density is a class on the table element, so the accessible structure must be identical to
    // the comfortable case. A dense variant that dropped the header row would still look fine.
    await checkBothThemes(tableMarkup(true));
  });

  it("keeps its header cells associated with the data beneath them", async () => {
    const { container } = render(tableMarkup(true));

    expect(container.querySelectorAll("thead th")).toHaveLength(3);
    container.querySelectorAll("th").forEach((cell) => expect(cell).toHaveAttribute("scope"));
    // The numeric class is presentational only. It right-aligns and switches on tabular figures,
    // and it must not be doing anything to the accessible name of the cell.
    expect(container.querySelector("td.cell-numeric")).toHaveTextContent("1204");
  });
});

// ── Cards ─────────────────────────────────────────────────────────────────────
const post: PostData = {
  postId: "post-1",
  title: "Shipping the token layer",
  body: "The rework replaces every literal color with a token that names its role.",
  thumbnail: "https://www.companyuno.com/thumb.png",
  thumbnailAlt: "A wall of color swatches",
  href: "https://www.companyuno.com/posts/post-1",
  createdBy: { name: "qwerty", handle: "qwerty", avatar: "https://www.companyuno.com/avatar.png" },
  createdAt: "2026-08-01T12:00:00.000Z",
  commentCount: 4,
  reactions: [{ name: "like", icon: "heart", count: 12, active: true }],
  tags: ["release"],
};

describe("axe: post card", () => {
  it("has no violations with every control mounted, in either theme", async () => {
    await checkBothThemes(
      <Post
        post={post}
        allowRemoval
        onView={() => {}}
        onLike={() => {}}
        onReply={() => {}}
        onRemove={() => {}}
        onAuthorClick={() => {}}
        onReactionClick={() => {}}
      />
    );
  });

  it("has no violations as a plain linkable card with no callbacks", async () => {
    await checkBothThemes(<Post post={post} linkable />);
  });

  it("names every icon-adjacent control", async () => {
    // The reaction, comment and remove controls render a glyph and a bare number, so their only
    // accessible name is the aria-label the card builds. This is where a name is easiest to lose:
    // the button still looks right on screen with no name at all.
    const { container } = render(
      <Post
        post={post}
        allowRemoval
        onView={() => {}}
        onReply={() => {}}
        onRemove={() => {}}
        onReactionClick={() => {}}
      />
    );

    expect(container.querySelector(".post-card-reaction")).toHaveAccessibleName("like, 12");
    expect(container.querySelectorAll(".post-card-reaction")[1]).toHaveAccessibleName("Comment, 4 comments");
    expect(container.querySelector(".post-card-remove")).toHaveAccessibleName(`Remove post: ${post.title}`);
    expect(container.querySelector(".post-card-title-btn")).toHaveAccessibleName(post.title);
  });

  it("has no violations when the card is empty of everything optional", async () => {
    // Title only. Every other slot is optional, and an empty card is the shape a feed renders
    // while its first item is still loading its author, thumbnail and counts.
    await checkBothThemes(<Post post={{ postId: "bare", title: "Untitled" }} />);
  });
});
