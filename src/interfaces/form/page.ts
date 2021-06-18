import ICondition from "./condition";

export default interface IPage {
  id: string;
  name: string;
  short_name: string;
  survey_id: string;
  is_locked: boolean;
  condition: ICondition["id"][];
}
