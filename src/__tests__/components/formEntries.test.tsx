import "@testing-library/jest-dom";
import { Profiler } from "react";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import Form from "@nxs-template/Form";
import { uniqueId } from "@nxs-utils/data/uniqueId";
import type { AddEntryProps, FormEntriesHandle, FormProps } from "nxs-form";

// Every fieldId and every card's sharedKey comes from uniqueId, which is random. A counter in its
// place makes the rendered markup the same on every run, so it can be pinned as a literal.
jest.mock("@nxs-utils/data/uniqueId");
beforeEach(() => {
  let count = 0;
  (uniqueId as jest.Mock).mockImplementation(() => {
    count += 1;
    return `id-${count}`;
  });
});

// ── Fixture ──
// A page shaped form: a top level `title`, a sections group that is ON with three cards whose own
// fields reuse the name `title` (the collision a consumer cannot address through the DOM), and a
// buttons group that is OFF. The toggle names (hasSections, hasButtons) and the group names
// (sections, buttons) differ on purpose, as they do in the client's page config.
const sectionsEntry: AddEntryProps = {
  additionLabel: "Add card",
  removalLabel: "Remove card",
  groupName: "sections",
  initialValues: { title: "", body: "" },
  types: { title: "text", body: "textarea" },
  fieldHeading: {},
  labels: { title: "Card title", body: "Card body" },
  onMultiply: { additionLabel: "Add card", name: "sections", removalLabel: "Remove card" },
  max: 4,
  canMultiply: true,
};
const buttonsEntry: AddEntryProps = {
  additionLabel: "Add button",
  removalLabel: "Remove button",
  groupName: "buttons",
  initialValues: { label: "" },
  types: { label: "text" },
  fieldHeading: {},
  labels: { label: "Button label" },
  onMultiply: { additionLabel: "Add button", name: "buttons", removalLabel: "Remove button" },
  max: 3,
  canMultiply: true,
};

const pageFormProps = (over: Partial<FormProps> = {}): FormProps => ({
  formId: "page-form",
  initialValues: { title: "Page title", hasSections: true, hasButtons: false },
  labels: { title: "Title", hasSections: "Add sections", hasButtons: "Add buttons" },
  types: { hasSections: "checkbox", hasButtons: "checkbox" },
  addEntry: { hasSections: sectionsEntry, hasButtons: buttonsEntry },
  entries: {
    sections: [
      { title: "One", body: "First" },
      { title: "Two", body: "Second" },
      { title: "Three", body: "Third" },
    ],
    buttons: [{ label: "Ignored while off" }],
  },
  confirmRemovals: false,
  onSubmit: jest.fn(),
  ...over,
});

// ── The no prop case ──
// Captured from the build BEFORE entriesRef and onEntriesChange existed. Never edit these to make
// a change pass: a difference here is a change every form on the platform would see on its next
// install. Note the ACTIVE card is the last one: Form seeds its entries in order and the last card
// seeded wins the active slot.
const PAGE_FORM_BEFORE_THE_HANDLE =
  '<form id="page-form"><div class="form-field-container no-scroll" id="form-field-container"><div class="form-field" id="id-1"><div class="field-shell"><label for="title" class="field-label"><span class="label-name">Title</span> </label><input class="highlight" autocomplete="on" id="title" type="text" value="Page title" name="title"></div></div><div class="form-field" id="id-2"><div class="field-shell"><div class="input-checkbox "><input id="hasSections" type="checkbox" checked="" name="hasSections"><label for="hasSections"><span class="label-name">Add sections</span> </label></div></div></div><div class="container" id="id-5"><div class="entry-rail entry-rail-strip"><div class="entry-rail-tiles" role="group" aria-label="sections"><button type="button" class="entry-rail-tile" aria-pressed="false" aria-label="Entry 1 of 3, One" title="Entry 1 of 3, One"><span class="entry-rail-placeholder">One</span></button><button type="button" class="entry-rail-tile" aria-pressed="false" aria-label="Entry 2 of 3, Two" title="Entry 2 of 3, Two"><span class="entry-rail-placeholder">Two</span></button><button type="button" class="entry-rail-tile entry-rail-tile-active" aria-pressed="true" aria-label="Entry 3 of 3, Three" title="Entry 3 of 3, Three"><span class="entry-rail-placeholder">Three</span></button></div><p class="entry-rail-count">3 of 4</p></div><div class="field-shell"><label for="title" class="field-label"><span class="label-name">Card title</span> </label><input class="highlight" autocomplete="on" id="title" type="text" value="Three" name="title"></div><div class="field-shell"><label for="body" class="field-label"><span class="label-name">Card body</span> </label><textarea class="highlight" name="body" id="body">Third</textarea></div><div class="buttons-container"><button type="button" class="btn-main btn-cancel"><svg class="icon" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"></path></svg>Remove card</button><button type="button" title="Add another" aria-label="Add another">Add card</button></div></div><div class="form-field" id="id-3"><div class="field-shell"><div class="input-checkbox "><input id="hasButtons" type="checkbox" name="hasButtons"><label for="hasButtons"><span class="label-name">Add buttons</span> </label></div></div></div></div><button type="submit" class="btn-main form-submit-btn"><svg class="icon" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 2 11 13"></path><path d="M22 2 15 22l-4-9-9-4 20-7Z"></path></svg> Confirm</button></form>';
// Serialized, so key ORDER is pinned along with the values.
const PAGE_PAYLOAD_BEFORE_THE_HANDLE =
  '{"title":"Page title","hasSections":true,"sections":[{"title":"One","body":"First"},{"title":"Two","body":"Second"},{"title":"Three","body":"Third"}],"hasButtons":false}';

const submitAndCapture = async (container: HTMLElement, onSubmit: jest.Mock) => {
  fireEvent.submit(container.querySelector("form") as HTMLFormElement);
  await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1));
  return JSON.stringify(onSubmit.mock.calls[0][0]);
};

describe("Form with repeating groups and neither entriesRef nor onEntriesChange", () => {
  it("renders the exact markup it rendered before the handle existed", () => {
    const { container } = render(<Form {...pageFormProps()} />);
    expect(container.innerHTML).toBe(PAGE_FORM_BEFORE_THE_HANDLE);
  });

  it("submits the exact payload it submitted before the handle existed", async () => {
    const onSubmit = jest.fn();
    const { container } = render(<Form {...pageFormProps({ onSubmit })} />);
    expect(await submitAndCapture(container, onSubmit)).toBe(PAGE_PAYLOAD_BEFORE_THE_HANDLE);
  });
});

// ── Helpers for the handle ──
type EntriesRef = React.MutableRefObject<FormEntriesHandle | null>;
const newEntriesRef = (): EntriesRef => ({ current: null });
const handleOf = (entriesRef: EntriesRef) => entriesRef.current as FormEntriesHandle;

// The group renders inside div.container (a top level field renders inside div.form-field), and a
// card's `title` shares its name and id with the top level `title`, so a card input is found by
// name INSIDE the group, never by label.
const groupOf = (container: HTMLElement) =>
  container.querySelector(".form-field-container > .container") as HTMLElement;
const cardTitle = (container: HTMLElement) =>
  groupOf(container).querySelector('input[name="title"]') as HTMLInputElement;
const cardBody = (container: HTMLElement) =>
  groupOf(container).querySelector('textarea[name="body"]') as HTMLTextAreaElement;
const pageTitle = (container: HTMLElement) =>
  container.querySelector('.form-field input[name="title"]') as HTMLInputElement;
const showCard = (position: number) =>
  fireEvent.click(screen.getByRole("button", { name: new RegExp(`^Entry ${position} of `) }));

// ── The unknown this API rests on ──
// Form renders only the active card, so a card the owner is not looking at exists only in state.
// These cases prove a write through the handle reaches that state for a hidden card, repaints a
// visible one, survives switching cards, and lands in the payload of a submit started from OUTSIDE
// the form (the client's dialogs put Save in a footer, not inside <form>).
describe("entriesRef writes reach hidden cards, the visible card and the submit", () => {
  const renderWithExternalSave = (entriesRef: EntriesRef, onSubmit: jest.Mock) =>
    render(
      <>
        <Form {...pageFormProps({ entriesRef, onSubmit, hideSubmit: true })} />
        <button type="submit" form="page-form">
          Save
        </button>
      </>
    );

  it("sets the handle while mounted and reads every card in order", () => {
    const entriesRef = newEntriesRef();
    render(<Form {...pageFormProps({ entriesRef })} />);
    const read = handleOf(entriesRef).readEntries();
    expect(read.sections.map((card) => card.values)).toEqual([
      { title: "One", body: "First" },
      { title: "Two", body: "Second" },
      { title: "Three", body: "Third" },
    ]);
    // The buttons group is off, so its seed (which the submit ignores) reads as no cards.
    expect(read.buttons).toEqual([]);
  });

  it("writes a hidden card and the visible card, repaints the visible one, and submits both", async () => {
    const entriesRef = newEntriesRef();
    const onSubmit = jest.fn();
    const { container } = renderWithExternalSave(entriesRef, onSubmit);
    showCard(1);
    expect(cardTitle(container)).toHaveValue("One");
    const [first, , third] = handleOf(entriesRef).readEntries().sections;

    let written: string[] = [];
    act(() => {
      written = handleOf(entriesRef).writeEntries("sections", [
        { key: third.key, values: { title: "Three rewritten", body: "Third rewritten" } },
        { key: first.key, values: { title: "One rewritten" } },
      ]);
    });
    expect(written).toEqual([third.key, first.key]);

    // Card 1 is on screen and repaints; its body was not named, so it keeps its text. The top level
    // field that shares the name `title` is untouched.
    expect(cardTitle(container)).toHaveValue("One rewritten");
    expect(cardBody(container)).toHaveValue("First");
    expect(pageTitle(container)).toHaveValue("Page title");

    // Card 3 was never on screen while it was written; switching to it shows the written text.
    showCard(3);
    expect(cardTitle(container)).toHaveValue("Three rewritten");
    expect(cardBody(container)).toHaveValue("Third rewritten");

    fireEvent.click(screen.getByRole("button", { name: "Save" }));
    await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1));
    expect(onSubmit.mock.calls[0][0]).toEqual({
      title: "Page title",
      hasSections: true,
      sections: [
        { title: "One rewritten", body: "First" },
        { title: "Two", body: "Second" },
        { title: "Three rewritten", body: "Third rewritten" },
      ],
      hasButtons: false,
    });
  });

  it("carries a write to a card that was never shown into the submit", async () => {
    // The strongest form of the proof: card 2 is never the active card at any point, so its new
    // text never touches the DOM before the payload is built.
    const entriesRef = newEntriesRef();
    const onSubmit = jest.fn();
    renderWithExternalSave(entriesRef, onSubmit);
    const { key } = handleOf(entriesRef).readEntries().sections[1];
    act(() => {
      handleOf(entriesRef).writeEntries("sections", [
        { key, values: { title: "Two rewritten", body: "Second rewritten" } },
      ]);
    });
    expect(screen.queryByDisplayValue("Two rewritten")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Save" }));
    await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1));
    expect(onSubmit.mock.calls[0][0].sections).toEqual([
      { title: "One", body: "First" },
      { title: "Two rewritten", body: "Second rewritten" },
      { title: "Three", body: "Third" },
    ]);
  });
});

describe("entriesRef reads and writes the current state, never a stale one", () => {
  it("reads text the owner typed into a card after mount", () => {
    const entriesRef = newEntriesRef();
    const { container } = render(<Form {...pageFormProps({ entriesRef })} />);
    showCard(1);
    fireEvent.change(cardTitle(container), { target: { value: "Typed" } });
    expect(handleOf(entriesRef).readEntries().sections[0].values).toEqual({ title: "Typed", body: "First" });
  });

  it("builds two writes in one tick on each other, and a read in that tick sees both", () => {
    const entriesRef = newEntriesRef();
    const { container } = render(<Form {...pageFormProps({ entriesRef })} />);
    const [first, second] = handleOf(entriesRef).readEntries().sections;
    let readBack: ReturnType<FormEntriesHandle["readEntries"]> = {};
    act(() => {
      handleOf(entriesRef).writeEntries("sections", [{ key: first.key, values: { title: "A" } }]);
      handleOf(entriesRef).writeEntries("sections", [{ key: second.key, values: { body: "B" } }]);
      readBack = handleOf(entriesRef).readEntries();
    });
    expect(readBack.sections.map((card) => card.values)).toEqual([
      { title: "A", body: "First" },
      { title: "Two", body: "B" },
      { title: "Three", body: "Third" },
    ]);
    showCard(1);
    expect(cardTitle(container)).toHaveValue("A");
  });

  it("skips unknown keys, unknown field names and unknown groups", () => {
    const entriesRef = newEntriesRef();
    render(<Form {...pageFormProps({ entriesRef })} />);
    const [first] = handleOf(entriesRef).readEntries().sections;
    let written: string[][] = [];
    act(() => {
      written = [
        handleOf(entriesRef).writeEntries("sections", [
          { key: "no-such-card", values: { title: "Lost" } },
          { key: first.key, values: { color: "red" } },
        ]),
        handleOf(entriesRef).writeEntries("faq", [{ key: first.key, values: { title: "Lost" } }]),
      ];
    });
    expect(written).toEqual([[], []]);
    expect(handleOf(entriesRef).readEntries().sections[0].values).toEqual({ title: "One", body: "First" });
  });

  it("reads and writes nothing in a group whose toggle was turned off", () => {
    const entriesRef = newEntriesRef();
    const { container } = render(<Form {...pageFormProps({ entriesRef })} />);
    const [first] = handleOf(entriesRef).readEntries().sections;
    fireEvent.click(screen.getByLabelText("Add sections"));
    expect(groupOf(container)).toBeNull();
    expect(handleOf(entriesRef).readEntries().sections).toEqual([]);
    let written: string[] = ["unset"];
    act(() => {
      written = handleOf(entriesRef).writeEntries("sections", [{ key: first.key, values: { title: "Lost" } }]);
    });
    expect(written).toEqual([]);
  });

  it("is set while mounted and null after unmount", () => {
    const entriesRef = newEntriesRef();
    const { unmount } = render(<Form {...pageFormProps({ entriesRef })} />);
    expect(entriesRef.current).not.toBeNull();
    unmount();
    expect(entriesRef.current).toBeNull();
  });

  it("renders the exact no prop markup when both props are passed", () => {
    const { container } = render(
      <Form {...pageFormProps({ entriesRef: newEntriesRef(), onEntriesChange: jest.fn() })} />
    );
    expect(container.innerHTML).toBe(PAGE_FORM_BEFORE_THE_HANDLE);
  });
});

describe("entriesRef.appendEntries", () => {
  it("adds filled cards at the end through the add button's path and returns their keys", async () => {
    const entriesRef = newEntriesRef();
    const onSubmit = jest.fn();
    const { container } = render(
      <Form {...pageFormProps({ entriesRef, onSubmit, addEntry: { hasSections: { ...sectionsEntry, max: 6 } } })} />
    );
    const before = handleOf(entriesRef)
      .readEntries()
      .sections.map((card) => card.key);
    let added: string[] = [];
    act(() => {
      // An unnamed field keeps the group's initial value; an unknown name is skipped.
      added = handleOf(entriesRef).appendEntries("sections", [
        { title: "Four", body: "Fourth" },
        { title: "Five", color: "red" },
      ]);
    });
    const after = handleOf(entriesRef).readEntries().sections;
    expect(added).toHaveLength(2);
    expect(after.map((card) => card.key)).toEqual([...before, ...added]);
    expect(after.slice(3).map((card) => card.values)).toEqual([
      { title: "Four", body: "Fourth" },
      { title: "Five", body: "" },
    ]);
    // The active card is still card 3, the one Form opened on.
    expect(screen.getByRole("button", { name: /^Entry 3 of 5/ })).toHaveAttribute("aria-pressed", "true");
    expect(cardTitle(container)).toHaveValue("Three");

    fireEvent.submit(container.querySelector("form") as HTMLFormElement);
    await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1));
    expect(onSubmit.mock.calls[0][0].sections).toHaveLength(5);
    expect(onSubmit.mock.calls[0][0].sections[4]).toEqual({ title: "Five", body: "" });
  });

  it("stops at the group's max", () => {
    const entriesRef = newEntriesRef();
    render(<Form {...pageFormProps({ entriesRef })} />);
    let added: string[] = [];
    act(() => {
      added = handleOf(entriesRef).appendEntries("sections", [{ title: "Four" }, { title: "Five" }, { title: "Six" }]);
    });
    expect(added).toHaveLength(1);
    expect(handleOf(entriesRef).readEntries().sections).toHaveLength(4);
    let more: string[] = ["unset"];
    act(() => {
      more = handleOf(entriesRef).appendEntries("sections", [{ title: "Seven" }]);
    });
    expect(more).toEqual([]);
  });

  it("appends every item to a group with no max", () => {
    const entriesRef = newEntriesRef();
    render(
      <Form {...pageFormProps({ entriesRef, addEntry: { hasSections: { ...sectionsEntry, max: undefined } } })} />
    );
    act(() => {
      handleOf(entriesRef).appendEntries("sections", [{ title: "Four" }, { title: "Five" }, { title: "Six" }]);
    });
    expect(handleOf(entriesRef).readEntries().sections).toHaveLength(6);
  });

  it("appends nothing to a group whose toggle is off, or to an unknown group", () => {
    const entriesRef = newEntriesRef();
    render(<Form {...pageFormProps({ entriesRef })} />);
    let added: string[][] = [];
    act(() => {
      added = [
        handleOf(entriesRef).appendEntries("buttons", [{ label: "Go" }]),
        handleOf(entriesRef).appendEntries("faq", [{ question: "Why?" }]),
      ];
    });
    expect(added).toEqual([[], []]);
    expect(handleOf(entriesRef).readEntries().buttons).toEqual([]);
  });

  it("appends to a group the owner just turned on, counting its fresh card toward max", () => {
    const entriesRef = newEntriesRef();
    render(<Form {...pageFormProps({ entriesRef })} />);
    fireEvent.click(screen.getByLabelText("Add buttons"));
    let added: string[] = [];
    act(() => {
      added = handleOf(entriesRef).appendEntries("buttons", [{ label: "Go" }, { label: "Read" }, { label: "Buy" }]);
    });
    expect(added).toHaveLength(2);
    expect(
      handleOf(entriesRef)
        .readEntries()
        .buttons.map((card) => card.values)
    ).toEqual([{ label: "" }, { label: "Go" }, { label: "Read" }]);
  });
});

describe("onEntriesChange", () => {
  const renderReporting = (over: Partial<FormProps> = {}) => {
    const onEntriesChange = jest.fn();
    const entriesRef = newEntriesRef();
    const utils = render(<Form {...pageFormProps({ entriesRef, onEntriesChange, ...over })} />);
    return { ...utils, onEntriesChange, entriesRef };
  };

  it("reports once after the seeded cards land, counting a group that is off as 0", () => {
    const { onEntriesChange } = renderReporting();
    expect(onEntriesChange).toHaveBeenCalledTimes(1);
    expect(onEntriesChange).toHaveBeenLastCalledWith({ sections: 3, buttons: 0 });
  });

  it("stays quiet while the owner types in a card or a top level field, and on writeEntries", () => {
    const { container, onEntriesChange, entriesRef } = renderReporting();
    fireEvent.change(cardTitle(container), { target: { value: "Typed" } });
    fireEvent.change(cardBody(container), { target: { value: "Typed body" } });
    fireEvent.change(pageTitle(container), { target: { value: "New page title" } });
    const [first] = handleOf(entriesRef).readEntries().sections;
    act(() => {
      handleOf(entriesRef).writeEntries("sections", [{ key: first.key, values: { title: "Written" } }]);
    });
    expect(onEntriesChange).toHaveBeenCalledTimes(1);
  });

  it("reports a group turned on and a group turned off", () => {
    const { onEntriesChange } = renderReporting();
    fireEvent.click(screen.getByLabelText("Add buttons"));
    expect(onEntriesChange).toHaveBeenLastCalledWith({ sections: 3, buttons: 1 });
    fireEvent.click(screen.getByLabelText("Add sections"));
    expect(onEntriesChange).toHaveBeenLastCalledWith({ sections: 0, buttons: 1 });
    expect(onEntriesChange).toHaveBeenCalledTimes(3);
  });

  it("reports a card added with the group's own button", () => {
    const { onEntriesChange } = renderReporting();
    fireEvent.click(screen.getByRole("button", { name: "Add another" }));
    expect(onEntriesChange).toHaveBeenLastCalledWith({ sections: 4, buttons: 0 });
    expect(onEntriesChange).toHaveBeenCalledTimes(2);
  });

  it("reports a card removed with the group's own button", () => {
    // Confirmations on (the default), so removal goes through the confirm dialog as it does for an
    // owner: the first press opens it and its own remove button removes the active card.
    const { onEntriesChange } = renderReporting({ confirmRemovals: undefined });
    fireEvent.click(screen.getByRole("button", { name: "Remove card" }));
    fireEvent.click(screen.getByRole("button", { name: "Remove card" }));
    expect(onEntriesChange).toHaveBeenLastCalledWith({ sections: 2, buttons: 0 });
    expect(onEntriesChange).toHaveBeenCalledTimes(2);
  });

  it("reports cards appended through the handle", () => {
    const { onEntriesChange, entriesRef } = renderReporting();
    act(() => {
      handleOf(entriesRef).appendEntries("sections", [{ title: "Four" }]);
    });
    expect(onEntriesChange).toHaveBeenLastCalledWith({ sections: 4, buttons: 0 });
    expect(onEntriesChange).toHaveBeenCalledTimes(2);
  });

  it("adds no render of its own", () => {
    // Form commits the same number of times with the callback as without it, so reporting is a
    // read of state, never a state change.
    const commitsWith = (over: Partial<FormProps>) => {
      let commits = 0;
      const { unmount } = render(
        <Profiler
          id="form"
          onRender={() => {
            commits += 1;
          }}
        >
          <Form {...pageFormProps(over)} />
        </Profiler>
      );
      unmount();
      return commits;
    };
    expect(commitsWith({ onEntriesChange: jest.fn() })).toBe(commitsWith({}));
  });
});
