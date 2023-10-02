const commonFieldsInitialValues = {
  type: "",
  name: "",
  label: "",
  help_text: "",
  internal_title: "",
  required: false,
};

const inputFieldsInitialValues = {
  ...commonFieldsInitialValues,
  placeholder: "",
  min: "",
  max: "",
};

const multipleInputFieldsInitialValues = {
  ...commonFieldsInitialValues,
  answers: [],
};

export const fields: { [type: string]: Record<string, unknown> } = {
  input: {
    id: "",
    attributes: {
      ...commonFieldsInitialValues,
      ...inputFieldsInitialValues,
      units: "",
    },
  },
  number_input: {
    id: "",
    attributes: {
      ...commonFieldsInitialValues,
      ...inputFieldsInitialValues,
      units: "",
    },
  },
  text_area: {
    id: "",
    attributes: {
      ...commonFieldsInitialValues,
      ...inputFieldsInitialValues,
      rows: [],
    },
  },
  free_classification: {
    id: "",
    attributes: {
      ...commonFieldsInitialValues,
      ...inputFieldsInitialValues,
      rows: [],
      freeclassification_responses_count: "",
    },
  },
  associated_classification: {
    id: "",
    attributes: {
      ...commonFieldsInitialValues,
      ...inputFieldsInitialValues,
    },
  },

  checkbox: {
    id: "",
    attributes: {
      ...multipleInputFieldsInitialValues,
    },
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
  date_picker: {
    ...multipleInputFieldsInitialValues,
  },
  wysiwyg: {
    internal_title: "",
    internal_description: "",
    infozone: "",
  },
};
