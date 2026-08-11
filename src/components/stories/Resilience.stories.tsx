import { Fragment } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import type { FieldEntryProps } from "nxs-form";
import type { PostData } from "nxs-post";
import Post from "@nxs-molecules/post/Post";
import PostRow from "@nxs-molecules/post/PostRow";
import EntryNavigator from "@nxs-molecules/forms/EntryNavigator";
import EmptyState from "@nxs-molecules/errors/EmptyState";
import Skeleton from "@nxs-molecules/errors/Skeleton";
import FormNavigation from "@nxs-organism/navigation/FormNavigation";
import Table from "@nxs-organism/table/Table";
import "./states-matrix.css";

/**
 * The three ways a component that passes review still breaks in production.
 *
 * Phases 1 to 4 rebuilt the token layer and the surfaces on top of it, and every one of those
 * passes was reviewed against SHORT English content in a WIDE container with a HANDFUL of items.
 * This page is the other three cases. None of them is exotic: a pasted id, a Spanish label, an
 * account with nothing in it yet.
 *
 * What to look for, per band:
 *
 * 1. LONG STRINGS. Every frame is a dashed box at a fixed width, and content is only allowed to
 *    wrap or clip, never to escape. Text crossing a dashed edge is the bug. The specific shape
 *    to hunt is a flex child with no `min-width: 0`: a flex item's default minimum is its own
 *    content, so one long token makes the whole row refuse to shrink, and the row then widens
 *    its parent rather than the token wrapping. Where a component clips instead of wrapping,
 *    check there is an ellipsis AND a title or aria-label carrying the full string, because a
 *    hard cut with no marker reads as data loss.
 *
 * 2. RTL. Each specimen renders twice, dir="ltr" beside dir="rtl". Compare them as a pair: a
 *    padding on the wrong side, a badge pinned to a physical edge, or a chevron pointing the
 *    wrong way is invisible alone and obvious side by side. Report what is MIRRORED WRONG
 *    (cosmetic) separately from what is UNREACHABLE (a popover opening off screen), because
 *    only the second kind is a defect today. The library has no RTL consumer yet, so this band
 *    is a scoping surface, not a regression gate.
 *
 * 3. ZERO, ONE, MANY. Zero should be an empty STATE, never an empty BOX: a bordered card with
 *    nothing in it tells the user the app is broken. One should not read as a plural or leave a
 *    lone divider. Many should scroll inside its own region rather than push the page sideways.
 *
 * jsdom does not lay out, so none of the above can be asserted in jest. The companion tests in
 * src/__tests__/components/resilience.test.tsx cover the STRUCTURE (a long string must not change
 * the DOM, the truncating surfaces must carry a full-text label, the zero and one cases must
 * render the node they promise). Layout is this page plus the owner's eye, and nothing else.
 */
const meta: Meta = {
  title: "Foundation/States/Resilience",
  parameters: { layout: "fullscreen" },
};
export default meta;

// ── Fixtures ────────────────────────────────────────────────────────────────────
// A 62-character token with no space, hyphen or slash in it. Punctuation matters: browsers take
// a break opportunity after "/" and "-", so a long URL wraps on its own and proves nothing. Only
// a genuinely unbroken run finds a missing shrink floor.
const UNBROKEN = "a7f3c1e9b2d84a6f905c3e17bb42d0c8f61ae5307d9c4b28e0f1a6d3c5b90e7";

// The two shapes localization actually produces, as opposed to the synthetic token above: a
// German compound noun that cannot be hyphenated by a UA without a dictionary, and a Spanish
// sentence that runs roughly 30% longer than its English original.
const COMPOUND = "Rindfleischetikettierungsuberwachungsaufgabenubertragungsgesetz";
const SENTENCE =
  "Configura los horarios de atencion de tu tienda para cada dia de la semana antes de publicarla en tu sitio.";

const longPost: PostData = {
  postId: "long",
  title: UNBROKEN,
  body: SENTENCE,
  createdBy: { name: COMPOUND, handle: "kundenbetreuungsabteilung" },
  createdAt: "2026-08-10T12:00:00.000Z",
};

const shortPost: PostData = {
  postId: "short",
  title: "Store hours updated",
  body: "Opening an hour earlier on Saturdays.",
  createdBy: { name: "Ana", handle: "ana" },
  createdAt: "2026-08-10T12:00:00.000Z",
};

const field = (name: string, value: string) => ({
  name,
  value,
  type: "text",
  label: name,
  placeholder: "",
  fieldId: `${name}-${value}`,
});

const noEntries: FieldEntryProps = {};
const oneEntry: FieldEntryProps = { a: [field("day", "Monday")] };
const manyEntries: FieldEntryProps = Array.from({ length: 12 }).reduce<FieldEntryProps>(
  (acc, _slot, index) => ({ ...acc, [`k${index}`]: [field("day", `Slot ${index + 1}`)] }),
  {}
);
const longEntries: FieldEntryProps = {
  a: [field("day", "Miercoles de horario extendido")],
  b: [field("day", UNBROKEN)],
};

const tableHeader = [
  { uid: "h1", value: "Reference" },
  { uid: "h2", value: "Amount" },
];
const rows = (count: number) =>
  Array.from({ length: count }, (_, i) => ({ uid: `r${i}`, value: `Row ${i + 1}` }));

const NAV_SHORT = ["Home", "Store", "Calendar", "More"];
const NAV_LONG = ["Startseite", "Veranstaltungskalender", "Kundenbetreuung", "Einstellungen"];

// ── Small building blocks ───────────────────────────────────────────────────────

const Frame: React.FC<{ label: string; narrow?: boolean; children: React.ReactNode }> = ({
  label,
  narrow,
  children,
}) => (
  <div className={narrow ? "sb-frame sb-frame-narrow" : "sb-frame"}>
    <p className="sb-frame-label">{label}</p>
    {children}
  </div>
);

const Band: React.FC<{ title: string; note: string; children: React.ReactNode }> = ({ title, note, children }) => (
  <Fragment>
    <h3 className="sb-matrix-title">{title}</h3>
    <p className="sb-matrix-note">{note}</p>
    {children}
  </Fragment>
);

// Rendered as markup rather than through Navbar because Navbar wants a full menu model plus
// theme and language props, and what is under review is the tab bar's own shrink behavior.
const TabBar: React.FC<{ labels: string[] }> = ({ labels }) => (
  <ul className="nav-tab-bar">
    {/* Keyed by position, not by label. The "many tabs" specimen repeats a label on purpose (that
        is what a bar with nine tabs looks like), and keying by label would collide. */}
    {labels.map((label, idx) => (
      <li className={idx === 0 ? "nav-item is-active" : "nav-item"} key={`${idx}-${label}`}>
        <a className="nav-link" href="#tab" aria-current={idx === 0 ? "page" : undefined}>
          <span className="nav-label">{label}</span>
        </a>
      </li>
    ))}
  </ul>
);

// Same reason as TabBar: ThemeMenu's list type carries two full color maps per entry, and the
// popover's anchoring is the thing being reviewed, not its keyboard model (ThemeMenu.stories
// already covers that).
//
// No Icon atoms anywhere on this page. The icon registry is filled by the CONSUMER at runtime, so
// an unregistered key renders a dev ErrorMessage in Storybook, and a red box in the middle of a
// specimen is exactly the kind of noise that hides the thing being reviewed.
const ThemePopover: React.FC = () => (
  <div className="sb-popover-slot">
    <ul className="theme-menu">
      <li>
        <button type="button" className="theme-menu-trigger" aria-expanded="true">
          <span className="theme-menu-swatch" />
          <span className="theme-menu-label">Farbschema</span>
          <span className="theme-menu-chevron is-open" aria-hidden="true">
            open
          </span>
        </button>
        <ul className="theme-menu-list">
          <li className="theme-menu-option is-selected">
            <span className="theme-menu-option-swatch" />
            <span className="theme-menu-option-label">Standard</span>
          </li>
          <li className="theme-menu-option">
            <span className="theme-menu-option-swatch" />
            <span className="theme-menu-option-label">Dunkel</span>
          </li>
        </ul>
      </li>
    </ul>
  </div>
);

// ── Band 1: long strings ────────────────────────────────────────────────────────

const LongStrings: React.FC = () => (
  <Band
    title="Long strings, at 320px"
    note="Every frame is capped at a phone's narrowest width and draws its own edge. Content may wrap or clip; content that crosses the dashed line is the defect. The byline, the row title and the tab labels are the three that used to."
  >
    <div className="sb-pair">
      <Frame label="Post card, compound author + unbroken title" narrow>
        <Post post={longPost} />
      </Frame>
      <Frame label="Post row, unbroken title (clips, has aria-label)" narrow>
        <PostRow post={longPost} onView={() => {}} />
      </Frame>
      <Frame label="Table cell, unbroken token (scrolls in .table-scroll)" narrow>
        <Table
          headerData={{ title: "Payouts" }}
          list={tableHeader}
          bodyData={[{ uid: "b1", value: UNBROKEN }]}
        />
      </Frame>
      <Frame label="Empty state, compound heading" narrow>
        <EmptyState heading={COMPOUND} message={SENTENCE} actionLabel="Weiter" />
      </Frame>
      <Frame label="Panel, unbroken title" narrow>
        <div className="panel">
          <div className="panel-header">
            <h3 className="panel-title">{UNBROKEN}</h3>
            <div className="panel-actions">
              <span className="dropdown-tag-item">tag</span>
            </div>
          </div>
          <div className="panel-body">
            <p>{SENTENCE}</p>
          </div>
        </div>
      </Frame>
      <Frame label="Card row, unbroken body" narrow>
        <div className="card-row">
          <div className="card-row-body">
            <span>{UNBROKEN}</span>
          </div>
        </div>
      </Frame>
      <Frame label="Bottom tab bar, localized labels" narrow>
        <TabBar labels={NAV_LONG} />
      </Frame>
      <Frame label="container-row, one wide child" narrow>
        <div className="container-row">
          <div>{UNBROKEN}</div>
          <div>second column</div>
        </div>
      </Frame>
      <Frame label="Entry navigator, long derived labels" narrow>
        <EntryNavigator entries={longEntries} activeEntry="a" max={7} orientation="strip" onSelect={() => {}} />
      </Frame>
      <Frame label="Form navigation, localized step names" narrow>
        <FormNavigation
          formOrder={["informacionDeContacto", "horariosDeAtencion", "pago"]}
          pageNumber={1}
          onClick={() => {}}
        />
      </Frame>
    </div>
  </Band>
);

// ── Band 2: RTL ─────────────────────────────────────────────────────────────────

const RtlSpecimens: React.FC = () => (
  <div className="sb-stack">
    <Frame label="Search field: leading glyph and trailing action">
      <div className="search-box">
        <span className="search-box-icon" aria-hidden="true">
          S
        </span>
        <input type="text" defaultValue="Zahlungen" aria-label="Search" />
        <button type="button" className="search-box-action" aria-label="Clear">
          X
        </button>
      </div>
    </Frame>
    <Frame label="Theme popover: anchored to the inline end">
      <ThemePopover />
    </Frame>
    <Frame label="Table: header and numeric column alignment">
      <Table
        headerData={{ title: "المدفوعات" }}
        list={[
          { uid: "h1", value: "الوصف" },
          { uid: "h2", value: "المبلغ" },
        ]}
        bodyData={[{ uid: "b1", value: "1,240.00", className: "cell-numeric" }]}
        numericColumns={[1]}
      />
    </Frame>
    <Frame label="Post card: byline order and read-more spacing">
      <Post post={shortPost} bodyPreviewLength={12} onView={() => {}} />
    </Frame>
    <Frame label="Form navigation: connector direction">
      <FormNavigation formOrder={["details", "hours", "payment"]} pageNumber={1} onClick={() => {}} />
    </Frame>
    <Frame label="Tab bar: active accent edge">
      <TabBar labels={NAV_SHORT} />
    </Frame>
  </div>
);

const Rtl: React.FC = () => (
  <Band
    title="Right to left, beside its left-to-right twin"
    note="Read these as pairs, not as screenshots. A physical padding, a left-anchored popover or a rotated badge is invisible on its own and obvious against the mirror. Only two categories count as defects today: something that becomes UNREACHABLE (a popover opening off screen) and something that OVERLAPS. Everything merely mirrored wrong is scoping material, since the library ships no RTL consumer yet."
  >
    <div className="sb-pair">
      <div dir="ltr">
        <p className="sb-frame-label">dir=&quot;ltr&quot;</p>
        <RtlSpecimens />
      </div>
      <div dir="rtl">
        <p className="sb-frame-label">dir=&quot;rtl&quot;</p>
        <RtlSpecimens />
      </div>
    </div>
  </Band>
);

// ── Band 3: zero, one, many ─────────────────────────────────────────────────────

const ZeroOneMany: React.FC = () => (
  <Band
    title="Zero, one, many"
    note="Zero must be an empty STATE, not an empty BOX: a bordered card with nothing inside reads as a broken app. One must not render as a plural or leave a lone divider. Many must scroll inside its own region rather than widen the page. Watch the table's zero row in particular, it is the one surface here whose empty case renders no cell."
  >
    <div className="sb-matrix-grid">
      <span className="sb-matrix-rowlabel">Skeleton</span>
      <div className="sb-matrix-cell">
        <Frame label="count 0 (clamped to 1)">
          <Skeleton shape="row" count={0} />
        </Frame>
      </div>
      <div className="sb-matrix-cell">
        <Frame label="count 1">
          <Skeleton shape="row" count={1} />
        </Frame>
      </div>
      <div className="sb-matrix-cell">
        <Frame label="count 8">
          <Skeleton shape="row" count={8} />
        </Frame>
      </div>

      <span className="sb-matrix-rowlabel">EntryNavigator</span>
      <div className="sb-matrix-cell">
        <Frame label="no entries">
          <EntryNavigator entries={noEntries} activeEntry="" max={7} orientation="strip" onSelect={() => {}} />
        </Frame>
      </div>
      <div className="sb-matrix-cell">
        <Frame label="one entry">
          <EntryNavigator entries={oneEntry} activeEntry="a" max={7} orientation="strip" onSelect={() => {}} />
        </Frame>
      </div>
      <div className="sb-matrix-cell">
        <Frame label="twelve entries">
          <EntryNavigator entries={manyEntries} activeEntry="k0" max={12} orientation="strip" onSelect={() => {}} />
        </Frame>
      </div>

      <span className="sb-matrix-rowlabel">Table</span>
      <div className="sb-matrix-cell">
        <Frame label="no rows">
          <Table headerData={{ title: "Payouts" }} list={tableHeader} bodyData={[]} />
        </Frame>
      </div>
      <div className="sb-matrix-cell">
        <Frame label="one row">
          <Table headerData={{ title: "Payouts" }} list={tableHeader} bodyData={rows(1)} />
        </Frame>
      </div>
      <div className="sb-matrix-cell">
        <Frame label="twenty four rows">
          <Table headerData={{ title: "Payouts" }} list={tableHeader} bodyData={rows(24)} />
        </Frame>
      </div>

      <span className="sb-matrix-rowlabel">Tab bar</span>
      <div className="sb-matrix-cell">
        <Frame label="one tab">
          <TabBar labels={NAV_SHORT.slice(0, 1)} />
        </Frame>
      </div>
      <div className="sb-matrix-cell">
        <Frame label="four tabs">
          <TabBar labels={NAV_SHORT} />
        </Frame>
      </div>
      <div className="sb-matrix-cell">
        <Frame label="nine tabs">
          <TabBar labels={[...NAV_SHORT, ...NAV_SHORT, "Help"]} />
        </Frame>
      </div>

      <span className="sb-matrix-rowlabel">Card grid</span>
      <div className="sb-matrix-cell">
        <Frame label="no cards">
          <div className="grid" />
        </Frame>
      </div>
      <div className="sb-matrix-cell">
        <Frame label="one card">
          <div className="grid">
            <Post post={shortPost} />
          </div>
        </Frame>
      </div>
      <div className="sb-matrix-cell">
        <Frame label="three cards">
          <div className="grid">
            <Post post={shortPost} />
            <Post post={shortPost} />
            <Post post={shortPost} />
          </div>
        </Frame>
      </div>

      <span className="sb-matrix-rowlabel">Form steps</span>
      <div className="sb-matrix-cell">
        <Frame label="one step">
          <FormNavigation formOrder={["details"]} pageNumber={0} onClick={() => {}} />
        </Frame>
      </div>
      <div className="sb-matrix-cell">
        <Frame label="three steps">
          <FormNavigation formOrder={["details", "hours", "payment"]} pageNumber={1} onClick={() => {}} />
        </Frame>
      </div>
      <div className="sb-matrix-cell">
        <Frame label="eight steps">
          <FormNavigation
            formOrder={["one", "two", "three", "four", "five", "six", "seven", "eight"]}
            pageNumber={3}
            onClick={() => {}}
          />
        </Frame>
      </div>
    </div>
  </Band>
);

const Sheet: React.FC = () => (
  <Fragment>
    <LongStrings />
    <Rtl />
    <ZeroOneMany />
  </Fragment>
);

export const LightAndDark: StoryObj = {
  render: () => (
    <div className="sb-matrix">
      <Sheet />
      {/* Both themes on one page, matching the other Phase 4 matrices: the dark theme is produced
          entirely by token reassignment, so a surface that hardcoded a color only reveals itself
          beside its light twin. It matters here too, because the empty and skeleton states are
          exactly the surfaces that get reviewed least. */}
      <div className="sb-matrix-dark dark-mode">
        <div className="sb-matrix">
          <Sheet />
        </div>
      </div>
    </div>
  ),
};
