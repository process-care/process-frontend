import React from "react";
import {
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Text,
} from "@chakra-ui/react";

import { useField } from "formik";

import Slider from "rc-slider";
import "rc-slider/assets/index.css";

interface Props {
  label: string;
  id: string;
  helpText?: string;
  defaultValue?: string | undefined;
  step: string | undefined;
  min: string | undefined;
  max: string | undefined;
  vertical?: boolean;
  reverse?: boolean;
  isRequired?: boolean;
  isCollapsed?: boolean;
}

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider);

export const CustomSlider: React.FC<Props> = ({
  label,
  helpText,
  defaultValue,
  vertical,
  step,
  min,
  max,
  reverse,
  id,
  isRequired,
  isCollapsed,
}) => {
  const [, , helpers] = useField(id);

  React.useEffect(() => {
    if (defaultValue) {
      helpers.setValue(defaultValue);
    }
  }, [defaultValue]);

  React.useEffect(() => {
    if (defaultValue) {
      helpers.setValue(defaultValue);
    }
  }, [defaultValue]);

  const getMiddleValue = (
    min: string | undefined,
    max: string | undefined
  ): number | undefined => {
    if (min !== undefined && max !== undefined) {
      return (parseInt(min, 10) + parseInt(max, 10)) / 2;
    } else return;
  };

  console.log(reverse);
  return (
    <FormControl
      isRequired={isRequired}
      id="email"
      textAlign="left"
      h={vertical ? "700px" : "fit-content"}>
      <FormLabel>{label}</FormLabel>
      {!isCollapsed && (
        <>
          <Flex
            flexDirection={vertical ? "row" : "column"}
            h={vertical ? "85%" : ""}
            m={vertical ? "30px 0 0 30px" : ""}>
            <Range
              reverse={reverse}
              dots
              min={min !== undefined ? parseInt(min, 10) : 0}
              max={max !== undefined ? parseInt(max, 10) : 10}
              step={step !== undefined ? parseInt(step, 10) : 1}
              defaultValue={
                defaultValue !== undefined ? parseInt(defaultValue, 10) : 0
              }
              vertical={vertical}
              onChange={(value) => helpers.setValue(value)}
            />
            <Flex
              w="100%"
              h="100%"
              justifyContent="space-between"
              flexDirection={vertical ? "column" : "row"}>
              <Text fontSize="10px" ml="-5px">
                {reverse || vertical ? max : min}
              </Text>

              <Text fontSize="10px" ml="4px">
                {getMiddleValue(min, max)}
              </Text>

              <Text fontSize="10px" mr="-5px">
                {reverse || vertical ? min : max}
              </Text>
            </Flex>
          </Flex>

          <FormHelperText fontSize="xs" mt={10}>
            {helpText}
          </FormHelperText>
        </>
      )}
    </FormControl>
  );
};
