import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useNavigator } from "components/CreateSurvey/hooks";
import React from "react";
import { useAppSelector } from "redux/hooks";
import { ReactComponent as Picto } from "./assets/add.svg";

const t = {
  createLanding: "Créer la page d'accueil",
  editLanding: "Modifier la page d'accueil",
  createForm: "Créer le questionnaire",
  createConsent: "éditer la page de consentement",
  title: "Enquête :",
  cta: "Créer l'enquête !",
};

export const ActionButtons: React.FC = () => {
  const { survey } = useAppSelector((state) => state.builder.survey);
  const { gotToLanding, goToForm, goToConsent } = useNavigator(survey);
  const { landing } = survey;
  const Btn = ({
    handleClick,
    label,
  }: {
    handleClick: () => void;
    label: string;
  }) => {
    return (
      <Button
        mx="20px"
        h="320px"
        w="240px"
        bottom="0px"
        onClick={handleClick}
        _hover={{
          backgroundColor: "white",
          bottom: "10px",
          transition: "all 300ms",
        }}
        borderRadius="0"
        backgroundColor="white"
        border="1px solid"
        borderColor="brand.line"
      >
        <Flex
          flexDir="column"
          justifyContent="center"
          textAlign="center"
          alignItems="center"
        >
          <Text
            variant="currentLight"
            textTransform="uppercase"
            whiteSpace="initial"
            maxW="150px"
          >
            {label}
          </Text>

          <Box mt="20px">
            <Picto />
          </Box>
        </Flex>
      </Button>
    );
  };

  return (
    <Box>
      <Box pt="80px" d="flex" justifyContent="space-between" w="100%" my="auto">
        <Btn
          label={landing ? t.editLanding : t.createLanding}
          handleClick={gotToLanding}
        />
        <Btn label={t.createForm} handleClick={goToForm} />
        <Btn label={t.createConsent} handleClick={goToConsent} />
      </Box>
    </Box>
  );
};
