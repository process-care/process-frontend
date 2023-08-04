import { Box } from "@chakra-ui/react";
import { usePathname, useRouter } from "next/navigation";

import {
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
} from "@/components/Fields";
import { t } from "@/static/input";
import { useAppSelector } from "@/redux/hooks";
import { selectors } from "@/redux/slices/formBuilder";
import { Enum_Question_Type } from "@/api/graphql/types.generated";
import { QuestionWithSamples } from "@/redux/slices/participation/status";

interface Options {
  value: string;
  label: string;
}

interface Props {
  input: {
    id: string;
    attributes: QuestionWithSamples;
  };
}

export default function RenderInput({ input }: Props): JSX.Element {
  const router = useRouter()
  const pathname = usePathname()
  const isCollapsed = useAppSelector(selectors.isCollapseView) && !pathname.includes("/participate");
  const attributes = input?.attributes;

  const formatOptions = (): Options[] => {
    if (attributes?.options) {
      const arr = [];
      for (const [, value] of Object.entries(attributes?.options)) {
        if (value !== null) {
          arr.push({ value, label: value });
        }
      }
      return arr as Options[];
    } else return [];
  };

  switch (attributes?.type) {
    case Enum_Question_Type.NumberInput:
      return (
        <NumberInput
          appearance="big"
          isCollapsed={isCollapsed}
          isRequired={attributes?.required}
          placeholder={attributes?.placeholder || t.placeholder}
          name={input.id || "number_input"}
          precision={0}
          label={attributes?.label || t.label}
          inputRightAddon={attributes?.units}
          helpText={attributes?.help_text || t.help_text}
          min={attributes?.min}
          max={attributes?.max}
        />
      );

    case Enum_Question_Type.Checkbox:
      return (
        <Checkbox
          isCollapsed={isCollapsed}
          id={input.id || "checkbox"}
          isRequired={attributes?.required}
          label={attributes?.label || t.label}
          helpText={attributes?.help_text || t.help_text}
          checkbox={formatOptions()}
        />
      );

    case Enum_Question_Type.Radio:
      return (
        <Radiobox
          helpText={attributes?.help_text || t.help_text}
          isCollapsed={isCollapsed}
          isRequired={attributes?.required}
          id={input.id || "radiobox"}
          label={attributes?.label || t.label}
          radios={formatOptions()}
        />
      );

    case Enum_Question_Type.Select:
      return (
        <Select
          isRequired={attributes?.required}
          isCollapsed={isCollapsed}
          id={input.id || "select"}
          label={attributes?.label || t.label}
          placeholder={attributes?.placeholder || t.placeholder}
          answers={formatOptions()}
          helpText={attributes?.help_text || t.help_text}
        />
      );

    case Enum_Question_Type.Slider:
      return (
        <Slider
          isCollapsed={isCollapsed}
          isRequired={attributes?.required}
          id={input.id || "slider"}
          label={attributes?.label || t.label}
          min={attributes?.min}
          max={attributes?.max}
          step={attributes?.step}
          helpText={attributes?.help_text || t.help_text}
          vertical={attributes?.vertical}
          reverse={attributes?.reverse}
        />
      );

    case Enum_Question_Type.TextArea:
      return (
        <Textarea
          isCollapsed={isCollapsed}
          isRequired={attributes?.required}
          id={input.id || "textarea"}
          rows={attributes?.rows}
          label={attributes?.label || t.label}
          placeholder={attributes?.placeholder || t.placeholder}
          helpText={attributes?.help_text || t.help_text}
        />
      );

    case Enum_Question_Type.DatePicker:
      return (
        <Datepicker
          isCollapsed={isCollapsed}
          isRequired={attributes?.required}
          label={attributes?.label || t.label}
          id={input.id || "datepicker"}
          helpText={attributes?.help_text || t.help_text}
        />
      );

    case Enum_Question_Type.Wysiwyg:
      return (
        <Box
          id={input.id || "wysiwyg"}
          className="text-left text-sm"
          dangerouslySetInnerHTML={{
            __html: typeof attributes?.wysiwyg !== "string" ? "" : attributes?.wysiwyg,
          }}
        />
      );

    case Enum_Question_Type.FreeClassification:
      return (
        <FreeClassification
          id={input.id || "free_classification"}
          isCollapsed={isCollapsed}
          isRequired={attributes?.required}
          rows={attributes?.rows}
          samples={attributes?.samples}
          nbSamples={attributes.freeclassification_responses_count}
          label={attributes?.label || t.label}
          placeholder={attributes?.placeholder || t.placeholder}
          helpText={attributes?.help_text || t.help_text}
        />
      );

    case Enum_Question_Type.AssociatedClassification:
      return (
        <>
          <AssociatedClassification
            isCollapsed={isCollapsed}
            name={input.id || "associated_classification"}
            label={attributes?.label || t.label}
            helpText={attributes?.help_text || "Cliquer sur une vignette pour la sélectionner"}
            factors={attributes?.factors}
            maxLoop={attributes?.max_loop}
          />
        </>
      );

    case Enum_Question_Type.MonoThumbnail:
      return (
        <>
          <MonoThumbnail
            isCollapsed={isCollapsed}
            name={input.id || "mono_thumbnail"}
            label={attributes?.label || t.label}
            helpText={attributes?.help_text || "Merci de remplir la valeur qui définit le mieux cette proposition"}
            factors={attributes?.factors}
            maxLoop={attributes?.max_loop}
            associated_input={attributes?.associated_input}
          />
        </>
      );

    default:
      return <></>;
  }
};
