import React from "react";
import {
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
} from "@chakra-ui/react";

import Slider from "rc-slider";
import "rc-slider/assets/index.css";

interface Props {
  label: string;
  id: string;
  helpText?: string;
  defaultValue?: number;
  step: number | null;
  min: number;
  max: number;
  vertical?: boolean;
  reverse?: boolean;
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
}) => {
  const createMarks = (max: number) => {
    const arr = [];
    for (let index = 0; index <= max; index++) {
      arr.push({ [index]: index });
    }
    return arr.map((el, i) => el[i]);
  };

  return (
    <Container variant="inputContainer">
      <FormControl
        id="email"
        textAlign="left"
        h={vertical ? "700px" : "fit-content"}>
        <FormLabel>{label}</FormLabel>
        <Range
          reverse={vertical || reverse}
          marks={createMarks(max)}
          min={min}
          max={max}
          step={step}
          defaultValue={defaultValue}
          vertical={vertical}
          style={vertical ? { height: "85%", margin: "30px 0 0 30px" } : {}}
        />
        <FormHelperText mt={10}>{helpText}</FormHelperText>
      </FormControl>
    </Container>
  );
};
