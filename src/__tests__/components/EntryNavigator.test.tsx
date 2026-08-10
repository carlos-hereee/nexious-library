import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import EntryNavigator from "@nxs-molecules/forms/EntryNavigator";
import type { FieldEntryProps } from "nxs-form";

// A field shaped the way useValues builds them. Only value/type/name matter to the navigator.
const field = (name: string, value: string | File, type = "text") => ({
  name,
  value,
  type,
  label: name,
  placeholder: "",
  fieldId: `${name}-id`,
});

const entriesOf = (slots: ReturnType<typeof field>[][]): FieldEntryProps =>
  slots.reduce((acc, slot, idx) => ({ ...acc, [`slot-${idx}`]: slot }), {});

// jsdom implements neither half of the object-url API, and urlFile calls createObjectURL for any
// File. Stubbed for the whole file so a File-bearing slot renders at all; the blob-lifetime block
// below replaces the revoke stub with its own spy.
beforeEach(() => {
  URL.createObjectURL = jest.fn(() => "blob:mock-url");
  URL.revokeObjectURL = jest.fn();
});

describe("EntryNavigator tile content resolution", () => {
  it("prefers a thumbnail over every other source", () => {
    const file = new File(["x"], "photo.png", { type: "image/png" });
    const entries = entriesOf([[field("image", file, "file"), field("caption", "Sunset")]]);
    render(
      <EntryNavigator entries={entries} activeEntry="slot-0" getTileLabel={() => "custom"} onSelect={jest.fn()} />
    );
    // An <img> means the thumbnail won; the derived label and the override are not rendered.
    expect(screen.getByRole("img")).toBeInTheDocument();
    expect(screen.queryByText("Sunset")).not.toBeInTheDocument();
    expect(screen.queryByText("custom")).not.toBeInTheDocument();
  });

  it("derives a label from the slot's own first text value, beating getTileLabel", () => {
    const entries = entriesOf([[field("day", "Tuesday"), field("open", "9:00 AM")]]);
    render(
      <EntryNavigator entries={entries} activeEntry="slot-0" getTileLabel={() => "custom"} onSelect={jest.fn()} />
    );
    expect(screen.getByText("Tuesday")).toBeInTheDocument();
    expect(screen.queryByText("custom")).not.toBeInTheDocument();
  });

  it("falls back to getTileLabel when the slot carries no usable value", () => {
    const entries = entriesOf([[field("day", "   ")]]);
    render(
      <EntryNavigator
        entries={entries}
        activeEntry="slot-0"
        getTileLabel={(_k, i) => `Custom ${i}`}
        onSelect={jest.fn()}
      />
    );
    expect(screen.getByText("Custom 0")).toBeInTheDocument();
  });

  it("falls back to the index only when nothing else resolves", () => {
    const entries = entriesOf([[field("day", "")], [field("day", "")]]);
    render(<EntryNavigator entries={entries} activeEntry="slot-0" onSelect={jest.fn()} />);
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("does not treat a plain text value as an image src", () => {
    // The old rail looked for "a File OR a non-empty string" and would have used the day name as
    // a url, rendering a broken image. Only a File or a field typed "file" is a thumbnail.
    const entries = entriesOf([[field("day", "Tuesday")]]);
    render(<EntryNavigator entries={entries} activeEntry="slot-0" onSelect={jest.fn()} />);
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });
});

describe("EntryNavigator slots and semantics", () => {
  it("renders only real slots, never disabled boxes up to max", () => {
    // The numbered strip this replaces rendered `max` buttons up front and disabled the ones past
    // the end, so a max of ten showed eight dead boxes before the user had done anything.
    const entries = entriesOf([[field("day", "Monday")], [field("day", "Tuesday")]]);
    render(<EntryNavigator entries={entries} activeEntry="slot-0" max={10} onSelect={jest.fn()} />);
    expect(screen.getAllByRole("button")).toHaveLength(2);
    // Remaining capacity is carried by the count line instead.
    expect(screen.getByText("2 of 10")).toBeInTheDocument();
  });

  it("marks exactly one tile as pressed", () => {
    const entries = entriesOf([[field("day", "Monday")], [field("day", "Tuesday")], [field("day", "Friday")]]);
    render(<EntryNavigator entries={entries} activeEntry="slot-1" onSelect={jest.fn()} />);
    const pressed = screen.getAllByRole("button").filter((b) => b.getAttribute("aria-pressed") === "true");
    expect(pressed).toHaveLength(1);
    expect(pressed[0]).toHaveAccessibleName(/Tuesday/);
  });

  it("exposes the group with an accessible name and reports the slot in its label", () => {
    const entries = entriesOf([[field("day", "Monday")], [field("day", "Tuesday")]]);
    render(
      <EntryNavigator
        entries={entries}
        activeEntry="slot-0"
        railLabel="Store hours"
        itemNoun="Day"
        onSelect={jest.fn()}
      />
    );
    expect(screen.getByRole("group", { name: "Store hours" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Day 2 of 2, Tuesday" })).toBeInTheDocument();
  });

  it("says empty rather than nothing when a slot has no identity at all", () => {
    const entries = entriesOf([[field("day", "")]]);
    render(<EntryNavigator entries={entries} activeEntry="slot-0" itemNoun="Image" onSelect={jest.fn()} />);
    expect(screen.getByRole("button", { name: "Image 1 of 1, empty" })).toBeInTheDocument();
  });

  it("calls onSelect with the slot's shared key", () => {
    const onSelect = jest.fn();
    const entries = entriesOf([[field("day", "Monday")], [field("day", "Tuesday")]]);
    render(<EntryNavigator entries={entries} activeEntry="slot-0" onSelect={onSelect} />);
    fireEvent.click(screen.getByRole("button", { name: /Tuesday/ }));
    expect(onSelect).toHaveBeenCalledWith("slot-1");
  });
});

describe("EntryNavigator blob lifetime", () => {
  it("revokes blob urls on unmount and leaves plain urls alone", () => {
    // A blob url pins the whole image in memory for the life of the document, and this component
    // remounts on every dialog open, so the revoke is a real memory fix rather than boilerplate.
    const revoke = URL.revokeObjectURL as jest.Mock;
    const file = new File(["x"], "photo.png", { type: "image/png" });
    const entries = entriesOf([
      [field("image", file, "file")],
      [field("image", "https://cdn.example.com/a.png", "file")],
    ]);
    const { unmount } = render(<EntryNavigator entries={entries} activeEntry="slot-0" onSelect={jest.fn()} />);
    unmount();
    expect(revoke).toHaveBeenCalledTimes(1);
    expect(revoke).toHaveBeenCalledWith("blob:mock-url");
  });
});
