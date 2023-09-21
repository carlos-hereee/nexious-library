import { useEffect, useState } from "react";
import { FormInitValues, KeyStringProp } from "@nxs-utils/helpers/types";
import Form from "../organism/forms/Form";
import { usePropErrorHandling } from "@nxs-utils/hooks/usePropErrorHandling";
import { ErrorMessages } from "@nxs-molecules/index";

type PaginateFormProps = {
  // required props
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
      schema?: { required: string[] };
    }
  ];
  // optional props
  order?: string[]; //defaults set to first form on list
};

const PaginateForm: React.FC<PaginateFormProps> = (props) => {
  // key variables
  const { order, paginate, onFormSubmit } = props;
  // handle required props errors
  const { errors, lightColor } = usePropErrorHandling(
    { paginate, onFormSubmit },
    true
  );
  const [pageOrder, setPageOrder] = useState<number>(0);
  // locate page order default to 0
  const firstPage = order
    ? paginate.findIndex((form) => form.formName === order[pageOrder])
    : 0;
  // find total number of forms default to 0
  const [page, setPage] = useState<number>(firstPage);
  // init form prop values
  const [initialValues, setInitialValues] = useState<FormInitValues>();
  const [labels, setLabels] = useState<KeyStringProp>();
  const [placeholders, setPlaceholders] = useState<KeyStringProp>();
  const [types, setTypes] = useState<KeyStringProp>();
  const [submitLabel, setSubmitLabel] = useState<string>("");
  const [theme, setTheme] = useState("");
  const [heading, setHeading] = useState("");
  const [schema, setSchema] = useState<{ required: string[] }>();
  const [formName, setFormName] = useState<string>("");
  // store form values
  const [values, setValues] = useState<FormInitValues>({});

  useEffect(() => {
    if (page >= 0) {
      initForm(paginate[page]);
    }
  }, [page]);

  const initForm = (formValues: FormInitValues) => {
    // validate required form props
    formValues?.initialValues && setInitialValues(formValues?.initialValues);
    formValues?.theme && setTheme(formValues?.theme);
    formValues?.labels && setLabels(formValues?.labels);
    formValues?.placeholders && setPlaceholders(formValues?.placeholders);
    formValues?.types && setTypes(formValues?.types);
    formValues?.submitLabel && setSubmitLabel(formValues?.submitLabel);
    formValues?.schema && setSchema(formValues?.schema);
    formValues?.formName && setFormName(formValues?.formName);
    formValues?.heading && setHeading(formValues?.heading);
  };

  const handlePaginateSubmit = (formValues: FormInitValues) => {
    // follow form oder else update page count
    if (order) {
      // search next in the order
      const next = order[pageOrder + 1];
      // if next is undefined its the last form
      if (!next) {
        return onFormSubmit({ ...values, [formName]: { ...formValues } });
      } else {
        const nextPage = paginate.findIndex(
          (form) => form.formName === order[pageOrder + 1]
        );
        // reset initial values to redender form component
        setInitialValues(undefined);
        // save form values
        setValues({ ...values, [formName]: { ...formValues } });
        setPage(nextPage);
        setPageOrder((prev) => prev + 1);
      }
      // on last page submit form or keep track of values
    } else if (page === paginate.length - 1) {
      onFormSubmit({ ...values, [formName]: { ...formValues } });
      //
    } else {
      // reset initial values to redender form component
      setInitialValues(undefined);
      // save form values
      setValues({ ...values, [formName]: { ...formValues } });
      setPage((prev) => prev + 1);
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
