import { Button } from "@chakra-ui/button";
import { Box, Flex, Text } from "@chakra-ui/layout";
import React from "react";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { addPage, removePage, selectPage } from "redux/slices/formBuilder";
import { v4 as uuidv4 } from "uuid";

import { ReactComponent as Locked } from "./assets/locked.svg";
import { ReactComponent as Delete } from "./assets/delete.svg";

const PageBuilder: React.FC = () => {
  const { pages, selected_page } = useAppSelector((state) => state.formBuilder);
  const id = uuidv4();

  const dispatch = useAppDispatch();

  const handlePage = () => {
    dispatch(
      addPage({
        name: `Page ${pages.length + 1}`,
        id: `page-${id}`,
        is_locked: false,
        had_condition: false,
      })
    );
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
      {pages.map((page) => {
        return (
          <Box mb={4} w="100%" key={page.id}>
            <Flex alignItems="center">
              <Box
                onClick={() => dispatch(selectPage(page))}
                d="flex"
                flexDirection="column"
                border="1px"
                backgroundColor={
                  selected_page.id === page.id ? "blue.200" : "transparent"
                }
                m="0 auto"
                borderColor={
                  selected_page.id === page.id ? "blue.500" : "gray.300"
                }
                key={page.id}
                py={4}
                px={3}
                _hover={{ cursor: "pointer" }}>
                {page.is_locked ? (
                  <Box mx="auto">
                    <Locked />
                  </Box>
                ) : (
                  <Box p="4px 4px 5px 4px"></Box>
                )}
              </Box>
              <Box
                _hover={{ cursor: "pointer" }}
                onClick={() => dispatch(removePage(page))}>
                <Delete />
              </Box>
            </Flex>
            <Text mt={1} color="blue.500" fontSize="10">
              {page.name}
            </Text>
          </Box>
        );
      })}
    </Flex>
  );
};
export default PageBuilder;
