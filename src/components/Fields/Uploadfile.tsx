import {
  Box,
  Button,
  Text,
  Flex,
  FormHelperText,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import React from "react";
import { useField, useFormikContext } from "formik";
import { ReactComponent as Delete } from "./assets/delete.svg";
import { SvgHover } from "components/SvgHover";
import { toBase64 } from "components/CreateSurvey/CreateLanding/ToolBox/Form/utils";

interface Props {
  label: string;
  id: string;
  helpText?: string;
  isDisabled?: boolean;
  multiple?: boolean;
  onChange: (data: Record<string, any>) => void;
  accept?: string;
}

export interface IBase64 {
  base64: string;
  name: string | undefined;
}

export const UploadFile: React.FC<Props> = ({
  label,
  id,
  helpText,
  isDisabled,
  multiple,
  onChange,
  accept,
}) => {
  const hiddenFileInput = React.useRef<HTMLInputElement>(null);
  const [field, meta] = useField(id);
  const [filesName, setFilesName] = React.useState<any>([field.value]);
  const { setFieldValue } = useFormikContext();

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const data = event.currentTarget.files && event.currentTarget.files[0];
    if (data) {
      if (multiple) {
        const fileList = event.currentTarget.files && event.currentTarget.files;
        if (fileList) {
          const { length } = fileList;
          const arr: any = [];
          const arrBase64: IBase64[] = [];
          for (let index = 0; index < length; index++) {
            const name = fileList.item(index)?.name;
            arr.push(name);
            const base64 = await toBase64(fileList.item(index)).then(
              (data: string) => data
            );
            arrBase64.push({ base64, name });
          }
          setFilesName([...filesName, ...arr]);
          const new_data =
            field.value.length > 0 ? [...field.value, ...arrBase64] : arrBase64;
          setFieldValue(id, new_data);
          onChange({
            data: {
              [id]: new_data,
            },
          });
        }
      } else {
        setFilesName([...filesName, data.name]);
        const base64: any = await toBase64(data).then((data: string) => data);
        setFieldValue(id, base64);
        onChange({
          data: {
            [id]: [{ base64, name: data.name }],
          },
        });
      }
    }
  };

  const handleDelete = (name?: string) => {
    const form_values: IBase64[] = [...field.value];
    const filtered_values = form_values.filter((v) => v.name !== name);

    if (multiple) {
      const filtered_names = filesName.filter((l: string) => l !== name);
      setFilesName(filtered_names);
      setFieldValue(id, filtered_values);
    } else {
      setFieldValue(id, "");
      setFilesName([]);
    }
    onChange({
      data: {
        [id]: multiple ? filtered_values : "",
      },
    });
  };
  return (
    <FormControl my={4}>
      <Flex alignItems="center" justifyContent="space-between">
        <Button
          variant="roundedTransparent"
          onClick={() =>
            hiddenFileInput.current !== null && hiddenFileInput.current.click()
          }
          isDisabled={isDisabled}
        >
          {label}
        </Button>
        <Box d="none">
          <input
            type="file"
            placeholder="upload"
            ref={hiddenFileInput}
            // onChange={(event) => {
            //   setFieldValue(
            //     id,
            //     event.currentTarget.files && event.currentTarget.files[0]
            //   );
            // }}
            onChange={(event) => handleChange(event)}
            accept={accept}
            multiple={multiple}
          />
        </Box>
        {!multiple && (
          <Flex>
            {filesName.map((name: string) => (
              <Text key={name} variant="xsMedium" isTruncated maxWidth="150px">
                {name}
              </Text>
            ))}
          </Flex>
        )}
        {filesName.length > 0 && !multiple && (
          <SvgHover>
            <Delete onClick={() => handleDelete()} />
          </SvgHover>
        )}
      </Flex>
      {multiple && (
        <Flex flexDirection="column" mt={2}>
          {filesName.map((name: string) => {
            return (
              <Flex key={name}>
                <Text my={1} variant="xsMedium" isTruncated maxWidth="150px">
                  {name}
                </Text>
                {filesName.length > 0 && (
                  <SvgHover>
                    <Delete onClick={() => handleDelete(name)} />
                  </SvgHover>
                )}
              </Flex>
            );
          })}
        </Flex>
      )}
      <FormErrorMessage mt={1} justifyContent="flex-end" fontSize="10px">
        {meta.error}
      </FormErrorMessage>
      <FormHelperText mt={2} lineHeight={1.4} fontSize="xs" color="gray.400">
        {helpText}
      </FormHelperText>
    </FormControl>
  );
};
