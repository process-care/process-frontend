import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { LandingRedux } from "redux/slices/types";
import { useMediaQueries } from "utils/hooks/mediaqueries";
import { t } from "static/createLanding";

interface Props {
  data: LandingRedux | undefined;
  onParticipate: () => void;
}

export const Description: React.FC<Props> = ({ data, onParticipate }) => {
  const attributes = data?.attributes;
  const { isTablet } = useMediaQueries();

  const Logo = () => {
    if (!data?.attributes?.logo) return <></>;
    return (
      <img
        src={data?.attributes?.logo}
        alt="Logo"
        style={{
          width: "120px",
        }}
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
            {attributes?.partners_logos?.map((logo: any) => {
              return (
                <Box>
                  <img src={logo?.image} style={{ width: "120px" }} />
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
            >
              {t.cta_participate}
            </Button>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};
