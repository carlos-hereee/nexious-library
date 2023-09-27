import { PaginateFormProps } from "@nxs-types/template/PaginateForm";
import { CalendarProps } from "@nxs-utils/types/organism/CalendarProps";
import { FooterProps } from "@nxs-utils/types/organism/FooterProps";
import { HeaderProps } from "@nxs-utils/types/organism/HeaderProps";

declare module "PaginateForm" {
  // Define your exported types here
  export type Props = PaginateFormProps;
}
declare module "Calendar" {
  // Define your exported types here
  export type Props = CalendarProps;
}
declare module "Header" {
  // Define your exported types here
  export type Props = HeaderProps;
}
declare module "Footer" {
  // Define your exported types here
  export type Props = FooterProps;
}
