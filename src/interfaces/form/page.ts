import ICondition from "./condition";

export default interface IFormPage {
  name: string;
  short_name: string;
  id: string;
  is_locked: boolean;
  condition: ICondition["id"][];
}
