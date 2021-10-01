import { useCallback } from "react";
import { useAddLanding } from "call/actions/landing";
import { useUpdateSurvey } from "call/actions/survey";
import { useHistory } from "react-router-dom";
import { Survey } from "redux/slices/surveyBuilder";

export const useNavigator: any = (survey: Survey["survey"]) => {
  const { mutateAsync: addLanding } = useAddLanding();
  const { mutateAsync: updateSurvey } = useUpdateSurvey();
  const history = useHistory();
  const { landing, title, id, slug } = survey;

  const gotToLanding = useCallback(async () => {
    // If the landing is not created yet, create it
    if (!landing) {
      const newLanding: Record<string, any> = await addLanding({
        title,
        survey: id,
      });
      // update survey with landing id.
      await updateSurvey({
        id,
        data: { landing: newLanding.createLanding.landing.id },
      });
    }
    history.push(`/survey/${slug}/create/landing`);
  }, [id, slug]);

  // Take you to the form editor
  const goToForm = useCallback(() => {
    history.push(`/survey/${slug}/create/form`);
  }, [id]);

  // Take you to the consent page
  const goToConsent = useCallback(() => {
    history.push(`/survey/${slug}/create/consent`);
  }, [id]);

  const goToSurveyMetadatas = useCallback(() => {
    history.push(`/survey/${slug}/create/metadatas`);
  }, [id]);

  return {
    gotToLanding,
    goToForm,
    goToConsent,
    goToSurveyMetadatas,
  };
};
