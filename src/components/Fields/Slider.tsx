import { useCallback, useEffect, useMemo } from "react";
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
    if (!field.value) {
      helpers.setValue(defaultValue ?? min)
    }
  }, [defaultValue, field.value, helpers, min])

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

  const initValue = useMemo(() => {
    if (defaultValue !== undefined) return parseInt(defaultValue, 10)
    if (reverse) return cleanValue(max, 10)
    return cleanValue(min, 0)
  }, [defaultValue, reverse, cleanValue, max, min])

  // Marks to display under the slider
  const marks = useMemo(() => {
    const marks: Record<number, number> = {}
    for (let i = cleanValue(min, 0); i <= cleanValue(max, 10); i += cleanValue(step, 1)) {
      marks[i] = i
    }
    return marks
  }, [min, max, step, cleanValue])

  return (
    <FormControl isRequired={isRequired} id="email" textAlign="left" h={vertical ? "700px" : "fit-content"}>
      <FormLabel>{label}</FormLabel>
      {!isCollapsed && (
        <>
          <Flex
            flexDirection={vertical ? "row" : "column"}
            h={vertical ? "85%" : ""}
            m={vertical ? "30px 0 0 30px" : ""}
            marginTop={5}
          >
            <Slider
              className="cursor-pointer"
              range
              reverse={reverse ?? false}
              dots
              dotStyle={{ height: 20, width: 20, bottom: -8 }}
              min={cleanValue(min, 0)}
              max={cleanValue(max, 10)}
              step={cleanValue(step, 1)}
              marks={marks}
              defaultValue={initValue}
              vertical={!!vertical}
              onChange={(value: any) => helpers.setValue(value)}
              value={field.value}
              styles={{
                handle: { height: 22, width: 22, top: 0, backgroundColor: "#57c5f7"  },
              }}
            />
          </Flex>

          <FormHelperText fontSize="xs" mt={10}>
            {helpText}
          </FormHelperText>
        </>
      )}
    </FormControl>
  );
};
