// components
export { default as Navbar } from "@nxs-organism/navigation/Navbar";
export { default as Navigation } from "@nxs-organism/navigation/Navigation";
export { default as FormNavigation } from "@nxs-organism/navigation/FormNavigation";
export type { NavigationProps, NavbarProps, FormNavigationProps } from "nxs-navigation";
// the sectioned rail and the compact viewport's tab bar and More sheet (2026-11 item 337)
export { default as SectionedRail } from "@nxs-organism/navigation/SectionedRail";
export { default as MobileTabBar } from "@nxs-organism/navigation/MobileTabBar";
export { default as MoreSheet } from "@nxs-organism/navigation/MoreSheet";
export type { SectionedRailProps, MobileTabBarProps, MobileTabBarMore, MoreSheetProps } from "nxs-navigation";
// table (2026-11 item 337): the columns and rows Table, and its parts for a caller composing its own
export { default as Table } from "@nxs-organism/table/Table";
export { default as TableHeader } from "@nxs-organism/table/TableHeader";
export { default as TableBody } from "@nxs-organism/table/TableBody";
export { default as TableFooter } from "@nxs-organism/table/TableFooter";
export type {
  TableProps,
  TableColumn,
  TableRowData,
  TableSortDirection,
  TableAlign,
  TableHeaderProps,
  TableBodyProps,
  TableFooterProps,
} from "custom-props";
export { default as NavList } from "@nxs-organism/lists/NavList";
export { default as SectionList } from "@nxs-organism/lists/SectionList";

// export background compentent styles
export { default as Bubbly } from "@nxs-organism/styles/Bubbly";
// TODO: Potential template
export { default as Total } from "@nxs-organism/checkout/Total";
export { default as Socials } from "@nxs-template/Socials";

// card
export { default as Card } from "@nxs-organism/card/Card";
export { default as Banner } from "@nxs-organism/card/Banner";
export { default as MerchCard } from "@nxs-organism/card/MerchCard";
export { default as UserCard } from "@nxs-organism/card/UserCard";
export { default as HeroCard } from "@nxs-organism/card/HeroCard";
export { default as CardSection } from "@nxs-organism/card/CardSection";
export { default as CardTextBubble } from "@nxs-organism/card/CardTextBubble";
export { default as SettingsCard } from "@nxs-organism/card/SettingsCard";
export { default as ConfirmDialog } from "@nxs-organism/card/ConfirmDialog";
export { default as BoardCard } from "@nxs-organism/card/BoardCard";
export { default as EventCard } from "@nxs-organism/card/EventCard";

// timer
export { default as CountDown } from "@nxs-organism/timer/CountDown";

export type {
  HeroCardProps,
  UserCardProps,
  CardProps,
  CardContentProps,
  CardSectionProps,
  DialogProps,
  BannerProps,
  BoardCardProps,
  BoardCardMoveOption,
  EventCardProps,
  EventCardEvent,
  EventCardDatePart,
} from "nxs-card";
export type { TextBubbleProps } from "nxs-assets";

// cart
export { default as Cart } from "@nxs-organism/checkout/Cart";

// forms
export { default as Form } from "@nxs-template/Form";
export type { FormProps } from "nxs-form";

// checkout
export { default as PaymentMethods } from "@nxs-organism/checkout/PaymentMethods";
export type { PaymentMethodsProps, PaymentType, CartProps } from "nxs-card";

// calendar
export { default as CalendarNavigation } from "@nxs-organism/calendar/CalendarNavigation";
export { default as CalendarView } from "@nxs-organism/calendar/CalendarView";
export { default as CalendarTimeGrid } from "@nxs-organism/calendar/CalendarTimeGrid";
export { default as WeekNavigation } from "@nxs-organism/calendar/WeekNavigation";
export { default as CalendarYearView } from "@nxs-organism/calendar/CalendarYearView";
export type { CalendarEventListProps, CalendarViewProps } from "nxs-calendar";
export type { CalendarNavProps, CalendarTimeGridProps, CalendarYearViewProps, WeekNavigationProps } from "nxs-calendar";

// post
export { default as PostDetail } from "@nxs-organism/post/PostDetail";
export type { PostDetailProps } from "nxs-post";
