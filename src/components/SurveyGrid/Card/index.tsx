import { Badge, Button, Circle, Flex, GridItem, Text } from "@chakra-ui/react";
import React from "react";
import ISurvey from "types/survey";

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
  const renderStatus = () => {
    switch (data.status) {
      case "draft":
        return "Non publié";
      case "closed":
        return "Finalisé";
      case "archived":
        return "Archivé";
      case "pending":
        return "En cours";
        break;

      default:
        break;
    }
  };

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
        <Text variant="currentBold">{data.title}</Text>
      </Flex>
      <Text variant="xxs" mt="10px" noOfLines={5}>
        {data.landing?.subtitle ||
          "Lorem, ipsum dolor sit amet consectetur adipisicing elit.Doloribus, impedit non. Sequi asperiores amet sunt. Consequunturvitae aliquam quasi laudantium, voluptas repellendus sapiente sit esse! Id mollitia deleniti ea nisi."}
      </Text>
      <Flex justifyContent="space-between" pt="10px" alignItems="center">
        <Badge
          mt="10px"
          color="black"
          backgroundColor="transparent"
          border="1px solid black"
        >
          <Text variant="xxs">{renderStatus()}</Text>
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
