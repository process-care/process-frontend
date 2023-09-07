import { map, switchMap, filter } from "rxjs";
import { combineEpics, ofType } from "redux-observable";
import { Epic } from "@/redux/store/index.js";

import { sdk } from "@/api/gql-client.js"
import { actions as statusAct } from "@/redux/slices/participation/status.js"
import { sanitizeEntities } from "@/api/entity-checker.js"
import { AnswersByParticipationQuery, Enum_Question_Type, QuestionsBySurveySlugQuery } from "@/api/graphql/sdk.generated.js"

// ---- EPIC

// Initialize pages-visited upon init
const initializeEpic: Epic = (action$) =>
  action$.pipe(
    ofType(statusAct.initialize.type),
    filter((action) => action.payload.surveyId && action.payload.participationId),
    switchMap(async (action) => {
      const { participationId, surveyId, slug } = action.payload;

      const pages = sdk.survey({ id: surveyId }).then((res) => {
        const data = res.survey?.data?.attributes?.pages?.data;
        return sanitizeEntities(data);
      });

      const questions = sdk.questionsBySurveySlug({ slug }).then(processQuestions);

      const answers = sdk.AnswersByParticipation({ participationId }).then(processAnswers);

      return Promise.all([pages, questions, answers]);
    }),
    map((results) => {
      const pages = results[0];
      const questions = results[1];
      const answers = results[2];

      const payload = { pages, questions, answers };
      return statusAct.initialized(payload);
    })
  );

// ---- UTILS

function processQuestions(res: QuestionsBySurveySlugQuery) {
  const data = res?.questions?.data;
  const sanitized = sanitizeEntities(data);

  // Look for free classification and load some samples
  const processed = sanitized.map(async (question) => {
    if (question.attributes.type === Enum_Question_Type.FreeClassification) {
      const dataSamples = await sdk.classificationSamples({
        questionId: question.id,
        nbSamples: question.attributes.freeclassification_responses_count ?? 4,
      });

      // @ts-ignore
      question.attributes.samples = dataSamples?.classificationSamples?.samples;
    }

    return question;
  });

  return Promise.all(processed);
}

function processAnswers(res: AnswersByParticipationQuery) {
  const data = res.answers?.data;
  const sanitized = sanitizeEntities(data);

  // Unwrap strings from their object form so they work normaly in Textarea
  const unwrapped = sanitized.map((answer) => {
    if (
      answer.attributes.question?.data?.attributes?.type === Enum_Question_Type.TextArea ||
      answer.attributes.question?.data?.attributes?.type === Enum_Question_Type.DatePicker ||
      answer.attributes.question?.data?.attributes?.type === Enum_Question_Type.Radio
    ) {
      answer.attributes.value = answer.attributes.value.answer;
    }
    return answer;
  });

  return unwrapped;
}

// ---- EXPORT

export const initializeEpics = combineEpics(initializeEpic);
