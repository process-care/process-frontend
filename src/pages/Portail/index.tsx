import { Box } from "@chakra-ui/react";
import { SurveyGrid } from "components/SurveyGrid";
import React from "react";
import IRoute from "types/routes/route";

export const Portail: React.FC<IRoute> = () => {
  return (
    <Box>
      <SurveyGrid />
    </Box>
  );
};
