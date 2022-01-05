import { Flex, Box } from "@chakra-ui/react";
import { Input, Switch } from "components/Fields";
import React from "react";

import { CommonFields } from "../index";

export const SliderFields: React.FC = () => {
  return (
    <>
      <CommonFields noPlacehoder />
      <Flex justifyContent="space-between" w="100%">
        <Box w="45%">
          <Input
            type="number"
            isRequired
            label="Borne min"
            name="min"
            isCollapsed={false}
            placeholder="1"
          />
        </Box>
        <Box w="45%">
          <Input
            type="number"
            isRequired
            label="Borne max"
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
            label="Intervalles"
            name="step"
            isCollapsed={false}
            placeholder="1"
          />
        </Box>
        <Box w="45%">
          {/* <Input
            type="number"
            label="Valeur par défaut"
            name="default_value"
            isCollapsed={false}
            placeholder="1"
          /> */}
        </Box>
      </Flex>

      <Switch label="Slider en vue verticale" id="vertical" />
      <Box mb={4} />
      <Switch label="Slider en vue inversée" id="reverse" />
    </>
  );
};
