const commonFieldsInitialValues = {
  label: "",
  help_text: "",
  internal_title: "",
  internal_description: "",
  required: true,
};

const inputFieldsInitialValues = {
  ...commonFieldsInitialValues,
  placeholder: "",
  min_length: "",
  max_length: "",
};

const multipleInputFieldsInitialValues = {
  ...commonFieldsInitialValues,
  options: [{}],
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
    orientation: "",
    min: "",
    max: "",
    step: "",
    default_value: "",
  },
  "date-picker": {
    ...multipleInputFieldsInitialValues,
  },
};
