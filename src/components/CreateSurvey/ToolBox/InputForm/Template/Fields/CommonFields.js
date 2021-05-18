import React from "react";
import { Textarea, Input } from "components/Fields";

interface Props {
  noPlacehoder?: boolean;
}

export const CommonFields: React.FC<Props> = ({ noPlacehoder = false }) => {
  return (
    <>
      {/* <Slider
        id="SLider"
        label="Comment vous sentez-vous ?"
        min={0}
        max={6}
        step={1}
        defaultValue={2}
        helpText="De 1 à 6,  6 étant très bien."
        vertical={false}
      />
      <Select
        isMulti
        id="aa"
        label="Question #1"
        placeholder="Choisissez un fruit"
        options={[
          { value: "pomme", label: "Pomme" },
          { value: "fraise", label: "Fraise" },
          { value: "framboise", label: "Framboise" },
          { value: "poire", label: "Poire" },
          { value: "ananas", label: "Ananas" },
        ]}
        helpText="Select avec plusieurs valeurs selectionnable"
      /> */}
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
        name="help_text"
        id="help_text"
      />

      <Input
        label="Titre interne de la question"
        placeholder="Renseigner le nom interne de votre question"
        name="internal_title"
        id="internal_title"
        helpText="Ce champ vous permet de donner un titre à la question,il n'est pas visible par les utilisateurs."
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
