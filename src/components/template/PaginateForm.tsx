import { useEffect, useState } from "react";
import { useRequiredProps } from "@nxs-utils/hooks/useRequiredProps";
import { ErrorMessages } from "@nxs-molecules/index";
import { Form, FormNavigation } from "@nxs-organism/index";
import { FormInitValues } from "custom-props";
import { PaginateFormProps } from "nxs-form";

const PaginateForm: React.FC<PaginateFormProps> = (props) => {
  // handle required props errors
  const { order, paginate, onFormSubmit, setNewPage, page, hideNavigation } = props;
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
  const theme = paginate[pageNumber]?.theme;
  const fieldHeading = paginate[pageNumber]?.fieldHeading;
  // set initial values
  const [initialValues, setInitialValues] = useState<FormInitValues>();
  // store form values
  const [values, setValues] = useState<FormInitValues>({});

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
      // save values just incase
      onFormSubmit({ ...values, [formName]: formValues });
    } else {
      const nextPage = formOrder.findIndex((form) => form === next);
      handlePageClick(nextPage);
      // save form values
      setValues({ ...values, [formName]: formValues });
    }
  };

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
          heading={`Form navigation showing ${formName}, ${pageNumber + 1} out of ${total}`}
          formOrder={formOrder}
          pageNumber={pageNumber}
          onClick={(idx) => handlePageClick(idx)}
        />
      )}
      {initialValues && (
        <Form
          initialValues={initialValues}
          onSubmit={handlePaginateSubmit}
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
