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

const fruits = ["Apple", "Apricot", "Banana", "Cherry", "Kiwi"];

const WithResultCount = () => {
  const [value, setValue] = useState("");
  const matches = fruits.filter((fruit) => fruit.toLowerCase().includes(value.toLowerCase()));
  return (
    <>
      <SearchBar
        name="story-fruit-search"
        label="Search fruit"
        placeholder="Search fruit"
        value={value}
        onChange={setValue}
        resultCount={matches.length}
      />
      <ul>
        {matches.map((fruit) => (
          <li key={fruit}>{fruit}</li>
        ))}
      </ul>
    </>
  );
};

/**
 * `resultCount` announces how many results are left in a polite status region (2026-11 item 337).
 * The default sentence is English; pass `formatResultCount` to localize it. SearchBar renders
 * `nxs-search` and `nxs-search-input` beside any `className` and `inputClassName`.
 */
export const ResultCount: Story = { render: () => <WithResultCount /> };
