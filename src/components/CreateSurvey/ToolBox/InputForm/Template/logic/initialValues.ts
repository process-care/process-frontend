const commonFieldsInitialValues = {
  label: "",
  help_text: "",
  internal_title: "",
  internal_description: "",
};

const inputFieldsInitialValues = {
  ...commonFieldsInitialValues,
  placeholder: "",
  min_length: "",
  max_length: "",
};

const multipleInputFieldsInitialValues = {
  ...commonFieldsInitialValues,
  responses: [],
};

export const fields = {
  input: {
    ...commonFieldsInitialValues,
    ...inputFieldsInitialValues,
    units: "",
  },
  "number-input": {
    ...commonFieldsInitialValues,
    ...inputFieldsInitialValues,
    units: "",
  },
  "text-area": {
    ...commonFieldsInitialValues,
    ...inputFieldsInitialValues,
    rows: [],
  },
  checkbox: {
    ...multipleInputFieldsInitialValues,
  },
  radio: {
    ...multipleInputFieldsInitialValues,
  },
  select: {
    ...multipleInputFieldsInitialValues,
  },
  slider: {
    ...multipleInputFieldsInitialValues,
  },
  "date-picker": {
    ...multipleInputFieldsInitialValues,
  },
};
