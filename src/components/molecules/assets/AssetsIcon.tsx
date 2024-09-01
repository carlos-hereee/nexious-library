import { Icon } from "@nxs-atoms";
import type { ButtonProps } from "nxs-button";

export const UpArrow = ({ onClick, active }: ButtonProps) => (
  <button
    className={`btn-arrow up-arrow-container${active ? ` ${active}` : ""}`}
    type="button"
    onClick={() => onClick && onClick()}
    aria-label="up-icon"
  >
    <Icon icon="arrowUp" size="3x" />
  </button>
);
export const DownArrow = ({ onClick, active }: ButtonProps) => (
  <button
    className={`btn-arrow down-arrow-container${active ? ` ${active}` : ""}`}
    type="button"
    onClick={() => onClick && onClick()}
    aria-label="down-icon"
  >
    <Icon icon="arrowDown" size="3x" />
  </button>
);
