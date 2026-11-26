import { useRef, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import type { AddEntryProps, FormEntriesHandle } from "nxs-form";
import Form from "./Form";

/**
 * Form builds a whole form from `initialValues`. A repeating group (cards the owner can add and
 * remove, capped at `max`) opens from a checkbox named in `addEntry` and shows ONE card at a time.
 *
 * `entriesRef` and `onEntriesChange` are for a consumer that has to work with cards the DOM cannot
 * reach: the hidden cards of a group, whose fields also reuse names a top level field already has.
 * Both are optional, and a form passing neither renders and submits exactly as it always has.
 *
 * - `entriesRef.current.readEntries()` returns every card of every group, in order, by key.
 * - `writeEntries(group, [{ key, values }])` fills named fields of the keyed cards; the active
 *   card repaints and the next submit carries every write, hidden cards included.
 * - `appendEntries(group, [values])` adds filled cards through the group's own add path, up to
 *   `max`, without changing the active card. A group that is off takes nothing.
 * - `onEntriesChange(summary)` reports cards per group once after seeding and again only when a
 *   group turns on or off or a card is added or removed, never while the owner types.
 */
const meta: Meta<typeof Form> = {
  title: "Templates/Form",
  component: Form,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 560, padding: "1rem" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Form>;

// The toggle field (hasSections) and the group it files cards under (sections) have different
// names, as they do in the platform's page config. The handle speaks the group name.
const sectionsEntry: AddEntryProps = {
  additionLabel: "Add card",
  removalLabel: "Remove card",
  groupName: "sections",
  initialValues: { title: "", body: "" },
  types: { title: "text", body: "textarea" },
  fieldHeading: {},
  labels: { title: "Card title", body: "Card body" },
  onMultiply: { additionLabel: "Add card", name: "sections", removalLabel: "Remove card" },
  max: 5,
  canMultiply: true,
};

/** A consumer outside the form: its own controls drive the handle, and Save sits in a footer. */
const EntriesHandleHarness = () => {
  const entriesRef = useRef<FormEntriesHandle | null>(null);
  const [summary, setSummary] = useState<Record<string, number>>({});
  const [output, setOutput] = useState("");

  const readCards = () => setOutput(JSON.stringify(entriesRef.current?.readEntries(), null, 2));
  const rewriteLastCard = () => {
    const cards = entriesRef.current?.readEntries().sections || [];
    const last = cards[cards.length - 1];
    if (!last) return;
    const written = entriesRef.current?.writeEntries("sections", [
      { key: last.key, values: { title: "Rewritten while hidden", body: "Open this card to see it." } },
    ]);
    setOutput(`Wrote ${JSON.stringify(written)}`);
  };
  const appendCards = () => {
    const added = entriesRef.current?.appendEntries("sections", [
      { title: "Appended one", body: "Filled on arrival." },
      { title: "Appended two", body: "Stops at max." },
    ]);
    setOutput(`Appended ${JSON.stringify(added)}`);
  };

  return (
    <>
      <Form
        formId="entries-story-form"
        initialValues={{ title: "Spring open house", hasSections: true }}
        labels={{ title: "Page title", hasSections: "Add sections" }}
        types={{ hasSections: "checkbox" }}
        addEntry={{ hasSections: sectionsEntry }}
        entries={{
          sections: [
            { title: "Welcome", body: "Doors open at nine." },
            { title: "Schedule", body: "Tours every hour." },
            { title: "Parking", body: "Lot B is free." },
          ],
        }}
        entriesRef={entriesRef}
        onEntriesChange={setSummary}
        hideSubmit
        onSubmit={(payload) => setOutput(`Submitted ${JSON.stringify(payload, null, 2)}`)}
      />
      <div className="buttons-container">
        <button type="button" className="btn-main" onClick={readCards}>
          Read cards
        </button>
        <button type="button" className="btn-main" onClick={rewriteLastCard}>
          Rewrite the last card
        </button>
        <button type="button" className="btn-main" onClick={appendCards}>
          Append two cards
        </button>
        <button type="submit" className="btn-main" form="entries-story-form">
          Save
        </button>
      </div>
      <p>Cards per group: {JSON.stringify(summary)}</p>
      <pre>{output}</pre>
    </>
  );
};

/**
 * Switch to card 1, press "Rewrite the last card", then Save: the hidden card's new text is in the
 * payload. "Append two cards" adds them at the end, keeps you on the card you were on, and the
 * summary line moves; typing in any field leaves it alone.
 */
export const EntriesHandle: Story = {
  name: "Entries handle (entriesRef, onEntriesChange)",
  render: () => <EntriesHandleHarness />,
};
