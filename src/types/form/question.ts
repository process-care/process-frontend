// import ConditionRedux from "./condition";
// import PageRedux from "./page";

// interface Modality {
//   description: string;
//   file?: string;
// }
// export default interface QuestionRedux {
//   type:
//     | "input"
//     | "wysiwyg"
//     | "text_area"
//     | "select"
//     | "slider"
//     | "number_input"
//     | "radio"
//     | "checkbox"
//     | "date_picker"
//     | "free_classification"
//     | "mono_thumbnail"
//     | "associated_classification";
//   // name: string;
//   id: string;
//   label?: string;
//   placeholder?: string;
//   help_text?: string;
//   internal_title?: string;
//   internal_description?: string;
//   units?: string;
//   vertical?: boolean;
//   reverse?: boolean;
//   options?: string[];
//   min?: number;
//   max?: number;
//   step?: number;
//   rows?: "small" | "medium" | "large" | undefined;
//   required?: boolean;
//   default_value?: string | undefined;
//   page?: Partial<PageRedux>;
//   wysiwyg?: string | undefined;
//   freeclassification_responses_count?: string;
//   mono_thumbnail_input?: {
//     type: "radio" | "slider" | "number_input";
//     label?: string;
//     min?: number;
//     max?: number;
//     step?: number;
//   };
//   conditions?: ConditionRedux[];
//   max_loop?: string;
//   factors?: [
//     {
//       title: string;
//       modalities: Modality[];
//     }
//   ];
// }

// export interface QuestionReduxsRes {
//   questions: QuestionRedux[];
// }

// export interface QuestionReduxRes {
//   question: QuestionRedux;
// }
