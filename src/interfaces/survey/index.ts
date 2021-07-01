import IPage from "interfaces/form/page";
import IQuestion from "interfaces/form/question";

export default interface ISurvey {
  id: string;
  order: IQuestion["id"][] | [];
  consentement?: File;
  description: string;
  pages: IPage[];
}
