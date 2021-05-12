import React from "react";
import { Switch, Textarea } from "components/Fields";

interface Props {
  hideRequiredFields?: boolean;
}

const CommonFields: React.FC<Props> = ({ hideRequiredFields = false }) => {
  return (
    <>
      <Textarea
        rows="small"
        label="Label"
        placeholder="Renseigner le label de votre question"
        name="label"
        id="label"
      />
      <Textarea
        p="10px 0"
        rows="medium"
        label="Champ d'aide"
        placeholder="Renseigner le texte d'aide de votre question. "
        name="help"
        id="help"
      />
      <Textarea
        p="10px 0"
        rows="small"
        label="Nom interne de la question"
        placeholder="Renseigner le nom interne de votre question"
        name="internalDescription"
        id="internalDescription"
        helpText="Ce champ vous permet de donner un titre à la question,il n'est pas visible par les utilisateurs."
      />
      <Textarea
        p="10px 0"
        rows="medium"
        label="Note"
        placeholder="Renseigner une note relative à votre question"
        name="internalNote"
        id="internalNote"
        helpText="Ce champ n'est pas visible par les utilisateurs."
      />
      {!hideRequiredFields && (
        <Switch p="20px 0" label="Réponse obligatoire" id="required" />
      )}
    </>
  );
};

export default CommonFields;
