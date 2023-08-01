import React from "react";
import { Box, Flex, Text } from "@chakra-ui/layout";
import Image from "next/image";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setIsRemoving } from "@/redux/slices/formBuilder";
import { actions, selectors } from "@/redux/slices/scientistData";
import { SurveyRedux } from "@/redux/slices/types";
import { isInactive } from "./utils";
import SvgHover from "@/components/SvgHover";

import Locked from "./assets/locked.svg";
import Delete from "./assets/delete.svg";
import Condition from "./assets/condition.svg";
import Add from "./assets/add.svg";

interface Props {
  survey: SurveyRedux;
}

export default function PageBuilder({ survey }: Props): JSX.Element {
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

  const pagesConditions = useAppSelector(selectors.conditions.getAllPagesConditions);

  return (
    <Flex flexDirection="column" alignItems="center" pt={5} backgroundColor="white" width="100%" position="relative">
      <Box
        onClick={handlePage}
        mb="10"
        display="flex"
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
        _hover={{
          cursor: "pointer",
        }}
      >
        <SvgHover>
          <Image src={Add} alt="Add"/>
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
                  {pagesConditions.some((c) => c?.attributes?.referer_page?.data?.id === page.id) ? (
                    <Image src={Condition} alt="Condition" />
                  ) : (
                    <></>
                  )}
                </Box>

                <Box
                  onClick={() => selectPage(page.id)}
                  display="flex"
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
                      <Image src={Locked} alt="Locked" />
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
                    <Image src={Delete} alt="Delete" />
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
