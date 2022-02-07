import { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { SURVEY_STATUS } from "types/survey";
import { useCreateLandingMutation } from "api/graphql/queries/landing.gql.generated";
import { client } from "api/gql-client";
import { useUpdateSurveyMutation } from "api/graphql/queries/survey.gql.generated";
import { SurveyRedux } from "redux/slices/types";

// ---- TYPES

type Navigators = {
  gotToLanding: () => Promise<void>;
  goToForm: () => void;
  goToConsent: () => void;
  goToSurveyMetadatas: () => void;
};

// ---- HOOKS

export const useNavigator = (survey: SurveyRedux | undefined): Navigators => {
  const history = useHistory();

  const { mutateAsync: addLanding } = useCreateLandingMutation(client);
  const { mutateAsync: updateSurvey } = useUpdateSurveyMutation(client);

  // Take you to the landing
  const gotToLanding = useCallback(async () => {
    // If no survey, don't do anything
    if (!survey) return;

    const { landing, title, slug } = survey?.attributes;
    const { id } = survey;

    // If the landing is not created yet, create it
    if (!landing) {
      const newLanding: Record<string, any> = await addLanding({
        data: {
          title,
          survey: id,
        },
      });
      // update survey with landing id.
      await updateSurvey({
        id,
        data: { landing: newLanding.createLanding.landing.id },
      });
    }

    // Navigate to the landing
    history.push(`/survey/${slug}/create/landing`);
  }, [survey?.id, survey?.slug]);

  // Take you to the form editor
  const goToForm = useCallback(() => {
    if (!survey) return;

    const { status, slug } = survey;
    if (
      status !== SURVEY_STATUS.Draft &&
      process.env.NODE_ENV !== "development"
    ) {
      alert(
        "Désolé, vous ne pouvez pas éditer le formulaire d'une enquête en cours."
      );
      return;
    }

    history.push(`/survey/${slug}/create/form`);
  }, [survey?.id]);

  // Take you to the consent page
  const goToConsent = useCallback(() => {
    if (!survey) return;
    history.push(`/survey/${survey.slug}/create/consent`);
  }, [survey?.id]);

  // Take you to the survey metadatas page
  const goToSurveyMetadatas = useCallback(() => {
    if (!survey) return;
    history.push(`/survey/${survey.slug}/create/metadatas`);
  }, [survey?.id]);

  return {
    gotToLanding,
    goToForm,
    goToConsent,
    goToSurveyMetadatas,
  };
};
