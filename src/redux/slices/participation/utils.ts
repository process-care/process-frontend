import { AnswerParticipationRedux } from "./answers.js"
import { InitializedPayload } from "./status.js"

export function sanitizeAnswers(answers: InitializedPayload['answers']): AnswerParticipationRedux[] {
  const sanitized = answers.reduce((acc, a) => {
    const qId = a.attributes.question?.data?.id;
    if (!qId) return acc;

    acc.push({
      id: a.id,
      questionId: qId,
      value: a.attributes.value,
    });

    return acc;
  }, [] as AnswerParticipationRedux[]);

  return sanitized;
}