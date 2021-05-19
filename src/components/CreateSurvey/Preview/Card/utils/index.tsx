import {
  Input,
  NumberInput,
  Checkbox,
  Radiobox,
  Select,
  Slider,
  Datepicker,
  Textarea,
} from "components/Fields";
import Inputs from "interfaces/inputs";
import React from "react";

import t from "static/input.json";

export const renderInput = (input: Inputs): React.ReactNode => {
  console.log("Input", t);

  switch (input.type) {
    case "input":
      return (
        <>
          <Input
            name={input.id || "input"}
            min_length={input.min_length}
            max_length={input.max_length}
            type="text"
            label={input.label || t.label}
            helpText={input.help_text || t.help_text}
            placeholder={input.placeholder || t.placeholder}
          />
        </>
      );
      break;
    case "number-input":
      return (
        <NumberInput
          placeholder={input.placeholder || t.placeholder}
          name={input.id || "number_input"}
          precision={4}
          label={input.label || t.label}
          helpText={input.help_text || t.help_text}
        />
      );
      break;
    case "checkbox":
      return (
        <Checkbox
          label="Label à remplir"
          helpText="Texte d'aide à remplir"
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
          id="radiobox"
          label="Label à remplir"
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
          label="Label à remplir"
          placeholder="Placeholder à remplir"
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
          id="slider"
          label="Label à remplir"
          min={0}
          max={6}
          step={1}
          defaultValue={2}
          helpText="Texte d'aide à remplir"
          vertical={false}
        />
      );
      break;
    case "text-area":
      return (
        <Textarea
          name="textarea"
          id="textarea"
          rows="large"
          label="Label à remplir"
          placeholder="Placeholder à remplir"
        />
      );
      break;
    case "date-picker":
      return <Datepicker label="Label à remplir" id="datePicker" />;
      break;

    default:
      return false;
      break;
  }
};
