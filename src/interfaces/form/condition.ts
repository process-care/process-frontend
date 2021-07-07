import IQuestion from "./question";
import IOperator from "./operator";
import IPage from "./page";

export default interface ICondition {
  id: string;
  type: "page" | "input";
  referer_page?: IPage;
  referer_question?: IQuestion;
  referer_id?: IPage["id"] | ICondition["id"];
  target?: IQuestion;
  target_value?: string | number;
  operator?:
    | "equal_or_superior"
    | "equal_or_inferior"
    | "equal"
    | "superior"
    | "inferior"
    | "different";
  group: {
    id: string | number;
    name: number;
  };
  step?: 1 | 2 | 3;
  is_valid: boolean;
}
