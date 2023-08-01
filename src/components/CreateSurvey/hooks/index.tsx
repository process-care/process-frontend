import { useCallback } from "react";
import { useRouter } from "next/navigation";

import { SURVEY_STATUS } from "@/types/survey";
import { CreateLandingMutation, useCreateLandingMutation } from "@/api/graphql/queries/landing.gql.generated";
import { client } from "@/api/gql-client";
import { useUpdateSurveyMutation } from "@/api/graphql/queries/survey.gql.generated";
import { SurveyRedux } from "@/redux/slices/types";

// ---- TYPES

type Navigators = {
  gotToLanding: () => Promise<void>;
  goToForm: () => void;
  goToConsent: () => void;
  goToSurveyMetadatas: () => void;
};

// ---- HOOKS

export const useNavigator = (survey: SurveyRedux | undefined): Navigators => {
  const router = useRouter()
  const { mutateAsync: addLanding } = useCreateLandingMutation(client);
  const { mutateAsync: updateSurvey } = useUpdateSurveyMutation(client);

  // Take you to the landing
  const gotToLanding = useCallback(async () => {
    // If no survey, don't do anything
    if (!survey) return;

    const { landing, title, slug } = survey.attributes;
    const { id } = survey;
    const ladingId = landing?.data?.id;

    // If the landing is not created yet, create it
    if (!ladingId) {
      const newLanding: CreateLandingMutation = await addLanding({
        data: {
          title,
          survey: id,
        },
      });
      // update survey with landing id.
      await updateSurvey({
        id,
        data: { landing: newLanding?.createLanding?.data?.id },
      });
    }
    router.push(`/survey/${slug}/create/landing`);
  }, [survey?.id, survey?.attributes?.slug]);

  // Take you to the form editor
  const goToForm = useCallback(() => {
    if (!survey) return;

    const { status, slug } = survey.attributes;
    if (status !== SURVEY_STATUS.Draft && process.env.NODE_ENV !== "development") {
      alert("Désolé, vous ne pouvez pas éditer le formulaire d'une enquête en cours.");
      return;
    }

    router.push(`/survey/${slug}/create/form`);
  }, [survey?.id]);

  // Take you to the consent page
  const goToConsent = useCallback(() => {
    if (!survey) return;
    router.push(`/survey/${survey?.attributes?.slug}/create/consent`);
  }, [survey?.id]);

  // Take you to the survey metadatas page
  const goToSurveyMetadatas = useCallback(() => {
    if (!survey) return;
    router.push(`/survey/${survey?.attributes?.slug}/create/metadatas`);
  }, [survey?.id]);

  return {
    gotToLanding,
    goToForm,
    goToConsent,
    goToSurveyMetadatas,
  };
};
