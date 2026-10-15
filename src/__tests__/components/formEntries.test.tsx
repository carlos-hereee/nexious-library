import "@testing-library/jest-dom";
import { fireEvent, render, waitFor } from "@testing-library/react";
import Form from "@nxs-template/Form";
import { uniqueId } from "@nxs-utils/data/uniqueId";
import type { AddEntryProps, FormProps } from "nxs-form";

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
