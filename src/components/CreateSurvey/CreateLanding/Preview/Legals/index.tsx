import { Box, Text } from "@chakra-ui/react";

import { LandingRedux } from "@/redux/slices/types/index.js"

interface Props {
  author: { email: string; username: string } | undefined | null;
  data: LandingRedux | undefined;
}

export default function Legals({ author, data }: Props): JSX.Element {
  return (
    <Box w="100%" h="100%" pt="40px" color="gray.800">
      <Text variant="smallTitleBold" color="gray.800">
        Contact:
      </Text>

      <Text
        mb="30px"
        variant="smallTitle"
        color="gray.800"
        borderBottom="1px solid"
        w="fit-content"
        _hover={{ color: data?.attributes?.color_theme?.button }}
      >
        <a href={`mailto:${author?.email}`}>{author?.email}</a>
      </Text>

      <Text variant="smallTitleBold">Hébergement :</Text>

      <Text mb="30px" className="font-light text-sm">
        Site généré à partir de la plateforme PROCESS de l&apos;Université Paris Cité Site.
        <br /> Le site est hébergé par la société Heroku Inc., 650 7th Street, San Francisco, CA (tel : +33 1 (877)
        563-4311).
        <br /> Le stockage des données personnelles des utilisateurs est exclusivement réalisé sur les centres de
        données (&quot;clusters&quot;) de la société Amazon Inc, dont le siège social est situé 10 Terry Avenue North, Seattle,
        WA.
        <br /> Tous les clusters Amazon sur lesquels les données du Site sont stockées sont localisés dans des Etats
        membres de l&apos;Union Européenne.
      </Text>

      <Text variant="smallTitleBold">Vie privée</Text>

      <Text display="inline-block" className="font-light text-sm">
        Le traitement de vos données à caractère personnel est régi par notre Charte du respect de la vie privée
        conformément au Règlement Général sur la Protection des Données 2016/679 du 27 avril 2016 (« RGPD »).
        <br /> Pour toute question concernant vos données personnelles, vous pouvez contacter le responsable du projet :
      </Text>

      <Text
        display="inline-block"
        className="font-light text-sm"
        borderBottom="1px solid"
        w="fit-content"
        _hover={{ color: data?.attributes?.color_theme?.button }}
      >
        <a href={`mailto:${author?.email}`}> {author?.email}</a>
      </Text>

      <Text className="font-light text-sm" mt="20px">
        Site généré à partir de la plateforme PROCESS de l&apos;Université Paris Cité.
      </Text>
    </Box>
  );
};
