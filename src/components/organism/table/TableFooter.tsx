import type { TableFooterProps } from "custom-props";

/**
 * Component: TableFooter
 *
 * The tfoot for a Table's totals or notes. It takes the caller's own tr elements as children,
 * because a footer row rarely matches the body's columns (a label spanning three, a total in one).
 */
const TableFooter = ({ className, children }: TableFooterProps) => (
  <tfoot className={className ? `nxs-table-footer ${className}` : "nxs-table-footer"}>{children}</tfoot>
);
export default TableFooter;
