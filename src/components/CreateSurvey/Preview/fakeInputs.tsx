import React from "react";
import {
  Input,
  Textarea,
  NumberInput,
  Checkbox,
  Radiobox,
  Select,
  Slider,
} from "components/Fields";

export const MockInput: React.FC = () => {
  return (
    <>
      <Textarea
        name="aa"
        id="aa"
        rows="small"
        minLength={2}
        maxLength={4}
        label="Question #1"
        helpText="Voici un texte d'aide - Maximum 4 charactères."
        placeholder="Input small"
      />
      <Checkbox
        label="Quel fruit mangez-vous ?"
        checkbox={[
          { id: "aaa", value: "pomme", labelValue: "Pomme" },
          { id: "bbb", value: "fraise", labelValue: "Fraise" },
          { id: "ccc", value: "framboise", labelValue: "Framboise" },
          { id: "ddd", value: "poire", labelValue: "Poire" },
          { id: "eee", value: "ananas", labelValue: "Ananas" },
        ]}
      />
      <Radiobox
        id="sexe"
        label="Quel est votre sexe ?"
        radios={[
          { value: "homme", labelValue: "Homme" },
          { value: "femme", labelValue: "Femme" },
        ]}
      />
      <Textarea
        name="aa"
        id="aa"
        rows="medium"
        label="Question #1"
        placeholder="Input medium"
      />

      <Select
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
      />
      <Slider
        id="aa"
        label="Comment vous sentez-vous ?"
        min={0}
        max={6}
        step={1}
        defaultValue={2}
        helpText="De 1 à 6,  6 étant très bien."
        vertical={false}
      />
      <Slider
        id="aa"
        label="Comment vous sentez-vous à l'envers ?"
        min={0}
        max={20}
        step={1}
        defaultValue={4}
        vertical={false}
        reverse
      />
      <Textarea
        name="aa"
        id="aa"
        rows="large"
        label="Question #1"
        placeholder="Input large"
      />
      <NumberInput
        name="bb"
        id="bb"
        isRequired
        min={2}
        max={15}
        defaultValue="10"
        label="Question #1"
        helpText="Voici un champ avec valeur 10 par défaut - Minum 2 et Maximum 15."
        inputRightAddon="cm"
      />
      <NumberInput
        name="cc"
        id="cc"
        label="Question #1"
        helpText="Voici un champ. 4 valeurs après la virgule."
        precision={4}
      />
      <Input
        name="dd"
        id="dd"
        minLength={2}
        maxLength={4}
        label="Question #"
        type="email"
        helpText="Voici un texte d'aide - Maximum 4 charactères."
        placeholder="Votre réponse ici à la question 1"
      />
      <Input
        name="ee"
        id="ee"
        type="text"
        label="Question #2"
        placeholder="Votre réponse ici à la question 2"
      />
      <Input
        name="ff"
        id="ff"
        type="password"
        label="Mot de passe"
        placeholder="Votre mot de passe"
      />
      <Input
        type="text"
        label="Nombre de kilomètres"
        placeholder="Votre réponse ici à la question 4"
        inputRightAddon="km"
        id="km"
        name="km"
      />
    </>
  );
};
