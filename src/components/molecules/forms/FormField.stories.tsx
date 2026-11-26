import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import type { AddEntryProps, FieldEntryProps, FormInitialValue } from "nxs-form";
import FormField from "./FormField";

/**
 * FormField renders one field, or the whole switcher for an "entry group" (a field set the user
 * can multiply, capped at `entry.max`).
 *
 * The switcher has two shapes and FormField picks between them from the group's own field types:
 *
 * - **file-only group** (the merch catalog) renders the gallery: the active upload large, every
 *   other slot beside it as a dimmed thumbnail. Numbers cannot say WHICH image a slot holds, so
 *   an uploader had to click through all ten to find the one they meant.
 * - **any other group** (recurring store hours) keeps the numbered strip, which is all a text
 *   entry can show.
 *
 * Consumers opt in by declaring field types they already declare. No new prop.
 */
const meta: Meta<typeof FormField> = {
  title: "Molecules/FormField",
  component: FormField,
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
type Story = StoryObj<typeof FormField>;

// Inline SVG so the stories render identically offline and in CI.
const swatch = (label: string, color: string) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 90"><rect width="120" height="90" fill="${color}"/><text x="60" y="54" font-size="26" text-anchor="middle" fill="#ffffff" font-family="sans-serif">${label}</text></svg>`
  )}`;

const catalogEntry: AddEntryProps = {
  additionLabel: "Add another",
  removalLabel: "Remove",
  groupName: "catalog",
  initialValues: { catalog: "" },
  types: { catalog: "file" },
  fieldHeading: {},
  labels: { catalog: "Images" },
  onMultiply: { additionLabel: "Add another", name: "catalog", removalLabel: "Remove" },
  max: 10,
  canMultiply: true,
};

const catalogSlot = (sharedKey: string, value: FormInitialValue) => [
  {
    value,
    name: "catalog",
    placeholder: "",
    type: "file",
    label: "Images",
    fieldId: sharedKey,
    sharedKey,
    group: "hasCatalog",
    groupName: "catalog",
    canMultiply: true,
    canRemove: true,
    onMultiply: catalogEntry.onMultiply,
  },
];

const seededCatalog: FieldEntryProps = {
  "catalog-1": catalogSlot("catalog-1", swatch("1", "#484b6a")),
  "catalog-2": catalogSlot("catalog-2", swatch("2", "#2e7d46")),
  "catalog-3": catalogSlot("catalog-3", swatch("3", "#b4544a")),
  "catalog-4": catalogSlot("catalog-4", swatch("4", "#eaab4c")),
  "catalog-5": catalogSlot("catalog-5", ""),
};

/** Wired to local state so switching slots, uploading, adding and removing all behave live. */
const CatalogHarness = ({ seed }: { seed: FieldEntryProps }) => {
  const [entries, setEntries] = useState<FieldEntryProps>(seed);
  const [activeEntry, setActiveEntry] = useState<string>(Object.keys(seed)[0]);

  const handleChange = (value: FormInitialValue) => {
    setEntries((old) => ({ ...old, [activeEntry]: catalogSlot(activeEntry, value) }));
  };
  const handleMultiply = () => {
    const nextKey = `catalog-${Object.keys(entries).length + 1}`;
    setEntries((old) => ({ ...old, [nextKey]: catalogSlot(nextKey, "") }));
    setActiveEntry(nextKey);
  };
  const handleRemoval = (_groupName: string, idx: number) => {
    const remaining = { ...entries };
    delete remaining[activeEntry];
    const keys = Object.keys(remaining);
    if (!keys.length) return;
    setEntries(remaining);
    setActiveEntry(keys[idx] || keys[idx - 1] || keys[0]);
  };

  return (
    <FormField
      name="hasCatalog"
      type="checkbox"
      value
      placeholder=""
      label="Add catalog images"
      fieldId="hasCatalog"
      isEntry
      entry={catalogEntry}
      entries={entries}
      activeEntry={activeEntry}
      confirmRemoval={false}
      handleChange={handleChange}
      setActiveEntry={(next) => setActiveEntry(next.catalog)}
      onMultiplyClick={handleMultiply}
      onRemovalClick={handleRemoval}
      setConfirmRemovals={() => {}}
    />
  );
};

/** File-only group: the gallery. Slot 5 has no upload yet, so it falls back to its index. */
export const CatalogGallery: Story = {
  render: () => <CatalogHarness seed={seededCatalog} />,
};

/** A brand new group is a single empty slot, which looks and behaves like the old numbered one. */
export const CatalogEmpty: Story = {
  render: () => <CatalogHarness seed={{ "catalog-1": catalogSlot("catalog-1", "") }} />,
};

const hoursEntry: AddEntryProps = {
  additionLabel: "Add another",
  removalLabel: "Remove",
  groupName: "isRecurringTrue",
  initialValues: { day: "", startTime: "", closeTime: "" },
  types: { day: "date-day", startTime: "date-time", closeTime: "date-time" },
  fieldHeading: {},
  labels: { day: "Day", startTime: "Opens", closeTime: "Closes" },
  onMultiply: { additionLabel: "Add another", name: "isRecurringTrue", removalLabel: "Remove" },
  max: 10,
  canMultiply: true,
};

const hoursSlot = (sharedKey: string) =>
  ["day", "startTime", "closeTime"].map((name, idx) => ({
    value: "",
    name,
    placeholder: "",
    type: hoursEntry.types[name],
    label: hoursEntry.labels[name],
    fieldId: `${sharedKey}-${name}`,
    sharedKey,
    group: "isRecurring",
    groupName: "isRecurringTrue",
    canMultiply: idx === 0,
    canRemove: idx === 0,
    onMultiply: hoursEntry.onMultiply,
  }));

/** Regression guard: a group with non-file fields keeps the numbered strip, unchanged. */
export const RecurringHoursKeepsNumbers: Story = {
  render: () => (
    <FormField
      name="isRecurring"
      type="checkbox"
      value
      placeholder=""
      label="Recurring hours"
      fieldId="isRecurring"
      isEntry
      entry={hoursEntry}
      entries={{ "hours-1": hoursSlot("hours-1"), "hours-2": hoursSlot("hours-2") }}
      activeEntry="hours-1"
      confirmRemoval={false}
      handleChange={() => {}}
      setActiveEntry={() => {}}
      onMultiplyClick={() => {}}
      onRemovalClick={() => {}}
      setConfirmRemovals={() => {}}
    />
  ),
};
