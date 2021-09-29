import { useAddPage } from "call/actions/formBuider/page";
import { useAddSurvey } from "call/actions/survey";
import { useHistory } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { selectors, actions } from "redux/slices/survey-editor";
import { formatValues } from "./utils";

export const useCreateSurveyChain: any = () => {
  const { mutateAsync: addSurvey } = useAddSurvey();
  const { mutateAsync: addPage } = useAddPage();
  const history = useHistory();
  const survey = useAppSelector(selectors.survey);
  const dispatch = useAppDispatch();

  const createSurveyChain = async () => {
    const data = formatValues(survey);
    const createSurveyPromise = await addSurvey({
      ...data,
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
    // reset redux
    dispatch(actions.reset());
    history.push(`/dashboard?surveyId=${surveyId}`);
  };
  return {
    createSurveyChain,
  };
};
