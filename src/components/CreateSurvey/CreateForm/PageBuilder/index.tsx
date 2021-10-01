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
import ISurvey from "types/survey";
import { actions, selectors } from "redux/slices/page-editor";

interface Props {
  survey: ISurvey;
}

const PageBuilder: React.FC<Props> = ({ survey }) => {
  const { selected_condition } = useAppSelector((state) => state.formBuilder);
  const selectedPage = useAppSelector(selectors.getSelectedPage);
  const dispatch = useAppDispatch();
  const pages = useAppSelector(selectors.getAllPages);

  const handlePage = () => {
    dispatch(actions.create({ id: survey.id }));
  };
  const selectPage = (id: string) => {
    dispatch(actions.setSelectedPage(id));
  };

  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      pt={5}
      backgroundColor="white"
      width="100%"
      position="relative"
    >
      <Box h="80%" overflowY="auto" w="100%">
        {pages?.map((page, i) => {
          const isSelected = selectedPage?.id === page.id;
          return (
            <Box
              mb={4}
              w="100%"
              key={page.id}
              visibility={
                isInactive(selected_condition, pages, i) ? "hidden" : "visible"
              }
            >
              <Flex alignItems="center" position="relative">
                <Box position="absolute" right="16px" bottom="35px">
                  {page?.conditions?.length > 0 ? <Condition /> : ""}
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
                  {page.is_locked ? (
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
              <Text
                mt={1}
                color="blue.500"
                fontSize="10"
                fontWeight={isSelected ? "bold" : ""}
              >
                {page.name}
              </Text>
            </Box>
          );
        })}
      </Box>

      <Box onClick={() => handlePage()} pos="absolute" bottom="80px">
        <SvgHover>
          <Add />
        </SvgHover>
      </Box>
    </Flex>
  );
};
export default PageBuilder;
