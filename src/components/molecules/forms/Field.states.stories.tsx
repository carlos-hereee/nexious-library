import { Fragment } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import type { FormFieldProps } from "nxs-form";
import Field from "./Field";
import "../../stories/states-matrix.css";

/**
 * Field states matrix.
 *
 * Uniformity is not verifiable one component at a time. A Select story and an Input story each
 * look fine alone and are four pixels different in height, and nobody notices until they sit in
 * the same form. This puts every field type against every state on one screen, twice, once in
 * each theme, so the whole system is one screenshot.
 *
 * What to look for, in order of how much it matters:
 * 1. Every control in a column shares a top and bottom edge. That is the field shell and the
 *    control-height token doing their job; before Phase 2 an input had 16px horizontal padding
 *    and a select had 8px, so their text did not even start in the same place.
 * 2. The error row shows the message BELOW the control, in the same slot, for every type.
 * 3. The dark half has no dark-on-dark text. Anything that fails there hardcoded a color
 *    instead of reading a token.
 */
const meta: Meta<typeof Field> = {
  title: "Foundation/States/Field",
  component: Field,
  parameters: { layout: "fullscreen" },
};
export default meta;

const TYPES: [string, string][] = [
  ["text", "text"],
  ["textarea", "textarea"],
  ["select", "select"],
  ["datalist", "datalist"],
  ["number", "number"],
  ["price", "price-dollars-cents"],
  ["checkbox", "checkbox"],
  ["date", "date"],
  ["time", "date-time"],
  ["day", "date-day"],
];

const OPTIONS = [
  { name: "one", value: "one", label: "Option one", uid: "1" },
  { name: "two", value: "two", label: "Option two", uid: "2" },
];

const LONG_LABEL =
  "A deliberately long field label that keeps going well past any sensible column width so wrapping and clipping are visible rather than theoretical";

const STATES: [string, Partial<FormFieldProps>][] = [
  ["rest", {}],
  ["filled", { value: "one" }],
  ["error", { formError: "This field is required" }],
  ["disabled", { disableForm: true, value: "one" }],
  ["hidden label", { hideLabels: true, formError: "Still described" }],
  ["long string", { label: LONG_LABEL, value: LONG_LABEL }],
];

const props = (type: string, over: Partial<FormFieldProps>): FormFieldProps => ({
  name: "sample",
  value: "",
  placeholder: "Placeholder",
  label: "Field label",
  type,
  fieldId: `sample-${type}`,
  dataList: { sample: OPTIONS },
  handleChange: () => {},
  handleCheckbox: () => {},
  ...over,
});

const Matrix = () => (
  <div className="sb-matrix-grid">
    <span />
    {STATES.map(([state]) => (
      <span className="sb-matrix-heading" key={state}>
        {state}
      </span>
    ))}
    {TYPES.map(([rowLabel, type]) => (
      // A keyed Fragment, not a bare <>, because a row is several grid children and the shorthand
      // cannot take a key.
      <Fragment key={type}>
        <span className="sb-matrix-rowlabel">{rowLabel}</span>
        {STATES.map(([state, over]) => (
          <div className="sb-matrix-cell" key={`${type}-${state}`}>
            {/* The real component with real props. Nothing here fakes a state, because a faked
                state proves the fake, not the rule. */}
            <Field {...props(type, over)} />
          </div>
        ))}
      </Fragment>
    ))}
  </div>
);

export const AllStates: StoryObj = {
  render: () => (
    <div className="sb-matrix">
      <h2 className="sb-matrix-title">Field, every type against every state</h2>
      <p className="sb-matrix-note">
        Read down a column, not across a row. Every control in a column should share a top edge and a bottom edge, and
        every error message should sit in the same slot below its control.
      </p>
      <Matrix />
      <h2 className="sb-matrix-title">The same matrix in dark mode</h2>
      <p className="sb-matrix-note">
        Produced entirely by token reassignment, so anything that reads wrong here hardcoded a color. This is the single
        highest value thing the harness catches.
      </p>
      <div className="sb-matrix-dark dark-mode">
        <Matrix />
      </div>
    </div>
  ),
};
