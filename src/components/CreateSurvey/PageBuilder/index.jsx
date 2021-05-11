import { Box, Flex, Text } from "@chakra-ui/layout";
import React from "react";

const PageBuilder: React.FC = () => {
  const data = ["page 1", "page 2", "page 3", "page 4"];
  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      pt={5}
      backgroundColor="white"
      width="100%">
      {data.map((el) => {
        return (
          <Box
            border="1px"
            borderColor="gray.300"
            p="40px 10px"
            key={el}
            marginY={4}>
            <Text>{el}</Text>
          </Box>
        );
      })}
    </Flex>
  );
};
export default PageBuilder;
