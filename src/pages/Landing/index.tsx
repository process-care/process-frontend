import React from "react";
import IRoute from "types/routes/route";
import { useParams } from "react-router-dom";
// import { Text } from "@chakra-ui/react";
import { Loader } from "components/Spinner";
import { Error } from "components/Error";
import { Preview } from "components/CreateSurvey/CreateLanding/Preview";
import { client } from "api/gql-client";
import { useSurveyBySlugQuery } from "api/graphql/queries/survey.gql.generated";
import { useLandingQuery } from "api/graphql/queries/landing.gql.generated";

// const t = {
//   noLanding:
//     "⚠️ Dev ⚠️ La landing n'a pas encore été créée pour cette enquete.",
// };

export const Landing: React.FC<IRoute> = () => {
  const { slug } = useParams<{ slug: string }>();

  // TODO: Annoying to fetch the survey just to fetch the landing... Search landing with survey slug ?
  const { data: survey } = useSurveyBySlugQuery(client, { slug });
  const surveyId = survey?.surveys?.data[0].attributes?.landing?.data?.id ?? "";

  const {
    data: landing,
    isLoading,
    error,
  } = useLandingQuery(client, { id: surveyId }, { enabled: surveyId !== "" });

  // if (landing?.landing === undefined) {
  //   return (
  //     <Text pt="80px" variant="titleParaLight">
  //       {t.noLanding}
  //     </Text>
  //   );
  // }

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <Error error={error} />;
  }

  return <Preview data={landing?.landing?.data} isUserView />;
};
