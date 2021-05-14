import React from "react";
import { Textarea, Input } from "components/Fields";

interface Props {
  noPlacehoder?: boolean;
}

const CommonFields: React.FC<Props> = ({ noPlacehoder = false }) => {
  return (
    <>
      <Textarea
        rows="medium"
        label="Label de la question"
        placeholder="Renseigner le label de votre question"
        name="label"
        id="label"
      />
      {!noPlacehoder && (
        <Input
          id="placeholder"
          name="placeholder"
          type="text"
          label="Placeholder de la question"
          placeholder="le placeholder s'affiche ici."
        />
      )}

      <Textarea
        rows="medium"
        label="Champ d'aide de la question"
        placeholder="Renseigner le texte d'aide de votre question.Il s'affichera sous le champ. "
        name="help"
        id="help"
      />
      <Input
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
    </>
  );
};

export default CommonFields;
