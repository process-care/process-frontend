import { Grid } from "@chakra-ui/react";
import Link from "next/link.js"

import {SurveyRedux } from "@/redux/slices/types/index.js"
import { useMediaQueries } from "@/utils/hooks/mediaqueries.js"
import Loader from "@/components/Spinner/index.tsx"
import Card from "./Card/index.tsx"

const t = {
  noData: "No surveys here ....",
};

interface Props {
  surveys: SurveyRedux[] | any | undefined;
  isLoading: boolean;
}

export default function SurveyGrid({ surveys, isLoading }: Props): JSX.Element {
  const { isTablet } = useMediaQueries();
  if (isLoading) {
    return <Loader />;
  }

  if (surveys === undefined) {
    return <p>{t.noData}</p>;
  }

  return (
    <Grid
      templateColumns={["repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(2, 1fr)", "repeat(3, 1fr)"]}
      gap={isTablet ? "1%" : "5%"}
      pt="30px"
      px="10%"
      paddingInlineStart="5%"
      paddingInlineEnd="5%"
    >
      {surveys.map((survey: SurveyRedux) => {
        return (
          <Link key={survey?.id} href={`/survey/${survey?.attributes?.slug}`}>
            <Card data={survey} />
          </Link>
        );
      })}
    </Grid>
  );
};
