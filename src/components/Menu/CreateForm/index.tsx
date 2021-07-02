import { Flex, Text, Button, Box, Collapse } from "@chakra-ui/react";
import React from "react";
import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { mockForm } from "redux/slices/formBuilder";
import { ReactComponent as Back } from "./assets/back.svg";
import { t } from "static/input";
import { tooglePreview } from "redux/slices/application";
import { useGetSurveyQuery } from "api/survey";
import { Loader } from "components/Spinner";

interface Props {
  isLanding?: boolean;
}

export const Menu: React.FC<Props> = ({ isLanding }) => {
  const { data, isLoading, error } = useGetSurveyQuery(
    process.env.REACT_APP_CURRENT_SURVEY_ID!
  );
  const { preview_mode } = useAppSelector((state) => state.application);
  const dispatch = useAppDispatch();

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <>
      <Collapse in={preview_mode === "landing"} style={{ width: "100%" }}>
        <Button
          pos="absolute"
          top={7}
          left="13%"
          variant="roundedBlue"
          onClick={() =>
            dispatch(
              tooglePreview({
                preview_mode: null,
              })
            )
          }
        >
          Sortir de la previsualisation
        </Button>
      </Collapse>
      <Collapse in={preview_mode !== "landing"}>
        <Flex
          pos="relative"
          p={5}
          borderBottom="1px"
          justifyContent="flex-start"
          alignItems="center"
        >
          <NavLink to="/dashboard">
            <Flex ml="50px" alignItems="center">
              <Back />
              <Text fontSize="12px" ml={2} mr="30px">
                Dashboard
              </Text>
            </Flex>
          </NavLink>

          <Text
            fontSize="12px"
            textTransform="uppercase"
            isTruncated
            maxWidth="250px"
          >
            {data?.survey?.description}
          </Text>
          <Box pos="absolute" right="10px">
            <Button variant="roundedTransparent" mr={5}>
              {t.save}
            </Button>
            <Button variant="rounded" mr={5}>
              {t.publish}
            </Button>

            {isLanding ? (
              <Button
                variant="roundedBlue"
                mr={5}
                onClick={() =>
                  dispatch(
                    tooglePreview({
                      preview_mode: "landing",
                    })
                  )
                }
              >
                {t.preview}
              </Button>
            ) : (
              <Button variant="roundedBlue" mr={5}>
                {t.verify}
              </Button>
            )}

            <Button variant="link" onClick={() => dispatch(mockForm())}>
              Mock
            </Button>
          </Box>
        </Flex>
      </Collapse>
    </>
  );
};
