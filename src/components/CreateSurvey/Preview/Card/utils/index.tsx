import { CustomInput as Input } from "components/Fields/Input";
import { CustomTextarea as Textarea } from "components/Fields/Textarea";
import { CustomNumberInput as NumberInput } from "components/Fields/NumberInput";
import { CustomCheckbox as Checkbox } from "components/Fields/Checkbox";
import { CustomRadioBox as Radiobox } from "components/Fields/Radiobox";
import { CustomSelect as Select } from "components/Fields/Select";
import { CustomSlider as Slider } from "components/Fields/Slider";
import Inputs from "interfaces/inputs";

export const renderInput = (input: Inputs): React.ReactNode => {
  // TO DO REFACTO

  switch (input.type) {
    case "input":
      return (
        <Input
          name="dd"
          id="dd"
          min_length={2}
          max_length={4}
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
