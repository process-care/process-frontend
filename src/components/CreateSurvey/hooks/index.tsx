import React from "react";
import { useAddLanding } from "call/actions/landing";
import { useUpdateSurvey } from "call/actions/survey";
import { useHistory } from "react-router-dom";
import { Survey } from "redux/slices/surveyBuilder";

export const useNavigator: any = (survey: Survey["survey"]) => {
  const { mutateAsync: addLanding } = useAddLanding();
  const { mutateAsync: updateSurvey } = useUpdateSurvey();
  const history = useHistory();
  const { landing, title, id } = survey;

  const gotToLanding = React.useCallback(async () => {
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
    history.push(`/survey/${id}/create/landing`);
  }, [id]);

  // Take you to the form editor
  const goToForm = React.useCallback(() => {
    history.push(`/survey/${id}/create/form`);
  }, [id]);

  // Take you to the consent page
  const goToConsent = React.useCallback(() => {
    history.push(`/survey/${id}/create/consent`);
  }, [id]);

  const goToSurveyMetadatas = React.useCallback(() => {
    history.push(`/survey/${id}/create/metadatas`);
  }, [id]);
  return {
    gotToLanding,
    goToForm,
    goToConsent,
    goToSurveyMetadatas,
  };
};