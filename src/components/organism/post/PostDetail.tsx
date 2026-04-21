import { Icon } from "@nxs-atoms";
import Hero from "@nxs-molecules/assets/Hero";
import type { PostDetailProps } from "nxs-post";

/**
 * PostDetail
 *
 * Full detail view for a single post. Editorial hierarchy:
 *
 *   [banner thumbnail]
 *   [author + date]
 *   <h1>Title</h1>
 *   <div>Body</div>
 *   <footer>reactions</footer>
 *   [children: comments slot]
 *
 * The comments slot is a children prop. The library does not ship a comment
 * list, because that is business logic tied to the client's data model.
 */
const PostDetail: React.FC<PostDetailProps> = (props) => {
  const { post, theme, allowRemoval, children, onLike, onReply, onRemove, onAuthorClick, onReactionClick } = props;

  const author = post.createdBy;
  const date = post.createdAt || post.updatedAt;
  const dateObj = date ? new Date(date) : null;
  const dateISO = dateObj ? dateObj.toISOString() : undefined;
  const dateLabel = dateObj
    ? dateObj.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })
    : null;

  const wrapperClass = ["post-detail", theme || ""].filter(Boolean).join(" ");

  return (
    <article className={wrapperClass}>
      {post.thumbnail && (
        <figure className="post-detail-figure">
          <Hero hero={{ url: post.thumbnail, alt: post.thumbnailAlt || post.title }} theme="post-detail-thumbnail" />
        </figure>
      )}

      <header className="post-detail-header">
        {author && (
          <div className="post-detail-byline">
            {author.avatar && (
              <Hero hero={{ url: author.avatar, alt: author.name || "author" }} theme="post-detail-avatar" />
            )}
            <div className="post-detail-byline-text">
              {onAuthorClick ? (
                <button
                  type="button"
                  className="post-detail-author post-detail-author-btn"
                  onClick={() => onAuthorClick(author, post)}
                >
                  {author.name || author.handle || "Anonymous"}
                </button>
              ) : author.href ? (
                <a className="post-detail-author" href={author.href}>
                  {author.name || author.handle || "Anonymous"}
                </a>
              ) : (
                <span className="post-detail-author">{author.name || author.handle || "Anonymous"}</span>
              )}
              {dateLabel && dateISO && (
                <time className="post-detail-date" dateTime={dateISO}>
                  {dateLabel}
                </time>
              )}
            </div>
          </div>
        )}

        <h1 className="post-detail-title">{post.title}</h1>
      </header>

      {post.body && <div className="post-detail-body">{post.body}</div>}

      {post.tags && post.tags.length > 0 && (
        <ul className="post-detail-tags" aria-label="Tags">
          {post.tags.map((tag) => (
            <li key={tag} className="post-detail-tag">
              #{tag}
            </li>
          ))}
        </ul>
      )}

      {(post.reactions?.length || onLike || onReply || (allowRemoval && onRemove)) && (
        <footer className="post-detail-footer">
          <div className="post-detail-reactions" role="group" aria-label="Reactions">
            {post.reactions?.map((r) => (
              <button
                key={r.name}
                type="button"
                className={`post-detail-reaction${r.active ? " is-active" : ""}`}
                aria-pressed={!!r.active}
                aria-label={`${r.name}${typeof r.count === "number" ? `, ${r.count}` : ""}`}
                onClick={() => onReactionClick && onReactionClick(r, post)}
              >
                {r.icon && <Icon icon={r.icon} name={r.name} theme="post-detail-reaction-icon" />}
                {typeof r.count === "number" && <span className="post-detail-reaction-count">{r.count}</span>}
              </button>
            ))}
            {onLike && !post.reactions?.some((r) => r.name === "like") && (
              <button type="button" className="post-detail-reaction" aria-label="Like" onClick={() => onLike(post)}>
                <Icon icon="heart" name="like" theme="post-detail-reaction-icon" />
              </button>
            )}
            {onReply && (
              <button
                type="button"
                className="post-detail-reaction"
                aria-label={`Comment${typeof post.commentCount === "number" ? `, ${post.commentCount} comments` : ""}`}
                onClick={() => onReply(post)}
              >
                <Icon icon="comment" name="reply" theme="post-detail-reaction-icon" />
                {typeof post.commentCount === "number" && (
                  <span className="post-detail-reaction-count">{post.commentCount}</span>
                )}
              </button>
            )}
          </div>
          {allowRemoval && onRemove && (
            <button
              type="button"
              className="post-detail-remove"
              aria-label={`Remove post: ${post.title}`}
              onClick={() => onRemove(post)}
            >
              <Icon icon="close" name="remove" theme="post-detail-remove-icon" />
            </button>
          )}
        </footer>
      )}

      {children && <section className="post-detail-comments">{children}</section>}
    </article>
  );
};

export default PostDetail;
