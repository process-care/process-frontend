import ISurvey from "types/survey";
import ICondition from "./condition";
import IQuestion from "./question";

export default interface IPage {
  id: string;
  name: string;
  short_name: string;
  survey: ISurvey;
  is_locked: boolean;
  conditions: ICondition[];
  questions?: IQuestion[];
}
