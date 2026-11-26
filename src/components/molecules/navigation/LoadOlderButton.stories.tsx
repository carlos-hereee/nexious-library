import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import LoadOlderButton from "./LoadOlderButton";

// LoadOlderButton (2026-11 item 337, Phase 5) pages a transcript backwards. Every string is a
// prop, and the control disappears once there is no more history.
const meta: Meta<typeof LoadOlderButton> = {
  title: "Molecules/LoadOlderButton",
  component: LoadOlderButton,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof LoadOlderButton>;

const LOAD_DELAY_MS = 800;

const Transcript = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [pagesLeft, setPagesLeft] = useState(2);
  const load = () => {
    setIsLoading(true);
    window.setTimeout(() => {
      setIsLoading(false);
      setPagesLeft((left) => left - 1);
    }, LOAD_DELAY_MS);
  };
  return (
    <LoadOlderButton hasMore={pagesLeft > 0} isLoading={isLoading} onLoad={load} label="Load older messages" loadingLabel="Loading" />
  );
};

export const Interactive: Story = {
  render: () => <Transcript />,
};

export const Idle: Story = {
  args: { hasMore: true, isLoading: false, onLoad: () => undefined, label: "Load older messages", loadingLabel: "Loading" },
};

export const Loading: Story = {
  args: { hasMore: true, isLoading: true, onLoad: () => undefined, label: "Load older messages", loadingLabel: "Loading" },
};
