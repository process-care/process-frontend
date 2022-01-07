import React from "react";

import { Box } from "@chakra-ui/react";
import {
  Input,
  NumberInput,
  Checkbox,
  Radiobox,
  Select,
  Slider,
  Datepicker,
  Textarea,
  AssociatedClassification,
  FreeClassification,
  MonoThumbnail,
} from "components/Fields";
import IQuestion from "types/form/question";
import { t } from "static/input";
import { useAppSelector } from "redux/hooks";
import { useLocation } from "react-router-dom";

interface Options {
  value: string;
  label: string;
}

export const renderInput = (input: IQuestion): React.ReactNode => {
  const location = useLocation();
  const isCollapsed =
    useAppSelector((state) => state.editor.form.isCollapseView) &&
    !location.pathname.includes("/participate");

  const formatOptions = (): Options[] => {
    if (input.options) {
      const arr = [];
      for (const [, value] of Object.entries(input.options)) {
        if (value !== null) {
          arr.push({ value, label: value });
        }
      }
      return arr;
    } else return [];
  };

  switch (input.type) {
    case "input":
      return (
        <>
          <Input
            isCollapsed={isCollapsed}
            isRequired={input.required}
            name={input.id || "input"}
            type="text"
            label={input.label || t.label}
            helpText={input.help_text || t.help_text}
            placeholder={input.placeholder || t.placeholder}
            inputRightAddon={input.units}
          />
        </>
      );

    case "number_input":
      return (
        <NumberInput
          isCollapsed={isCollapsed}
          isRequired={input.required}
          placeholder={input.placeholder || t.placeholder}
          name={input.id || "number_input"}
          precision={0}
          label={input.label || t.label}
          inputRightAddon={input.units}
          helpText={input.help_text || t.help_text}
          min={input.min}
          max={input.max}
        />
      );

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

    case "select":
      return (
        <Select
          isRequired={input.required}
          isCollapsed={isCollapsed}
          id={input.id || "select"}
          label={input.label || t.label}
          placeholder={input.placeholder || t.placeholder}
          answers={formatOptions()}
          helpText={input.help_text || t.help_text}
        />
      );

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

    case "text_area":
      return (
        <Textarea
          isCollapsed={isCollapsed}
          isRequired={input.required}
          id={input.id || "textarea"}
          rows={input.rows}
          label={input.label || t.label}
          placeholder={input.placeholder || t.placeholder}
          helpText={input.help_text || t.help_text}
        />
      );

    case "date_picker":
      return (
        <Datepicker
          isCollapsed={isCollapsed}
          isRequired={input.required}
          label={input.label || t.label}
          id={input.id || "datepicker"}
          helpText={input.help_text || t.help_text}
        />
      );

    case "wysiwyg":
      return (
        <Box
          textAlign="left"
          id={input.id || "wysiwyg"}
          dangerouslySetInnerHTML={{
            __html: input.wysiwyg === undefined ? "" : input.wysiwyg,
          }}
        />
      );

    case "free_classification":
      return (
        <FreeClassification
          isCollapsed={isCollapsed}
          isRequired={input.required}
          id={input.id || "free_classification"}
          rows={input.rows}
          label={input.label || t.label}
          placeholder={input.placeholder || t.placeholder}
          helpText={input.help_text || t.help_text}
        />
      );
    case "associated_classification":
      return (
        <>
          <AssociatedClassification
            isCollapsed={isCollapsed}
            name={input.id || "associated_classification"}
            label={input.label || t.label}
            helpText={
              input.help_text || "Cliquer sur une vignette pour la sélectionner"
            }
            factors={input.factors}
            maxLoop={input.max_loop}
          />
        </>
      );
    case "mono_thumbnail":
      return (
        <>
          <MonoThumbnail
            isCollapsed={isCollapsed}
            name={input.id || "mono_thumbnail"}
            label={input.label || t.label}
            helpText={
              input.help_text ||
              "Merci de remplir la valeur qui définit le mieux cette proposition"
            }
            factors={input.factors}
            maxLoop={input.max_loop}
            mono_thumbnail_input={input.mono_thumbnail_input?.type || "slider"}
          />
        </>
      );

    default:
      return false;
  }
};
