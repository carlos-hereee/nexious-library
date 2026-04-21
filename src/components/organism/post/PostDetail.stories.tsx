import type { Meta, StoryObj } from "@storybook/react";
import PostDetail from "./PostDetail";
import type { PostData } from "nxs-post";

/**
 * PostDetail is the full reading view of a post. Body is capped at 70ch for
 * proper reading measure. Comments are a consumer slot passed through
 * children, so the library stays decoupled from the consumer's commenting
 * implementation.
 */
const meta: Meta<typeof PostDetail> = {
  title: "Organisms/Post/PostDetail",
  component: PostDetail,
  tags: ["autodocs"],
  argTypes: {
    onLike: { action: "like" },
    onReply: { action: "reply" },
    onRemove: { action: "remove" },
    onAuthorClick: { action: "author-click" },
    onReactionClick: { action: "reaction-click" },
    allowRemoval: { control: "boolean" },
    theme: { control: "text" },
  },
};
export default meta;
type Story = StoryObj<typeof PostDetail>;

const longBody = [
  "Line length is a container concern, not an element concern. When a stylesheet puts a global max width on every paragraph, it breaks every paragraph that lives in a narrower or wider context. A paragraph inside a 300px card, a 720px post detail, a narrow sidebar, a wide hero: they all get the same cap.",
  "The fix is to cap the measure on the container you own, and let the element breathe. Using ch units is the cleanest way to do this, because a ch unit tracks the current font size. Fifty five to seventy five characters per line is the generally accepted readable range.",
  "This also argues against making your base card component set its own max width. A card is a primitive. It should fill the layout slot it was given, and the layout slot should decide how wide that is. If a particular variant of a card has a specific UX reason to cap its width, put the cap on the variant, not on the primitive.",
].join("\n\n");

const detailPost: PostData = {
  postId: "p-001",
  title: "Designing for the reader, not the template",
  body: longBody,
  thumbnail: "https://images.unsplash.com/photo-1517842645767-c639042777db?w=1600",
  thumbnailAlt: "A reader with an open book",
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

/** Default: hero thumbnail, byline, body capped at 70ch, reactions. */
export const Default: Story = {
  args: {
    post: detailPost,
  },
};

/** With consumer comments slot. Children is rendered after the body. */
export const WithComments: Story = {
  args: {
    post: detailPost,
    children: (
      <section aria-label="Comments">
        <h2>Comments</h2>
        <p>A consumer supplied comment list component would render here.</p>
        <p>Post detail stays decoupled from your commenting implementation.</p>
      </section>
    ),
  },
};

/** Minimal post: title only. */
export const Minimal: Story = {
  args: {
    post: {
      postId: "p-min",
      title: "A short note",
      body: "Not every post needs a thumbnail, tags, or reactions.",
      createdBy: { name: "Carlos" },
      createdAt: "2026-04-21T10:00:00Z",
    },
  },
};
