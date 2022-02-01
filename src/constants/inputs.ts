import { Enum_Question_Type } from "api/graphql/types.generated";
import { QuestionRedux } from "redux/slices/types";

type Obj = {
  type: QuestionRedux["attributes"]["type"];
  name: string;
  category: "other" | "simple" | "complex";
  info: string;
};

export const inputs: Obj[] = [
  {
    type: Enum_Question_Type.Wysiwyg,
    name: "Zone d'info",
    category: "other",
    info: "Création d’une zone d’information, sans interaction possible de l’utilisateur, pouvant comprendre des images et des styles différents de texte",
  },
  {
    type: Enum_Question_Type.TextArea,
    name: "Question texte libre",
    category: "simple",
    info: "Création d’une zone de texte. La taille de la zone définit la taille maximale de la réponse (”Petite”: 50 caractères; “Moyenne”: 500 caractères; “Grande”: 5000 caractères)",
  },
  {
    type: Enum_Question_Type.Select,
    name: "Questions liste déroulante",
    category: "simple",
    info: "Création d’une liste déroulante comprenant de multiples options de réponse. L’utilisateur ne peut sélectionner qu’une seule option de réponse.",
  },
  {
    type: Enum_Question_Type.Slider,
    name: "Question curseur",
    category: "simple",
    info: "Création d’une échelle numérique. Les bornes de l’échelle peuvent être fixées par les valeurs minimale et maximale. L’intervalle entre deux graduations est personnalisable",
  },
  {
    type: Enum_Question_Type.NumberInput,
    name: "Question nombre",
    category: "simple",
    info: "Création d’un champ nombre. Seules des valeurs numériques peuvent être saisies.  Les valeurs autorisées sont fixées par les valeurs minimales et maximales",
  },

  {
    type: Enum_Question_Type.Radio,
    name: "Question bouton radio",
    category: "simple",
    info: "Création d’une liste de boutons radios. De multiples options de réponse peuvent être créées mais l’utilisateur ne peut en sélectionner qu’une",
  },
  {
    type: Enum_Question_Type.Checkbox,
    name: "Question case à cocher",
    category: "simple",
    info: "Création d’une liste de cases à cocher. De multiples options de réponse peuvent être créées. L’utilisateur peut sélectionner plusieurs options de réponse (à la différence d’un bouton radio)",
  },

  {
    type: Enum_Question_Type.DatePicker,
    name: "Question date",
    category: "simple",
    info: "Création d’un champ date",
  },
  {
    type: Enum_Question_Type.FreeClassification,
    name: "Classification démocratique du texte libre",
    category: "complex",
    info: "Création d’une question de type classification démocratique du texte libre. Cette question comprend deux parties: 1) l’utilisateur répond à une question ouverte via un champ texte; 2) il peut indiquer, parmi X réponses tirées au hasard parmi celles des autres participants [personnalisable en choisissant le nombre de réponses à afficher], lesquelles sont proches de la sienne.",
  },
  {
    type: Enum_Question_Type.MonoThumbnail,
    name: "Vignette (évaluation d'une seule vignette)",
    category: "complex",
    info: "",
  },
  {
    type: Enum_Question_Type.AssociatedClassification,
    name: "Vignettes (choix parmi deux)",
    category: "complex",
    info: "",
  },
];

export const getQuestionName = (
  type: QuestionRedux["attributes"]["type"]
): string => {
  const question = inputs.find((q) => q.type === type);
  return question ? question.name.toLowerCase() : "";
};

export const getQuestionInfo = (type: IQuestion["type"]): string => {
  const question = inputs.find((q) => q.type === type);
  return question ? question.info : "";
};
