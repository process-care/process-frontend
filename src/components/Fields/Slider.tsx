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
    }
  };

  return (
    <FormControl
      id="email"
      textAlign="left"
      h={vertical ? "700px" : "fit-content"}>
      <FormLabel>
        {label} {isRequired && "*"}
      </FormLabel>
      {!isCollapsed && (
        <>
          <Range
            reverse={vertical || reverse}
            dots
            min={min !== undefined ? parseInt(min, 10) : 0}
            max={max !== undefined ? parseInt(max, 10) : 10}
            step={step !== undefined ? parseInt(step, 10) : 1}
            defaultValue={
              defaultValue !== undefined ? parseInt(defaultValue, 10) : 0
            }
            vertical={vertical}
            style={vertical ? { height: "85%", margin: "30px 0 0 30px" } : {}}
            onChange={(value) => helpers.setValue(value)}
          />
          <Flex w="100%" justifyContent="space-between">
            <Text fontSize="10px" ml="-5px">
              {min}
            </Text>
            <Text fontSize="10px" ml="4px">
              {getMiddleValue(min, max)}
            </Text>
            <Text fontSize="10px" mr="-5px">
              {max}
            </Text>
          </Flex>

          <FormHelperText fontSize="xs" mt={10}>
            {helpText}
          </FormHelperText>
        </>
      )}
    </FormControl>
  );
};
