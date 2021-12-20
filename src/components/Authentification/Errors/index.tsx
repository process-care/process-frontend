import { Box, Text } from "@chakra-ui/react";

interface Props {
  message: string;
}

export const Errors: React.FC<Props> = ({ message }) => {
  return (
    <Box mt="10px">
      <Text variant="xs" color="brand.red" textAlign="right">
        {renderStatus(message)}
      </Text>
    </Box>
  );
};

const renderStatus = (message: string) => {
  console.log(message);
  switch (message) {
    case "Auth.form.error.invalid":
      return "Identifiant ou mot de passe incorrect";
      break;
    case "Auth.form.error.email.taken":
      return "Un compte existe déja avec cet email de contact ou ce nom d'utilisateur";
      break;
    case "Error: Duplicate entry":
      return "Le titre de l'enquête existe déja.";
      break;

    default:
      return "";
      break;
  }
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const renderAuthMessage = (errors: any): string => {
  return errors
    ?.map((e: any) => e.extensions)
    .map((e: any) => e.exception)
    .map((e: any) => e?.data)
    .map((e: any) => e?.data)
    .map((e: any) => e)[0]
    .map((e: any) => e.messages)[0]
    .map((e: any) => e.id)[0];
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const renderSurveyMessage = (errors: any): string => {
  return errors
    ?.map((e: any) => e.extensions)
    .map((e: any) => e.exception)
    .map((e: any) => e.stacktrace)[0][0];
};
