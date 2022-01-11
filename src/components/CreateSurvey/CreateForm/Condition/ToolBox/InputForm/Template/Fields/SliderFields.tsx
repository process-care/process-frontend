import { Flex, Box } from "@chakra-ui/react";
import { Input, Switch } from "components/Fields";
import { TitleDivider } from "components/TitleDivider";
import React from "react";

import { CommonFields } from "../index";

export const SliderFields: React.FC = () => {
  return (
    <>
      <CommonFields noPlacehoder />
      <TitleDivider title="Champs particuliers" />
      <Box
        w="100%"
        m="0 auto"
        border="1px solid #F7F7F7F7"
        p="5"
        backgroundColor="#fdfdfdf1"
        mb="20"
      >
        <Flex justifyContent="space-between" w="100%">
          <Box w="45%">
            <Input
              type="number"
              isRequired
              label="Valeur minimale"
              name="min"
              isCollapsed={false}
              placeholder="1"
            />
          </Box>
          <Box w="45%">
            <Input
              type="number"
              isRequired
              label="Valeur maximale"
              name="max"
              isCollapsed={false}
              placeholder="1"
            />
          </Box>
        </Flex>
        <Flex justifyContent="space-between" w="100%" mb={5}>
          <Box w="45%">
            <Input
              type="number"
              isRequired
              label="Intervalles entre deux graduations"
              name="step"
              isCollapsed={false}
              placeholder="1"
            />
          </Box>
          <Box w="45%"></Box>
        </Flex>

        <Switch label="Slider en vue verticale" id="vertical" />
        <Box mb={4} />
        <Switch label="Slider en vue inversée" id="reverse" />
      </Box>
    </>
  );
};
