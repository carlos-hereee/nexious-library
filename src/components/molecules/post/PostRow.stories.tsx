import type { Meta, StoryObj } from "@storybook/react";
import PostRow from "./PostRow";
import type { PostData } from "nxs-post";

/**
 * PostRow is the compact list row variant of Post. The selection affordance
 * and the remove affordance are siblings, not nested, so interactive
 * elements are never inside another interactive element.
 */
const meta: Meta<typeof PostRow> = {
  title: "Molecules/Post/PostRow",
  component: PostRow,
  tags: ["autodocs"],
  argTypes: {
    onView: { action: "view" },
    onRemove: { action: "remove" },
    onAuthorClick: { action: "author-click" },
    allowRemoval: { control: "boolean" },
    theme: { control: "text" },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 720, padding: "1rem" }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof PostRow>;

const rowPost: PostData = {
  postId: "r-001",
  title: "Designing for the reader, not the template",
  body: "Line length is a container concern, not an element concern...",
  thumbnail: "https://images.unsplash.com/photo-1517842645767-c639042777db?w=200",
  thumbnailAlt: "A reader with an open book",
  href: "/posts/designing-for-the-reader",
  createdBy: { name: "Carlos Hernandez", handle: "carlos" },
  createdAt: "2026-04-21T10:00:00Z",
};

/** Default: thumbnail, title, byline. */
export const Default: Story = {
  args: {
    post: rowPost,
  },
};

/** No thumbnail: row collapses cleanly. */
export const NoThumbnail: Story = {
  args: {
    post: { ...rowPost, thumbnail: undefined },
  },
};

/** With remove affordance. */
export const WithRemove: Story = {
  args: {
    post: rowPost,
    allowRemoval: true,
  },
};

/** Stack of rows: common usage pattern. */
export const StackOfRows: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
      {[1, 2, 3, 4].map((i) => (
        <PostRow
          key={i}
          post={{
            ...rowPost,
            postId: `r-00${i}`,
            title: `Post ${i}: ${rowPost.title}`,
          }}
          allowRemoval
        />
      ))}
    </div>
  ),
};
