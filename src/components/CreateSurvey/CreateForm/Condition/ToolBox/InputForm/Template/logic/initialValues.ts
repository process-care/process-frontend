const commonFieldsInitialValues = {
  type: '',
  type_name: '',
  label: '',
  help_text: '',
  internal_title: '',
  required: false,
};

const inputFieldsInitialValues = {
  ...commonFieldsInitialValues,
  placeholder: '',
  min: '',
  max: '',
};

const multipleInputFieldsInitialValues = {
  ...commonFieldsInitialValues,
  options: [],
};

export const fields: { [type: string]: Record<string, unknown> } = {
  input: {
    ...commonFieldsInitialValues,
    ...inputFieldsInitialValues,
    units: '',
  },
  number_input: {
    ...commonFieldsInitialValues,
    ...inputFieldsInitialValues,
    units: '',
  },
  text_area: {
    ...commonFieldsInitialValues,
    ...inputFieldsInitialValues,
    rows: [],
  },
  free_classification: {
    ...commonFieldsInitialValues,
    ...inputFieldsInitialValues,
    rows: [],
    freeclassification_responses_count: "",
  },
  associated_classification: {
    ...commonFieldsInitialValues,
    ...inputFieldsInitialValues,
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
    ...inputFieldsInitialValues,
    vertical: false,
    reverse: false,
    step: '',
    default_value: undefined,
  },
  date_picker: {
    ...inputFieldsInitialValues,
  },
  wysiwyg: {
    internal_title: '',
    internal_description: '',
    infozone: '',
  },
}
