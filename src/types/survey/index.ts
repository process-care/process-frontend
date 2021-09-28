import IPage from "types/form/page";
import IQuestion from "types/form/question";
import { ILanding } from "types/landing";

export default interface ISurvey {
  author?: {
    email: string;
  };
  id: string;
  order: IQuestion["id"][];
  consentement?: any;
  description: string;
  pages: IPage[];
  landing?: ILanding;
  title: string;
  slug: string;
  status: "draft" | "pending" | "closed" | "archived";
  createdAt: Date;
  keywords: Record<string, any>[];
}

export interface ISurveyRes {
  survey: ISurvey;
}

export interface ISurveysRes {
  surveys: ISurvey[];
}
