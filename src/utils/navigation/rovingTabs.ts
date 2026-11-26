// The roving tabindex every library tablist shares (2026-11 item 337, Phase 4): SectionedRail,
// PillTabStrip and MobileTabBar. Ported from nexious-client's useTabListKeys, which those three
// client components each called. It decides which tab is the one tab stop and answers the arrow,
// Home and End keys. It renders nothing and imports no component, so it stays a pure helper.
import type { KeyboardEvent } from "react";

// Both axes answer on purpose, as in the client: a vertical rail is announced with Up and Down and
// a horizontal strip with Left and Right, and a strip that also answers the other pair costs nothing.
const NEXT_KEYS = new Set(["ArrowDown", "ArrowRight"]);
const PREVIOUS_KEYS = new Set(["ArrowUp", "ArrowLeft"]);

/**
 * The one id that gets `tabIndex={0}`: the requested focus id, then the active id, then the first
 * id, each only when it is actually rendered. WAI-ARIA APG requires exactly one tab stop in a
 * tablist, and with nothing selected (the client account rail's attention path) the first tab has
 * to take it or the whole tablist is unreachable from the keyboard.
 */
export const resolveTabStop = <T extends string>(
  ids: readonly T[],
  focusId?: T | null,
  activeId?: T | null
): T | undefined => {
  if (focusId && ids.includes(focusId)) return focusId;
  if (activeId && ids.includes(activeId)) return activeId;
  return ids[0];
};

/** The index a navigation key moves to from `current`, wrapping at both ends, or null for any other key. */
export const nextTabIndex = (key: string, current: number, count: number): number | null => {
  if (count === 0) return null;
  if (NEXT_KEYS.has(key)) return (current + 1) % count;
  if (PREVIOUS_KEYS.has(key)) return (current - 1 + count) % count;
  if (key === "Home") return 0;
  if (key === "End") return count - 1;
  return null;
};

/**
 * Moves focus AND selection (automatic activation) from the focused tab. The position is read from
 * the DOM: the focused element's index among the `[role="tab"]` descendants of its tablist, which
 * is why every piece renders its tabs in one tablist element in the same order as `ids`. Reading
 * the focused element rather than the active id is what makes a tablist with no selection walk
 * from where focus actually is.
 */
export const handleRovingKeyDown = <T extends string>(
  event: KeyboardEvent<HTMLElement>,
  ids: readonly T[],
  onMove: (id: T) => void
) => {
  const tablist = event.currentTarget.closest('[role="tablist"]');
  if (!tablist) return;
  const tabs = Array.from(tablist.querySelectorAll<HTMLElement>('[role="tab"]'));
  const next = nextTabIndex(event.key, tabs.indexOf(event.currentTarget), tabs.length);
  const nextId = next === null ? undefined : ids[next];
  if (next === null || nextId === undefined) return;
  event.preventDefault();
  onMove(nextId);
  tabs[next]?.focus();
};
