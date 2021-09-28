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
  return (
    <GridItem
      w="100%"
      p="10px 50px 80px 10px"
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
      <Box minH="140px">
        <Text variant="currentLight" mt="10px" noOfLines={5}>
          {data.landing?.subtitle ||
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit.Doloribus, impedit non. Sequi asperiores amet sunt. Consequunturvitae aliquam quasi laudantium, voluptas repellendus sapiente sit esse! Id mollitia deleniti ea nisi."}
        </Text>
      </Box>

      {data?.keywords?.length > 0 ? (
        <Flex mt="10px" alignItems="center">
          {data.keywords.map((keyword) => (
            <Text
              key={keyword.label}
              variant="xs"
              color={data.landing?.color_theme?.button || "black"}
            >
              {keyword.label}
            </Text>
          ))}
        </Flex>
      ) : (
        <Box minH="20px" />
      )}
      <Flex justifyContent="space-between" pt="10px" alignItems="center">
        <Badge
          mt="10px"
          color="black"
          backgroundColor="transparent"
          border="1px solid black"
          textTransform="initial"
        >
          <Text variant="currentLight">{renderStatus(data.status)}</Text>
        </Badge>
        <Button
          variant="rounded"
          bg={data.landing?.color_theme?.button || "black"}
        >
          {t.cta}
        </Button>
      </Flex>
    </GridItem>
  );
};
