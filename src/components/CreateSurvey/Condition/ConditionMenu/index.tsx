import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { useAppSelector } from "redux/hooks";

export const ConditionMenu: React.FC = () => {
  const { selected_page } = useAppSelector((state) => state.formBuilder);
  return (
    <Box p={4}>
      <Text fontSize="14px" textTransform="uppercase">
        Afficher la page{" "}
      </Text>
      <Text fontSize="16px" fontWeight="bold">
        {selected_page.name}{" "}
      </Text>
    </Box>
  );
};
