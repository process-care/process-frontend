import IQuestion from "./question";
import IOperator from "./operator";
import IPage from "./page";

export default interface ICondition {
  id: string;
  type: "page" | "question";
  referer_page?: IPage;
  referer_question?: IQuestion;
  referer_id?: IPage["id"] | ICondition["id"];
  target?: IQuestion;
  target_value: string;
  operator: IOperator['id'];
  group: string;
}

export interface IConditionRes {
  conditions: ICondition[];
}

export interface CheckSurvey {
  checkSurvey: {
    data: string;
    errors: any;
  };
}
