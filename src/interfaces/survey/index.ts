import IPage from "interfaces/form/page";
import IQuestion from "interfaces/form/question";
import { ILanding } from "interfaces/landing";

export default interface ISurvey {
  id: string;
  order: IQuestion["id"][];
  consentement?: File;
  description: string;
  pages: IPage[];
  landing?: ILanding;
}

export interface ISurveyRes {
  survey: ISurvey;
}

export interface ISurveysRes {
  surveys: ISurvey;
}
