import { useEffect, useRef, useState } from "react";
import { useValues } from "@nxs-utils/hooks/useFormValues";
import { DownArrow, IconButton, SubmitButton, UpArrow } from "@nxs-molecules";
import { useFormValidation } from "@nxs-utils/hooks/useFormValidation";
import type { FieldValueProps, FormEntriesHandle, FormInitialValue, FormProps, UseValuesApi } from "nxs-form";
import FormField from "@nxs-molecules/forms/FormField";
import ButtonCancel from "@nxs-atoms/buttons/ButtonCancel";
import { formatFieldEntry, formatInitialFormValues } from "@nxs-utils/form/formatForm";
import {
  formatFilesData,
  formatFilesEntryData,
  formatFormData,
  formatFormEntryData,
  formatPreviewData,
} from "@nxs-utils/form/handleFormSubmit";
import type { OnchangeProps } from "custom-props";
import { ErrorMessage } from "@nxs-atoms";
import { scrollToError } from "@nxs-utils/app/scrollToElement";
import { useScroll } from "@nxs-utils/hooks/useScroll";

// ── Entries handle ──
// FormProps.entriesRef and FormProps.onEntriesChange. Both are opt in: a form passing neither
// never reaches anything below, so its DOM and its submit payload stay exactly what they were.

// The slice of Form state the handle and the summary read. Kept in a ref (see latestStateRef in
// Form) because the handle is called from a consumer's own events and effects, outside any render.
type EntriesState = Pick<UseValuesApi, "values" | "entryValues" | "activeEntry" | "addNewEntry"> & {
  addEntry: FormProps["addEntry"];
};

const hasField = (fieldValues: Record<string, FormInitialValue>, name: string) =>
  Object.prototype.hasOwnProperty.call(fieldValues, name);

// The keys of each declared group's cards, in order, or none when the group is OFF. "On" is the
// test the submit itself applies: formatFormEntryData only emits a group whose first field sits in
// `values`. Unticking a group's toggle drops that field but leaves the old cards in entryValues
// (ticking it again starts a fresh card), so counting entryValues alone would see cards the
// payload never carries. One helper, so the summary, the reads and the writes cannot disagree.
const liveEntryKeys = ({ addEntry, values, entryValues }: EntriesState): Record<string, string[]> => {
  const live: Record<string, string[]> = {};
  Object.values(addEntry || {}).forEach(({ groupName }) => {
    const isOn = values.some((field) => field.groupName === groupName);
    live[groupName] = isOn && entryValues[groupName] ? Object.keys(entryValues[groupName]) : [];
  });
  return live;
};

const summarizeEntries = (state: EntriesState): Record<string, number> => {
  const live = liveEntryKeys(state);
  return Object.fromEntries(Object.keys(live).map((groupName) => [groupName, live[groupName].length]));
};

// Built once per entriesRef, at module level so it cannot close over a render: everything it
// reads comes through `latest`, and everything it writes goes through the Form's own setters. Its
// writes also land in `latest` on the spot, so two calls in one tick (a write to sections, then
// one to buttons) build on each other instead of the second replacing the first with stale state.
const buildEntriesHandle = (
  latest: React.MutableRefObject<EntriesState>,
  setEntries: UseValuesApi["setEntries"],
  setActiveEntry: UseValuesApi["setActiveEntry"]
): FormEntriesHandle => {
  const commitEntries = (next: EntriesState["entryValues"]) => {
    latest.current = { ...latest.current, entryValues: next };
    setEntries(next);
  };

  return {
    readEntries: () => {
      const { entryValues } = latest.current;
      const live = liveEntryKeys(latest.current);
      return Object.fromEntries(
        Object.keys(live).map((groupName) => [
          groupName,
          // formatFormData is the per card shape the submit already sends, so a read and the
          // payload describe a card the same way.
          live[groupName].map((key) => ({ key, values: formatFormData(entryValues[groupName][key]) })),
        ])
      );
    },

    writeEntries: (groupName, updates) => {
      const { entryValues } = latest.current;
      const liveKeys = liveEntryKeys(latest.current)[groupName] || [];
      const group = { ...entryValues[groupName] };
      const written: string[] = [];
      updates.forEach(({ key, values: next }) => {
        if (!liveKeys.includes(key) || !group[key].some((field) => hasField(next, field.name))) return;
        // New field objects, never an in place edit: the active card's inputs repaint only
        // because its array and its changed fields are new references.
        group[key] = group[key].map((field) =>
          hasField(next, field.name) ? { ...field, value: next[field.name] } : field
        );
        if (!written.includes(key)) written.push(key);
      });
      if (written.length) commitEntries({ ...entryValues, [groupName]: group });
      return written;
    },

    appendEntries: (groupName, items) => {
      const { entryValues, activeEntry, addEntry, addNewEntry } = latest.current;
      // addEntry is keyed by the TOGGLE field's name (hasSections) while callers speak the group
      // name (sections), so the group's config is found by what it files its cards under.
      const toggleName = Object.keys(addEntry || {}).find((name) => addEntry?.[name].groupName === groupName);
      const liveKeys = liveEntryKeys(latest.current)[groupName] || [];
      if (!addEntry || !toggleName || !liveKeys.length) return [];
      const { max } = addEntry[toggleName];
      const room = max ? Math.max(max - liveKeys.length, 0) : items.length;
      const group = { ...entryValues[groupName] };
      const added: string[] = [];
      items.slice(0, room).forEach((item) => {
        // The add button's own path, so a new card gets the same sharedKey scheme, field ids,
        // labels and types as one the owner adds by hand.
        const card = addNewEntry({ addEntry: addEntry[toggleName], group: toggleName });
        const { sharedKey } = card[0] || {};
        if (!sharedKey) return;
        group[sharedKey] = card.map((field) =>
          hasField(item, field.name) ? { ...field, value: item[field.name] } : field
        );
        added.push(sharedKey);
      });
      if (!added.length) return added;
      commitEntries({ ...entryValues, [groupName]: group });
      // addNewEntry makes each new card the active one, which is right for the add button and
      // wrong here: the owner keeps looking at the card they were on.
      setActiveEntry(activeEntry);
      return added;
    },
  };
};

const Form: React.FC<FormProps> = (props: FormProps) => {
  const { labels, placeholders, types, responseError, heading, hideSubmit, clearSelection, populateLink } = props;
  const { addEntry, fieldHeading, hideLabels, withFileUpload, dataList, previewLabel, className, entries } = props;
  const { initialValues, submitLabel, schema, disableForm, cancelLabel, formScroll, confirmRemovals, isDev } = props;
  const { submitIcon, onChange, onCancel, onSubmit, onViewPreview, formId, fieldAddons, entriesRef, onEntriesChange } =
    props;
  const { formErrors, validationStatus, validateForm, setStatus, formMessage, checkInverseCheckbox } =
    useFormValidation({ ...schema });

  // key variables
  const { values, entryValues, activeEntry, setValues, setEntries, addNewEntry, setActiveEntry, addExtraEntry } =
    useValues();
  const { direction, handleScroll, showScroll, watchElement } = useScroll();
  // BUG WAS HERE: `|| true` means even confirmRemovals={false} initialised to true.
  // `??` (nullish coalescing) only falls back when the value is undefined or null.
  const [confirmRemoval, setConfirmRemovals] = useState<boolean>(confirmRemovals ?? true);
  // Tracks an in-flight submission so the submit control can be disabled until
  // onSubmit settles. Prevents double-submit (duplicate account/order/merch)
  // when a handler is async and the form stays mounted during the request.
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Where a failed submit lands. Focus moves to the error paragraph when responseError changes to
  // a value, so a keyboard user reaches the problem instead of hunting for it. Keyed on the text,
  // not on every render: re-focusing while the user is already correcting a field would steal the
  // caret from them.
  const responseErrorRef = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    if (responseError) responseErrorRef.current?.focus();
  }, [responseError]);

  // The entries handle answers a consumer between renders, and entryValues is a new object on
  // every set, so a handle that closed over a render would read the cards as they were then (at
  // mount, the empty state before seeding). Refreshing this ref on every render is what makes
  // readEntries read the current cards and writeEntries build on them.
  const latestStateRef = useRef<EntriesState>({ values, entryValues, activeEntry, addEntry, addNewEntry });
  latestStateRef.current = { values, entryValues, activeEntry, addEntry, addNewEntry };

  useEffect(() => {
    if (!entriesRef) return undefined;
    entriesRef.current = buildEntriesHandle(latestStateRef, setEntries, setActiveEntry);
    return () => {
      entriesRef.current = null;
    };
  }, [entriesRef]);

  // The summary last reported, serialized. Every keystroke in a card replaces entryValues and
  // reruns the effect below, so it compares counts and stays quiet unless one moved; a consumer
  // pricing by card count hears about cards, never about typing. A ref, not state: reporting must
  // never re-render Form.
  const reportedSummaryRef = useRef<string | null>(null);
  useEffect(() => {
    // values is empty only before the mount effect seeds the form, so the first report carries
    // the seeded cards rather than a summary of nothing.
    if (!onEntriesChange || !values.length) return;
    const summary = summarizeEntries({ values, entryValues, activeEntry, addEntry, addNewEntry });
    const serialized = JSON.stringify(summary);
    if (serialized === reportedSummaryRef.current) return;
    reportedSummaryRef.current = serialized;
    onEntriesChange(summary);
  }, [values, entryValues]);


  useEffect(() => {
    if (initialValues) {
      const formatValues = formatInitialFormValues(initialValues);
      const oldValues = formatFieldEntry({ formatValues, labels, types, placeholders });
      // add entry values if any
      if (addEntry && entries) addExtraEntry({ oldValues, addEntry, entries });
      setValues(oldValues);
    }
    if (formScroll) watchElement("form-field-container", { height: 900 });
  }, []);

  useEffect(() => {
    if (validationStatus === "green") {
      // BUG WAS HERE: throwing inside useEffect crashes the entire component tree with no
      // recovery path. Log the error and bail gracefully instead.
      if (!onSubmit) {
        console.error("Form: onSubmit prop is required to handle form submission.");
        setStatus(null);
        return;
      }
      // Disable the submit control while onSubmit is in flight so a second
      // click cannot fire a duplicate submission. await works whether the
      // handler returns a promise or a plain value; isSubmitting flips back in
      // finally either way, and setStatus(null) still resets the cycle.
      const runSubmit = async () => {
        setIsSubmitting(true);
        try {
          // Promise.resolve wraps the handler's return so this awaits correctly
          // whether onSubmit is async (real promise) or sync (void), and it
          // keeps the await-thenable lint rule satisfied for a void-typed prop.
          if (!withFileUpload && !addEntry) await Promise.resolve(onSubmit(formatFormData(values)));
          else if (!withFileUpload && addEntry)
            await Promise.resolve(onSubmit(formatFormEntryData(values, entryValues)));
          else if (withFileUpload && !addEntry)
            await Promise.resolve(onSubmit(formatFilesData(values, new FormData())));
          else if (withFileUpload && addEntry)
            await Promise.resolve(onSubmit(formatFilesEntryData(values, entryValues)));
        } finally {
          setIsSubmitting(false);
          setStatus(null);
        }
      };
      void runSubmit();
    }
    if (validationStatus === "preview") {
      if (onViewPreview) onViewPreview(formatPreviewData(values));
      setStatus(null);
    }
    // scroll to error if validation failed
    if (validationStatus === "error") scrollToError(formErrors);
  }, [validationStatus]);

  const handleEntryChange = (target: FormInitialValue, groupName: string, id: string) => {
    // find field key
    const entryKey = activeEntry[groupName];
    // update field value
    const entryField = entryValues[groupName][entryKey];
    const idx = entryField.findIndex((val) => val.fieldId === id);
    if (entryField[idx]) {
      entryField[idx].value = target;
      setEntries({ ...entryValues, [groupName]: { ...entryValues[groupName], [entryKey]: entryField } });
    }
  };
  const handleChange = (field: FieldValueProps, target: FormInitialValue, id: string) => {
    const { groupName, sharedKey } = field;
    if (entryValues && groupName && sharedKey) handleEntryChange(target, groupName, id);
    else {
      const oldValues = [...values];
      const idx = oldValues.findIndex((val) => val.fieldId === id);
      oldValues[idx].value = target;
      // check schema if value is required for validation
      if (validationStatus === "error") validateForm(oldValues);
      if (onChange) onChange(oldValues[idx].value);
      setValues(oldValues);
    }
  };
  const inverseCheckbox = (targets: string[], targetValue: boolean, oldValues: FieldValueProps[]) => {
    return oldValues.map((val) => {
      // update checkbox value for each match found
      if (targets.includes(val.name)) {
        return { ...val, value: targetValue };
      }
      return val;
    });
  };
  const handleCheckbox = (event: OnchangeProps, field: FieldValueProps, idx: number) => {
    const { name } = field;
    // key variables
    const isChecked: boolean = event.currentTarget.checked;
    // update values
    let oldValues = [...values];
    oldValues[idx].value = isChecked;
    oldValues = checkInverseCheckbox({ oldValues, current: field, inverseCheckbox });
    // if the checkbox is checked add entries
    if (isChecked && addEntry) {
      const fieldEntry = addNewEntry({ addEntry: addEntry[name], group: name });
      const { groupName, sharedKey } = fieldEntry[0];
      if (groupName && sharedKey) {
        const newIdx = oldValues.findIndex((d) => d.name === name);
        const numCount = oldValues.filter((d) => d.groupName === groupName);
        // keep everything together; 0 is the number of element to be deleted
        oldValues.splice(newIdx + numCount.length + 1, 0, fieldEntry[0]);
        setEntries({ ...entryValues, [groupName]: { [sharedKey]: fieldEntry } });
      }
      setValues(oldValues);
    } else if (!addEntry) setValues(oldValues);
    else {
      // TODO: ADD SCHEMA REMOVAL CONFIRMATION
      const removalTarget = addEntry[name].groupName;
      // when button is unchecked removed all field created by checkbox
      const removalList = oldValues.filter((val) => val.groupName !== removalTarget);
      setValues(removalList);
    }
  };

  const handleSubmit = (formProps: React.FormEvent<HTMLFormElement>) => {
    formProps.preventDefault();
    // check validation status to contine
    if (validationStatus === "error" || !validationStatus) validateForm(values, "green");
    if (validationStatus === "validated") validateForm(values, "green");
  };
  const handleMultiplyClick = (e: FieldValueProps) => {
    if (addEntry && e.group) {
      const fieldEntry = addNewEntry({ addEntry: addEntry[e.group], group: e.group });
      const { groupName, sharedKey } = fieldEntry[0];
      if (groupName && sharedKey) {
        // // add new entry to list
        if (entryValues[groupName]) {
          setEntries({
            ...entryValues,
            [groupName]: { ...entryValues[groupName], [sharedKey]: fieldEntry },
          });
        } else setEntries({ ...entryValues, [groupName]: { [sharedKey]: fieldEntry } });
      }
    }
  };

  const handleViewPreview = () => {
    // Request the "preview" status explicitly. validateForm only honors a passed status
    // when there are no errors (useFormValidation maps any errors to "error"), so a clean
    // form transitions to "preview", which the submit effect handles to fire onViewPreview.
    // Previously both branches called validateForm(values) with no status, so the status
    // never became "preview" and the onViewPreview callback was unreachable dead code.
    validateForm(values, "preview");
  };

  const handleRemovalClick = (groupName: string, idx: number) => {
    const entryKey = activeEntry[groupName];
    const fieldEntry = entryValues[groupName][entryKey];

    // BUG WAS HERE: `delete entryValues[groupName][entryKey]` mutated the state object
    // directly. React compares references, so it couldn't detect the change and components
    // wouldn't re-render. Fix: build a new copy and delete from that.
    const updatedGroup = { ...entryValues[groupName] };
    delete updatedGroup[entryKey];

    if (Object.keys(updatedGroup).length === 0) {
      const { group } = fieldEntry[0];
      const valuesIdx = values.findIndex((val) => val.name === group);
      // BUG WAS HERE: `values[valuesIdx].value = false` mutated state directly.
      // Fix: use map to produce a new array with the updated item.
      const removedField = values
        .map((val, i) => (i === valuesIdx ? { ...val, value: false } : val))
        .filter((val) => val.group !== group);
      setValues(removedField);
    } else {
      const entryList = Object.keys(updatedGroup);
      if (entryList[idx]) setActiveEntry({ [groupName]: entryList[idx] });
      else setActiveEntry({ [groupName]: entryList[idx - 1] });
    }
    setEntries({ ...entryValues, [groupName]: updatedGroup });
  };
  if (!initialValues)
    return (
      <ErrorMessage
        isDev={isDev}
        error={{ code: "missingInitialValues", prop: "initialValues", value: initialValues, component: "Form" }}
      />
    );

  return (
    <form
      id={formId}
      className={className}
      onSubmit={handleSubmit}
      encType={withFileUpload ? "multipart/form-data" : undefined}
    >
      {heading && <h2 className="heading">{heading}</h2>}
      {/* role="alert" announces the failed submit the moment it renders and the focus move lands a
          keyboard user on it; before this the paragraph was silent, and this one element is every
          form on the platform (the client wrappers AccountForm, AppForm, CalendarForm, MediaForm,
          StoreForm twice and TaskboardForm all feed it: login, sign up, recovery, app create and
          edit, events, posts, store, merch, taskboards). tabIndex -1 keeps it out of the tab order
          while still focusable; the classname stays because client CSS targets it. */}
      {responseError && (
        <p ref={responseErrorRef} className="error-message" role="alert" tabIndex={-1}>
          {responseError}
        </p>
      )}
      <div className={formScroll ? "form-field-container" : "form-field-container no-scroll"} id="form-field-container">
        {showScroll.up && <UpArrow onClick={() => handleScroll("up", "form-field-container")} active={direction} />}
        {showScroll.down && (
          <DownArrow onClick={() => handleScroll("down", "form-field-container")} active={direction} />
        )}
        {values.map((field, keyIdx) => (
          // fieldAddons is keyed by the field NAME a consumer's config speaks, never by the
          // generated fieldId that keys everything else in this list. FormField's entry branch
          // drops the value for a repeating group.
          <FormField
            key={field.fieldId}
            fieldId={field.fieldId}
            name={field.name}
            type={field.type}
            value={field.value}
            isEntry={!!(addEntry && field.group && addEntry[field.group])}
            entry={addEntry && addEntry[field.group || ""]}
            entries={entryValues[field.groupName || ""]}
            activeEntry={activeEntry[field.groupName || ""]}
            className={className}
            placeholder={field.placeholder}
            hideLabels={hideLabels}
            confirmRemoval={confirmRemoval}
            populateLink={populateLink?.[field.name]}
            dataList={dataList}
            label={field.label}
            addon={fieldAddons?.[field.name]}
            formError={formErrors[field.fieldId]}
            formMessage={formMessage[field.name]}
            handleChange={(value: FormInitialValue, id?: string) => handleChange(field, value, id || field.fieldId)}
            handleCheckbox={(e: OnchangeProps) => handleCheckbox(e, field, keyIdx)}
            fieldHeading={fieldHeading}
            canMultiply={field.canMultiply}
            clearSelection={clearSelection}
            disableForm={disableForm}
            onMultiplyClick={() => handleMultiplyClick(field)}
            onRemovalClick={handleRemovalClick}
            setActiveEntry={(n) => setActiveEntry({ ...activeEntry, ...n })}
            setConfirmRemovals={(confirm: boolean) => setConfirmRemovals(confirm)}
          />
        ))}
      </div>
      {onCancel || onViewPreview ? (
        <div className="buttons-container">
          {onCancel && <ButtonCancel onClick={onCancel} className="btn-main" label={cancelLabel} />}
          {!hideSubmit && (
            <SubmitButton label={submitLabel} isDisable={disableForm || isSubmitting} icon={submitIcon} />
          )}
          {onViewPreview && (
            <IconButton
              icon={{ icon: submitIcon || "eye", label: previewLabel }}
              className="btn-main"
              onClick={handleViewPreview}
            />
          )}
        </div>
      ) : (
        !hideSubmit && (
          <SubmitButton
            label={submitLabel}
            isDisable={disableForm || isSubmitting}
            icon={submitIcon}
            className="form-submit-btn"
          />
        )
      )}
    </form>
  );
};
export default Form;
