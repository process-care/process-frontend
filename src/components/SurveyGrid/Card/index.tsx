import {
  Badge,
  Box,
  Button,
  Circle,
  Flex,
  GridItem,
  Text,
} from "@chakra-ui/react";
import React from "react";
import ISurvey from "types/survey";
import { renderStatus } from "utils/application/renderStatus";
import { useMediaQueries } from "utils/hooks/mediaqueries";

// STATIC

const t = {
  cta: "En savoir plus",
};

// TYPES
interface Props {
  data: ISurvey;
}

// COMPONENT

export const Card: React.FC<Props> = ({ data }) => {
  const { isTablet } = useMediaQueries();

  return (
    <GridItem
      pb={isTablet ? "50px" : "160px"}
      w="100%"
      textAlign="left"
      _hover={{
        opacity: "0.8",
        cursor: "pointer",
      }}
    >
      <Flex alignItems="center">
        <Circle
          size="10px"
          bg={data.landing?.color_theme?.button || "black"}
          color="white"
          mr="12px"
        />
        <Text variant="titleParaLight">{data.title}</Text>
      </Flex>
      <Box minH={isTablet ? "unset" : "100px"}>
        <Text variant="current" mt="30px" noOfLines={5}>
          {data.landing?.subtitle ||
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit.Doloribus, impedit non. Sequi asperiores amet sunt. Consequunturvitae aliquam quasi laudantium, voluptas repellendus sapiente sit esse! Id mollitia deleniti ea nisi."}
        </Text>
      </Box>

      {data?.keywords?.length > 0 ? (
        <Flex mt="10px" alignItems="center">
          {data.keywords.map((keyword) => (
            <Text
              mr="20px"
              key={keyword.label}
              variant="xsRegular"
              color={data.landing?.color_theme?.button || "black"}
            >
              {keyword.label}
            </Text>
          ))}
        </Flex>
      ) : (
        <Box minH="20px" />
      )}
      <Flex
        justifyContent="space-between"
        pt={isTablet ? "20px" : "40px"}
        alignItems="center"
      >
        <Badge
          color="black"
          backgroundColor="transparent"
          border="1px solid black"
          textTransform="initial"
        >
          <Text variant="currentLight">{renderStatus(data.status)}</Text>
        </Badge>
        <Button
          variant="rounded"
          padding="15px 20px"
          bg={data.landing?.color_theme?.button || "black"}
        >
          {t.cta}
        </Button>
      </Flex>
    </GridItem>
  );
};
