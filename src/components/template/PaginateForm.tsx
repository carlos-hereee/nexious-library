import { useEffect, useState } from "react";
import { usePropErrorHandling } from "@nxs-utils/hooks/usePropErrorHandling";
import { ErrorMessages } from "@nxs-molecules/index";
import { Button } from "@nxs-atoms/index";
import { Form } from "@nxs-organism/index";
import { PaginateFormProps } from "nxs-paginate-form";
import { FormInitValues } from "custom-props";

const PaginateForm: React.FC<PaginateFormProps> = (props) => {
  // handle required props errors
  const { order, paginate, onFormSubmit, setNewPage, page, hideNavigation } = props;
  const requiredProps = { paginate, onFormSubmit };
  const { errors, lightColor } = usePropErrorHandling(requiredProps, true);
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
  // set initial values
  const [initialValues, setInitialValues] = useState<FormInitValues>();
  // store form values
  const [values, setValues] = useState<FormInitValues>({});

  // console.log("initialValues", initialValues);
  // console.log("pageNumber", paginate[pageNumber]);
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
      onFormSubmit({ ...values, [formName]: { ...formValues } });
      setInitialValues(undefined);
    } else {
      const nextPage = paginate.findIndex(
        (form) => form.formName === formOrder[pageNumber + 1]
      );
      // reset initial values to rerender form component
      setInitialValues(undefined);
      if (setNewPage) setNewPage(nextPage);
      else setPageNumber(nextPage);
      // save form values
      setValues({ ...values, [formName]: { ...formValues } });
    }
  };
  const prevPage = () => {
    // check if its first item on list
    if (pageNumber === 0) {
      if (setNewPage) setNewPage(pageNumber);
      else setPageNumber(pageNumber);
    } else {
      // reset inital values to rerender component
      setInitialValues(undefined);
      if (setNewPage) setNewPage(pageNumber - 1);
      setPageNumber(pageNumber - 1);
    }
  };
  const nextPage = () => {
    // check if last item
    if (pageNumber + 1 === total) {
      if (setNewPage) setNewPage(pageNumber);
      else setPageNumber(pageNumber);
    } else {
      // reset inital values to rerender component
      setInitialValues(undefined);
      if (setNewPage) setNewPage(pageNumber + 1);
      else setPageNumber(pageNumber + 1);
    }
  };
  if (lightColor === "red") {
    return <ErrorMessages errors={errors} component="PaginateForm" />;
  }
  return (
    <div className="container">
      {!hideNavigation && (
        <div>
          <p>
            Form navigation showing {pageNumber + 1} out of {total}
          </p>
          <div className="flex-row">
            <Button label="previous" onClick={prevPage} />
            <Button label="next" onClick={nextPage} />
          </div>
        </div>
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
        />
      )}
    </div>
  );
};
export default PaginateForm;
