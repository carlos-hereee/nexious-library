// How long SearchBar waits after the last key press. Long enough that a five letter word is one
// filter pass or request rather than five, short enough to still read as a result of typing.
export const SEARCH_BAR_DEBOUNCE_MS = 300;

// SearchBar's default result announcement. English on purpose and only a default: a localized
// caller passes formatResultCount, because plural rules differ by language.
export const formatSearchResultCount = (count: number): string => (count === 1 ? "1 result" : `${count} results`);
