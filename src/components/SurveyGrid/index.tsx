import { Grid } from "@chakra-ui/react";
import React from "react";
import { Loader } from "components/Spinner";
import { NavLink } from "react-router-dom";
import { Card } from "./Card";
import { SurveyRedux } from "redux/slices/types";
import { SurveySearchQuery } from "api/graphql/sdk.generated";

const t = {
  noData: "No surveys here ....",
};

interface Props {
  surveys: SurveyRedux[] | SurveySearchQuery["surveys"][] | undefined;
  isLoading: boolean;
}

export const SurveyGrid: React.FC<Props> = ({ surveys, isLoading }) => {
  if (isLoading) {
    return <Loader />;
  }

  if (surveys === undefined) {
    return <p>{t.noData}</p>;
  }

  return (
    <Grid templateColumns="repeat(3, 1fr)" gap={10} pt="80px" px="10%">
      {surveys.map((survey) => {
        return (
          <NavLink
            key={survey?.data?.id}
            to={`/survey/${survey?.attributes?.slug}`}
          >
            <Card data={survey} />
          </NavLink>
        );
      })}
    </Grid>
  );
};
