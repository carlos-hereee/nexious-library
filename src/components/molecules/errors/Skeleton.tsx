import type { SkeletonProps } from "nxs-errors";

// A page placeholder is a header bar plus body text. With a single line under the header it
// reads as one odd row rather than as a page that is loading, so "page" alone means three.
const DEFAULT_PAGE_LINES = 3;

/**
 * Component - Skeleton
 *
 * The placeholder a region shows while its content is in flight (design language 5.10). It
 * draws bars shaped like the content that is coming and reserves that height, which is the
 * whole reason it exists instead of a centered spinner: a spinner occupies no space, so the
 * page jumps the moment the data lands.
 *
 * Accessibility: a skeleton is not content. Every bar is aria-hidden and the region carries a
 * single role="status" with a name, so a screen reader announces "loading" once rather than
 * reading N empty boxes. aria-busy marks the region as still filling in.
 */
const Skeleton: React.FC<SkeletonProps> = (props) => {
  const { shape = "row", count, className, label } = props;

  // Clamped to at least one: count={0} would render an empty status region, which announces
  // "loading" and then reserves no space, the two things this component exists to prevent.
  const requested = count ?? (shape === "page" ? DEFAULT_PAGE_LINES : 1);
  const lines = Math.max(1, Math.floor(requested));

  const regionClass = className ? `skeleton skeleton-${shape} ${className}` : `skeleton skeleton-${shape}`;

  return (
    <div className={regionClass} role="status" aria-busy="true" aria-label={label || "Loading"}>
      {shape === "page" && <span className="skeleton-bar skeleton-bar-header" aria-hidden="true" />}
      {Array.from({ length: lines }, (_, index) => (
        // An index key is safe here and nowhere else in the library: these bars are identical,
        // stateless and never reordered, so there is no identity for a stable key to preserve.
        <span className="skeleton-bar" key={`${shape}-bar-${index}`} aria-hidden="true" />
      ))}
    </div>
  );
};

export default Skeleton;
