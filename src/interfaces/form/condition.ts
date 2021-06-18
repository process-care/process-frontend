import IQuestion from "./question";
import IOperator from "./operator";
import IPage from "./page";

export default interface ICondition {
  id: string;
  type: "page" | "input";
  referer_id: IPage["id"] | ICondition["id"];
  target_id?: IQuestion["id"];
  target_value?: string | number;
  operator?: IOperator;
  group: {
    id: string | number;
    name: number;
  };
  step?: 1 | 2 | 3;
  is_valid: boolean;
}
