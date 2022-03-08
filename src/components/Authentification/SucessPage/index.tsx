import { Text, Button, Center } from "@chakra-ui/react";
import React from "react";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { actions } from "redux/slices/scientistData";
import { history } from "redux/store/history";

const t = {
  title: " 👌 Bienvenue !",
  content:
    "Votre inscription sur la plateforme doit être validée par un administrateur. Vous en serez notifié par e-mail",
  cta: "Retourner à la page d'accueil",
};

export const SuccessPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.scientistData.auth.data);
  if (!user) return <></>;

  const handleClick = () => {
    dispatch(actions.logged(user));
    history.push("/dashboard");
  };

  return (
    <Center h="100%" d="flex" flexDirection="column">
      <Text variant="xl" py="20px">
        {t.title}
      </Text>
      <Text variant="current">{t.content}</Text>
      <Button mt="40px" variant="roundedBlue" onClick={handleClick}>
        {t.cta}
      </Button>
    </Center>
  );
};
