import { QuestionRedux } from "@/redux/slices/types/index.js"
import {
  TextareaFields,
  CheckboxFields,
  InputFields,
  NumberInputFields,
  RadioboxFields,
  SelectFields,
  SliderFields,
  DatepickerFields,
  WysiwygFields,
  FreeclassificationFields,
  AssociatedClassificationFields,
  MonoThumbnailFields,
} from "../Template/index.ts"
import {
  CommonFieldsSchema,
  MultipleInputFieldsSchema,
  SliderSchema,
  WysiwygSchema,
  AssociatedSchema,
} from "../ValidationSchemas/index.ts"

export const renderFormTemplate = (input: QuestionRedux | Record<string, any>): React.ReactNode => {
  switch (input?.attributes?.type) {
    case "input": return <InputFields />
    case "number_input": return <NumberInputFields />
    case "checkbox": return <CheckboxFields />
    case "radio": return <RadioboxFields />
    case "select": return <SelectFields />
    case "slider": return <SliderFields />
    case "text_area": return <TextareaFields />
    case "date_picker": return <DatepickerFields />
    case "wysiwyg": return <WysiwygFields />
    case "free_classification": return <FreeclassificationFields />
    case "associated_classification": return <AssociatedClassificationFields />
    case "mono_thumbnail": return <MonoThumbnailFields />
    
    default:
      return <TextareaFields />
  }
};

export const renderFormValidationSchema = (input: QuestionRedux | Record<string, any>) => {
  switch (input?.attributes?.type) {
    case "input": return CommonFieldsSchema
    case "number_input": return CommonFieldsSchema
    case "checkbox": return MultipleInputFieldsSchema
    case "radio": return MultipleInputFieldsSchema
    case "select": return MultipleInputFieldsSchema
    case "slider": return SliderSchema
    case "text_area": return CommonFieldsSchema
    case "date_picker": return CommonFieldsSchema
    case "wysiwyg": return WysiwygSchema
    case "associated_classification": return AssociatedSchema

    default:
      return CommonFieldsSchema
  }
};

export const getDiff = (newValues: Record<string, any>, oldValues: Record<string, any>): Record<string, any> =>
  Object.keys(newValues).reduce((diff, key) => {
    if (oldValues[key] === newValues[key]) return diff
    return {
      ...diff,
      [key]: newValues[key],
    }
  }, {})

export const removeEmpty = (obj: QuestionRedux): QuestionRedux["attributes"] => {
  return Object.fromEntries(Object.entries(obj.attributes).filter(([_, v]) => v != null))
}