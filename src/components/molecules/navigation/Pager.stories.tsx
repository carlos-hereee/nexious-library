import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Pager from "./Pager";
import LoadOlderButton from "./LoadOlderButton";

// The paging controls (2026-11 item 337, Phase 5). Pager is previous and next under a paged list
// with a polite status; LoadOlderButton pages a transcript backwards. Every string is a prop.
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

const Transcript = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [pagesLeft, setPagesLeft] = useState(2);
  const load = () => {
    setIsLoading(true);
    window.setTimeout(() => {
      setIsLoading(false);
      setPagesLeft((left) => left - 1);
    }, 800);
  };
  return (
    <LoadOlderButton hasMore={pagesLeft > 0} isLoading={isLoading} onLoad={load} label="Load older messages" loadingLabel="Loading" />
  );
};

export const LoadOlder: Story = {
  render: () => <Transcript />,
};
