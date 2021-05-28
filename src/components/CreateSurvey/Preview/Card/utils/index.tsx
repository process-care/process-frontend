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
import { Wysiwyg } from "components/Fields/Wysiwyg";
import IInput from "interfaces/form/input";
import React from "react";
import { useAppSelector } from "redux/hooks";

import t from "static/input.json";

interface Options {
  value: string | undefined;
  label: string | undefined;
}

export const renderInput = (input: IInput): React.ReactNode => {
  const isCollapsed = useAppSelector(
    (state) => state.formBuilder.is_collapse_view
  );
  const formatOptions = (): Options[] | undefined => {
    if (input.options) {
      const arr = [];
      for (const [, value] of Object.entries(input.options)) {
        arr.push({ value, label: value });
      }
      return arr;
    }
  };
  switch (input.input_type) {
    case "input":
      return (
        <>
          <Input
            isCollapsed={isCollapsed}
            isRequired={input.required}
            name={input.id || "input"}
            min_length={input.min_length}
            max_length={input.max_length}
            type="text"
            label={input.label || t.label}
            helpText={input.help_text || t.help_text}
            placeholder={input.placeholder || t.placeholder}
            inputRightAddon={input.units}
          />
        </>
      );
      break;
    case "number-input":
      return (
        <NumberInput
          isCollapsed={isCollapsed}
          isRequired={input.required}
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
          isCollapsed={isCollapsed}
          id={input.id || "checkbox"}
          isRequired={input.required}
          label={input.label || t.label}
          helpText={input.help_text || t.help_text}
          checkbox={formatOptions()}
        />
      );
      break;
    case "radio":
      return (
        <Radiobox
          helpText={input.help_text || t.help_text}
          isCollapsed={isCollapsed}
          isRequired={input.required}
          id={input.id || "radiobox"}
          label={input.label || t.label}
          radios={formatOptions()}
        />
      );
      break;
    case "select":
      return (
        <Select
          isCollapsed={isCollapsed}
          id={input.id || "select"}
          label={input.label || t.label}
          placeholder={input.placeholder || t.placeholder}
          options={formatOptions()}
          helpText={input.help_text || t.help_text}
        />
      );
      break;
    case "slider":
      return (
        <Slider
          isCollapsed={isCollapsed}
          isRequired={input.required}
          id={input.id || "slider"}
          label={input.label || t.label}
          min={input.min}
          max={input.max}
          step={input.step}
          defaultValue={input.default_value}
          helpText={input.help_text || t.help_text}
          vertical={input.vertical}
          reverse={input.reverse}
        />
      );
      break;
    case "text-area":
      return (
        <Textarea
          isCollapsed={isCollapsed}
          isRequired={input.required}
          id={input.id || "textarea"}
          rows={input.rows}
          label={input.label || t.label}
          placeholder={input.placeholder || t.placeholder}
        />
      );
      break;
    case "date-picker":
      return (
        <Datepicker
          isCollapsed={isCollapsed}
          isRequired={input.required}
          label={input.label || t.label}
          id={input.id || "datepicker"}
        />
      );
      break;

    case "wysiwyg":
      return <Wysiwyg isCollapsed={isCollapsed} id={input.id || "wysiwyg"} />;
    default:
      return false;
      break;
  }
};
