import type { Meta, StoryObj } from "@storybook/react";
import type { FieldEntryProps } from "nxs-form";
import EntryNavigator from "./EntryNavigator";
import "../../stories/states-matrix.css";

/**
 * EntryNavigator states matrix.
 *
 * The switcher used to be two components. A file-only group got real thumbnails; every other
 * group got a row of numbered boxes, and it rendered `max` of them up front with the unused ones
 * disabled, so a max of ten showed eight dead boxes before the user had done anything.
 *
 * The columns below are the cases that used to diverge. Read the "store hours" row: the tiles say
 * Monday and Tuesday, which is the information the numbered boxes were failing to convey, and it
 * comes from data the component already held rather than from anything a consumer had to pass.
 */
const meta: Meta<typeof EntryNavigator> = {
  title: "Foundation/States/EntryNavigator",
  component: EntryNavigator,
  parameters: { layout: "fullscreen" },
};
export default meta;

const field = (name: string, value: string, type = "text") => ({
  name,
  value,
  type,
  label: name,
  placeholder: "",
  fieldId: `${name}-${value}`,
});

const hours: FieldEntryProps = {
  a: [field("day", "Monday"), field("open", "9:00 AM")],
  b: [field("day", "Tuesday"), field("open", "9:00 AM")],
  c: [field("day", "Wednesday"), field("open", "10:00 AM")],
};
const unnamed: FieldEntryProps = { a: [field("day", "")], b: [field("day", "")] };
const single: FieldEntryProps = { a: [field("day", "Monday")] };
const longNames: FieldEntryProps = {
  a: [field("day", "Miércoles de horario extendido")],
  b: [field("day", "Jueves")],
};

const CASES: [string, FieldEntryProps, number | undefined, boolean][] = [
  ["store hours", hours, 7, false],
  ["one entry", single, 7, false],
  ["no identity", unnamed, 7, false],
  ["at capacity", hours, 3, false],
  ["disabled", hours, 7, true],
  ["long labels", longNames, 7, false],
];

const Matrix = () => (
  <div className="sb-matrix-grid">
    <span />
    {CASES.map(([label]) => (
      <span className="sb-matrix-heading" key={label}>
        {label}
      </span>
    ))}
    <span className="sb-matrix-rowlabel">strip</span>
    {CASES.map(([label, entries, max, isDisabled]) => (
      <div className="sb-matrix-cell" key={`strip-${label}`}>
        <EntryNavigator
          entries={entries}
          activeEntry="a"
          max={max}
          isDisabled={isDisabled}
          orientation="strip"
          itemNoun="Entry"
          railLabel="Store hours"
          onSelect={() => {}}
        />
      </div>
    ))}
  </div>
);

export const AllStates: StoryObj = {
  render: () => (
    <div className="sb-matrix">
      <h2 className="sb-matrix-title">EntryNavigator, one switcher for every group</h2>
      <p className="sb-matrix-note">
        Only real slots render. Remaining capacity is the count line, not a row of dead boxes. The active tile is the
        one with aria-pressed and the brand border; tab through to check the focus ring, which this component previously
        signalled with an opacity change alone.
      </p>
      <Matrix />
      <div className="sb-matrix-dark dark-mode">
        <Matrix />
      </div>
    </div>
  ),
};
