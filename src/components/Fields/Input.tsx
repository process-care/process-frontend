import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputRightAddon,
  FormErrorMessage,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { useField } from "formik";

interface Props {
  label: string;
  helpText?: string;
  placeholder: string;
  type?: string;
  inputRightAddon?: string;
  name: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  style?: React.CSSProperties | undefined;
  isRequired?: any;
  isCollapsed?: boolean;
  ref?: any;
  autoComplete?: string;
  isAccordion?: boolean;
  appearance?: "light" | "big";
}

export default function CustomInput({
  label,
  helpText,
  placeholder,
  type = "text",
  inputRightAddon,
  name,
  style,
  isRequired,
  isCollapsed,
  ref,
  autoComplete,
  isAccordion,
  appearance,
}: Props): JSX.Element {
  const [field, meta] = useField(name)
  
  return (
    <FormControl isRequired={isRequired} id={name} textAlign="left" style={style} isInvalid={!!meta.error}>
      {isAccordion ? (
        <Accordion allowToggle>
          <AccordionItem border="none" _hover={{ cursor: "pointer" }}>
            <AccordionButton
              p="0"
              justifyContent="flex-start"
              _hover={{ cursor: "pointer" }}
              _focus={{ outline: "none" }}
            >
              <FormLabel _hover={{ cursor: "pointer" }}>{label}</FormLabel>
              <AccordionIcon mt="5px" mr="5px" color="gray.600" />
            </AccordionButton>
            <AccordionPanel px="0" py="0">
              {!isCollapsed && (
                <>
                  <InputGroup size="sm">
                    <Input
                      ref={ref}
                      backgroundColor="white"
                      borderRadius="7px"
                      type={type}
                      size="md"
                      placeholder={placeholder}
                      {...field}
                      autoComplete={autoComplete}
                      p={appearance === "big" ? "30px" : "10px"}
                    />

                    { inputRightAddon &&
                      <InputRightAddon h="40px">
                        {inputRightAddon}
                      </InputRightAddon>
                    }
                  </InputGroup>
                  <FormErrorMessage mt={1} justifyContent="flex-end" fontSize="10px">
                    {meta.error}
                  </FormErrorMessage>
                  <FormHelperText fontSize="xs" cursor="default">{helpText}</FormHelperText>
                </>
              )}
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      ) : (
        <>
          <FormLabel>{label}</FormLabel>

          {!isCollapsed && (
            <>
              <InputGroup size="sm" mt={appearance === "big" ? "10px" : "0"} borderRadius="7px">
                <Input
                  ref={ref}
                  backgroundColor="white"
                  borderRadius="7px"
                  type={type}
                  size="md"
                  placeholder={placeholder}
                  {...field}
                  autoComplete={autoComplete}
                  p={appearance === "big" ? "30px" : "10px"}
                />

                { inputRightAddon &&
                  <InputRightAddon h="40px">
                    {inputRightAddon}
                  </InputRightAddon>
                }
              </InputGroup>
              <FormErrorMessage mt={1} justifyContent="flex-end" fontSize="10px">
                {meta.error}
              </FormErrorMessage>
              <FormHelperText fontSize="xs">{helpText}</FormHelperText>
            </>
          )}
        </>
      )}
    </FormControl>
  );
};
