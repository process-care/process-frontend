import React from "react";
import {
  Box,
  FormControl,
  FormLabel,
  //FormErrorMessage,
  Button,
  Input,
  FormHelperText,
} from "@chakra-ui/react";

interface Props {
  selectedInput: string;
}

const InputForm: React.FC<Props> = ({ selectedInput }) => {
  return (
    <Box
      d="flex"
      alignItems="center"
      justifyContent="center"
      fontSize="30"
      flexDirection="column">
      <h1>{selectedInput}</h1>
      <hr />
      <FormControl id="email" mt="20" p="10">
        <FormLabel>Label</FormLabel>
        <Input type="label" />
        <FormHelperText>Ce texte apparait au dessus de l'input.</FormHelperText>
        <FormLabel mt="10">Champ d'aide</FormLabel>
        <Input type="email" />
        <FormHelperText>
          Ce texte apparait en dessous de l'input.
        </FormHelperText>
        <FormLabel mt="10">Longueur maximum</FormLabel>
        <Input type="email" />
        <FormHelperText>ex: 10</FormHelperText>
        <Button mt="20">Ajouter au formulaire</Button>
      </FormControl>
    </Box>
  );
};

export default InputForm;
