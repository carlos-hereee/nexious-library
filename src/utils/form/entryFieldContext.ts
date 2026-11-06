// The context FormField's repeating branch writes and useFieldDomId reads. It carries which card of
// which group a control sits in, and nothing else. It lives in utils rather than beside FormField so
// an atom can read it without a util importing a component. No provider means a top level field or
// a standalone atom, which is how every one of those keeps its plain `id={name}`.
import { createContext } from "react";

export const EntryFieldContext = createContext<string | undefined>(undefined);

/**
 * The context value for one card: the group and the card's position. Position rather than
 * sharedKey or fieldId, because uniqueId's default pool holds characters such as # and ? that make
 * an id unusable in a selector. The library renders only the active card of a group, so a position
 * cannot collide with itself even though it shifts when an earlier card is removed. Whitespace is
 * collapsed because groupName is consumer text and an id with a space breaks aria-describedby,
 * which reads its value as a list of ids.
 */
export const buildEntryFieldScope = (groupName: string, position: number) =>
  `${groupName.replace(/\s+/g, "-")}-${position}`;
