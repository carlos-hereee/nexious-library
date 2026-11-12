import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Pager from "./Pager";

// Pager (2026-11 item 337, Phase 5): previous and next under a paged list with a polite status.
// Every string is a prop. LoadOlderButton has its own stories in LoadOlderButton.stories.tsx.
const meta: Meta<typeof Pager> = {
  title: "Molecules/Pager",
  component: Pager,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Pager>;

const PagedList = () => {
  const [page, setPage] = useState(2);
  return (
    <Pager
      page={page}
      totalPages={5}
      onPage={setPage}
      ariaLabel="Orders pages"
      previousLabel="Previous"
      nextLabel="Next"
      formatStatus={(current, total) => `Page ${current} of ${total}`}
    />
  );
};

export const PreviousAndNext: Story = {
  render: () => <PagedList />,
};
