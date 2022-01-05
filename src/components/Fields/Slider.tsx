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
  step: number | undefined;
  min: number | undefined;
  max: number | undefined;
  vertical?: boolean;
  reverse?: boolean;
  isRequired?: any;
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
  const [field, , helpers] = useField(id);

  React.useEffect(() => {
    if (defaultValue) {
      helpers.setValue(defaultValue);
    }
  }, [defaultValue]);

  const getMiddleValue = (
    min: number | undefined,
    max: number | undefined
  ): number | undefined => {
    if (min !== undefined && max !== undefined) {
      return (min + max) / 2;
    } else return;
  };

  const cleanValue = (
    value: string | number | undefined,
    defaultValue: number
  ): number => {
    if (value === undefined || value === null || value === "") {
      return defaultValue;
    } else {
      if (typeof value === "string") {
        return parseInt(value, 10);
      } else {
        return value;
      }
    }
  };

  return (
    <FormControl
      isRequired={isRequired === "true"}
      id="email"
      textAlign="left"
      h={vertical ? "700px" : "fit-content"}
    >
      <FormLabel>{label}</FormLabel>
      {!isCollapsed && (
        <>
          <Flex
            flexDirection={vertical ? "row" : "column"}
            h={vertical ? "85%" : ""}
            m={vertical ? "30px 0 0 30px" : ""}
          >
            <Range
              reverse={reverse}
              dots
              min={cleanValue(min, 0)}
              max={cleanValue(max, 10)}
              step={cleanValue(step, 1)}
              defaultValue={
                defaultValue !== undefined ? parseInt(defaultValue, 10) : 0
              }
              vertical={vertical}
              onChange={(value) => helpers.setValue(value)}
              value={field.value}
            />
            <Flex
              w="100%"
              h="100%"
              justifyContent="space-between"
              flexDirection={vertical ? "column" : "row"}
            >
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
