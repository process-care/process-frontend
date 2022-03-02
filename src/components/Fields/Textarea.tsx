import React from "react";
import { FormControl, FormHelperText, FormLabel, Textarea, Text } from "@chakra-ui/react";
import { getMaxLength, getRows } from "./utils";

import { useField } from "formik";
import { Enum_Question_Rows, Maybe } from "api/graphql/types.generated";

interface Props {
  label: string;
  helpText?: string;
  placeholder: string;
  rows: Maybe<Enum_Question_Rows> | undefined;
  isRequired?: any;
  id: string;
  m?: string | number;
  p?: string | number;
  isCollapsed?: boolean;
  isDisabled?: boolean;
  appearance?: "big";
  autoComplete?: string;
  defaultValue?: string;
}
export const CustomTextarea: React.FC<Props> = ({
  label,
  helpText,
  placeholder,
  rows,
  isRequired,
  id,
  m,
  p,
  isCollapsed,
  isDisabled,
  appearance,
  autoComplete,
  defaultValue,
}) => {
  const [field, meta] = useField(id);
  const isBig = appearance === "big";

  return (
    <FormControl isRequired={isRequired} id={id} textAlign="left" m={m} p={p} isInvalid={!!meta.error}>
      <FormLabel htmlFor={id} opacity={isDisabled ? "0.5" : "1"}>
        {label}
      </FormLabel>

      {!isCollapsed && (
        <>
          <Textarea
            mt={isBig ? "10px" : "0"}
            variant="outline"
            paddingLeft="10px"
            p={isBig ? "30px" : "10px"}
            backgroundColor={"white"}
            fontSize={isBig ? "16px" : "12px"}
            _placeholder={{
              color: "#9E9E9E",
              fontSize: isBig ? "16px" : "12px",
            }}
            overflow="hidden"
            isDisabled={isDisabled}
            id={id}
            style={{ resize: "none" }}
            rows={getRows(rows)}
            placeholder={placeholder}
            maxLength={getMaxLength(rows)}
            isRequired={isRequired}
            {...field}
            autoComplete={autoComplete}
            defaultValue={defaultValue}
          />

          {meta.error && (
            <Text fontSize="10px" color="red" textAlign="right">
              {meta.error}
            </Text>
          )}

          <FormHelperText mt={1} lineHeight={1.4} fontSize="xs" color="gray.400">
            {helpText}
          </FormHelperText>
        </>
      )}
    </FormControl>
  );
};
