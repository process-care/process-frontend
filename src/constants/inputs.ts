import IInputs from "interfaces/inputs";

export const inputs: IInputs[] = [
  {
    input_type: "text-area",
    name: "Question texte",
  },
  {
    input_type: "number-input",
    name: "Question nombre",
  },
  {
    input_type: "checkbox",
    name: "Question case à cocher",
  },
  {
    input_type: "select",
    name: "Questions liste déroulante",
  },
  {
    input_type: "radio",
    name: "Question bouton radio",
  },

  {
    input_type: "slider",
    name: "Question curseur",
  },
  {
    input_type: "date-picker",
    name: "Question date",
  },
  {
    input_type: "wysiwyg",
    name: "Wysiwyg",
  },
];
