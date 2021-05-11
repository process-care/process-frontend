import { Button } from "@chakra-ui/button";
import { Box, Flex, Text } from "@chakra-ui/layout";
import React from "react";

const PageBuilder: React.FC = () => {
  const [page, setPage] = React.useState({ data: [], totalPage: 0 });

  React.useEffect(() => {
    setPage({ data: ["Page 1"], totalPage: 1 });
  }, []);

  const handlePage = () => {
    setPage({
      data: [...page.data, `Page ${page.totalPage + 1}`],
      totalPage: page.totalPage + 1,
    });
  };
  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      pt={5}
      backgroundColor="white"
      width="100%">
      <Button onClick={() => handlePage()} variant="ghost">
        +
      </Button>
      {page.data.map((el) => {
        return (
          <Box
            border="1px"
            borderColor="gray.300"
            p="40px 5px"
            key={el}
            marginY={2}
            width="100%"
            _hover={{ cursor: "pointer" }}>
            <Text fontSize="10">{el}</Text>
          </Box>
        );
      })}
    </Flex>
  );
};
export default PageBuilder;
