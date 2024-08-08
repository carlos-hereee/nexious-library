// components
export { default as Navbar } from "@nxs-organism/navigation/Navbar";
export { default as Navigation } from "@nxs-organism/navigation/Navigation";
export { default as FormNavigation } from "@nxs-organism/navigation/FormNavigation";
export type { NavigationProps, NavbarProps, FormNavigationProps } from "nxs-navigation";
// TODO: add table types
// export { default as TableBody } from "@nxs-organism/table/TableBody";
// export { default as TableHeader } from "@nxs-organism/table/TableHeader";
// export { default as TableFooter } from "@nxs-organism/table/TableFooter";
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

export type { HeroCardProps, UserCardProps, CardProps, CardSectionProps, DialogProps, BannerProps } from "nxs-card";
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
export { default as CalendarEventList } from "@nxs-organism/calendar/CalendarEventList";
export type { CalendarEventListProps, CalendarViewProps } from "nxs-calendar";
export type { CalendarNavProps } from "nxs-calendar";
