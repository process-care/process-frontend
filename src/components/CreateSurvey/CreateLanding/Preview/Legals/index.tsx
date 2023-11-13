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
        <br />Le site est hébergé par la société Scalingo, 13 rue Jacques Peirotes, 67000 Strasbourg, France. (<a className="underling text-blue-500" href="https://scalingo.com/fr/contact" target="_blank">Page de contact</a>)
        <br />Le stockage des données personnelles des utilisateurs est exclusivement réalisé sur les centres de
        données (&quot;clusters&quot;) de la société Outscale, dont le siège social est situé 1 rue Royale, 92210 Saint-Cloud, France.
        <br />Tous les clusters Outscale sur lesquels les données du site sont stockées sont localisés en France.
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
