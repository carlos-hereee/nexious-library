import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import SearchBar from "./SearchBar";

const meta: Meta<typeof SearchBar> = {
  title: "Molecules/SearchBar",
  component: SearchBar,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SearchBar>;

const WithCommittedValue = () => {
  const [value, setValue] = useState("");
  return (
    <>
      <SearchBar name="story-search" label="Search tickets" placeholder="Search tickets" value={value} onChange={setValue} />
      <p>Committed value: {value}</p>
    </>
  );
};

export const Default: Story = { render: () => <WithCommittedValue /> };
