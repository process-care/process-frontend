import { useCallback, useEffect } from "react";
import { Flex, FormControl, FormHelperText, FormLabel, Text } from "@chakra-ui/react";
import { useField } from "formik";
import Slider from "rc-slider"
import 'rc-slider/assets/index.css';

import { Maybe } from "@/api/graphql/types.generated.ts"

interface Props {
  label: string;
  id: string;
  helpText?: string;
  defaultValue?: string | undefined;
  step: Maybe<number> | undefined;
  min: Maybe<number> | undefined;
  max: Maybe<number> | undefined;
  vertical?: Maybe<boolean> | undefined;
  reverse?: Maybe<boolean> | undefined;
  isRequired?: any;
  isCollapsed?: boolean;
}

// This is following the example in the doc...
// const Slider = require('rc-slider');
// const createSliderWithTooltip = Slider.createSliderWithTooltip;
// const Range = createSliderWithTooltip(Slider.Range);
// const createSliderWithTooltip = Slider.createSliderWithTooltip;
// const Range = createSliderWithTooltip(Slider);

export default function CustomSlider({
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
}: Props): JSX.Element {
  const [field, , helpers] = useField(id);

  useEffect(() => {
    if (defaultValue) {
      helpers.setValue(defaultValue);
    }
  }, [defaultValue, helpers]);

  const cleanValue = useCallback((value: string | number | undefined | null, defaultValue: number): number => {
    if (value === undefined || value === null || value === "") {
      return defaultValue;
    } else {
      if (typeof value === "string") {
        return parseInt(value, 10);
      } else {
        return value;
      }
    }
  }, []);

  return (
    <FormControl isRequired={isRequired} id="email" textAlign="left" h={vertical ? "700px" : "fit-content"}>
      <FormLabel>{label}</FormLabel>
      {!isCollapsed && (
        <>
          <Flex
            flexDirection={vertical ? "row" : "column"}
            h={vertical ? "85%" : ""}
            m={vertical ? "30px 0 0 30px" : ""}
          >
            <Slider
              range
              reverse={reverse ?? false}
              dots
              min={cleanValue(min, 0)}
              max={cleanValue(max, 10)}
              step={cleanValue(step, 1)}
              defaultValue={defaultValue !== undefined ? parseInt(defaultValue, 10) : 0}
              vertical={!!vertical}
              onChange={(value: any) => helpers.setValue(value)}
              value={field.value}
            />

            <Flex w="100%" h="100%" justifyContent="space-between" flexDirection={vertical ? "column" : "row"}>
              <Text fontSize="10px" ml="-5px">
                {reverse || vertical ? max : min}
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
