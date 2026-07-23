import { useEffect, useMemo } from "react";
import { Hero } from "@nxs-molecules";
import type { EntryThumbnailRailProps } from "nxs-form";
import { urlFile } from "@nxs-utils/data/urlFile";

/**
 * EntryThumbnailRail
 *
 * The entry switcher for a file-only entry group (the merch catalog). A numbered strip can only
 * say "slot 4", which is useless once four images are uploaded: the uploader has to click through
 * every slot to find the one they meant. This paints the real uploads instead. The active slot is
 * the large preview beside the rail; every other slot stays visible but dimmed, so it reads as
 * "not the one you are editing" and switching back to an earlier image is an obvious, reversible
 * move rather than a guess.
 *
 * Slots with no upload yet fall back to their index, which is exactly the old numbered affordance,
 * so an empty group looks and behaves the way it always did.
 */
const EntryThumbnailRail: React.FC<EntryThumbnailRailProps> = (props) => {
  const { entries, activeEntry, max, isDisabled, railLabel, onSelect } = props;
  const entryKeys = Object.keys(entries);

  // One src per slot. urlFile passes an already-uploaded url straight through and mints a blob:
  // url for a freshly picked File, so this covers both create (File) and edit (S3 url) flows.
  const thumbnails = useMemo(
    () =>
      Object.keys(entries).map((key) => {
        const upload = entries[key].find(
          (field) => field.value instanceof File || (typeof field.value === "string" && field.value.length > 0)
        );
        return upload ? urlFile(upload.value as File | string) : "";
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
    <div className="entry-rail">
      <div className="entry-rail-tiles" role="group" aria-label={railLabel || "Uploaded images"}>
        {entryKeys.map((key, idx) => {
          const isActive = key === activeEntry;
          const url = thumbnails[idx];
          const position = `Image ${idx + 1} of ${entryKeys.length}`;
          const description = url ? position : `${position}, empty`;
          return (
            <button
              key={key}
              type="button"
              className={isActive ? "entry-rail-tile entry-rail-tile-active" : "entry-rail-tile"}
              aria-pressed={isActive}
              aria-label={description}
              title={description}
              disabled={isDisabled}
              onClick={() => onSelect(key)}
            >
              {url ? (
                <Hero hero={{ url, alt: position }} theme="entry-rail-thumb" />
              ) : (
                <span className="entry-rail-placeholder">{idx + 1}</span>
              )}
            </button>
          );
        })}
      </div>
      {max && max > 0 && (
        <p className="entry-rail-count">
          {entryKeys.length} of {max}
        </p>
      )}
    </div>
  );
};

export default EntryThumbnailRail;
