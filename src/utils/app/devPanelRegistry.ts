// ── "First panel open, the rest collapsed" ───────────────────────────────────
// WHY: one broken component should teach you fully; five broken components should not
// bury the page under five identical walls of prose. The FIRST panel on the page expands,
// every later one shows just its headline and the received/expected pair until clicked.
//
// HOW the election works: ids are handed out during render, which runs top-down, so the
// lowest id is the panel earliest in document order. Effects then register the ids that
// actually mounted, and the lowest MOUNTED id wins. Registration happens in a layout
// effect, before paint, so the winner is already open on the first frame; panels start
// closed and open, never the reverse, because expanding unseen is free and collapsing
// something the reader already started reading is not.
//
// Ids may skip numbers (StrictMode double-renders the claim). Only their ORDER is used,
// so gaps are harmless.

let counter = 0;
const mountedPanels = new Set<number>();

/** Claim an ordering id. Call once per panel instance, cached in a ref. */
export const nextPanelId = (): number => {
  counter += 1;
  return counter;
};

export const registerPanel = (id: number): void => {
  mountedPanels.add(id);
};

export const unregisterPanel = (id: number): void => {
  mountedPanels.delete(id);
};

/** True when this id is the earliest panel currently mounted. */
export const isFirstPanel = (id: number): boolean => {
  if (!mountedPanels.size) return true;
  let lowest = Infinity;
  mountedPanels.forEach((value) => {
    if (value < lowest) lowest = value;
  });
  return lowest === id;
};

/** Test-only reset so one test file's panels cannot decide another's election. */
export const resetPanelRegistry = (): void => {
  counter = 0;
  mountedPanels.clear();
};
