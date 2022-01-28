import { Text } from "@chakra-ui/react";
import { useMemo } from "react";

interface Props {
  message: string;
}

export const Errors: React.FC<Props> = ({ message }) => {
  const renderStatus = useMemo(
    () => (message: string) => {
      switch (message) {
        case "Auth.form.error.invalid":
          return "Identifiant ou mot de passe incorrect";
          break;
        case "Auth.form.error.email.taken":
          return "Un compte existe déja avec cet email de contact ou ce nom d'utilisateur";
          break;
        case "Duplicate entry":
          return "Le titre du projet existe déja.";
          break;
        case "Your account has been blocked by the administrator.":
          return "Votre compte a été bloqué par l'administrateur.";
          break;
        case "Bad Request":
          return "Une erreur est survenue, merci de vérifier votre email et mot de passe.";
          break;
        case "User Not Found":
          return "Utilisateur non trouvé.";
          break;
        case "Cannot read property 'id' of undefined":
          return "Une erreur est survenue (pb id).";
          break;

        default:
          return message;
          break;
      }
    },
    [message]
  );
  return (
    <Text variant="xs" color="brand.red" textAlign="right" mb="-10px">
      {renderStatus(message)}
    </Text>
  );
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const renderAuthMessage = (errors: any): string => {
  if (!errors) return "";
  return errors?.map((e: any) => e.message)[0];
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const renderSurveyMessage = (errors: any): string => {
  return errors?.map((e: any) => e.message)[0];
};
