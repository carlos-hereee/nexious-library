import { useCallback, useEffect, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import type { SearchBarProps } from "nxs-form";
import Input from "@nxs-atoms/forms/Input";
import Label from "@nxs-atoms/forms/Label";
import { SEARCH_BAR_DEBOUNCE_MS, formatSearchResultCount } from "@nxs-utils/form/searchBar";

/** Puts the library's class first and the caller's after it, so both stay on the element. */
const withCallerClass = (libraryClass: string, callerClass?: string): string =>
  callerClass ? `${libraryClass} ${callerClass}` : libraryClass;

/**
 * The one search box: the typed text stays inside this component and the caller hears about it once,
 * after the pause. So a key press re-renders only the box, never the page that owns the search, and
 * whatever the caller derives from `value` (a filter pass, a URL write, a request) runs at that pace.
 *
 * It does not filter, fetch or guard against slow responses; those belong to the caller. Clearing and
 * Enter skip the pause, because neither leaves anything more to wait for.
 *
 * It renders `nxs-search` and `nxs-search-input` beside the caller's `className` and
 * `inputClassName` (2026-11 item 337). Given `resultCount`, it announces the count in a polite
 * status region, so a screen reader hears how many results the search left without moving focus.
 */
const SearchBar = (props: SearchBarProps) => {
  const { name, label, value, onChange, placeholder, className, inputClassName } = props;
  const { labelClassName = "sr-only", debounceMs = SEARCH_BAR_DEBOUNCE_MS, isDisabled } = props;
  const { resultCount, formatResultCount = formatSearchResultCount } = props;

  const [draft, setDraft] = useState(value);
  // The last value the caller knows about, so a `value` that changes because the caller caught up to
  // our own push is told apart from one changed from outside (Clear filters, the Back button).
  const committed = useRef(value);
  const timer = useRef<ReturnType<typeof setTimeout>>();
  // Read through a ref so an inline arrow from the caller cannot restart or strand a pending timer.
  const onChangeRef = useRef(onChange);

  const cancelPending = useCallback(() => {
    clearTimeout(timer.current);
    timer.current = undefined;
  }, []);

  const commit = useCallback(
    (next: string) => {
      cancelPending();
      if (next === committed.current) return;
      committed.current = next;
      onChangeRef.current(next);
    },
    [cancelPending],
  );

  useEffect(() => {
    onChangeRef.current = onChange;
  });

  // An outside change wins over a pause in progress: a Clear filters pressed mid pause must not be
  // undone 300ms later by the text it just cleared.
  useEffect(() => {
    if (value === committed.current) return;
    cancelPending();
    committed.current = value;
    setDraft(value);
  }, [value, cancelPending]);

  useEffect(() => cancelPending, [cancelPending]);

  const handleChange = (next: string) => {
    setDraft(next);
    if (!next) {
      commit(next);
      return;
    }
    cancelPending();
    timer.current = setTimeout(() => commit(next), debounceMs);
  };

  // preventDefault because the bar can sit inside a caller's form, which Enter here must not submit.
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Enter") return;
    event.preventDefault();
    commit(draft);
  };

  return (
    <div className={withCallerClass("nxs-search", className)} role="search" aria-label={label}>
      <Label name={name} label={label} className={labelClassName} />
      <Input
        name={name}
        type="search"
        className={withCallerClass("nxs-search-input", inputClassName)}
        value={draft}
        placeholder={placeholder}
        isDisabled={isDisabled}
        autoComplete="off"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      {/* Rendered whenever the caller counts, even before the first search, because a live
          region inserted at the same moment as its text is often not announced at all. */}
      {resultCount !== undefined ? (
        <p className="sr-only nxs-search-status" role="status" aria-live="polite" aria-atomic="true">
          {formatResultCount(resultCount)}
        </p>
      ) : null}
    </div>
  );
};

export default SearchBar;
