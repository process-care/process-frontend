import IQuestion from "types/form/question";

type Obj = {
  type: IQuestion["type"];
  name: string;
  category: "other" | "simple" | "complex";
  info: string;
};

export const inputs: Obj[] = [
  {
    type: "wysiwyg",
    name: "Zone d'info",
    category: "other",
    info: "Création d’une zone d’information, sans interaction possible de l’utilisateur, pouvant comprendre des images et des styles différents de texte",
  },
  {
    type: "text_area",
    name: "Question texte libre",
    category: "simple",
    info: "Création d’une zone de texte. La taille de la zone définit la taille maximale de la réponse ('Petite': 50 caractères; 'Moyenne': 500 caractères; 'Grande': 5000 caractères)",
  },
  {
    type: "select",
    name: "Question liste déroulante",
    category: "simple",
    info: "Création d’une liste déroulante comprenant de multiples options de réponse. L’utilisateur ne peut sélectionner qu’une seule option de réponse.",
  },
  {
    type: "slider",
    name: "Question curseur",
    category: "simple",
    info: "Création d’une échelle numérique. Les bornes de l’échelle peuvent être fixées par les valeurs minimale et maximale. L’intervalle entre deux graduations est personnalisable",
  },
  {
    type: "number_input",
    name: "Question nombre",
    category: "simple",
    info: "Création d’un champ nombre. Seules des valeurs numériques peuvent être saisies.  Les valeurs autorisées sont fixées par les valeurs minimales et maximales",
  },

  {
    type: "radio",
    name: "Question bouton radio",
    category: "simple",
    info: "Création d’une liste de boutons radios. De multiples options de réponse peuvent être créées mais l’utilisateur ne peut en sélectionner qu’une",
  },
  {
    type: "checkbox",
    name: "Question case à cocher",
    category: "simple",
    info: "Création d’une liste de cases à cocher. De multiples options de réponse peuvent être créées. L’utilisateur peut sélectionner plusieurs options de réponse (à la différence d’un bouton radio)",
  },

  {
    type: "date_picker",
    name: "Question date",
    category: "simple",
    info: "Création d’un champ date",
  },
  {
    type: "free_classification",
    name: "Classification démocratique du texte libre",
    category: "complex",
    info: "Création d’une question de type classification démocratique du texte libre. Cette question comprend deux parties: 1) l’utilisateur répond à une question ouverte via un champ texte; 2) il peut indiquer, parmi X réponses tirées au hasard parmi celles des autres participants [personnalisable en choisissant le nombre de réponses à afficher], lesquelles sont proches de la sienne.",
  },
  {
    type: "mono_thumbnail",
    name: "Vignette simple",
    category: "complex",
    info: "Création d’une vignette, composée de plusieurs facteurs (par exemple taille') chacun pouvant prendre différentes valeurs (par exemple 'grand', 'moyen' et 'petit'). Parmi l’ensemble des combinaisons de facteur/attributs possible, l’utilisateur en évalue une avec la question associée (par exemple: 'Sur une échelle de 0 à 10, évaluez l’importance de la situation présentée avant.')",
  },
  {
    type: "associated_classification",
    name: "Vignette double",
    category: "complex",
    info: "Création d’une question demandant à l’utilisateur de choisir entre deux  vignettes. Chaque vignette est composée de plusieurs facteurs (par exemple taille”) chacun pouvant prendre différentes valeurs (par exemple “grand”, “moyen” et “petit”).",
  },
];

export const getQuestionName = (type: IQuestion["type"]): string => {
  const question = inputs.find((q) => q.type === type);
  return question ? question.name.toLowerCase() : "";
};

export const getQuestionInfo = (type: IQuestion["type"]): string => {
  const question = inputs.find((q) => q.type === type);
  return question ? question.info : "";
};
