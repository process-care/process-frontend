const commonFieldsInitialValues = {
  type: "",
  name: "",
  label: "",
  help_text: "",
  internal_title: "",
  internal_description: "",
  required: false,
};

const inputFieldsInitialValues = {
  ...commonFieldsInitialValues,
  placeholder: "",
  min_length: "",
  max_length: "",
};

const multipleInputFieldsInitialValues = {
  ...commonFieldsInitialValues,
  answers: [],
};

export const fields: { [type: string]: Record<string, unknown> } = {
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
  "free-classification": {
    ...commonFieldsInitialValues,
    ...inputFieldsInitialValues,
    rows: [],
    freeclassification_responses_count: "",
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
    vertical: false,
    reverse: false,
    min: undefined,
    max: undefined,
    step: undefined,
    default_value: undefined,
  },
  "date-picker": {
    ...multipleInputFieldsInitialValues,
  },
  wysiwyg: {
    internal_title: "",
    internal_description: "",
    wysiwyg: "",
  },
};
