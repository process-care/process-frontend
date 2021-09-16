import {
  Flex,
  Text,
  Button,
  Collapse,
  CircularProgress,
} from "@chakra-ui/react";
import React from "react";
import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { ReactComponent as Back } from "./assets/back.svg";
import { t } from "static/input";
import { tooglePreview } from "redux/slices/application";
import { Loader } from "components/Spinner";
import { useGetSurvey } from "call/actions/survey";
import { setConditionStatus } from "redux/slices/formBuilder";
import { CheckIcon } from "@chakra-ui/icons";

interface Props {
  isLanding?: boolean;
  surveyId: string;
}

export const Menu: React.FC<Props> = ({ isLanding, surveyId }) => {
  const { data, isLoading, error } = useGetSurvey(surveyId);
  const { preview_mode, is_saving } = useAppSelector(
    (state) => state.application
  );
  const dispatch = useAppDispatch();

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  const handleVerify = () => {
    dispatch(setConditionStatus(surveyId));
  };

  return (
    <>
      {preview_mode === "landing" && (
        <Button
          pos="absolute"
          top="19px"
          right="10px"
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
      )}

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
            {data?.survey?.title}
          </Text>
          <Flex pos="absolute" right="10px">
            {is_saving && (
              <Text
                variant="xs"
                mr="40px"
                color="brand.green"
                top="10px"
                pos="relative"
              >
                <CheckIcon mr="7px" />
                Modification sauvegardée
                <CircularProgress
                  ml={2}
                  isIndeterminate
                  color="brand.green"
                  size="2"
                />
              </Text>
            )}
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
              <Flex alignItems="center">
                <Button variant="roundedBlue" mr={5} onClick={handleVerify}>
                  {t.verify}
                </Button>
              </Flex>
            )}
          </Flex>
        </Flex>
      </Collapse>
    </>
  );
};
