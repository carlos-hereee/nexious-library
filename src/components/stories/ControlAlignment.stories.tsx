import type { Meta, StoryObj } from "@storybook/react";
import Input from "@nxs-atoms/forms/Input";
import Select from "@nxs-molecules/forms/Select";
import TextArea from "@nxs-molecules/forms/TextArea";
import FieldTime from "@nxs-molecules/forms/FieldTime";
import FieldDate from "@nxs-molecules/forms/FieldDate";
import "./states-matrix.css";

/**
 * The alignment proof.
 *
 * Every default-size control in one horizontal row, on a background of 4px rules. If the control
 * heights are uniform, every top and bottom edge lands on a rule. This one screen is the
 * acceptance test for "the UI is uniform", and it is faster to read than any checklist.
 *
 * What it proves as of Phase 2: input, select, textarea, the time input and the date trigger all
 * resolve to one height from one set of control tokens. They did not before; an input carried
 * 8px/16px padding and a select 8px/8px, so their text started eight pixels apart and the two
 * resolved to different heights from the same font.
 *
 * What it does NOT prove yet, and this is deliberate rather than an oversight: buttons still size
 * themselves from their own SCSS. The variant times size matrix is Phase 3, and a Button belongs
 * in this row the moment it lands. Until then, judging button height against these controls is
 * judging work that has not been done.
 */
const meta: Meta = {
  title: "Foundation/Control Alignment",
  parameters: { layout: "fullscreen" },
};
export default meta;

const OPTIONS = [{ name: "one", value: "one", label: "Option one", uid: "1" }];

const Row = () => (
  <div className="sb-alignment">
    <div className="sb-alignment-item">
      <Input name="text" value="Text input" onChange={() => {}} />
    </div>
    <div className="sb-alignment-item">
      <Select name="select" list={OPTIONS} active="one" hideLabels onChange={() => {}} />
    </div>
    <div className="sb-alignment-item">
      <FieldTime name="time" value="3:00 PM" onChange={() => {}} />
    </div>
    <div className="sb-alignment-item">
      <FieldDate name="date" value="Mon Aug 03 2026" onChange={() => {}} />
    </div>
    <div className="sb-alignment-item">
      <TextArea input={{ name: "textarea", value: "Textarea", onChange: () => {} }} hideLabels />
    </div>
  </div>
);

export const Aligned: StoryObj = {
  render: () => (
    <div className="sb-matrix">
      <h2 className="sb-matrix-title">Control alignment</h2>
      <p className="sb-alignment-legend">
        Every control at default size on 4px rules. Uniform heights land every top and bottom edge on a rule. A textarea
        is deliberately taller: it is sized to its content, not to the scale. Buttons join this row in Phase 3, when
        they stop sizing themselves.
      </p>
      <Row />
      <div className="sb-matrix-dark dark-mode">
        <Row />
      </div>
    </div>
  ),
};
