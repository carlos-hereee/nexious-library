import { Icon } from "@nxs-atoms";
import Hero from "@nxs-molecules/assets/Hero";
import type { PostRowProps } from "nxs-post";

/**
 * PostRow
 *
 * Dense list row for admin or secondary lists. Layout:
 *
 *  [thumbnail] [title + byline] [meta] [remove button]
 *
 * Accessibility notes:
 *  - The row is wrapped in a single <button> so the whole row selects the
 *    post. The remove button is a SIBLING, not nested inside the row button,
 *    because nesting interactive elements is invalid HTML and the current
 *    client code has this bug. The library fixes it.
 *  - The remove button has an explicit aria-label that includes the post
 *    title so screen reader users know what they are deleting.
 */
const PostRow: React.FC<PostRowProps> = (props) => {
  const { post, theme, allowRemoval, onView, onRemove, onAuthorClick } = props;

  const wrapperClass = ["post-row", theme || ""].filter(Boolean).join(" ");
  const author = post.createdBy;
  const date = post.createdAt || post.updatedAt;
  const dateObj = date ? new Date(date) : null;

  const handleActivate = () => {
    if (onView) onView(post);
  };

  return (
    <div className={wrapperClass}>
      <button
        type="button"
        className="post-row-select"
        aria-label={`Open post: ${post.title}`}
        onClick={handleActivate}
      >
        {post.thumbnail && (
          <Hero
            hero={{ url: post.thumbnail, alt: post.thumbnailAlt || post.title }}
            theme="post-row-thumbnail"
          />
        )}
        <span className="post-row-content">
          <span className="post-row-title">{post.title}</span>
          {(author || dateObj) && (
            <span className="post-row-meta">
              {author && <span className="post-row-author">{author.name || author.handle || "Anonymous"}</span>}
              {dateObj && (
                <time className="post-row-date" dateTime={dateObj.toISOString()}>
                  {dateObj.toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                </time>
              )}
            </span>
          )}
          {post.body && <span className="post-row-preview">{post.body.slice(0, 140)}</span>}
        </span>
      </button>

      {/* Sibling author click target when onAuthorClick is provided AND author exists.
          Rendered as a visually subtle overlay button so row click still dominates. */}
      {onAuthorClick && author && (
        <button
          type="button"
          className="post-row-author-btn sr-only"
          onClick={() => onAuthorClick(author, post)}
        >
          View author {author.name || author.handle}
        </button>
      )}

      {allowRemoval && onRemove && (
        <button
          type="button"
          className="post-row-remove"
          aria-label={`Remove post: ${post.title}`}
          onClick={() => onRemove(post)}
        >
          <Icon icon="close" name="remove" theme="post-row-remove-icon" />
        </button>
      )}
    </div>
  );
};

export default PostRow;
