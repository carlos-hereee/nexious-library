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
      formName: string;
      initialValues: FormInitValues;
      // onSubmit?: (e: any) => void;
      labels?: KeyStringProp;
      placeholders?: KeyStringProp;
      types?: KeyStringProp;
      // optional
      // hideLabels?: boolean;
      // hideSubmit?: boolean;
      theme?: string;
      submitLabel?: string;
      schema?: { required: string[] };
    }
  ];
  // optional props
  startPage?: number; //defaults set to 0
};

const PaginateForm: React.FC<PaginateFormProps> = (props) => {
  const { startPage, paginate, onFormSubmit } = props;
  // handle required props errors
  const { errors, lightColor } = usePropErrorHandling(
    { paginate, onFormSubmit },
    true
  );

  // key variables
  const [page, setPage] = useState<number>(startPage ? startPage : 0);
  const total = paginate.length > 0 ? paginate.length : 0;
  // init form prop values
  const [initialValues, setInitialValues] = useState<FormInitValues>();
  const [labels, setLabels] = useState<KeyStringProp>();
  const [placeholders, setPlaceholders] = useState<KeyStringProp>();
  const [types, setTypes] = useState<KeyStringProp>();
  const [submitLabel, setSubmitLabel] = useState<string>("");
  const [theme, setTheme] = useState("");
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
    formValues.initialValues && setInitialValues(formValues.initialValues);
    formValues.theme && setTheme(formValues.theme);
    formValues.labels && setLabels(formValues.labels);
    formValues.placeholders && setPlaceholders(formValues.placeholders);
    formValues.types && setTypes(formValues.types);
    formValues.submitLabel && setSubmitLabel(formValues.submitLabel);
    formValues.schema && setSchema(formValues.schema);
    formValues.formName && setFormName(formValues.formName);
  };

  const handlePaginateSubmit = (formValues: FormInitValues) => {
    // on last page submit form or keep track of values
    if (page + 1 === total) {
      onFormSubmit({ ...values, ...formValues });
    } else {
      setValues({ ...values, ...formValues });
      setPage((prev) => (prev ? prev + 1 : 0));
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
        submitLabel={submitLabel ? submitLabel : ""}
        types={types}
        theme={theme}
        schema={schema}
        formName={formName}
      />
    )
  );
};
export default PaginateForm;
