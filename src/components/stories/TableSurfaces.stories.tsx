import { Fragment } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import "./states-matrix.css";

/**
 * Table surfaces after the Phase 4 fan-out.
 *
 * Rendered as bare markup on purpose, and that is itself the finding: the four table components
 * (Table, TableHeader, TableBody, TableFooter and the atoms under them) are commented out of
 * every barrel, so a consumer cannot import them without a deep path. Phase 4 tokenized the
 * ELEMENT-level reset, which is what actually reaches consumers today, so that is what this
 * reviews. Exporting the components is a public API decision for the owner, filed in TECH_DEBT.
 *
 * What to look for:
 * 1. Digits line up vertically in the numeric column. .cell-numeric sets tabular-nums and right
 *    alignment; without it, proportional digits make a column of money impossible to scan and it
 *    is the most common tell of an unfinished table.
 * 2. The header reads as a header at a glance: 12px, uppercase, semibold, tracked. It also sticks
 *    when its scroll box scrolls, which needs the container to be shorter than the content.
 * 3. Comfortable rows are 52px and .table-dense rows are 44px. Both clear the 44px tap floor by
 *    construction, which is why they are tokens rather than numbers somebody picked.
 * 4. Row hover TINTS and does not lift. A table row is the purest case of rule 3.
 * 5. On the dark half the zebra, the header fill and the hover are all translucent rather than
 *    opaque, so they composite over whatever surface the table sits on rather than assuming white.
 */
const meta: Meta = {
  title: "Foundation/States/Table surfaces",
  parameters: { layout: "fullscreen" },
};
export default meta;

const ROWS: [string, string, string][] = [
  ["Ceramic mug", "In stock", "1249.00"],
  ["Enamel pin set", "Low stock", "8.50"],
  ["Tote bag, canvas", "In stock", "24.00"],
  ["Sticker sheet", "Out of stock", "3.75"],
  ["Poster, A2 matte", "In stock", "112.25"],
];

const Sheet: React.FC<{ dense?: boolean }> = ({ dense }) => (
  <div className="table-scroll">
    <table className={dense ? "table-dense" : undefined}>
      <thead>
        <tr>
          <th>Product</th>
          <th>Availability</th>
          <th className="cell-numeric">Price</th>
        </tr>
      </thead>
      <tbody>
        {ROWS.map(([name, status, price]) => (
          <tr key={name}>
            <td>{name}</td>
            <td>{status}</td>
            <td className="cell-numeric">{price}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const Band: React.FC = () => (
  <Fragment>
    <h3 className="sb-matrix-title">Comfortable, 52px rows</h3>
    <p className="sb-matrix-note">The default density. Prices are .cell-numeric, product names are not.</p>
    <Sheet />
    <h3 className="sb-matrix-title">Compact, 44px rows</h3>
    <p className="sb-matrix-note">
      The density toggle. It stops at 44px rather than going smaller because that is the WCAG 2.5.5
      target floor and a row is a tap target.
    </p>
    <Sheet dense />
  </Fragment>
);

export const LightAndDark: StoryObj = {
  render: () => (
    <div className="sb-matrix">
      <Band />
      <div className="sb-matrix-dark dark-mode">
        <div className="sb-matrix">
          <Band />
        </div>
      </div>
    </div>
  ),
};
