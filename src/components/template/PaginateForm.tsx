import { useEffect, useState } from "react";
import { useRequiredProps } from "@nxs-utils/hooks/useRequiredProps";
import { ErrorMessages } from "@nxs-molecules/index";
import { Form, FormNavigation } from "@nxs-organism/index";
import { FormInitValues } from "custom-props";
import { PaginateFormProps } from "nxs-form";

const PaginateForm: React.FC<PaginateFormProps> = (props) => {
  // handle required props errors
  const { order, paginate, responseError, navigationHeading, page, hideNavigation } = props;
  const { previewPage, theme } = props;
  const { onFormSubmit, setNewPage, onPageClick, onCancel } = props;
  const { errors, lightColor, setLightColor, setErrors } = useRequiredProps(
    { paginate },
    true
  );
  // key variables
  const [initialValues, setInitialValues] = useState<FormInitValues>();
  // store form values
  const [values, setValues] = useState<FormInitValues>({});
  const [pageNumber, setPageNumber] = useState<number>(page ? page : 0);
  const current = paginate[pageNumber];
  const formOrder = order ? order : paginate.map((f) => f.formId);
  // const total = formOrder.length;
  const formId = current?.formId;
  const onViewPreview = current?.onViewPreview;
  const heading = current?.heading;
  const addEntry = current?.addEntry;
  const labels = current?.labels;
  const placeholders = current?.placeholders;
  const types = current?.types;
  const submitLabel = current?.submitLabel;
  const schema = current?.schema;
  const fieldHeading = current?.fieldHeading;
  const withFileUpload = current?.withFileUpload;
  const dataList = current?.dataList;
  const previewLabel = current?.previewLabel;

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
        formId && onFormSubmit({ ...values, [formId]: formValues });
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
      formId && setValues({ ...values, [formId]: formValues });
    }
  };
  const onSubmit = () => (current.onSubmit ? current.onSubmit : handlePaginateSubmit);

  const handlePageClick = (nextPage: number) => {
    //  reset initial values to redender form component
    onPageClick && onPageClick();
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
          heading={navigationHeading}
          formOrder={formOrder ? formOrder : []}
          pageNumber={pageNumber}
          onClick={(idx) => handlePageClick(idx)}
        />
      )}
      <div className="preview-container">
        {initialValues && (
          <Form
            initialValues={initialValues}
            onSubmit={onSubmit()}
            formId={formId}
            labels={labels}
            dataList={dataList}
            placeholders={placeholders}
            submitLabel={submitLabel}
            types={types}
            theme={theme}
            withFileUpload={withFileUpload}
            responseError={responseError}
            schema={schema}
            addEntry={addEntry}
            fieldHeading={fieldHeading}
            heading={heading}
            onCancel={onCancel}
            onViewPreview={onViewPreview}
            previewLabel={previewLabel}
          />
        )}
        {previewPage && previewPage}
      </div>
    </div>
  );
};
export default PaginateForm;
