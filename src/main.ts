// export main templates and types here in the entry point
// so they get included when ts compiles
// templates
export { default as Header } from "@nxs-template/Header";
export { default as Footer } from "@nxs-template/Footer";
export { default as Calendar } from "@nxs-template/Calendar";
export { default as PaginateForm } from "@nxs-template/PaginateForm";
export type { PaginateFormProps } from "nxs-paginate-form";

// components
export { default as Navbar } from "@nxs-organism/navigation/Navbar";
export { default as Navigation } from "@nxs-organism/navigation/Navigation";
export type { NavigationProps, NavbarProps, FooterProps } from "nxs-navigation";
// TODO: add table types
// export { default as TableBody } from "@nxs-organism/table/TableBody";
// export { default as TableHeader } from "@nxs-organism/table/TableHeader";
// export { default as TableFooter } from "@nxs-organism/table/TableFooter";

// card
export { default as Card } from "@nxs-organism/card/Card";
export type { CardProps } from "nxs-card";
export { default as UserCard } from "@nxs-organism/card/UserCard";
export type { UserCardProps } from "nxs-user-card";
export { default as HeroCard } from "@nxs-organism/card/HeroCard";
export type { HeroCardProps } from "nxs-hero-card";
// TODO: likely remove feature card. same as with card component
// export { default as FeatureCard } from "@nxs-organism/card/FeatureCard";
// TODO: likely remove hero card alt. same as with hero card component
// export { default as HeroCardAlt } from "@nxs-organism/card/HeroCardAlt";
export { default as CardSection } from "@nxs-organism/card/CardSection";
export type { CardSectionProps } from "nxs-card-section";
export { default as CardTextBubble } from "@nxs-organism/card/CardTextBubble";
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
export type { FormProps } from "nxs-form";

// checkout
export { default as PaymentMethods } from "@nxs-organism/checkout/PaymentMethods";
export type { PaymentMethodsProps, PaymentType } from "nxs-payment-methods";
