// import IPage from "types/form/page";
// import IQuestion from "types/form/question";
// import { ILanding } from "types/landing";

// // Attributes from the API
// export interface SurveyAttributes {

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

//   // FIXME: fix this
//   author?: {
//     email: string;
//   };
// }

// export interface SurveyEntity {
//   id: string
//   attributes: SurveyAttributes
// }

// // Meta for multiple results
// export interface MetaInformations {
//   pagination: {
//     page: number;
//     pageCount: number;
//     pageSize: number;
//     total: number;
//   }
// }

// // Single survey
// export interface SurveyResult {
//   data: SurveyEntity;
// }

// // Multiple surveys
// export interface SurveysResult {
//   data: SurveyEntity[];
//   meta: MetaInformations;
// }
