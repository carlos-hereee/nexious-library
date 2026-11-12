// The attention badge lookup SectionedRail, MobileTabBar and MoreSheet share (2026-11 item 337).
// The badge itself stays the consumer's (the client's TabPingBadge reads platform severity and cap
// constants), so the library only decides WHETHER an item has one and hands it to the slot.
import type { NavItem, NavPingProps } from "nxs-navigation";

/**
 * The caller's badge node for one item, or null. An item with no entry in `pings` gets nothing,
 * never a zero: a map that is partial by design means absence is the quiet state.
 */
export const renderNavPing = <TPing>({ pings, renderPing }: NavPingProps<TPing>, item: NavItem): React.ReactNode => {
  const ping = pings?.[item.id];
  if (ping === undefined || !renderPing) return null;
  return renderPing(ping, item);
};
