'use client'

import { client } from "@/api/gql-client.js"
import { useSurveyBySlugQuery } from "@/api/graphql/queries/survey.gql.generated.js"
import { useLandingQuery } from "@/api/graphql/queries/landing.gql.generated.js"
import { sanitizeEntity } from "@/api/entity-checker.js"
import Loader from "@/components/Spinner/index.tsx"
import Error from "@/components/Error/index.tsx"
import Preview from "@/components/CreateSurvey/CreateLanding/Preview/index.tsx"

// ---- TYPES

type Props = {
  params: {
    slug: string;
  };
}

// ---- COMPONENT

export default function Landing({ params }: Props): JSX.Element {
  const { slug } = params;

  // TODO: Annoying to fetch the survey just to fetch the landing... Search landing with survey slug ?
  const { data: survey, isLoading: surveyIsLoading } = useSurveyBySlugQuery(client, { slug });
  const fetchedSurvey = survey?.surveys?.data?.[0];
  const landingId = fetchedSurvey?.attributes?.landing?.data?.id ?? "";
  const surveyId = fetchedSurvey?.id ?? "";

  const { data: landing, isLoading, error } = useLandingQuery(client, { id: landingId }, { enabled: landingId !== "" });
  const author = fetchedSurvey?.attributes?.author;

  if (!fetchedSurvey && !surveyIsLoading) {
    return <Error message="Cette enquête n'existe pas." />;
  }

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <Error error={error} />;
  }

  if (!landing?.landing?.data) {
    return <></>;
  }

  return (
    <Preview
      surveyId={surveyId}
      data={sanitizeEntity(landing?.landing?.data)}
      isUserView
      author={author?.data?.attributes}
      needConsent={fetchedSurvey?.attributes?.need_consent}
    />
  );
};
