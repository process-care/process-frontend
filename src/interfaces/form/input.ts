export default interface IInput {
  input_type:
    | "input"
    | "wysiwyg"
    | "text-area"
    | "select"
    | "slider"
    | "number-input"
    | "radio"
    | "checkbox"
    | "date-picker"
    | "free-classification";
  name: string;
  id?: string;
  label?: string;
  placeholder?: string;
  help_text?: string;
  internal_title?: string;
  min_length?: string;
  max_length?: string;
  units?: string;
  vertical?: boolean;
  reverse?: boolean;
  options?: { [x: string]: string | undefined };
  min?: string;
  max?: string;
  step?: string;
  rows?: "small" | "medium" | "large" | undefined;
  required?: boolean;
  type?: "text" | "number" | undefined;
  default_value?: string | undefined;
  page_id?: string;
  wysiwyg?: string | undefined;
}
