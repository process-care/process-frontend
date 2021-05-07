import React from "react";
import { CustomInput as Input } from "components/CreateSurvey/ToolBox/Inputs/Input";
import { CustomTextarea as Textarea } from "components/CreateSurvey/ToolBox/Inputs/Textarea";
import { CustomNumberInput as NumberInput } from "components/CreateSurvey/ToolBox/Inputs/NumberInput";
import { CustomCheckbox as Checkbox } from "components/CreateSurvey/ToolBox/Inputs/Checkbox";

export const MockInput: React.FC = () => {
  return (
    <>
      <Textarea
        name="aa"
        id="aa"
        rows="small"
        minLength="2"
        maxLength="4"
        label="Question #1"
        helpText="Voici un texte d'aide - Maximum 4 charactères."
        placeholder="Input small"
      />
      <Checkbox label="Quel fruit mangez-vous ?" />
      <Textarea
        name="aa"
        id="aa"
        rows="medium"
        label="Question #1"
        placeholder="Input medium"
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
        min="2"
        max="15"
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
        precision="4"
      />
      <Input
        name="dd"
        id="dd"
        minLength="2"
        maxLength="4"
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
      />
    </>
  );
};
