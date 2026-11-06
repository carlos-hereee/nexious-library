// One answer to "what is this control's DOM id", shared by a control, its label and its error node
// so the three cannot disagree.
import { useContext } from "react";
import { EntryFieldContext } from "@nxs-utils/form/entryFieldContext";

/**
 * Hook - useFieldDomId
 *
 * Returns `name` everywhere except inside a repeating group's card, where it returns a scoped id.
 * A card's fields routinely reuse a top level field's name (a section's `title` beside the page's
 * `title`), so `id={name}` alone gave the page two controls with one id and bound both labels to
 * the first. Only the id moves: the `name` attribute stays, because the submit and every consumer
 * lookup read that.
 *
 * Takes an optional name because Label's own `name` prop is optional.
 */
export const useFieldDomId = <Name extends string | undefined>(name: Name) => {
  const scope = useContext(EntryFieldContext);
  return (name && scope ? `${name}-${scope}` : name) as Name;
};
