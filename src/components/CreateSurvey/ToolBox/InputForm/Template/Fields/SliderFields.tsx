import { Flex, Box } from "@chakra-ui/react";
import { NumberInput, Switch, Textarea } from "components/Fields";
import React from "react";

import { CommonFields } from "./../index";

export const SliderFields: React.FC = () => {
  return (
    <>
      <CommonFields />

      <Flex justifyContent="space-between" w="100%">
        <Box w="45%">
          <Textarea
            rows="small"
            isRequired
            label="Borne min"
            id="min"
            isCollapsed={false}
            placeholder="1"
          />
        </Box>
        <Box w="45%">
          <Textarea
            rows="small"
            isRequired
            label="Borne max"
            id="max"
            isCollapsed={false}
            placeholder="1"
          />
        </Box>
      </Flex>
      <Flex justifyContent="space-between" w="100%">
        <Box w="45%">
          <Textarea
            rows="small"
            isRequired
            label="Intervalles"
            id="step"
            isCollapsed={false}
            placeholder="1"
          />
        </Box>
        <Box w="45%">
          <Textarea
            rows="small"
            isRequired
            label="Valeur par défaut"
            id="default_value"
            isCollapsed={false}
            placeholder="1"
          />
        </Box>
      </Flex>
      <Switch label="Slider en vue verticale" id="vertical" />
      <Switch label="Slider en vue inversée" id="reverse" />
    </>
  );
};
