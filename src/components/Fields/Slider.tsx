import React from "react";
import { FormControl, FormHelperText, FormLabel } from "@chakra-ui/react";

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

  const createMarks = (max: string | undefined) => {
    if (max) {
      const m = parseInt(max, 10);

      const arr = [];
      for (let index = 0; index <= m; index++) {
        arr.push({ [index]: index });
      }
      return arr.map((el, i) => el[i]);
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
            marks={createMarks(max)}
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
          <FormHelperText fontSize="xs" mt={10}>
            {helpText}
          </FormHelperText>
        </>
      )}
    </FormControl>
  );
};
