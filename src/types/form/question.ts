import ICondition from "./condition";
import IPage from "./page";

export default interface IQuestion {
  type:
    | "input"
    | "wysiwyg"
    | "text_area"
    | "select"
    | "slider"
    | "number_input"
    | "radio"
    | "checkbox"
    | "date_picker"
    | "free_classification"
    | "associated_classification";
  // name: string;
  id: string;
  label?: string;
  placeholder?: string;
  help_text?: string;
  internal_title?: string;
  internal_description?: string;
  units?: string;
  vertical?: boolean;
  reverse?: boolean;
  options?: string[];
  min?: number;
  max?: number;
  step?: number;
  rows?: "small" | "medium" | "large" | undefined;
  required?: boolean;
  default_value?: string | undefined;
  page?: Partial<IPage>;
  wysiwyg?: string | undefined;
  freeclassification_responses_count?: string;
  conditions?: ICondition[];
  factors?: [
    {
      title: string;
      modalities: [
        {
          description: string;
          file?: string;
        }
      ];
    }
  ];
}

export interface IQuestionsRes {
  questions: IQuestion[];
}

export interface IQuestionRes {
  question: IQuestion;
}
