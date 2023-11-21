import { Box, Text } from "@chakra-ui/react"
import Image from "next/image"

import { useMediaQueries } from "@/utils/hooks/mediaqueries.js"
import { FooterLogo, MobileFooterLogo } from "@/components/Logos.tsx"
import UnivLogo from '@/../public/UniversiteParisCite-Logo.png'

export default function Footer(): JSX.Element {
  const { isTablet } = useMediaQueries();

  return (
    <Box
      mt="80px"
      backgroundColor="black"
      h="200px"
      color="white"
      p={isTablet ? "5%" : "30px"}
      display="flex"
      justifyContent={isTablet ? "center" : "space-between"}
      flexDirection="row"
      textAlign={isTablet ? "center" : "left"}
      alignItems={isTablet ? "center" : "left"}
    >
      <div className="flex flex-col">
        <Box h="20px">
          { isTablet
            ? <MobileFooterLogo />
            : <FooterLogo />
          }
        </Box>
        
        <Text variant={isTablet ? "xxs" : "currentLight"} mt="20px" maxW="60%">
          Platform for Research Online and CitizEn Science Surveys.
        </Text>

        <Box justifyContent="space-between" w="100%" mt="20px" textAlign="left">
          <Text variant="currentLight" textDecoration="underline">
            <a href="/legal">Mentions légales</a>
          </Text>
          <Text variant="currentLight">
            Contact : <a className="underline" href="mailto:thi.tran-viet@aphp.fr">thi.tran-viet@aphp.fr</a>
          </Text>
        </Box>
      </div>

      <div>
        <Image className="w-52" src={UnivLogo} alt="Logo de l'Université Paris Cité" />
      </div>
    </Box>
  )
}
