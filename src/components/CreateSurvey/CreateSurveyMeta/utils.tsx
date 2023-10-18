import { FormikErrors } from "formik";

import { Enum_Question_Rows } from "@/api/graphql/types.generated.ts"
import { Input, Select, Textarea } from "@/components/Fields/index.ts"
import { SurveyBuilder } from "@/redux/slices/surveyBuilderOLD/index.tsx"

// TODO : Get the list of all the tags from the backend
const t = {
  language: [
    { label: "Français", value: "Français" },
    { label: "Anglais", value: "Anglais" },
    { label: "Allemand", value: "Allemand" },
  ],
  keywords: [
    { label: "Médecine générale", value: "Médecine générale" },
    { label: "Pédiatrie", value: "Pédiatrie" },
    { label: "Epidémiologie", value: "Epidémiologie" },
    { label: "Neuro-chirurgie", value: "Neuro-chirurgie" },
    { label: "Dentaire", value: "Dentaire" },
  ],
  categories: [
    { label: "Recherche structurelle", value: "Recherche structurelle" },
    { label: "En dévéloppement", value: "En dévéloppement" },
    { label: "En phase de test", value: "En phase de test" },
    { label: "ENS 89", value: "ENS 89" },
    { label: "ADN RNME", value: "ADN RNME" },
  ],
};

// Need to create this two Inout here to fix the mount pb (loose of default value)
const KeyWords = () => {
  return (
    <Select
      appearance="big"
      id="keywords"
      placeholder="Mots clés publics"
      label="Renseigner les mots clés"
      helpText="Ces mots clés serviront à référencer votre projet sur la page Process, ils sont publiques."
      answers={t.keywords}
      defaultValue={t.keywords[0].value}
    />
  );
};

const Language = () => {
  return (
    <Select
      appearance="big"
      id="language"
      placeholder="Langue du projet"
      label="Renseigner la langue du projet"
      answers={t.language}
      defaultValue={t.language[0].value}
      helpText="Langue affichée dans votre projet"
    />
  );
};

export const renderInputs = (step: number): React.ReactElement => {
  switch (step) {
    case 1:
      return (
        <Input appearance="big" name="title" placeholder="Titre du projet" label="Renseigner le titre du projet" />
      );
      break;
    case 2:
      return (
        <Input appearance="big" name="slug" placeholder="Url du projet" label="Valider ou modifier l'url du projet" />
      );
      break;
    case 3:
      return (
        <Textarea
          appearance="big"
          id="description"
          rows={Enum_Question_Rows.Medium}
          placeholder="Description du projet"
          label="Renseigner la description du projet"
          helpText="Description publique, affichée aux utilisateurs de PROCESS. 500 signes max"
        />
      );
      break;

    case 4:
      return <KeyWords />;
      break;
    case 5:
      return <Language />;
      break;
    case 6:
      return (
        <Input appearance="big" name="email" placeholder="Email de contact" label="Renseigner l'email de contact" />
      );
      break;

    default:
      return <></>;
      break;
  }
};

export const checkValidity = (
  step: number,
  values: SurveyBuilder["survey"],
  errors: FormikErrors<SurveyBuilder["survey"]>
): boolean => {
  const { title, description, keywords, language, email, slug } = values;

  if (step === 1) {
    return title !== "" && !errors.title;
  }
  if (step === 2) {
    return slug !== "" && !errors.slug;
  }
  if (step === 3) {
    return description !== "" && !errors.description;
  }
  if (step === 4 && keywords) {
    return keywords?.length !== 0 && !errors.keywords;
  }
  if (step === 5) {
    return language !== "" && !errors.language;
  }
  if (step === 6) {
    return email !== "" && !errors.email;
  } else return false;
};
