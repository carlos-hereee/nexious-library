import { useEffect, useState } from "react";
import { useRequiredProps } from "@nxs-utils/hooks/useRequiredProps";
import { ErrorMessages } from "@nxs-molecules/index";
import { Form, FormNavigation } from "@nxs-organism/index";
import { FormInitValues } from "custom-props";
import { PaginateFormProps } from "nxs-form";
import { makeStrReadable } from "@nxs-utils/app/text";

const PaginateForm: React.FC<PaginateFormProps> = (props) => {
  // handle required props errors
  const { order, paginate, onFormSubmit, setNewPage, page, hideNavigation } = props;
  const { errors, lightColor, setLightColor, setErrors } = useRequiredProps(
    { paginate },
    true
  );
  // key variables
  // set initial values
  const [initialValues, setInitialValues] = useState<FormInitValues>();
  // store form values
  const [values, setValues] = useState<FormInitValues>({});
  const [pageNumber, setPageNumber] = useState<number>(page ? page : 0);
  const current = paginate[pageNumber];
  const formOrder = order ? order : paginate.map((f) => f.formName);
  const total = formOrder.length;
  const formName = current?.formName;
  const heading = current?.heading;
  const addEntry = current?.addEntry;
  const labels = current?.labels;
  const placeholders = current?.placeholders;
  const types = current?.types;
  const submitLabel = current?.submitLabel;
  const schema = current?.schema;
  const theme = current?.theme;
  const fieldHeading = current?.fieldHeading;

  useEffect(() => {
    if (pageNumber >= 0) {
      if (setNewPage) setNewPage(pageNumber);
      setInitialValues(paginate[pageNumber].initialValues);
    }
  }, [pageNumber]);

  const handlePaginateSubmit = (formValues: FormInitValues) => {
    // search next in the order
    const next = formOrder[pageNumber + 1];
    // if next is undefined its the last form
    if (!next) {
      if (onFormSubmit) {
        // save values just incase
        onFormSubmit({ ...values, [formName]: formValues });
      } else {
        const prop = "onFormSubmit";
        setLightColor("red");
        setErrors([
          { prop, code: "missingProps", value: onFormSubmit, name: prop, isAProp: true },
        ]);
      }
    } else {
      const nextPage = formOrder.findIndex((form) => form === next);
      handlePageClick(nextPage);
      // save form values
      setValues({ ...values, [formName]: formValues });
    }
  };
  const onSubmit = () => (current.onSubmit ? current.onSubmit : handlePaginateSubmit);

  const handlePageClick = (nextPage: number) => {
    //  reset initial values to redender form component
    setInitialValues(undefined);
    setPageNumber(nextPage);
  };

  if (lightColor === "red") {
    return <ErrorMessages errors={errors} component="PaginateForm" />;
  }
  return (
    <div className="container">
      {!hideNavigation && (
        <FormNavigation
          heading={`Form navigation showing ${makeStrReadable(formName)}, ${
            pageNumber + 1
          } out of ${total}`}
          formOrder={formOrder}
          pageNumber={pageNumber}
          onClick={(idx) => handlePageClick(idx)}
        />
      )}
      {initialValues && (
        <Form
          initialValues={initialValues}
          onSubmit={onSubmit()}
          formName={formName}
          labels={labels}
          placeholders={placeholders}
          submitLabel={submitLabel}
          types={types}
          theme={theme}
          schema={schema}
          addEntry={addEntry}
          fieldHeading={fieldHeading}
          heading={heading}
        />
      )}
    </div>
  );
};
export default PaginateForm;
