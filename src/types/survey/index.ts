// import IPage from "types/form/page";
// import IQuestion from "types/form/question";
// import { ILanding } from "types/landing";
// import { MetaInformations } from "./api";

// // Status of a survey
// export enum SURVEY_STATUS {
//   Draft = "draft",
//   Running = "pending",
//   Closed = "closed",
//   Archived = "archived",
// }

// // Single Entity
// export interface Survey {
//   id: string;
//   author?: {
//     email: string;
//   };
//   order: IQuestion["id"][];
//   description: string;
//   pages: IPage[];
//   landing?: ILanding;
//   title: string;
//   slug: string;
//   status: "draft" | "pending" | "closed" | "archived";
//   createdAt: Date;
//   keywords: Record<string, string>[];
//   needConsent: boolean;
//   // FIXME: change the name of this field
//   consentement?: any;
// }

// // Collection with pagination
// export type SurveyCollection = {
//   data: Survey[]
//   meta: MetaInformations
// }