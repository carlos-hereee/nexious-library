// export templates here
export { default as Header } from "@nxs-template/Header";
export { default as Footer } from "@nxs-template/Footer";
export { default as Calendar } from "@nxs-template/Calendar";
export { default as PaginateForm } from "@nxs-template/PaginateForm";
export { default as Form } from "@nxs-template/Form";
export { default as CalendarEvents } from "@nxs-template/CalendarEvents";
export { default as Dialog } from "@nxs-template/Dialog";
// DialogOverlay is the complete, drop-in modal (portal + backdrop + scroll-lock around
// Dialog asModal); Dialog itself stays a bare shell for consumers with their own overlay.
export { default as DialogOverlay } from "@nxs-template/DialogOverlay";
export { default as ItemDetail } from "@nxs-template/ItemDetail";

// utils
export { uniqueId } from "@nxs-utils/data/uniqueId";
export { combineArraysWithOutDups } from "@nxs-utils/app/combineArraysWithOutDups";
export { objToArray } from "@nxs-utils/app/objLength";
export { capFirstCharacter } from "@nxs-utils/data/text";
export { urlFile } from "@nxs-utils/data/urlFile";
export { safeUrl } from "@nxs-utils/data/safeUrl";
// background components
export { default as Bubbly } from "@nxs-organism/styles/Bubbly";
// popular components
export { default as Button } from "@nxs-atoms/buttons/Button";
export { default as ReadMore } from "@nxs-atoms/texts/ReadMore";
export { default as Hero } from "@nxs-molecules/assets/Hero";
export { default as Spinner } from "@nxs-atoms/assets/Spinner";
export { default as Loading } from "@nxs-molecules/errors/Loading";
export { default as Icon } from "@nxs-atoms/assets/Icon";
export { default as IconButton } from "@nxs-molecules/buttons/IconButton";
// pluggable icon registry (register a custom set, or the fontawesome adapter, at app boot)
export {
  registerIcons,
  getIconRenderer,
  getRegisteredIconKeys,
  LIBRARY_REQUIRED_ICON_KEYS,
  type IconRegistry,
  type IconComponent,
  type IconRenderProps,
  type LibraryIconKey,
} from "@nxs-atoms/assets/iconRegistry";
export { default as HeroCard } from "@nxs-organism/card/HeroCard";
export { default as CardTextBubble } from "@nxs-organism/card/CardTextBubble";
export { default as UserCard } from "@nxs-organism/card/UserCard";
export { default as NavBar } from "@nxs-organism/navigation/Navbar";
export { default as MerchCard } from "@nxs-organism/card/MerchCard";
export { default as Navigation } from "@nxs-organism/navigation/Navigation";
export { default as SectionList } from "@nxs-organism/lists/SectionList";
export { default as HeaderContent } from "@nxs-molecules/header/HeaderContent";
// checkout components
export { default as PaymentMethods } from "@nxs-organism/checkout/PaymentMethods";
export { default as Total } from "@nxs-organism/checkout/Total";
export { default as Cart } from "@nxs-organism/checkout/Cart";
export { default as Card } from "@nxs-organism/card/Card";
export { default as ButtonCancel } from "@nxs-atoms/buttons/ButtonCancel";
export { default as Banner } from "@nxs-organism/card/Banner";
export { default as CopyButton } from "@nxs-molecules/buttons/CopyButton";
export { default as HintButton } from "@nxs-molecules/buttons/HintButton";
export { default as PageNotFound } from "@nxs-molecules/errors/PageNotFound";
export { default as Socials } from "@nxs-template/Socials";
// form components
export { default as Select } from "@nxs-molecules/forms/Select";
export { default as Rating } from "@nxs-molecules/assets/Rating";
// card components
export { default as SettingsCard } from "@nxs-organism/card/SettingsCard";
export { default as SettingsCardHeader } from "@nxs-molecules/card/SettingsCardHeader";
export { default as ConfirmDialog } from "@nxs-organism/card/ConfirmDialog";
export { default as AvatarCard } from "@nxs-molecules/card/AvatarCard";
export { default as AvatarCardButton } from "@nxs-molecules/card/AvatarCardButton";
export { default as CardDetails } from "@nxs-molecules/card/CardDetails";
// header components
export { default as ContainerHeader } from "@nxs-molecules/header/ContainerHeader";
export { default as CloseHeader } from "@nxs-molecules/header/CloseHeader";
// timer
export { default as CountDown } from "@nxs-organism/timer/CountDown";
// error components
export { default as ErrorFallback } from "@nxs-molecules/errors/ErrorFallback";
// reaction buttons
export { default as MessageReactions } from "@nxs-molecules/buttons/MessageReactions";
// currency utils
export { formatPenniesToDollars, formatDollarsToPennies } from "@nxs-math/currency";
// public hooks — lets consumers build custom form UIs using the same validation and state logic
export { useFormValidation } from "@nxs-utils/hooks/useFormValidation";
export { useValues } from "@nxs-utils/hooks/useFormValues";
// public prop types — surfaced from the package entry so consumers can type their own
// wrappers without reaching into subpaths. The underlying type modules now ship in dist
// (the @types ambient `declare module` blocks were converted to real emitted modules).
export type { HeaderProps, MenuProp, NavbarProps, FooterProps } from "nxs-navigation";
export type { FormProps, PaginateFormProps, SelectProp, UseFormValidationApi, UseValuesApi } from "nxs-form";
export type { ButtonProps, IconButtonProps } from "nxs-button";
export type { CalendarProps } from "nxs-calendar";
export type { CardProps } from "nxs-card";
export type { PostProps, PostDetailProps } from "nxs-post";

// ── Remaining public prop types (2026-06-29 type-surface pass) ───────────────────
// Make the root `.` entry a COMPLETE type surface: every root-exported component now has
// a root-reachable prop type, plus the nested data types consumers must construct to call
// them (PostData, AssetProps, ICalEvent, ...). Previously Dialog/Cart/PaymentMethods/
// CalendarEvents types were only on subpaths and TotalProps was reachable from no entry at
// all, forcing consumers to hand-redeclare shapes that then drift. All type-only, no runtime.
export type { NavigationProps, MenuItemProp, ThemeList } from "nxs-navigation";
export type { ReadMoreProps, PHeaderCotent } from "nxs-typography";
export type {
  DialogProps,
  CartProps,
  BannerProps,
  ItemDetailProps,
  HeroCardProps,
  UserCardProps,
  MerchProps,
  PaymentMethodsProps,
  PaymentType,
  CTAProp,
} from "nxs-card";
export type { TotalProps } from "custom-props";
export type { ICalEvent, CalendarPEventDays, PEventDay } from "nxs-calendar";
export type { ErrorProps, ErrorMessageProps } from "nxs-errors";
export type { HeroProps, BubblyProps, TextBubbleProps, RatingProps, AssetProps, UserProps } from "nxs-assets";
export type { IconProps, CopyToClipboardProps } from "nxs-button";
export type { PostData, PostAuthor, PostReaction } from "nxs-post";
export type { DialogOverlayProps } from "@nxs-template/DialogOverlay";
