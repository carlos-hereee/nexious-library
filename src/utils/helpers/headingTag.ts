// Maps a card or row heading level to its intrinsic tag. Shared by Card and ListRow (2026-11
// item 337), the two components that let a caller fit a title into the page's outline. A lookup
// rather than a template string, so the tag stays a typed intrinsic element with no cast.
import type { CardHeadingLevel } from "nxs-card";
import type { HeadingSize } from "nxs-typography";

export const HEADING_TAGS: Record<CardHeadingLevel, Exclude<HeadingSize, "h1">> = {
  2: "h2",
  3: "h3",
  4: "h4",
  5: "h5",
  6: "h6",
};
