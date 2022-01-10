import { Text, Button, Center } from "@chakra-ui/react";
import React from "react";
import { NavLink } from "react-router-dom";

const t = {
  title: " 👌 Bienvenue !",
  content:
    "Votre inscription sur la plateforme doit être validée par un administrateur. Vous en serez notifié par e-mail",
  cta: "Retourner à la page d'accueil",
};

export const SuccessPage: React.FC = () => {
  return (
    <Center h="100%" d="flex" flexDirection="column">
      <Text variant="xl" py="20px">
        {t.title}
      </Text>
      <Text variant="current">{t.content}</Text>
      <NavLink to="/">
        <Button mt="40px" variant="roundedBlue">
          {t.cta}
        </Button>
      </NavLink>
    </Center>
  );
};
