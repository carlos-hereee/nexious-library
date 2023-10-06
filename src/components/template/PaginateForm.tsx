import { useEffect, useState } from "react";
import { useRequiredProps } from "@nxs-utils/hooks/useRequiredProps";
import { ErrorMessages } from "@nxs-molecules/index";
import { Button } from "@nxs-atoms/index";
import { Form, FormNavigation } from "@nxs-organism/index";
import { PaginateFormProps } from "nxs-paginate-form";
import { FormInitValues } from "custom-props";

const PaginateForm: React.FC<PaginateFormProps> = (props) => {
  // handle required props errors
  const { order, paginate, onFormSubmit, setNewPage, page, hideNavigation } = props;
  // const { fieldHeading } = props;
  const requiredProps = { paginate, onFormSubmit };
  const { errors, lightColor } = useRequiredProps(requiredProps, true);
  // key variables
  const [pageNumber, setPageNumber] = useState<number>(page ? page : 0);
  const formOrder = order ? order : paginate.map((f) => f.formName);
  const total = formOrder.length;
  const formName = paginate[pageNumber]?.formName;
  const heading = paginate[pageNumber]?.heading;
  const addEntry = paginate[pageNumber]?.addEntry;
  const labels = paginate[pageNumber]?.labels;
  const placeholders = paginate[pageNumber]?.placeholders;
  const types = paginate[pageNumber]?.types;
  const submitLabel = paginate[pageNumber]?.submitLabel;
  const schema = paginate[pageNumber]?.schema;
  const fieldHeading = paginate[pageNumber]?.fieldHeading;
  // set initial values
  const [initialValues, setInitialValues] = useState<FormInitValues>();
  // store form values
  const [values, setValues] = useState<FormInitValues>({});

  useEffect(() => {
    if (pageNumber >= 0) {
      // reset initial values to redender form component
      setInitialValues(undefined);
      setInitialValues(paginate[pageNumber].initialValues);
    }
  }, [pageNumber]);

  const handlePaginateSubmit = (formValues: FormInitValues) => {
    // search next in the order
    const next = formOrder[pageNumber + 1];
    // if next is undefined its the last form
    if (!next) {
      // setInitialValues(undefined);
      onFormSubmit({ ...values, [formName]: formValues });
    } else {
      const nextPage = paginate.findIndex(
        (form) => form.formName === formOrder[pageNumber + 1]
      );
      // reset initial values to rerender form component
      setInitialValues(undefined);
      if (setNewPage) setNewPage(nextPage);
      else setPageNumber(nextPage);
      // save form values
      setValues({ ...values, [formName]: formValues });
    }
  };

  if (lightColor === "red") {
    return <ErrorMessages errors={errors} component="PaginateForm" />;
  }
  return (
    <div className="container">
      {!hideNavigation && (
        <FormNavigation
          heading={`Form navigation showing ${formName}, ${pageNumber + 1} out of ${total}`}
          formOrder={formOrder}
          pageNumber={pageNumber}
          onClick={(idx) => (setNewPage ? setNewPage(idx) : setPageNumber(idx))}
        />
      )}
      {heading && <h2 className="heading">{heading}</h2>}
      {initialValues && (
        <Form
          initialValues={initialValues}
          onSubmit={(event) => handlePaginateSubmit(event)}
          formName={formName}
          labels={labels}
          placeholders={placeholders}
          submitLabel={submitLabel}
          types={types}
          // theme={theme}
          schema={schema}
          addEntry={addEntry}
          fieldHeading={fieldHeading}
        />
      )}
    </div>
  );
};
export default PaginateForm;
