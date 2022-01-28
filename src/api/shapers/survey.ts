// FIXME: trasnform the sub fields like landing and such.............. :(

import { SurveyEntityResponse, SurveyEntityResponseCollection } from "api/graphql/types.generated";

  
/**
 * Transform one API Survey into its front form.
 * @param res 
 * @returns 
 */
export function shapeSurvey(res: SurveyEntityResponse): any {
  const flattened = {
    id: res?.data?.id,
    ...res?.data?.attributes,
  };

  return flattened;
}

/**
 * Transform multiples API survey into their front form.
 * @param res 
 * @returns 
 */
export function shapeSurveys(res: SurveyEntityResponseCollection): any {
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