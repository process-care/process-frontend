import IPage from "types/form/page";
import IQuestion from "types/form/question";
import { ILanding } from "types/landing";

export default interface ISurvey {
  id: string;
  order: IQuestion["id"][];
  consentement?: File;
  description: string;
  pages: IPage[];
  landing?: ILanding;
  title: string;
  slug: string;
  status: "draft" | "pending" | "closed" | "archived";
}

export interface ISurveyRes {
  survey: ISurvey;
}

export interface ISurveysRes {
  surveys: ISurvey[];
}
