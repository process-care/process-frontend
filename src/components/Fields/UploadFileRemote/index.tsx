import {
  Box,
  Button,
  Text,
  Flex,
  FormHelperText,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import React, { useCallback } from "react";
import { ReactComponent as Delete } from "../assets/delete.svg";
import { SvgHover } from "components/SvgHover";
import { useFileHandlers } from "./hooks";
import { UploadParams } from "redux/slices/application";

// ---- TYPES

interface BaseProps {
  label: string;
  helpText?: string;
  isDisabled?: boolean;
  onChange: (msg: string) => void;
  target: UploadParams;
  accept: string;
}

type SingleContent = BaseProps & {
  multiple: true;
  content?: Content[];
};

type MultipleContent = BaseProps & {
  multiple?: false;
  content?: Content;
};

type Props = SingleContent | MultipleContent;

interface Content {
  id: string;
  name: string;
  url: string;
}

// ---- COMPONENT

export const UploadFileRemote: React.FC<Props> = (props: Props) => {
  // ⚠️ We need to keep the props structured (in received params above), so we can infer the typing of content later on.
  // If destructured in the parameters above, it seems unable to guess the typing with a safe guard.
  //
  // Destructured: `if (multiple && content) content[O].id` <- DOES NOT WORK, content cannot be safe guarded
  // Kept in one object: `if (props.multiple && props.content) props.content[0].id` <- WORKS (content is well guessed)
  //
  // We can still destructure the rest for convenience. The object is really just needed for the safe guard guessing.
  const { target, multiple, onChange, isDisabled, label, helpText, accept } =
    props;

  const hiddenFileInput = React.useRef<HTMLInputElement>(null);
  const { handleChange, handleDelete, error } = useFileHandlers(
    target,
    multiple,
    onChange
  );

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
            onChange={handleChange}
            accept={accept}
            multiple={multiple}
          />
        </Box>

        {!props.multiple && props.content && (
          <Flex alignItems="center">
            <Text variant="xsMedium" isTruncated maxWidth="90px">
              {props.content.name}
            </Text>
            <DeleteButton id={props.content.id} handleDelete={handleDelete} />
          </Flex>
        )}
      </Flex>

      {props.multiple && props.content && (
        <Flex flexDirection="column" mt={2}>
          {props.content.map(({ id, name }: Content) => {
            return (
              <Flex key={name}>
                <Text my={1} variant="xsMedium" isTruncated maxWidth="150px">
                  {name}
                </Text>
                <DeleteButton id={id} handleDelete={handleDelete} />
              </Flex>
            );
          })}
        </Flex>
      )}

      <FormErrorMessage mt={1} justifyContent="flex-end" fontSize="10px">
        {error}
      </FormErrorMessage>

      <FormHelperText mt={3} lineHeight={1.4} fontSize="xs" color="gray.400">
        {helpText}
      </FormHelperText>
    </FormControl>
  );
};

// ---- HELPERS

interface DeleteButtonProps {
  id: string;
  handleDelete: (id: string) => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({
  id,
  handleDelete,
}: DeleteButtonProps) => {
  const callDelete = useCallback(() => {
    handleDelete(id);
  }, [id, handleDelete]);

  return (
    <SvgHover>
      <Delete onClick={callDelete} />
    </SvgHover>
  );
};
