import { Box } from "@chakra-ui/react";
import { TitleDivider } from "components/TitleDivider";
import React from "react";

import { CommonFields, RepeatedFields } from "../index";

export const RadioboxFields: React.FC = () => {
  return (
    <>
      <TitleDivider title="Contenu" />
      <Box
        w="100%"
        m="0 auto"
        border="1px solid #F7F7F7F7"
        p="5"
        backgroundColor="#fdfdfdf1"
      >
        <CommonFields noPlacehoder />
        <RepeatedFields name="options" />
      </Box>
    </>
  );
};
