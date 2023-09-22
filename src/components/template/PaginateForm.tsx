import { useEffect, useState } from "react";
import { FormInitValues, KeyStringProp } from "@nxs-utils/helpers/types";
import Form from "../organism/forms/Form";
import { usePropErrorHandling } from "@nxs-utils/hooks/usePropErrorHandling";
import { ErrorMessages } from "@nxs-molecules/index";

type PaginateFormProps = {
  // required props
  page: number;
  setNewPage: (e: any) => void;
  onFormSubmit: (e: any) => void;
  paginate: [
    {
      // required
      formName: string;
      initialValues: FormInitValues;
      // optional
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
};

const PaginateForm: React.FC<PaginateFormProps> = (props) => {
  // handle required props errors
  const { order, paginate, onFormSubmit, setNewPage, page } = props;
  const requiredProps = { paginate, page, setNewPage, onFormSubmit };
  const { errors, lightColor } = usePropErrorHandling(requiredProps, true);

  // key variables
  const formOrder = order
    ? order
    : paginate.map((form) => (form.formName ? form.formName : ""));
  const formName = paginate[page].formName;
  const theme = paginate[page].theme;
  const labels = paginate[page].labels;
  const submitLabel = paginate[page].submitLabel;
  const placeholders = paginate[page].placeholders;
  const types = paginate[page].types;
  const heading = paginate[page].heading;
  const schema = paginate[page].schema;
  // init form prop values
  const [initialValues, setInitialValues] = useState<FormInitValues>();
  // store form values
  const [values, setValues] = useState<FormInitValues>({});

  useEffect(() => {
    if (page >= 0) {
      // reset initial values to redender form component
      setInitialValues(undefined);
      setInitialValues(paginate[page].initialValues);
    }
  }, [page]);

  const handlePaginateSubmit = (formValues: FormInitValues) => {
    // search next in the order
    const next = formOrder[page + 1];
    // if next is undefined its the last form
    if (!next) {
      onFormSubmit({ ...values, [formName]: { ...formValues } });
      setInitialValues(undefined);
    } else {
      const nextPage = paginate.findIndex(
        (form) => form.formName === formOrder[page + 1]
      );
      // reset initial values to redender form component
      setInitialValues(undefined);
      setNewPage(nextPage);
      // save form values
      setValues({ ...values, [formName]: { ...formValues } });
    }
  };

  if (lightColor === "red") {
    return <ErrorMessages errors={errors} component="PaginateForm" />;
  }
  return (
    initialValues && (
      <Form
        initialValues={initialValues}
        onSubmit={(event) => handlePaginateSubmit(event)}
        labels={labels}
        placeholders={placeholders}
        submitLabel={submitLabel}
        types={types}
        theme={theme}
        schema={schema}
        formName={formName}
        heading={heading}
      />
    )
  );
};
export default PaginateForm;
