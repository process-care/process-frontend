import { Box, Flex, Text } from "@chakra-ui/layout";
import React from "react";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { setIsRemoving } from "redux/slices/formBuilder";

import { ReactComponent as Locked } from "./assets/locked.svg";
import { ReactComponent as Delete } from "./assets/delete.svg";
import { ReactComponent as Condition } from "./assets/condition.svg";
import { ReactComponent as Add } from "./assets/add.svg";

import { isInactive } from "./utils";
import { SvgHover } from "components/SvgHover";

import { actions, selectors } from "redux/slices/scientistData";
import { SurveyRedux } from "redux/slices/types";

interface Props {
  survey: SurveyRedux;
}

const PageBuilder: React.FC<Props> = ({ survey }) => {
  const dispatch = useAppDispatch();

  const pages = useAppSelector(selectors.pages.getPages);
  const selectedCondition = useAppSelector(selectors.conditions.getSelectedCondition);
  const selectedPage = useAppSelector(selectors.pages.getSelectedPage);

  const handlePage = () => {
    dispatch(actions.createPage({ id: survey.id }));
  };
  const selectPage = (id: string) => {
    dispatch(actions.setSelectedPage(id));
  };

  const conditions = useAppSelector(selectors.conditions.getAllConditions);

  console.log(pages);
  return (
    <Flex flexDirection="column" alignItems="center" pt={5} backgroundColor="white" width="100%" position="relative">
      <Box
        onClick={() => handlePage()}
        mb="10"
        d="flex"
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
        _hover={{
          cursor: "pointer",
        }}
      >
        <SvgHover>
          <Add />
        </SvgHover>
        <Text variant="xs" mt="2">
          Ajouter une page
        </Text>
      </Box>
      <Box h="80%" overflowY="auto" w="100%">
        {pages?.map((page, i) => {
          const isSelected = selectedPage?.id === page.id;
          return (
            <Box
              mb={4}
              w="100%"
              key={page.id}
              visibility={isInactive(selectedCondition, pages, i) ? "hidden" : "visible"}
            >
              <Flex alignItems="center" position="relative">
                <Box position="absolute" right="16px" bottom="35px">
                  {conditions.filter((c) => c?.attributes?.referer_page?.data?.id === page.id)?.length > 0 && (
                    <Condition />
                  )}
                </Box>
                <Box
                  onClick={() => selectPage(page.id)}
                  d="flex"
                  flexDirection="column"
                  border="1px"
                  backgroundColor={isSelected ? "blue.200" : "transparent"}
                  m="0 auto"
                  borderColor={isSelected ? "blue.500" : "gray.300"}
                  key={page.id}
                  py={4}
                  px={3}
                  _hover={{ cursor: "pointer" }}
                >
                  {page?.attributes?.is_locked ? (
                    <Box mx="auto">
                      <Locked />
                    </Box>
                  ) : (
                    <Box p="4px 4px 5px 4px"></Box>
                  )}
                </Box>
                {i !== 0 && (
                  <Box
                    _hover={{ cursor: "pointer" }}
                    onClick={() => {
                      selectPage(page.id);
                      dispatch(setIsRemoving(page.id));
                    }}
                  >
                    <Delete />
                  </Box>
                )}
              </Flex>
              <Text mt={1} color="blue.500" fontSize="10" fontWeight={isSelected ? "bold" : ""}>
                {page?.attributes?.name}
              </Text>
            </Box>
          );
        })}
      </Box>
    </Flex>
  );
};
export default PageBuilder;
