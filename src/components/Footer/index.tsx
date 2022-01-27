import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";

import { ReactComponent as Logo } from "assets/logo_footer.svg";
import { ReactComponent as LogoMobile } from "assets/logo_footer_mobile.svg";

import { useMediaQueries } from "utils/hooks/mediaqueries";

export const Footer: React.FC = () => {
  const { isTablet } = useMediaQueries();

  return (
    <Box
      mt="80px"
      backgroundColor="black"
      h="200px"
      color="white"
      mx="auto"
      p={isTablet ? "5%" : "30px"}
      d="flex"
      justifyContent={isTablet ? "center" : "flex-start"}
      flexDirection="column"
      textAlign={isTablet ? "center" : "left"}
      alignItems={isTablet ? "center" : "left"}
    >
      <Box h="20px">{isTablet ? <LogoMobile /> : <Logo />}</Box>
      <Text variant={isTablet ? "xxs" : "currentLight"} mt="20px" maxW="60%">
        Une plateforme de curation scientifique curabitur blandit tempus
        porttitor.
      </Text>
      <Flex justifyContent="space-between" w="100%" mt="20px" textAlign="left">
        <Box>
          <Text variant="currentLight" textDecoration="underline" mt="10px">
            contact@process.com
          </Text>
          <Text variant="currentLight" textDecoration="underline" mt="10px">
            Mentions légales
          </Text>
        </Box>
        <Text variant="currentLight" textDecoration="underline" mt="10px">
          CGU
        </Text>
      </Flex>
    </Box>
  );
};
