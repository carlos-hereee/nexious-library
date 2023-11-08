// export main templates and types here in the entry point
// so they get included when ts compiles
// templates
export { default as Header } from "@nxs-template/Header";
export { default as Footer } from "@nxs-template/Footer";
export { default as Calendar } from "@nxs-template/Calendar";
export { default as PaginateForm } from "@nxs-template/PaginateForm";
export type { PaginateFormProps } from "nxs-form";
// components
export { default as Navbar } from "@nxs-organism/navigation/Navbar";
export { default as Navigation } from "@nxs-organism/navigation/Navigation";
export type { NavigationProps, NavbarProps } from "nxs-navigation";
// TODO: add table types
// export { default as TableBody } from "@nxs-organism/table/TableBody";
// export { default as TableHeader } from "@nxs-organism/table/TableHeader";
// export { default as TableFooter } from "@nxs-organism/table/TableFooter";

// TODO: Potential template
// export { default as Total } from "@nxs-organism/table/Total";

// TODO: only include template and organism on main export lighten the load
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
export type { HeroCardProps, UserCardProps, CardSectionProps } from "nxs-card";
export type { TextBubbleProps } from "nxs-assets";

// cart
export { default as Cart } from "@nxs-organism/card/Cart";
export type { CartProps } from "nxs-cart";

// calendar
export { default as CalendarEvents } from "@nxs-organism/calendar/CalendarEvents";
export type { CalendarEventProps } from "nxs-calendar";

// forms
export { default as Form } from "@nxs-organism/forms/Form";
export { default as UploadFile } from "@nxs-molecules/forms/UploadFile";
export type { FormProps } from "nxs-form";

// checkout
export { default as PaymentMethods } from "@nxs-organism/checkout/PaymentMethods";
export type { PaymentMethodsProps, PaymentType } from "nxs-payment-methods";

// molecules
// assets
export { default as Logo } from "@nxs-molecules/assets/Logo";
export { default as Socials } from "@nxs-molecules/assets/Socials";
export { default as Rating } from "@nxs-molecules/assets/Rating";
export { default as Hero } from "@nxs-molecules/assets/Hero";
export type { HeroProps, MediaProps, RatingProps } from "nxs-assets";

// buttons
export { default as IconButton } from "@nxs-molecules/buttons/IconButton";
export { default as GoBackButton } from "@nxs-molecules/buttons/GoBackButton";
export { default as SubmitButton } from "@nxs-molecules/buttons/SubmitButton";
export { default as CalendarTile } from "@nxs-molecules/buttons/CalendarTile";
export { default as BurgerButton } from "@nxs-molecules/buttons/BurgerButton";
export type { ButtonProps, IconButtonProps } from "nxs-button";

// card
export { default as CardHeader } from "@nxs-molecules/card/CardHeader";
export { default as CardBody } from "@nxs-molecules/card/CardBody";
export { default as CTA } from "@nxs-molecules/card/CTA";
export { default as CartRow } from "@nxs-molecules/card/CartRow";
export { default as CartCancel } from "@nxs-molecules/card/CartCancelRow";
export type { CardProps } from "nxs-card";

// errors
export { default as EmptySection } from "@nxs-molecules/errors/EmptySection";
// TODO: remove message required. same result with classname theme
// export { default as MessageRequired } from "@nxs-molecules/errors/MessageRequired";
export { default as PageNotFound } from "@nxs-molecules/errors/PageNotFound";
export { default as Loading } from "@nxs-molecules/errors/Loading";
export { default as ErrorMessages } from "@nxs-molecules/errors/ErrorMessages";
export { default as ComingSoon } from "@nxs-molecules/errors/ComingSoon";
export type { ErrorProps } from "nxs-errors";

// forms
export { default as FieldQuantity } from "@nxs-molecules/forms/FieldQuantity";
export { default as AuthField } from "@nxs-molecules/forms/AuthField";
export { default as Select } from "@nxs-molecules/forms/Select";
export { default as Field } from "@nxs-molecules/forms/Field";
export { default as TextArea } from "@nxs-molecules/forms/TextArea";
export type { InputProps, SelectProp, UploadFileProps } from "nxs-form";

// calendar
export { default as CalendarNavigation } from "@nxs-molecules/calendar/CalendarNavigation";
export { default as CalendarView } from "@nxs-molecules/calendar/CalendarView";
export { default as CalendarEventList } from "@nxs-molecules/calendar/CalendarEventList";
export type { CalendarEventListProps, CalendarViewProps } from "nxs-calendar";
export type { CalendarNavProps } from "nxs-calendar";

// TODO: ADD Tables types
// // tables
// export { default as ColumnGroup } from "@nxs-molecules/table/ColumnGroup";
// export { default as TableRow } from "@nxs-molecules/table/TableRow";

// navigation
export { default as NavToggle } from "@nxs-molecules/navigation/NavToggle";

// atoms
// assets
export { default as Icon } from "@nxs-atoms/assets/Icon";
export { default as Spinner } from "@nxs-atoms/assets/Spinner";
// buttons
export { default as Button } from "@nxs-atoms/buttons/Button";
export { default as BackButton } from "@nxs-atoms/buttons/BackButton";
export { default as ButtonCancel } from "@nxs-atoms/buttons/CancelButton";
export type { IconProps } from "nxs-button";

// forms
export { default as Input } from "@nxs-atoms/forms/Input";
export { default as InputCheckbox } from "@nxs-atoms/forms/InputCheckbox";
export { default as InputQuantity } from "@nxs-atoms/forms/InputQuantity";
export { default as Label } from "@nxs-atoms/forms/Label";
export { default as Option } from "@nxs-atoms/forms/Option";
export { default as ShowAuthTips } from "@nxs-atoms/forms/ShowAuthTips";

// // save tables components for future update
// // table
// export { default as CellData } from "@nxs-atoms/table/CellData";
// export { default as CellTitle } from "@nxs-atoms/table/CellTitle";
// export { default as TableCaption } from "@nxs-atoms/table/TableCaption";
// export { default as Column } from "@nxs-atoms/table/Column";

// texts
export { default as Capitalize } from "@nxs-atoms/texts/Capitalize";
export { default as Heading } from "@nxs-atoms/texts/Heading";
export { default as Title } from "@nxs-atoms/texts/Title";
export { default as Hyperlink } from "@nxs-atoms/texts/Hyperlink";
export { default as Ribbon } from "@nxs-atoms/texts/Ribbon";
export { default as Subtitle } from "@nxs-atoms/texts/Subtitle";
export { default as Navlink } from "@nxs-atoms/texts/Navlink";
export { default as KeyValue } from "@nxs-atoms/texts/KeyValue";
export { default as CamelSpace } from "@nxs-atoms/texts/CamelSpace";
export { default as PingCount } from "@nxs-atoms/texts/PingCount";
export { default as TileContent } from "@nxs-atoms/texts/TileContent";
export { default as ReadMore } from "@nxs-atoms/texts/ReadMore";
export { default as Cost } from "@nxs-atoms/texts/Cost";
export { default as MeetingDetails } from "@nxs-atoms/texts/MeetingDetails";
export { default as TextBubble } from "@nxs-atoms/texts/TextBubble";
export { default as UnsplashCredit } from "@nxs-atoms/texts/UnsplashCredit";
export { default as ErrorMessage } from "@nxs-atoms/texts/ErrorMessage";
export type { DataProp, HyperlinkProp, KeyValueProps, TileProps } from "nxs-typography";
export type { HybribDataProp, ReadMoreProps } from "nxs-typography";
export type { UnsplashProps } from "nxs-assets";
export type { ErrorMessageProps } from "nxs-errors";

// custom functions
export { uniqueId } from "@nxs-utils/data/uniqueId";
export { urlFile } from "@nxs-utils/data/urlFile";
export { capFirstCharacter, makeStrReadable } from "@nxs-utils/app/text";
export { objToArray } from "@nxs-utils/app/objLength";
