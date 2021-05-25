export default interface Inputs {
  type: string;
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
  min?: number;
  max?: number;
  step?: number | null;
  rows?: "small" | "medium" | "large" | undefined;
  required?: boolean;
  default_value?: string | number | undefined;
}
