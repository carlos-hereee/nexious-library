import { useEffect, useId, useRef, useState } from "react";
import { Icon } from "@nxs-atoms";
import type { ThemeList } from "nxs-navigation";

interface ThemeMenuProps {
  list: ThemeList[];
  active?: string;
  name?: string;
  theme?: string;
  btnTheme?: string;
  handleChange?: (value: string) => void;
}

/**
 * ThemeMenu
 *
 * Replaces the native <select> based theme switcher with a proper menu button
 * plus listbox popover. Built to:
 *  - Be visually distinct from the nav links next to it (icon + chevron).
 *  - Follow the WAI ARIA authoring pattern for a listbox button:
 *      aria-haspopup="listbox", aria-expanded, aria-controls on the trigger,
 *      role="listbox" on the popover, role="option" with aria-selected on items.
 *  - Support keyboard: Enter/Space to open, ArrowUp/ArrowDown to move focus,
 *    Enter to pick, Escape to close, Tab to close.
 *  - Close when the user clicks outside the component.
 *
 * This scales to many themes later without needing a redesign. It also means
 * the active theme can show a color swatch next to its label.
 */
const ThemeMenu = ({ list, active, name = "theme", theme, btnTheme, handleChange }: ThemeMenuProps) => {
  const [open, setOpen] = useState(false);
  const [focusIdx, setFocusIdx] = useState<number>(-1);
  const wrapRef = useRef<HTMLLIElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const listboxId = useId();

  const activeItem = list.find((t) => t.value === active || t.name === active || t.label === active);
  const activeLabel = activeItem?.label || "Theme";

  // Close on outside click.
  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  // Focus the active option when opening.
  useEffect(() => {
    if (!open) return;
    const idx = Math.max(
      0,
      list.findIndex((t) => t.value === active || t.name === active)
    );
    setFocusIdx(idx);
    // Move DOM focus into the listbox on open for keyboard users.
    requestAnimationFrame(() => {
      const el = listRef.current?.querySelectorAll<HTMLLIElement>("[role='option']")[idx];
      el?.focus();
    });
  }, [open, active, list]);

  const choose = (val: string) => {
    if (handleChange) handleChange(val);
    setOpen(false);
    requestAnimationFrame(() => triggerRef.current?.focus());
  };

  const onTriggerKey = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpen(true);
    }
  };

  const onListKey = (e: React.KeyboardEvent<HTMLUListElement>) => {
    if (!list.length) return;
    if (e.key === "Escape" || e.key === "Tab") {
      e.preventDefault();
      setOpen(false);
      triggerRef.current?.focus();
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = (focusIdx + 1) % list.length;
      setFocusIdx(next);
      listRef.current?.querySelectorAll<HTMLLIElement>("[role='option']")[next]?.focus();
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = (focusIdx - 1 + list.length) % list.length;
      setFocusIdx(next);
      listRef.current?.querySelectorAll<HTMLLIElement>("[role='option']")[next]?.focus();
      return;
    }
    if (e.key === "Home") {
      e.preventDefault();
      setFocusIdx(0);
      listRef.current?.querySelectorAll<HTMLLIElement>("[role='option']")[0]?.focus();
      return;
    }
    if (e.key === "End") {
      e.preventDefault();
      const last = list.length - 1;
      setFocusIdx(last);
      listRef.current?.querySelectorAll<HTMLLIElement>("[role='option']")[last]?.focus();
      return;
    }
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const sel = list[focusIdx];
      if (sel) choose(sel.value);
    }
  };

  const wrapClass = ["theme-menu", theme || "", btnTheme || ""].filter(Boolean).join(" ");

  return (
    <li className={wrapClass} ref={wrapRef}>
      <button
        ref={triggerRef}
        type="button"
        className="theme-menu-trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-label={`${name} picker, current ${activeLabel}`}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={onTriggerKey}
      >
        <Icon icon="palette" name="theme" theme="theme-menu-icon" />
        <span className="theme-menu-label">{activeLabel}</span>
        {activeItem?.colors && (
          <span className="theme-menu-swatch" aria-hidden="true" style={{ background: activeItem.colors.primary }} />
        )}
        <Icon icon="chevronDown" name="chevron" theme={`theme-menu-chevron${open ? " is-open" : ""}`} />
      </button>

      {open && (
        <ul
          ref={listRef}
          id={listboxId}
          role="listbox"
          aria-label={`${name} options`}
          className="theme-menu-list"
          onKeyDown={onListKey}
        >
          {list.map((t, i) => {
            const selected = t.value === active || t.name === active;
            return (
              <li
                key={t.uid || t.value || t.name}
                role="option"
                aria-selected={selected}
                tabIndex={i === focusIdx ? 0 : -1}
                className={`theme-menu-option${selected ? " is-selected" : ""}`}
                onClick={() => choose(t.value)}
                onMouseEnter={() => setFocusIdx(i)}
              >
                {t.colors && (
                  <span
                    className="theme-menu-option-swatch"
                    aria-hidden="true"
                    style={{ background: t.colors.primary }}
                  />
                )}
                <span className="theme-menu-option-label">{t.label}</span>
                {selected && <Icon icon="checkMark" name="check" theme="theme-menu-option-check" />}
              </li>
            );
          })}
        </ul>
      )}
    </li>
  );
};

export default ThemeMenu;
