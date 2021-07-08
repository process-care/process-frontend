import ICondition from "./condition";
import IQuestion from "./question";

export default interface IPage {
  id: string;
  name: string;
  short_name: string;
  survey_id: string;
  is_locked: boolean;
  conditions: ICondition[];
}
