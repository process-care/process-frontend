import { CustomInput as Input } from "components/CreateSurvey/ToolBox/Inputs/Input";
import { CustomTextarea as Textarea } from "components/CreateSurvey/ToolBox/Inputs/Textarea";
import { CustomNumberInput as NumberInput } from "components/CreateSurvey/ToolBox/Inputs/NumberInput";
import { CustomCheckbox as Checkbox } from "components/CreateSurvey/ToolBox/Inputs/Checkbox";
import { CustomRadioBox as Radiobox } from "components/CreateSurvey/ToolBox/Inputs/Radiobox";
import { CustomSelect as Select } from "components/CreateSurvey/ToolBox/Inputs/Select";
import { CustomSlider as Slider } from "components/CreateSurvey/ToolBox/Inputs/Slider";
import Inputs from "interfaces/inputs";

export const renderInput = (input: Inputs): React.ReactNode => {
  // TO DO REFACTO
  console.log("type", input);
  switch (input.type) {
    case "input":
      return (
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
      );
      break;
    case "number-input":
      return (
        <NumberInput
          name="cc"
          id="cc"
          label="Question #1"
          helpText="Voici un champ. 4 valeurs après la virgule."
          precision={4}
        />
      );
      break;
    case "checkbox":
      return (
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
      );
      break;
    case "radio":
      return (
        <Radiobox
          id="sexe"
          label="Quel est votre sexe ?"
          radios={[
            { value: "homme", labelValue: "Homme" },
            { value: "femme", labelValue: "Femme" },
          ]}
        />
      );
      break;
    case "select":
      return (
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
      );
      break;
    case "slider":
      return (
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
      );
      break;
    case "text-area":
      return (
        <Textarea
          name="aa"
          id="aa"
          rows="large"
          label="Question #1"
          placeholder="Input large"
        />
      );
      break;
    case "date-picker":
      return "date picker";
      break;

    default:
      return false;
      break;
  }
};
