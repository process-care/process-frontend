import { Box, Text } from "@chakra-ui/react";
import { LandingRedux } from "redux/slices/types";

interface Props {
  author: { email: string; username: string } | undefined | null;
  data: LandingRedux | undefined;
}

export const Contact: React.FC<Props> = ({ author, data }) => {
  return (
    <Box w="100%" h="100%">
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
      <Text variant="smallTitleBold" color="gray.800">
        Mentions Légales:
      </Text>
      <Text mb="30px" variant="smallTitle" color="gray.800" w="fit-content">
        dsqdqsdsqd
        <br /> sqdqsd sqdqsdqsdq
        <br /> sqdqsdqsdqdqsd
        <br /> sqdqsdqsdqdqsdqsd
      </Text>
    </Box>
  );
};
