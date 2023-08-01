import { Box, Button, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";

import { LandingRedux } from "@/redux/slices/types";
import { useMediaQueries } from "@/utils/hooks/mediaqueries";
import { t } from "@/static/createLanding";

interface Props {
  inactiveSubmit: boolean;
  data: LandingRedux | undefined;
  onParticipate: () => void;
}

export default function Description({ inactiveSubmit, data, onParticipate }: Props): JSX.Element {
  const attributes = data?.attributes;
  const { isTablet } = useMediaQueries();

  const Logo = () => {
    if (!data?.attributes?.logo) return <></>;
    return (
      <Image
        src={data?.attributes?.logo}
        alt="Logo"
        width={120}
        height={120}
      />
    );
  };

  return (
    <Box w="100%" h="100%">
      <Flex w="100%">
        <Box>
          <Flex alignItems="center" justifyContent="flex-end" pb="20px">
            <Box>
              <Logo />
            </Box>
            {attributes?.partners_logos?.map((logo: any, idx: number) => {
              return (
                <Box key={idx}>
                  <Image alt="Logo" src={logo?.image} width={120} height={120} />
                </Box>
              );
            })}
          </Flex>
          <Text
            maxHeight="350px"
            overflow="auto"
            textAlign="left"
            variant="current"
            dangerouslySetInnerHTML={{
              __html: attributes?.wysiwyg ?? "",
            }}
          ></Text>
          <Flex mt={10} justifyContent="space-between" flexDirection={isTablet ? "column" : "row"}>
            <Button
              variant="rounded"
              width="90%"
              margin="0 auto"
              left="0"
              right="0"
              backgroundColor={attributes?.color_theme?.button || "brand.blue"}
              onClick={onParticipate}
              disabled={inactiveSubmit}
            >
              {t.cta_participate}
            </Button>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};
