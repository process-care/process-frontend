import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";

export interface Filter {
  label: string;
  id: string;
}

interface Props {
  filters: Filter[];
  handleClick: (id: string) => void;
  currentFilter: string;
}

export const Filters: React.FC<Props> = ({
  filters,
  handleClick,
  currentFilter,
}) => {
  return (
    <Flex>
      {filters.map(({ label, id }) => {
        const isSelected = currentFilter === id;

        return (
          <Box
            mr="3"
            key={id}
            onClick={() => handleClick(id)}
            backgroundColor={isSelected ? "brand.line" : "transparent"}
            color={isSelected ? "black" : "brand.gray.200"}
            borderRadius="50px"
            px={3}
            transition="all 200ms"
            _hover={{ cursor: "pointer" }}
          >
            <Text variant="current">{label}</Text>
          </Box>
        );
      })}
    </Flex>
  );
};
