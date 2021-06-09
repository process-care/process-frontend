import IInput from "./input";
import IOperator from "./operator";

export default interface ICondition {
  id: string;
  condition_type: "page" | "input";
  referer_entity_id: string;
  selected_question?: IInput;
  operator?: IOperator;
  target_value?: string | number;
  step?: 1 | 2 | 3;
  group: {
    id: string | number;
    name: number;
  };
  is_valid: boolean;
}
