import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import BoardCard from "./BoardCard";

// BoardCard (2026-11 item 337). Every string is passed in, as a consumer would. The Board story
// shows the caller owning the drag: each card sits in its own draggable li, and the Move to select
// is the keyboard and touch path that does the same move.
const meta: Meta<typeof BoardCard> = {
  title: "Organism/BoardCard",
  component: BoardCard,
  tags: ["autodocs"],
  argTypes: {
    headingLevel: { control: "select", options: [2, 3, 4, 5, 6] },
    isDragging: { control: "boolean" },
    isSelected: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof BoardCard>;

const COLUMNS = [
  { value: "todo", label: "To do" },
  { value: "doing", label: "Doing" },
  { value: "done", label: "Done" },
];

export const Default: Story = {
  args: {
    id: "story-task",
    title: (
      <button type="button" className="nxs-card-link">
        Write the launch brief
      </button>
    ),
    meta: <span>Due Nov 14</span>,
    badges: <span>High</span>,
    children: <p>Two paragraphs and a hero image.</p>,
    moveOptions: COLUMNS,
    currentColumn: "todo",
    moveLabel: "Move to",
    onMove: () => {},
  },
};

export const Dragging: Story = {
  args: { ...Default.args, isDragging: true },
};

// A board with one column has nowhere to move, so the select is left out.
export const OneColumn: Story = {
  args: { ...Default.args, moveOptions: [COLUMNS[0]] },
};

const BoardDemo = () => {
  const [placed, setPlaced] = useState<Record<string, string>>({ brief: "todo", hero: "doing", copy: "done" });
  const [dragging, setDragging] = useState("");
  const names: Record<string, string> = { brief: "Write the brief", hero: "Pick a hero image", copy: "Proof the copy" };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "var(--space-medium)" }}>
      {COLUMNS.map((column) => (
        <section
          key={column.value}
          aria-label={column.label}
          onDragOver={(event) => event.preventDefault()}
          onDrop={() => {
            if (dragging) setPlaced((prev) => ({ ...prev, [dragging]: column.value }));
            setDragging("");
          }}
        >
          <h3>{column.label}</h3>
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: "var(--space-small)" }}>
            {Object.keys(placed)
              .filter((key) => placed[key] === column.value)
              .map((key) => (
                <li key={key} draggable onDragStart={() => setDragging(key)} onDragEnd={() => setDragging("")}>
                  <BoardCard
                    id={`story-${key}`}
                    headingLevel={4}
                    title={names[key]}
                    isDragging={dragging === key}
                    moveOptions={COLUMNS}
                    currentColumn={column.value}
                    moveLabel="Move to"
                    onMove={(next) => setPlaced((prev) => ({ ...prev, [key]: next }))}
                  />
                </li>
              ))}
          </ul>
        </section>
      ))}
    </div>
  );
};

export const Board: Story = {
  render: () => <BoardDemo />,
};
