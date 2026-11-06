import { useState } from "react";
import type { FormEvent } from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import SearchBar from "@nxs-molecules/forms/SearchBar";
import { SEARCH_BAR_DEBOUNCE_MS } from "@nxs-utils/form/searchBar";

// ── SearchBar ──
// The contract every search on the platform leans on: the box updates at once, the caller hears once
// after the pause, and clearing, Enter, unmount and an outside change never leave a stray commit.

expect.extend(toHaveNoViolations);

const LABEL = "Search tickets";

const typeText = (text: string) => fireEvent.change(screen.getByRole("searchbox"), { target: { value: text } });
const box = () => screen.getByRole("searchbox") as HTMLInputElement;
const advance = (ms: number) =>
  act(() => {
    jest.advanceTimersByTime(ms);
  });

const renderBar = (value = "") => {
  const onChange = jest.fn();
  const view = render(<SearchBar name="search" label={LABEL} value={value} onChange={onChange} />);
  return { onChange, ...view };
};

describe("SearchBar", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.useRealTimers();
  });

  it("waits 300ms by default", () => {
    expect(SEARCH_BAR_DEBOUNCE_MS).toBe(300);
  });

  it("commits several quick key presses once, after the pause, with the box current throughout", () => {
    const { onChange } = renderBar();
    ["f", "fo", "foo"].forEach((text) => {
      typeText(text);
      expect(box().value).toBe(text);
      advance(SEARCH_BAR_DEBOUNCE_MS - 1);
    });
    expect(onChange).not.toHaveBeenCalled();

    advance(1);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith("foo");
  });

  it("honors a custom pause", () => {
    const onChange = jest.fn();
    render(<SearchBar name="search" label={LABEL} value="" onChange={onChange} debounceMs={50} />);
    typeText("a");
    advance(50);
    expect(onChange).toHaveBeenCalledWith("a");
  });

  it("does not commit when the text returns to the committed value", () => {
    const { onChange } = renderBar("foo");
    typeText("foob");
    typeText("foo");
    advance(SEARCH_BAR_DEBOUNCE_MS);
    expect(onChange).not.toHaveBeenCalled();
  });

  it("applies a clear at once and drops the pending text", () => {
    const { onChange } = renderBar("foo");
    typeText("food");
    typeText("");
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith("");

    advance(SEARCH_BAR_DEBOUNCE_MS);
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("commits on Enter without waiting, once, and stops an enclosing form submitting", () => {
    const onChange = jest.fn();
    const onSubmit = jest.fn((event: FormEvent) => event.preventDefault());
    render(
      <form onSubmit={onSubmit}>
        <SearchBar name="search" label={LABEL} value="" onChange={onChange} />
      </form>,
    );
    typeText("foo");
    // fireEvent.keyDown returns false when the handler called preventDefault, which is what stops a
    // browser's implicit submit; jsdom does not run implicit submission from a key event itself.
    expect(fireEvent.keyDown(box(), { key: "Enter" })).toBe(false);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith("foo");
    expect(onSubmit).not.toHaveBeenCalled();

    advance(SEARCH_BAR_DEBOUNCE_MS);
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("cancels the pending commit on unmount", () => {
    const { onChange, unmount } = renderBar();
    typeText("foo");
    unmount();
    advance(SEARCH_BAR_DEBOUNCE_MS);
    expect(onChange).not.toHaveBeenCalled();
  });

  it("lets an outside change replace the text and cancel a pause in progress", () => {
    const onChange = jest.fn();
    const { rerender } = render(<SearchBar name="search" label={LABEL} value="old" onChange={onChange} />);
    typeText("older");
    rerender(<SearchBar name="search" label={LABEL} value="" onChange={onChange} />);
    expect(box().value).toBe("");

    advance(SEARCH_BAR_DEBOUNCE_MS);
    expect(onChange).not.toHaveBeenCalled();
  });

  it("keeps text typed after a commit when the caller catches up", () => {
    const Harness = () => {
      const [value, setValue] = useState("");
      return <SearchBar name="search" label={LABEL} value={value} onChange={setValue} />;
    };
    render(<Harness />);
    typeText("foo");
    advance(SEARCH_BAR_DEBOUNCE_MS);
    typeText("foob");
    expect(box().value).toBe("foob");
  });

  it("calls the newest onChange when the caller passes a new function mid pause", () => {
    const first = jest.fn();
    const second = jest.fn();
    const { rerender } = render(<SearchBar name="search" label={LABEL} value="" onChange={first} />);
    typeText("foo");
    rerender(<SearchBar name="search" label={LABEL} value="" onChange={second} />);
    advance(SEARCH_BAR_DEBOUNCE_MS);
    expect(first).not.toHaveBeenCalled();
    expect(second).toHaveBeenCalledWith("foo");
  });

  it("names the box and the landmark, and passes axe", async () => {
    jest.useRealTimers();
    const { container } = renderBar();
    expect(screen.getByRole("searchbox", { name: LABEL })).toBeTruthy();
    expect(screen.getByRole("search", { name: LABEL })).toBeTruthy();
    expect(await axe(container)).toHaveNoViolations();
  });
});
