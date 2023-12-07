import { Icon } from "@nxs-atoms";
import type { ButtonProps } from "nxs-button";

export const UpArrow = ({ onClick }: ButtonProps) => (
  <button
    aria-label="up-icon"
    type="button"
    onClick={onClick}
    className="btn-icon btn-arrow up-arrow-container"
  >
    <Icon icon="arrowUp" size="3x" />
  </button>
);
export const DownArrow = ({ onClick }: ButtonProps) => (
  <button
    type="button"
    onClick={onClick}
    className="btn-icon btn-arrow down-arrow-container"
    aria-label="down-icon"
  >
    <Icon icon="arrowDown" size="3x" />
  </button>
);
