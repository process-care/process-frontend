import { useAppSelector } from "redux/hooks";
import { Box, Text } from "@chakra-ui/react";

export const Errors: React.FC = () => {
  const errors = useAppSelector((state) => state.global.auth.errors);
  const message = errors
    ?.map((e) => e.extensions)
    .map((e) => e.exception)
    .map((e) => e.data)
    .map((e) => e.data)
    .map((e) => e)[0]
    .map((e: any) => e.messages)[0]
    .map((e: any) => e.id)[0];
  console.log(message);
  return (
    <Box mt="10px">
      <Text variant="xs" color="brand.red" textAlign="right">
        {renderStatus(message)}
      </Text>
    </Box>
  );
};

const renderStatus = (message: string) => {
  switch (message) {
    case "Auth.form.error.invalid":
      return "Identifiant ou mot de passe incorrect";
      break;
    case "Auth.form.error.email.taken":
      return "Un compte existe déja avec cet email de contact ou ce nom d'utilisateur";
      break;

    default:
      return "";
      break;
  }
};
