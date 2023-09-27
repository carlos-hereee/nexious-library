import {
  CalendarDayEventProp,
  FormInitValues,
  HeroProp,
  KeyStringProp,
  MenuItemProp,
  MenuProp,
} from "@nxs-utils/helpers/types";

export interface CalendarProps {
  value: Date;
  minDate?: Date;
  theme?: string;
  events?: CalendarDayEventProp[];
  onDayClick?: (e: any) => void;
  setDay?: (a: any) => void;
}
export interface HeaderProps {
  menu: MenuProp[];
  ping?: number;
  logo: HeroProp;
  language?: MenuItemProp;
  updateMenu: (e: MenuProp[]) => void;
}
export interface FooterProps {
  appName: string;
}
export interface PaginateFormProps {
  // required props
  page: number;
  setNewPage: (e: number) => void;
  onFormSubmit: (e: any) => void;
  paginate: [
    {
      // required
      formName: string;
      initialValues: FormInitValues;
      // optional
      addEntry?: { initialValues: FormInitValues; label: string };
      title?: string;
      labels?: KeyStringProp;
      placeholders?: KeyStringProp;
      types?: KeyStringProp;
      theme?: string;
      submitLabel?: string;
      heading?: string;
      schema?: { required: string[] };
    }
  ];
  // optional props
  order?: string[]; //defaults set to first form on list
  hideNavigation?: boolean;
}
