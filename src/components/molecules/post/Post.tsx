import { Icon } from "@nxs-atoms";
import Hero from "@nxs-molecules/assets/Hero";
import type { PostProps } from "nxs-post";

/**
 * Post (feed card)
 *
 * Editorial feed card. Semantic order:
 *
 *  <article class="post-card">
 *    <header> author byline </header>
 *    <a class="post-title"> title </a>
 *    <figure> thumbnail </figure>
 *    <p class="post-body"> body preview </p>
 *    <footer> tags, reactions, actions </footer>
 *  </article>
 *
 * Design goals:
 *  - Typography first. Title is the loudest element; avatar and meta stay small.
 *  - Thumbnail is a banner below the title so the title is read first.
 *  - All controls are keyboard and screen reader accessible. The whole card
 *    can be linkable via post.href while individual controls (like, reply,
 *    author, remove) stay clickable without triggering navigation.
 *  - Pure presentation. Every action is a callback prop; the library never
 *    reaches into router or context.
 */
const Post: React.FC<PostProps> = (props) => {
  const {
    post,
    theme,
    bodyPreviewLength = 280,
    showFullBody,
    hideThumbnail,
    linkable,
    allowRemoval,
    onView,
    onLike,
    onReply,
    onRemove,
    onAuthorClick,
    onReactionClick,
  } = props;

  const author = post.createdBy;
  const date = post.createdAt || post.updatedAt;
  const dateObj = date ? new Date(date) : null;
  const dateISO = dateObj ? dateObj.toISOString() : undefined;
  const dateLabel = dateObj
    ? dateObj.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })
    : null;

  const rawBody = post.body || "";
  const needsTruncation = !showFullBody && rawBody.length > bodyPreviewLength;
  const body = needsTruncation ? `${rawBody.slice(0, bodyPreviewLength).trimEnd()}...` : rawBody;

  const wrapperClass = ["post-card", theme || ""].filter(Boolean).join(" ");

  const handleCardActivate = () => {
    if (onView) onView(post);
  };

  return (
    <article className={wrapperClass}>
      {/* Author strip */}
      {(author || dateLabel) && (
        <header className="post-card-header">
          {author && (
            <div className="post-card-byline">
              {author.avatar && (
                <Hero
                  hero={{ url: author.avatar, alt: author.name || "author" }}
                  theme="post-card-avatar"
                />
              )}
              {onAuthorClick ? (
                <button
                  type="button"
                  className="post-card-author post-card-author-btn"
                  onClick={() => onAuthorClick(author, post)}
                >
                  {author.name || author.handle || "Anonymous"}
                </button>
              ) : author.href ? (
                <a className="post-card-author" href={author.href}>
                  {author.name || author.handle || "Anonymous"}
                </a>
              ) : (
                <span className="post-card-author">{author.name || author.handle || "Anonymous"}</span>
              )}
              {author.handle && <span className="post-card-handle">@{author.handle}</span>}
            </div>
          )}
          {dateLabel && dateISO && (
            <time className="post-card-date" dateTime={dateISO}>
              {dateLabel}
            </time>
          )}
        </header>
      )}

      {/* Title */}
      {linkable && post.href ? (
        <a className="post-card-title" href={post.href} onClick={handleCardActivate}>
          <h2 className="post-card-title-text">{post.title}</h2>
        </a>
      ) : onView ? (
        <button type="button" className="post-card-title post-card-title-btn" onClick={handleCardActivate}>
          <h2 className="post-card-title-text">{post.title}</h2>
        </button>
      ) : (
        <h2 className="post-card-title-text">{post.title}</h2>
      )}

      {/* Thumbnail */}
      {!hideThumbnail && post.thumbnail && (
        <figure className="post-card-figure">
          <Hero
            hero={{ url: post.thumbnail, alt: post.thumbnailAlt || post.title }}
            theme="post-card-thumbnail"
          />
        </figure>
      )}

      {/* Body */}
      {body && (
        <p className="post-card-body">
          {body}
          {needsTruncation && onView && (
            <button type="button" className="post-card-readmore" onClick={handleCardActivate}>
              Read more
            </button>
          )}
        </p>
      )}

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <ul className="post-card-tags" aria-label="Tags">
          {post.tags.map((tag) => (
            <li key={tag} className="post-card-tag">
              #{tag}
            </li>
          ))}
        </ul>
      )}

      {/* Footer: reactions + actions */}
      {(post.reactions?.length || onLike || onReply || (allowRemoval && onRemove)) && (
        <footer className="post-card-footer">
          <div className="post-card-reactions" role="group" aria-label="Reactions">
            {post.reactions?.map((r) => (
              <button
                key={r.name}
                type="button"
                className={`post-card-reaction${r.active ? " is-active" : ""}`}
                aria-pressed={!!r.active}
                aria-label={`${r.name}${typeof r.count === "number" ? `, ${r.count}` : ""}`}
                onClick={() => onReactionClick && onReactionClick(r, post)}
              >
                {r.icon && <Icon icon={r.icon} name={r.name} theme="post-card-reaction-icon" />}
                {typeof r.count === "number" && <span className="post-card-reaction-count">{r.count}</span>}
              </button>
            ))}
            {onLike && !post.reactions?.some((r) => r.name === "like") && (
              <button
                type="button"
                className="post-card-reaction"
                aria-label="Like"
                onClick={() => onLike(post)}
              >
                <Icon icon="heart" name="like" theme="post-card-reaction-icon" />
              </button>
            )}
            {onReply && (
              <button
                type="button"
                className="post-card-reaction"
                aria-label={`Comment${typeof post.commentCount === "number" ? `, ${post.commentCount} comments` : ""}`}
                onClick={() => onReply(post)}
              >
                <Icon icon="comment" name="reply" theme="post-card-reaction-icon" />
                {typeof post.commentCount === "number" && (
                  <span className="post-card-reaction-count">{post.commentCount}</span>
                )}
              </button>
            )}
          </div>
          {allowRemoval && onRemove && (
            <button
              type="button"
              className="post-card-remove"
              aria-label={`Remove post: ${post.title}`}
              onClick={() => onRemove(post)}
            >
              <Icon icon="close" name="remove" theme="post-card-remove-icon" />
            </button>
          )}
        </footer>
      )}
    </article>
  );
};

export default Post;
