import React from "react";
import IRoute from "types/routes/route";
import { useParams } from "react-router-dom";
import { useGetLanding } from "call/actions/landing";
// import { Text } from "@chakra-ui/react";
import { Loader } from "components/Spinner";
import { Error } from "components/Error";
import { Preview } from "components/CreateSurvey/CreateLanding/Preview";
import { client } from "call/actions";
import { useGetBySlugQuery } from "./queries.gql.generated";

// const t = {
//   noLanding:
//     "⚠️ Dev ⚠️ La landing n'a pas encore été créée pour cette enquete.",
// };

export const Landing: React.FC<IRoute> = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: survey } = useGetBySlugQuery(client, { slug });

  const {
    data: landing,
    isLoading,
    error,
  } = useGetLanding(survey?.surveys?.data[0].attributes?.landing?.data?.id);

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

  return <Preview data={landing?.landing} isUserView />;
};
