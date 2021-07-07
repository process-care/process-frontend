import { Box, Flex, Text } from "@chakra-ui/layout";
import React from "react";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { selectPage, setIsRemoving } from "redux/slices/formBuilder";

import { ReactComponent as Locked } from "./assets/locked.svg";
import { ReactComponent as Delete } from "./assets/delete.svg";
import { ReactComponent as Condition } from "./assets/condition.svg";
import { ReactComponent as Add } from "./assets/add.svg";

import {
  getConditionById,
  hadValidCondition,
} from "utils/formBuilder/condition";
import { isInactive } from "./utils";
import { SvgHover } from "components/SvgHover";
import { useAddPage } from "api/actions/page";
import ISurvey from "interfaces/survey";

interface Props {
  survey: ISurvey;
}

const PageBuilder: React.FC<Props> = ({ survey }) => {
  const { selected_page, selected_condition } = useAppSelector(
    (state) => state.formBuilder
  );
  const selectedCondition = getConditionById(selected_condition.id);
  const dispatch = useAppDispatch();
  const { mutateAsync: addPage, isLoading } = useAddPage();

  const { pages } = survey;

  // Select first page if selected_page is empty.
  React.useEffect(() => {
    if (!selected_page.id && pages.length > 0) {
      dispatch(selectPage(pages[0]));
    }
  }, [pages]);

  const handlePage = () => {
    !isLoading &&
      addPage({
        name: `Page ${pages.length + 1}`,
        is_locked: false,
        short_name: `P${pages.length + 1}`,
        survey: survey.id,
      }).then((data: any) => dispatch(selectPage(data.createPage.page)));
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
          const isSelected = selected_page.id === page.id;
          return (
            <Box
              mb={4}
              w="100%"
              key={page.id}
              visibility={
                isInactive(selectedCondition, pages, i) ? "hidden" : "visible"
              }
            >
              <Flex alignItems="center" position="relative">
                <Box position="absolute" right="16px" bottom="35px">
                  {hadValidCondition(page.id).length > 0 ? <Condition /> : ""}
                </Box>
                <Box
                  onClick={() => dispatch(selectPage(page))}
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
                      dispatch(selectPage(page));
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
