import { Flex } from "@chakra-ui/react";
import { NumberInput, Switch } from "components/Fields";
import React from "react";

import { CommonFields } from "./../index";

export const SliderFields: React.FC = () => {
  return (
    <>
      <CommonFields />
      <Flex justifyContent="space-between">
        <NumberInput
          isRequired
          style={{ width: "45%" }}
          label="Borne min"
          name="min"
          isCollapsed={false}
          placeholder="Ex:5"
        />
        <NumberInput
          isRequired
          style={{ width: "45%" }}
          label="Borne max"
          name="max"
          isCollapsed={false}
          placeholder="Ex:5"
        />
      </Flex>
      <Flex justifyContent="space-between">
        <NumberInput
          isRequired
          style={{ width: "45%" }}
          label="Intervalles"
          name="step"
          isCollapsed={false}
          placeholder="1"
        />
        <NumberInput
          style={{ width: "45%" }}
          label="Valeur par défaut"
          name="default_value"
          isCollapsed={false}
          placeholder="1"
        />
      </Flex>
      <Switch label="Slider en vue verticale" id="vertical" />
      <Switch label="Slider en vue inversée" id="reverse" />
    </>
  );
};
