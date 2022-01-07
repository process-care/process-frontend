import IQuestion from "types/form/question";

type Obj = {
  type: IQuestion["type"];
  name: string;
};

export const inputs: Obj[] = [
  {
    type: "wysiwyg",
    name: "Wysiwyg",
  },
  {
    type: "text_area",
    name: "Question texte libre",
  },
  {
    type: "select",
    name: "Questions liste déroulante",
  },
  {
    type: "slider",
    name: "Question curseur",
  },
  {
    type: "number_input",
    name: "Question nombre",
  },

  {
    type: "radio",
    name: "Question bouton radio",
  },
  {
    type: "checkbox",
    name: "Question case à cocher",
  },

  {
    type: "date_picker",
    name: "Question date",
  },
  {
    type: "free_classification",
    name: "Question libre classification",
  },
  {
    type: "mono_thumbnail",
    name: "Question par graduation",
  },
  {
    type: "associated_classification",
    name: "Question par association",
  },
];
