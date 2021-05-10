import React from "react";
import {
  Box,
  Text,
  FormControl,
  FormHelperText,
  FormLabel,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from "@chakra-ui/react";

interface Props {
  label: string;
  id: string;
  helpText?: string;
  defaultValue?: number;
  orientation: "vertical" | "horizontal";
  step: number;
  min: number;
  max: number;
}
export const CustomSlider: React.FC<Props> = ({
  label,
  helpText,
  defaultValue,
  orientation = "horizontal",
  step,
  min,
  max,
}) => {
  const renderStep = () => {
    const steps = [];

    for (let i = 0; i < max; i++) {
      steps.push(i);
    }
    return (
      <Box d="flex" justifyContent="space-between" mt={10}>
        {steps.map((el) => (
          <Text color="gray.400" fontSize="14" key={el}>
            {el}
          </Text>
        ))}
      </Box>
    );
  };

  return (
    <Box
      margin="5"
      border="1px"
      padding={4}
      borderRadius={5}
      borderColor="gray.300"
      backgroundColor="white"
      width="100%">
      <FormControl id="email" textAlign="left">
        <FormLabel>{label}</FormLabel>
        <Slider
          aria-label={label}
          defaultValue={defaultValue}
          orientation={orientation}
          step={step}
          min={min}
          max={max}
          size="lg">
          {renderStep()}
          <SliderTrack bg="red.100">
            <Box position="relative" right={10} />
            <SliderFilledTrack bg="tomato" />
          </SliderTrack>
          <SliderThumb boxSize={6} />
        </Slider>

        <FormHelperText>{helpText}</FormHelperText>
      </FormControl>
    </Box>
  );
};
