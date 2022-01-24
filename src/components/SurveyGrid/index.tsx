import { Grid } from "@chakra-ui/react";
import React from "react";
import { Loader } from "components/Spinner";
import { NavLink } from "react-router-dom";
import ISurvey from "types/survey";
import { Card } from "./Card";
import { useMediaQueries } from "utils/hooks/mediaqueries";

const t = {
  noData: "No surveys here ....",
};

interface Props {
  surveys: ISurvey[] | undefined;
  isLoading: boolean;
}

export const SurveyGrid: React.FC<Props> = ({ surveys, isLoading }) => {
  const { isTablet } = useMediaQueries();
  if (isLoading) {
    return <Loader />;
  }

  if (surveys === undefined) {
    return <p>{t.noData}</p>;
  }

  return (
    <Grid
      templateColumns={[
        "repeat(1, 1fr)",
        "repeat(1, 1fr)",
        "repeat(2, 1fr)",
        "repeat(3, 1fr)",
      ]}
      gap={isTablet ? "1%" : "5%"}
      pt="75px"
      px="10%"
      paddingInlineStart="5%"
      paddingInlineEnd="5%"
    >
      {surveys.map((survey) => {
        return (
          <NavLink key={survey.id} to={`/survey/${survey.slug}`}>
            <Card data={survey} />
          </NavLink>
        );
      })}
    </Grid>
  );
};
