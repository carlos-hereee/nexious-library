import { useEffect, useState } from "react";
import { FormInitValues, KeyStringProp } from "@nxs-utils/helpers/types";
import Form from "../organism/forms/Form";
import { usePropErrorHandling } from "@nxs-utils/hooks/usePropErrorHandling";
import { ErrorMessages } from "@nxs-molecules/index";
import { Button } from "@nxs-atoms/index";

type PaginateFormProps = {
  // required props
  page: number;
  setNewPage: (e: number) => void;
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
  hideNavigation?: boolean;
};

const PaginateForm: React.FC<PaginateFormProps> = (props) => {
  // handle required props errors
  const { order, paginate, onFormSubmit, setNewPage } = props;
  const { page, hideNavigation } = props;
  const requiredProps = { paginate, page, setNewPage, onFormSubmit };
  const { errors, lightColor } = usePropErrorHandling(requiredProps, true);

  // key variables
  const formOrder = order
    ? order
    : paginate.map((form) => (form.formName ? form.formName : ""));
  const total = formOrder.length;
  const formName = paginate[page].formName;
  const heading = paginate[page].heading;
  // set initial values
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
      // reset initial values to rerender form component
      setInitialValues(undefined);
      setNewPage(nextPage);
      // save form values
      setValues({ ...values, [formName]: { ...formValues } });
    }
  };
  const prevPage = () => {
    // reset inital values to rerender component
    setInitialValues(undefined);
    setNewPage(page === 0 ? page : page - 1);
  };
  const nextPage = () => {
    // reset inital values to rerender component
    setInitialValues(undefined);
    setNewPage(page + 1 === total ? page : page + 1);
  };

  if (lightColor === "red") {
    return <ErrorMessages errors={errors} component="PaginateForm" />;
  }
  return (
    <div className="container">
      {!hideNavigation && (
        <div>
          <p>
            Form navigation showing {page + 1} out of {total}
          </p>
          <div className="flex-row">
            <Button name="previous" label="previous" handleClick={prevPage} />
            <Button name="next" label="next" handleClick={nextPage} />
          </div>
        </div>
      )}
      {heading && <h2 className="heading">{heading}</h2>}
      {initialValues && (
        <Form
          initialValues={initialValues}
          onSubmit={(event) => handlePaginateSubmit(event)}
          labels={paginate[page].labels}
          placeholders={paginate[page].placeholders}
          submitLabel={paginate[page].submitLabel}
          types={paginate[page].types}
          theme={paginate[page].theme}
          schema={paginate[page].schema}
          formName={paginate[page].formName}
        />
      )}
    </div>
  );
};
export default PaginateForm;
