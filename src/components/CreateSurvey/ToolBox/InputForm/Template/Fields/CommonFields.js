import React from "react";
import { Textarea, Input } from "components/Fields";

interface Props {
  noPlacehoder?: boolean;
}

export const CommonFields: React.FC<Props> = ({ noPlacehoder = false }) => {
  return (
    <>
      <Textarea
        rows="medium"
        label="Label de la question"
        placeholder="Renseigner le label de votre question"
        name="label"
        id="label"
        isRequired
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
        name="help_text"
        id="help_text"
      />

      <Input
        label="Titre interne de la question"
        placeholder="Renseigner le nom interne de votre question"
        name="internal_title"
        id="internal_title"
        helpText="Ce champ vous permet de donner un titre à la question,il n'est pas visible par les utilisateurs."
        isRequired
      />
      <Textarea
        p="10px 0"
        rows="medium"
        label="Note"
        placeholder="Renseigner une note relative à votre question"
        name="internal_note"
        id="internal_note"
        helpText="Ce champ n'est pas visible par les utilisateurs."
      />
    </>
  );
};
