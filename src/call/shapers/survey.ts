import { Survey, SurveyCollection } from "types/survey";
import { SurveyResult, SurveysResult } from "types/survey/api";

// FIXME: trasnform the sub fields like landing and such.............. :(
  
/**
 * Transform one API Survey into its front form.
 * @param res 
 * @returns 
 */
export function shapeSurvey(res: SurveyResult): Survey {
  const flattened = {
    id: res.data.id,
    ...res.data.attributes,
  };

  return flattened;
}

/**
 * Transform multiples API survey into their front form.
 * @param res 
 * @returns 
 */
export function shapeSurveys(res: SurveysResult): SurveyCollection {
  const flattened = res.data.map((survey: any) => ({
    id: survey.id,
    ...survey.attributes,
  }));

  const sanitized = {
    data: flattened,
    meta: res.meta,
  };

  return sanitized;
}