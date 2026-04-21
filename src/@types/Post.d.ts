declare module "nxs-post" {
  import type { ReactNode } from "react";

  /**
   * PostAuthor is the subset of a user profile that Post components need.
   * Intentionally minimal so consumers do not have to adapt a full User type.
   */
  export interface PostAuthor {
    uid?: string;
    name?: string;
    handle?: string;
    avatar?: string;
    href?: string;
  }

  /**
   * PostReaction describes a single reaction type and count. Reactions are
   * optional on any post; pass an empty array to hide the reactions footer.
   */
  export interface PostReaction {
    name: string;
    icon?: string;
    count?: number;
    active?: boolean;
  }

  /**
   * PostData is the minimum the library needs to render a post. Consumers
   * adapt their domain type to this shape before passing in. Everything
   * except an identifier and a title is optional.
   */
  export interface PostData {
    uid?: string;
    postId: string;
    title: string;
    body?: string;
    thumbnail?: string;
    thumbnailAlt?: string;
    href?: string;
    createdBy?: PostAuthor;
    createdAt?: string | Date;
    updatedAt?: string | Date;
    commentCount?: number;
    reactions?: PostReaction[];
    tags?: string[];
  }

  /** Shared callback set. All are optional; components hide controls when omitted. */
  export interface PostCallbacks {
    onView?: (post: PostData) => void;
    onLike?: (post: PostData) => void;
    onReply?: (post: PostData) => void;
    onRemove?: (post: PostData) => void;
    onAuthorClick?: (author: PostAuthor, post: PostData) => void;
    onReactionClick?: (reaction: PostReaction, post: PostData) => void;
  }

  /** Feed card variant (most prominent). */
  export interface PostProps extends PostCallbacks {
    post: PostData;
    theme?: string;
    /** Truncate body preview to this many characters (default 280). */
    bodyPreviewLength?: number;
    /** When true, show the full body. Use this in PostDetail. */
    showFullBody?: boolean;
    /** When true, hide the thumbnail even if present. */
    hideThumbnail?: boolean;
    /** When true, renders the whole card as a link (uses post.href). */
    linkable?: boolean;
    allowRemoval?: boolean;
  }

  /** Compact list row variant. */
  export interface PostRowProps extends PostCallbacks {
    post: PostData;
    theme?: string;
    allowRemoval?: boolean;
  }

  /** Full detail variant. */
  export interface PostDetailProps extends PostCallbacks {
    post: PostData;
    theme?: string;
    /** Optional comments slot; client passes its own comment list component. */
    children?: ReactNode;
    allowRemoval?: boolean;
  }
}
