// components
export { default as Navbar } from "@nxs-organism/navigation/Navbar";
export { default as Navigation } from "@nxs-organism/navigation/Navigation";
export { default as FormNavigation } from "@nxs-organism/navigation/FormNavigation";
export type { NavigationProps, NavbarProps, FormNavigationProps } from "nxs-navigation";
// TODO: add table types
// export { default as TableBody } from "@nxs-organism/table/TableBody";
// export { default as TableHeader } from "@nxs-organism/table/TableHeader";
// export { default as TableFooter } from "@nxs-organism/table/TableFooter";

// TODO: Potential template
export { default as Total } from "@nxs-organism/table/Total";

// card
export { default as Card } from "@nxs-organism/card/Card";
export { default as MerchCard } from "@nxs-organism/card/MerchCard";
export { default as UserCard } from "@nxs-organism/card/UserCard";
export { default as HeroCard } from "@nxs-organism/card/HeroCard";
export { default as CardSection } from "@nxs-organism/card/CardSection";
export { default as CardTextBubble } from "@nxs-organism/card/CardTextBubble";

export type { HeroCardProps, UserCardProps, CardProps, CardSectionProps, DialogProps } from "nxs-card";
export type { TextBubbleProps } from "nxs-assets";

// cart
export { default as Cart } from "@nxs-organism/card/Cart";

// forms
export { default as Form } from "@nxs-template/Form";
export type { FormProps } from "nxs-form";

// checkout
export { default as PaymentMethods } from "@nxs-organism/checkout/PaymentMethods";
export type { PaymentMethodsProps, PaymentType, CartProps } from "nxs-card";
