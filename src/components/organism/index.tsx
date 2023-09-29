// components
export { default as Navbar } from "@nxs-organism/navigation/Navbar";
export { default as Navigation } from "@nxs-organism/navigation/Navigation";
export type { NavbarProps } from "nxs-navbar";
export type { NavigationProps } from "nxs-navigation";
// TODO: add table types
// export { default as TableBody } from "@nxs-organism/table/TableBody";
// export { default as TableHeader } from "@nxs-organism/table/TableHeader";
// export { default as TableFooter } from "@nxs-organism/table/TableFooter";

// TODO: Potential template
// export { default as Total } from "@nxs-organism/table/Total";

// card
export { default as Card } from "@nxs-organism/card/Card";
export { default as UserCard } from "@nxs-organism/card/UserCard";
export { default as HeroCard } from "@nxs-organism/card/HeroCard";
// TODO: likely remove feature card. same as with card component
// export { default as FeatureCard } from "@nxs-organism/card/FeatureCard";
// TODO: likely remove hero card alt. same as with hero card component
// export { default as HeroCardAlt } from "@nxs-organism/card/HeroCardAlt";
export { default as CardSection } from "@nxs-organism/card/CardSection";
export { default as CardTextBubble } from "@nxs-organism/card/CardTextBubble";
export type { HeroCardProps } from "nxs-hero-card";
export type { UserCardProps } from "nxs-user-card";
export type { CardProps } from "nxs-card";
export type { CardSectionProps } from "nxs-card-section";
export type { TextBubbleProps } from "nxs-text-bubble";

// cart
export { default as Cart } from "@nxs-organism/card/Cart";
export type { CartProps } from "nxs-cart";

// calendar
export { default as CalendarEvents } from "@nxs-organism/calendar/CalendarEvents";
export type { CalendarEventProps } from "nxs-calendar";

// forms
export { default as Form } from "@nxs-organism/forms/Form";
export { default as FormWithEntry } from "@nxs-organism/forms/FormWithEntry";
export { default as UploadFile } from "@nxs-organism/forms/UploadFile";
export type { FormProps } from "nxs-form";

// checkout
export { default as PaymentMethods } from "@nxs-organism/checkout/PaymentMethods";
export type { PaymentMethodsProps, PaymentType } from "nxs-payment-methods";
