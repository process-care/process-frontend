import { Enum_Question_Type } from "api/graphql/types.generated";
import { QuestionRedux } from "redux/slices/types";

type Obj = {
  type: QuestionRedux["attributes"]["type"];
  name: string;
  category: "other" | "simple" | "complex";
};

export const inputs: Obj[] = [
  {
    type: Enum_Question_Type.Wysiwyg,
    name: "Wysiwyg",
    category: "other",
  },
  {
    type: Enum_Question_Type.TextArea,
    name: "Question texte libre",
    category: "simple",
  },
  {
    type: Enum_Question_Type.Select,
    name: "Questions liste déroulante",
    category: "simple",
  },
  {
    type: Enum_Question_Type.Slider,
    name: "Question curseur",
    category: "simple",
  },
  {
    type: Enum_Question_Type.NumberInput,
    name: "Question nombre",
    category: "simple",
  },

  {
    type: Enum_Question_Type.Radio,
    name: "Question bouton radio",
    category: "simple",
  },
  {
    type: Enum_Question_Type.Checkbox,
    name: "Question case à cocher",
    category: "simple",
  },

  {
    type: Enum_Question_Type.DatePicker,
    name: "Question date",
    category: "simple",
  },
  {
    type: Enum_Question_Type.FreeClassification,
    name: "Classification démocratique du texte libre",
    category: "complex",
  },
  {
    type: Enum_Question_Type.MonoThumbnail,
    name: "Vignette (évaluation d'une seule vignette)",
    category: "complex",
  },
  {
    type: Enum_Question_Type.AssociatedClassification,
    name: "Vignettes (choix parmi deux)",
    category: "complex",
  },
];

export const getQuestionName = (
  type: QuestionRedux["attributes"]["type"]
): string => {
  const question = inputs.find((q) => q.type === type);
  return question ? question.name.toLowerCase() : "";
};
