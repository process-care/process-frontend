import { Text } from "@chakra-ui/react";
import { useCallback } from "react";

interface Props {
  message: string;
}

export default function Errors({ message }: Props): JSX.Element {
  const renderStatus = useCallback((message: string) => {
    switch (message) {
      case "Auth.form.error.invalid":
        return "Identifiant ou mot de passe incorrect";

      case "Invalid identifier or password":
        return "Identifiant ou mot de passe incorrect";

      case "Auth.form.error.email.taken":
        return "Un compte existe déja avec cet email de contact ou ce nom d'utilisateur";

      case "Duplicate entry":
        return "Le titre du projet existe déja.";

      case "Your account has been blocked by the administrator.":
        return "Votre compte a été bloqué par l'administrateur.";

      case "Email already taken":
        return "Un compte existe déja avec cet email de contact";

      case "Bad Request":
        return "Une erreur est survenue, merci de vérifier votre email et mot de passe.";

      case "User Not Found":
        return "Utilisateur non trouvé.";

      case "Cannot read property 'id' of undefined":
        return "Une erreur est survenue (pb id).";

      default:
        return message;
    }
  }, []);

  return (
    <Text variant="xs" color="brand.red" textAlign="right" mb="-10px">
      {renderStatus(message)}
    </Text>
  );
};

// ---- UTILS

export const renderAuthMessage = (errors: any): string => {
  if (!errors) return "";
  return errors?.map((e: any) => e.message)[0];
};

export const renderSurveyMessage = (errors: any): string => {
  return errors?.map((e: any) => e.message)[0];
};
