import IQuestion from "types/form/question";

type Obj = {
  type: IQuestion["type"];
  name: string;
  category: "other" | "simple" | "complex";
};

export const inputs: Obj[] = [
  {
    type: "wysiwyg",
    name: "Wysiwyg",
    category: "other",
  },
  {
    type: "text_area",
    name: "Question texte libre",
    category: "simple",
  },
  {
    type: "select",
    name: "Questions liste déroulante",
    category: "simple",
  },
  {
    type: "slider",
    name: "Question curseur",
    category: "simple",
  },
  {
    type: "number_input",
    name: "Question nombre",
    category: "simple",
  },

  {
    type: "radio",
    name: "Question bouton radio",
    category: "simple",
  },
  {
    type: "checkbox",
    name: "Question case à cocher",
    category: "simple",
  },

  {
    type: "date_picker",
    name: "Question date",
    category: "simple",
  },
  {
    type: "free_classification",
    name: "Question libre classification",
    category: "complex",
  },
  {
    type: "mono_thumbnail",
    name: "Question par graduation",
    category: "complex",
  },
  {
    type: "associated_classification",
    name: "Question par association",
    category: "complex",
  },
];
