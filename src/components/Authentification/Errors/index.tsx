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

  return (
    <Box mt="10px">
      <Text variant="xs" color="brand.red">
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

    default:
      return "";
      break;
  }
};
