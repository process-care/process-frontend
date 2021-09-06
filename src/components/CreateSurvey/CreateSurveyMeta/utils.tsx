import {
  Box,
  Flex,
  HStack,
  Tag,
  TagCloseButton,
  TagLabel,
} from "@chakra-ui/react";
import { Select, Textarea } from "components/Fields";
import { CustomCreatableSelect } from "components/Fields/SelectCreatable";

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

export const renderInputs = (step: number) => {
  switch (step) {
    case 1:
      return (
        <Textarea
          appearance="light"
          id="title"
          rows="small"
          placeholder="Titre de l'enquête"
          label="Renseigner le titre de l'enquête"
        />
      );
      break;

    case 2:
      return (
        <Select
          id="language"
          placeholder="Langue de l'enquête"
          label="Renseigner la langue de l'enquête"
          answers={t.language}
        />
      );
      break;
    case 3:
      return (
        <Textarea
          appearance="light"
          id="email"
          rows="small"
          placeholder="Email de contact"
          label="Renseigner l'email de contact"
        />
      );
      break;
    case 4:
      return (
        <Box
          border="1px solid black"
          w="100%"
          borderRadius="5px"
          p="20px 20px 0 20px"
          backgroundColor="white"
        >
          <Textarea
            appearance="light"
            id="description"
            rows="large"
            placeholder="Description"
            label="Renseigner la description de l'enquête"
          />
        </Box>
      );
      break;
    case 5:
      return (
        <CustomCreatableSelect
          id="keywords"
          placeholder="Mots clés publics"
          label="Renseigner les mots clés"
          helpText="Ces mots clés serviront à référencer votre projet sur la page Process.."
          answers={t.keywords}
          isMulti
        />
      );
      break;
    case 6:
      return <p>Multiple Btns</p>;
    // case 6:
    //   return (
    //     <CustomCreatableSelect
    //       id="categories"
    //       placeholder="Catégories du projet"
    //       label="Renseigner les catégories"
    //       helpText="Mots clés servants uniquement à l’organisation du tableau de bord. Séparer les mots avec une virgule."
    //       answers={t.categories}
    //       isMulti
    //     />
    //   );
    default:
      return null;
      break;
  }
};
