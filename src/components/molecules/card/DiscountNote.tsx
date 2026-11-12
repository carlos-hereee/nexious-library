// Reuse record: companyuno-growth/product-planning/DESIGNS/reusable-components/discount-note/README.md
// One compact discount line under an order total, ported from nexious-client's features/user/
// components/orders/OrderMemberDiscountNote.tsx (2026-11 item 337, Phase 5). The client built the
// words and the amount from the order through memberDiscountView; that stays with the client,
// which renders this only for an order that carries a discount.

import type { DiscountNoteProps } from "nxs-card";

/**
 * Component: DiscountNote
 *
 * The description, then the amount in the success tone, because it is money the buyer kept.
 */
const DiscountNote = ({ label, amount, className }: DiscountNoteProps) => (
  <span className={className ? `nxs-discount-note ${className}` : "nxs-discount-note"}>
    <span>{label}</span> <span className="nxs-discount-note-amount">{amount}</span>
  </span>
);

export default DiscountNote;
