import React from "react";
import IRoute from "types/routes/route";
import { useParams } from "react-router-dom";
import { useGetLanding } from "call/actions/landing";
import { Text } from "@chakra-ui/react";
import { Loader } from "components/Spinner";
import { Error } from "components/Error";
import { Preview } from "components/CreateSurvey/CreateLanding/Preview";
import { useGetSurvey } from "call/actions/survey";

const t = {
  noLanding:
    "⚠️ Dev ⚠️ La landing n'a pas encore été créée pour cette enquete.",
};

export const Landing: React.FC<IRoute> = () => {
  // FIXME: Yup, these ignore are bad, need to be removed
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { slug: surveyId } = useParams();

  const { data: survey } = useGetSurvey(surveyId);
  const {
    data: landing,
    isLoading,
    error,
  } = useGetLanding(survey?.survey?.landing?.id);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <Error error={error} />;
  }

  if (landing?.landing === undefined) {
    return (
      <Text pt="80px" variant="titleParaLight">
        {t.noLanding}
      </Text>
    );
  }

  return <Preview data={landing.landing} isUserView />;
};
