import {
  Flex,
  Box,
  Button,
  Text,
  Container,
  Image,
  Grid,
} from "@chakra-ui/react";
import Link from "next/link.js"

import { t } from "@/static/createLanding.ts"
import { Color } from "@/types/landing.ts"
import { useMediaQueries } from "@/utils/hooks/mediaqueries.js"

type Props = {
  partners_logos: string[];
  color_theme?: Color;
};

export default function Footer({ partners_logos, color_theme }: Props): JSX.Element {
  const { isTablet } = useMediaQueries();

  return (
    <Box mb={isTablet ? "50px" : "0"}>
      <Container variant="hr" w="100%" maxW="unset" />
      <Flex
        py={10}
        justifyContent={isTablet ? "center" : "space-between"}
        flexDir={isTablet ? "column" : "row"}
      >
        <Grid
          my="40px"
          templateColumns={[
            "repeat(1, 1fr)",
            "repeat(1, 1fr)",
            "repeat(2, 1fr)",
            "repeat(4, 1fr)",
          ]}
          gap="40px 10px"
        >
          <Flex justifyContent="center">
            {partners_logos.map((img: any, idx) => (
              <Image
                borderRadius="full"
                fallbackSrc={`https://via.placeholder.com/150/${color_theme?.base?.replace(
                  "#",
                  ""
                )}/${color_theme?.base?.replace("#", "")}`}
                key={idx}
                src={img?.image}
                alt={`Logo: `}
                style={
                  isTablet
                    ? { maxHeight: "150px", margin: "0 10px" }
                    : { maxHeight: "40px", margin: "0 10px" }
                }
              />
            ))}
          </Flex>
        </Grid>
        <Box
          px={4}
          display="flex"
          justifyContent={isTablet ? "center" : "space-between"}
          flexDir={isTablet ? "column" : "row"}
        >
          <Button mr={4} variant="link">
            georgesabitbol@aphp.com
          </Button>
          <Button mt={isTablet ? "20px" : "unset"} variant="link">
            mentions légales
          </Button>
        </Box>
      </Flex>
      <Link href="/">
        <Text textAlign={isTablet ? "center" : "right"} variant="xxs" p={4}>
          {t.credits}
        </Text>
      </Link>
    </Box>
  );
};
