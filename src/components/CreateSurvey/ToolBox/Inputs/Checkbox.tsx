import React from "react";
import {
  Box,
  FormControl,
  FormHelperText,
  FormLabel,
  Checkbox,
  CheckboxGroup,
  HStack,
} from "@chakra-ui/react";

interface Props {
  label: string;
  helpText?: string;
  name: string;
  id: string;
}

export const CustomCheckbox: React.FC<Props> = ({
  label,
  helpText,
  id,
  name,
}) => {
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
        <CheckboxGroup colorScheme="green">
          <HStack>
            <Checkbox id={id} name={name} value="pomme">
              Pomme
            </Checkbox>
            <Checkbox id={id} name={name} value="poire">
              Poire
            </Checkbox>
            <Checkbox id={id} name={name} value="Ananas">
              Ananas
            </Checkbox>
          </HStack>
        </CheckboxGroup>

        <FormHelperText>{helpText}</FormHelperText>
      </FormControl>
    </Box>
  );
};
