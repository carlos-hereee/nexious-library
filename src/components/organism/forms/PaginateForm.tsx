import { useErrors } from "@nxs-utils/hooks/useErrors";
import { useValues } from "@nxs-utils/hooks/useValues";
import { useState } from "react";
import { KeyStringProp } from "@nxs-utils/helpers/types";
import { initLabels } from "@nxs-utils/form/labels";
import { objLength } from "@nxs-utils/app/objLength";
import { validateForm } from "@nxs-utils/form/validateForm";
import Form from "./Form";

type PaginateFormProps = {
  // required props
  startPage?: number;
  pageNumber?: number;
  totalPages?: number;
  paginate: [
    {
      initialValues: { [key: string]: any };
      onSubmit: (e: any) => void;
      labels?: { [key: string]: string };
      placeholders?: { [key: string]: string };
      types?: { [key: string]: string };
      // optional
      hideLabels?: boolean;
      hideSubmit?: boolean;
      theme?: string;
      submitLabel?: string;
      schema?: { required: string[] };
    }
  ];
};

const PaginateForm: React.FC<PaginateFormProps> = (props) => {
  const { startPage, pageNumber, totalPages, paginate } = props;
  let current = pageNumber ? pageNumber : 0;
  let start = startPage ? startPage : 0;
  let total = totalPages
    ? totalPages  
    : paginate.length > 0
    ? paginate.length
    : 0;
  const { initialValues, onSubmit } = paginate[current];
  // const pagigatedForm = paginate.filter((form) => {
  //   return form.pageNumber === pageNumber;
  // })[0];
  // console.log("pagigatedForm", pagigatedForm);

  return <Form initialValues={initialValues} onSubmit={onSubmit} />;
};
export default PaginateForm;
