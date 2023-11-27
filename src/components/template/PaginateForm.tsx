import { useEffect, useState } from "react";
import { useRequiredProps } from "@nxs-utils/hooks/useRequiredProps";
import { ErrorMessages } from "@nxs-molecules/index";
import { Form, FormNavigation } from "@nxs-organism/index";
import type { FormValueProps, PaginateFormProps } from "nxs-form";

const PaginateForm: React.FC<PaginateFormProps> = (props) => {
  // handle required props errors
  const { order, paginate, responseError, navigationHeading, page, hideNavigation } = props;
  const { previewPage, theme } = props;
  const { onFormSubmit, setNewPage, onPageClick, onCancel } = props;
  const { errors, lightColor } = useRequiredProps({ paginate }, true);
  // key variables
  const [initialValues, setInitialValues] = useState<FormValueProps>();
  const [pageNumber, setPageNumber] = useState<number>(page || 0);
  const current = paginate[pageNumber];
  const formOrder = order || paginate.map((f) => f.formId);
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
  }, [pageNumber, paginate]);

  const handlePageClick = (nextPage: number) => {
    //  reset initial values to redender form component
    if (onPageClick) onPageClick();
    setInitialValues(undefined);
    setPageNumber(nextPage);
  };

  const handlePaginateSubmit = (formValues: FormValueProps) => {
    const next = formOrder[pageNumber + 1];
    if (onFormSubmit) onFormSubmit({ [formId]: formValues });
    // if next is undefined its the last form
    if (next) {
      const nextPage = formOrder.findIndex((form) => form === next);
      handlePageClick(nextPage);
    }
  };
  const onSubmit = (values: FormValueProps) => {
    if (current.onSubmit) current.onSubmit(values);
    else handlePaginateSubmit(values);
  };

  if (lightColor === "red") {
    return <ErrorMessages errors={errors} component="PaginateForm" />;
  }
  return (
    <div className="container">
      {!hideNavigation && (
        <FormNavigation
          heading={navigationHeading}
          formOrder={formOrder}
          pageNumber={pageNumber}
          onClick={(idx) => handlePageClick(idx)}
        />
      )}
      <div className="paginate-preview-container">
        {initialValues && (
          <Form
            initialValues={initialValues}
            onSubmit={onSubmit}
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
        {previewPage || <div className="empty-container" />}
      </div>
    </div>
  );
};
export default PaginateForm;
