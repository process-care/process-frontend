import { useAddPage } from "call/actions/formBuider/page";
import { useAddSurvey } from "call/actions/survey";
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

export const useCreateSurveyChain: any = () => {
  const { mutateAsync: addSurvey } = useAddSurvey();
  const { mutateAsync: addPage } = useAddPage();
  const history = useHistory();
  const uuid = uuidv4();

  const createSurveyChain = async () => {
    const createSurveyPromise = await addSurvey({
      // Title will be overide by the user in the next step.
      title: `temporyTitle-${uuid}`,
      slug: `temporySlug-${uuid}`,
      status: "draft",
    });
    const surveyId = await createSurveyPromise.createSurvey.survey.id;
    // create survey first page
    await addPage({
      name: `Page 1`,
      is_locked: false,
      short_name: `P1`,
      survey: surveyId,
    });

    history.push(`/survey/${surveyId}/create/metadatas`);
  };
  return {
    createSurveyChain,
  };
};
