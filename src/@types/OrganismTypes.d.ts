import { CalendarProps } from "@nxs-utils/types/organism/CalendarProps";
import { FooterProps } from "@nxs-utils/types/organism/FooterProps";
import { FormProps } from "@nxs-utils/types/organism/FormProps";
import { HeaderProps } from "@nxs-utils/types/organism/HeaderProps";

declare module "Form" {
  // Define your exported types here
  export type Props = FormProps;
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
