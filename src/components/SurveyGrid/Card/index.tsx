import { Badge, Box, Button, Circle, Flex, GridItem, Text } from "@chakra-ui/react";

import { SurveyRedux } from "@/redux/slices/types";
import { renderStatus } from "@/utils/application/renderStatus";
import { useMediaQueries } from "@/utils/hooks/mediaqueries";

// STATIC

const t = {
  cta: "En savoir plus",
};

// TYPES

interface Props {
  data: SurveyRedux;
}

// COMPONENT

export default function Card({ data }: Props): JSX.Element {
  const attributes = data?.attributes;
  const { isTablet } = useMediaQueries();

  return (
    <GridItem
      pb={isTablet ? "50px" : "160px"}
      w="100%"
      textAlign="left"
      boxShadow="rgb(33 33 52 / 10%) 0px 1px 4px"
      backgroundColor="white"
      border="1px solid #e7e7e7"
      borderRadius="4px"
      p="20px"
      _hover={{
        opacity: "0.8",
        cursor: "pointer",
      }}
    >
      <Flex alignItems="center">
        <Circle
          size="10px"
          bg={attributes?.landing?.data?.attributes?.color_theme?.button || "black"}
          color="white"
          mr="12px"
        />
        <Text variant="titleParaLight">{attributes?.title}</Text>
      </Flex>
      <Box minH="140px">
        <Text variant="currentLight" mt="10px" noOfLines={5}>
          {attributes?.landing?.data?.attributes?.subtitle ||
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit.Doloribus, impedit non. Sequi asperiores amet sunt. Consequunturvitae aliquam quasi laudantium, voluptas repellendus sapiente sit esse! Id mollitia deleniti ea nisi."}
        </Text>
      </Box>

      {attributes?.keywords && attributes?.keywords?.length > 0 ? (
        <Flex mt="10px" alignItems="center">
          {attributes?.keywords?.map((k: any) => (
            <Text
              mr="20px"
              key={k?.id}
              variant="xs"
              color={attributes?.landing?.data?.attributes?.color_theme?.button || "black"}
            >
              {k?.label}
            </Text>
          ))}
        </Flex>
      ) : (
        <Box minH="20px" />
      )}
      <Flex justifyContent="space-between" pt={isTablet ? "20px" : "40px"} alignItems="center">
        <Badge color="black" backgroundColor="transparent" border="1px solid black" textTransform="initial">
          <Text variant="currentLight">{renderStatus(attributes?.status)}</Text>
        </Badge>
        <Button variant="rounded" bg={attributes?.landing?.data?.attributes?.color_theme?.button || "black"}>
          {t.cta}
        </Button>
      </Flex>
    </GridItem>
  );
};
