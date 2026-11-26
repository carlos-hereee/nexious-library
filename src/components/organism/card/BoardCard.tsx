// Reuse record: companyuno-growth/product-planning/DESIGNS/reusable-components/board-card/README.md
// One card on a kanban board, on Card's nxs-card recipe (2026-11 item 337). Ported from the four
// board cards nexious-client renders (TaskCard, OrderBoardCard, JobPipelineBoard's card and
// TicketCard), which all share one shape: an opener in the title, facts and pills, and a Move to
// select. It does NOT drag: the caller wraps it in its own draggable element and keeps every drag
// handler, ref and focus target, because each board's drop rules and rollback differ.
import { useId } from "react";
import Select from "@nxs-molecules/forms/Select";
import Card from "@nxs-organism/card/Card";
import type { BoardCardMoveOption, BoardCardProps } from "nxs-card";
import type { OptionProps } from "nxs-form";

/** The menu's rows: every option but the column the card already sits in. */
const moveTargets = (options: BoardCardMoveOption[], currentColumn?: string): OptionProps[] =>
  options
    .filter((option) => option.value !== currentColumn)
    .map((option) => ({ name: option.value, value: option.value, label: option.label, uid: option.value }));

/**
 * Component: BoardCard
 *
 * Renders Card with the title as its heading, then the meta, the badges and the children in the
 * body, and the Move to select in the footer. The select is Select in value mode pinned to "", so
 * it reads as an action rather than as a field repeating the column the header already names, and
 * every choice fires `onMove` with that column's value. With one column, or no `onMove`, it is left
 * out rather than rendered empty.
 */
const BoardCard: React.FC<BoardCardProps> = (props) => {
  const { title, meta, badges, children, moveOptions = [], currentColumn, onMove, moveLabel } = props;
  const { id, headingLevel, isDragging, isSelected, as, className } = props;
  const generatedId = useId();
  const targets = moveTargets(moveOptions, currentColumn);
  const hasMove = Boolean(onMove) && Boolean(moveLabel) && targets.length > 0;
  const rootClass = ["nxs-board-card", isDragging ? "nxs-board-card-dragging" : "", className ?? ""]
    .filter(Boolean)
    .join(" ");

  const moveControl = hasMove ? (
    <div className="nxs-board-card-move">
      <Select
        name={`${id ?? generatedId}-move`}
        list={targets}
        value=""
        label={moveLabel}
        hideLabels
        placeholder={moveLabel}
        onChange={(next) => {
          if (next) onMove?.(next);
        }}
      />
    </div>
  ) : null;

  return (
    <Card
      title={title}
      headingLevel={headingLevel}
      isSelected={isSelected}
      as={as}
      className={rootClass}
      footer={moveControl}
    >
      {meta || badges || children ? (
        <>
          {meta ? <div className="nxs-board-card-meta">{meta}</div> : null}
          {badges ? <div className="nxs-board-card-badges">{badges}</div> : null}
          {children}
        </>
      ) : null}
    </Card>
  );
};

export default BoardCard;
