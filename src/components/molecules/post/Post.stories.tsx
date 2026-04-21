import type { Meta, StoryObj } from "@storybook/react";
import Post from "./Post";
import type { PostData } from "nxs-post";

/**
 * Post is the editorial feed card. Title is the anchor, 16:9 thumbnail acts
 * as a clean banner, body supports read more truncation, optional reactions
 * footer. All interaction comes through callback props so the library stays
 * decoupled from the consumer's router and data layer.
 */
const meta: Meta<typeof Post> = {
  title: "Molecules/Post/Post",
  component: Post,
  tags: ["autodocs"],
  argTypes: {
    onView: { action: "view" },
    onLike: { action: "like" },
    onReply: { action: "reply" },
    onRemove: { action: "remove" },
    onAuthorClick: { action: "author-click" },
    onReactionClick: { action: "reaction-click" },
    bodyPreviewLength: { control: { type: "number", min: 60, step: 10 } },
    hideThumbnail: { control: "boolean" },
    showFullBody: { control: "boolean" },
    linkable: { control: "boolean" },
    allowRemoval: { control: "boolean" },
    theme: { control: "text" },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 620, padding: "1rem" }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof Post>;

const samplePost: PostData = {
  postId: "p-001",
  title: "Designing for the reader, not the template",
  body:
    "Line length is a container concern, not an element concern. When we slap a global max width on every paragraph, we break every paragraph that lives in a narrower or wider context. The fix is to put the cap on the container you control, and let the element breathe.",
  thumbnail: "https://images.unsplash.com/photo-1517842645767-c639042777db?w=1200",
  thumbnailAlt: "A reader with an open book",
  href: "/posts/designing-for-the-reader",
  createdBy: {
    uid: "u-001",
    name: "Carlos Hernandez",
    handle: "carlos",
    avatar: "https://i.pravatar.cc/80?img=12",
    href: "/authors/carlos",
  },
  createdAt: "2026-04-21T10:00:00Z",
  commentCount: 4,
  reactions: [
    { name: "like", icon: "heart", count: 42, active: false },
    { name: "clap", icon: "hands", count: 11, active: true },
  ],
  tags: ["design", "typography", "css"],
};

/** Default: thumbnail, byline, truncated body, reactions. */
export const Default: Story = {
  args: {
    post: samplePost,
  },
};

/** No thumbnail variant. Body leads. */
export const NoThumbnail: Story = {
  args: {
    post: { ...samplePost, thumbnail: undefined },
  },
};

/** Title only. Sparse post with no body, no thumbnail. */
export const TitleOnly: Story = {
  args: {
    post: {
      postId: "p-002",
      title: "Heads up: new color tokens landing next release",
      createdBy: { name: "Carlos" },
      createdAt: "2026-04-21T09:00:00Z",
    },
  },
};

/** Full body: no read more truncation. */
export const FullBody: Story = {
  args: {
    post: samplePost,
    showFullBody: true,
  },
};

/** With removal affordance. */
export const WithRemoveButton: Story = {
  args: {
    post: samplePost,
    allowRemoval: true,
  },
};

/** Linkable: entire card acts as a link to post.href. */
export const Linkable: Story = {
  args: {
    post: samplePost,
    linkable: true,
  },
};

/** No reactions: footer hides when the array is empty. */
export const NoReactions: Story = {
  args: {
    post: { ...samplePost, reactions: [] },
  },
};
