import { Box, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";

import { useMediaQueries } from "@/utils/hooks/mediaqueries";

import Logo from "@/assets/logo_footer.svg";
import LogoMobile from "@/assets/logo_footer_mobile.svg";

export default function Footer(): JSX.Element {
  const { isTablet } = useMediaQueries();

  return (
    <Box
      mt="80px"
      backgroundColor="black"
      h="200px"
      color="white"
      mx="auto"
      p={isTablet ? "5%" : "30px"}
      display="flex"
      justifyContent={isTablet ? "center" : "flex-start"}
      flexDirection="column"
      textAlign={isTablet ? "center" : "left"}
      alignItems={isTablet ? "center" : "left"}
    >
      <Box h="20px">
        { isTablet
          ? <Image src={LogoMobile} alt="Logo Mobile" />
          : <Image src={Logo} alt="Logo" />
        }
      </Box>
      
      <Text variant={isTablet ? "xxs" : "currentLight"} mt="20px" maxW="60%">
        Platform for Research Online and CitizEn Science Surveys.
      </Text>

      <Flex justifyContent="space-between" w="100%" mt="20px" textAlign="left">
        <Box>
          <Text variant="currentLight" textDecoration="underline" mt="10px">
            <a href="mailto:thi.tran-viet@aphp.fr">thi.tran-viet@aphp.fr</a>
          </Text>
          {/* <Text variant="currentLight" textDecoration="underline" mt="10px">
            Mentions légales
          </Text> */}
        </Box>
        {/* <Text variant="currentLight" textDecoration="underline" mt="10px">
          CGU
        </Text> */}
      </Flex>
    </Box>
  );
};
