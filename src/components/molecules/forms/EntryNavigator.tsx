import { useEffect, useMemo } from "react";
import { Hero } from "@nxs-molecules";
import type { EntryNavigatorProps } from "nxs-form";
import { urlFile } from "@nxs-utils/data/urlFile";

/**
 * EntryNavigator
 *
 * The one entry switcher, generalized from the file-only EntryThumbnailRail it replaces.
 *
 * There used to be two. A file-only group (the merch catalog) got a rail of real thumbnails,
 * which works: you click the image you meant. Every other group (recurring store hours is the
 * live example) got a row of numbered boxes, which does not, because "slot 4" tells you nothing
 * once four things exist. Worse, the numbered strip rendered `entry.max` boxes up front and
 * disabled the ones past the end, so a max of ten showed eight dead boxes before the user had
 * done anything.
 *
 * The fix is not a third switcher, it is to notice that both were trying to answer one question,
 * "which of these is this?", and that the answer is already sitting in the data. A slot holding
 * an upload shows the upload. A slot holding "Tuesday" shows Tuesday. Only a slot holding
 * nothing identifiable falls back to its index, which is the old behavior kept as a last resort
 * rather than a default.
 */
const EntryNavigator: React.FC<EntryNavigatorProps> = (props) => {
  const { entries, activeEntry, max, isDisabled, railLabel, itemNoun, orientation, getTileLabel, onSelect } = props;
  const entryKeys = Object.keys(entries);
  const noun = itemNoun || "Item";

  // One src per slot. urlFile passes an already-uploaded url straight through and mints a blob:
  // url for a freshly picked File, so this covers both create (File) and edit (S3 url) flows.
  const thumbnails = useMemo(
    () =>
      Object.keys(entries).map((key) => {
        const upload = entries[key].find(
          (field) => field.value instanceof File || (typeof field.value === "string" && field.value.length > 0)
        );
        // Only a File or a url is a thumbnail. A plain text value that happens to be first in
        // the group is a LABEL, and treating it as an image src would render a broken tile.
        if (!upload) return "";
        if (upload.value instanceof File) return urlFile(upload.value);
        return upload.type === "file" ? urlFile(upload.value as string) : "";
      }),
    [entries]
  );

  // The text a tile shows when it has no thumbnail: the slot's own first non-empty, non-file
  // value. For recurring store hours slot two showing "Tuesday" is the entire point, and that
  // string is already in entries[key] as a field value, so nothing has to be plumbed in.
  const derivedLabels = useMemo(
    () =>
      Object.keys(entries).map((key) => {
        const named = entries[key].find(
          (field) =>
            field.type !== "file" &&
            !(field.value instanceof File) &&
            typeof field.value !== "boolean" &&
            `${field.value ?? ""}`.trim().length > 0
        );
        return named ? `${named.value}`.trim() : "";
      }),
    [entries]
  );

  useEffect(() => {
    // A blob: url pins the whole image in memory for the life of the document. Ten catalog slots
    // re-picked a few times is real memory, and this component remounts on every dialog open, so
    // revoke on teardown. React commits the new src before running this cleanup, so no live <img>
    // is ever pointed at a revoked url. Plain string urls are not ours to revoke.
    return () => {
      thumbnails.forEach((url) => {
        if (url.startsWith("blob:")) URL.revokeObjectURL(url);
      });
    };
  }, [thumbnails]);

  return (
    <div className={orientation === "strip" ? "entry-rail entry-rail-strip" : "entry-rail"}>
      <div className="entry-rail-tiles" role="group" aria-label={railLabel || `${noun} list`}>
        {entryKeys.map((key, idx) => {
          const isActive = key === activeEntry;
          const url = thumbnails[idx];
          // Resolution order, first hit wins: thumbnail, then the slot's own derived label, then
          // a consumer override, then the index. The index is the floor, not the default.
          const derived = derivedLabels[idx];
          const custom = getTileLabel ? getTileLabel(key, idx) : "";
          const tileText = derived || custom || `${idx + 1}`;
          const position = `${noun} ${idx + 1} of ${entryKeys.length}`;
          // The accessible name says WHAT the tile is when the data can say it, and falls back to
          // bare position when it cannot, so a screen reader user gets the same information a
          // sighted user gets from the thumbnail or the day name.
          const identity = url
            ? position
            : derived || custom
            ? `${position}, ${derived || custom}`
            : `${position}, empty`;
          return (
            <button
              key={key}
              type="button"
              className={isActive ? "entry-rail-tile entry-rail-tile-active" : "entry-rail-tile"}
              aria-pressed={isActive}
              aria-label={identity}
              title={identity}
              disabled={isDisabled}
              onClick={() => onSelect(key)}
            >
              {url ? (
                <Hero hero={{ url, alt: position }} className="entry-rail-thumb" />
              ) : (
                <span className="entry-rail-placeholder">{tileText}</span>
              )}
            </button>
          );
        })}
      </div>
      {max && max > 0 && (
        // Remaining capacity used to be shown as a row of dead disabled boxes. This line says the
        // same thing in one place, and the add button beside the group is the way to use it.
        <p className="entry-rail-count">
          {entryKeys.length} of {max}
        </p>
      )}
    </div>
  );
};

export default EntryNavigator;
