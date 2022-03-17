import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { useMediaQueries } from "utils/hooks/mediaqueries";

export interface Filter {
  label: string;
  id: string;
}

interface Props {
  filters: Filter[];
  handleClick: (id: any) => void;
  currentFilter: string;
  center?: boolean;
}

export const Filters: React.FC<Props> = ({ filters, handleClick, currentFilter, center }) => {
  const { isTablet } = useMediaQueries();
  return (
    <Flex justifyContent={center ? "center" : undefined} w="fit-content">
      {filters.map(({ label, id }) => {
        const isSelected = currentFilter === id;

        return (
          <Box
            mr={isTablet ? "unset" : "3"}
            key={id}
            onClick={() => handleClick(id)}
            backgroundColor={isSelected ? "white" : "transparent"}
            border="1px solid rgb(220, 220, 228)"
            color={isSelected ? "black" : "brand.gray.200"}
            borderRadius="4px"
            px="10px"
            py="5px"
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
