import { useCallback, useRef } from "react";
import { Box, Button, Text, Flex, FormHelperText, FormControl, FormErrorMessage } from "@chakra-ui/react";

import { UploadParams } from "@/redux/slices/application/index.js"
import { useFileHandlers } from "./hooks.ts"
import SvgHover from "@/components/SvgHover/index.tsx"
import { DeleteIcon, MinusIcon } from "lucide-react";
import ButtonIcon from "@/components/ButtonIcon.tsx";

// ---- TYPES

interface BaseProps {
  label: string;
  helpText?: string;
  isDisabled?: boolean;
  onChange: (msg: string | null | undefined) => void;
  target: UploadParams;
  accept: string;
}

type SingleContent = BaseProps & {
  multiple: true;
  content?: Content[] | null;
};

type MultipleContent = BaseProps & {
  multiple?: false;
  content?: Content | null;
};

type Props = SingleContent | MultipleContent;

interface Content {
  id?: string | null | undefined;
  attributes?:
    | {
        name?: string | null | undefined;
        url?: string | null | undefined;
      }
    | null
    | undefined;
}

// ---- COMPONENT

export default function UploadFileRemote(props: Props): JSX.Element {
  // ⚠️ We need to keep the props structured (in received params above), so we can infer the typing of content later on.
  // If destructured in the parameters above, it seems unable to guess the typing with a safe guard.
  //
  // Destructured: `if (multiple && content) content[O].id` <- DOES NOT WORK, content cannot be safe guarded
  // Kept in one object: `if (props.multiple && props.content) props.content[0].id` <- WORKS (content is well guessed)
  //
  // We can still destructure the rest for convenience. The object is really just needed for the safe guard guessing.
  const { target, multiple, onChange, isDisabled, label, helpText, accept } = props

  const hiddenFileInput = useRef<HTMLInputElement>(null)
  const { handleChange, handleDelete, error } = useFileHandlers(target, multiple, onChange, hiddenFileInput)

  const isInvalid = Boolean(error)

  return (
    <FormControl my={4} isInvalid={isInvalid}>
      <Flex alignItems="center" justifyContent="space-between">
        <Button
          variant="roundedTransparent"
          onClick={() => hiddenFileInput.current !== null && hiddenFileInput.current.click()}
          isDisabled={isDisabled}
        >
          {label}
        </Button>

        <Box display="none">
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
              {props.content?.attributes?.name}
            </Text>
            <DeleteButton id={props.content.id} handleDelete={handleDelete} />
          </Flex>
        )}
      </Flex>

      {props.multiple && props.content && (
        <Flex flexDirection="column" mt={2}>
          {props.content.map(({ id, attributes }: Content) => {
            return (
              <Flex key={id}>
                <Text my={1} variant="xsMedium" isTruncated maxWidth="150px">
                  {attributes?.name}
                </Text>
                <DeleteButton id={id} handleDelete={handleDelete} />
              </Flex>
            );
          })}
        </Flex>
      )}

      <FormErrorMessage mt={1} justifyContent="flex-start" fontSize="10px">
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
  id: string | null | undefined;
  handleDelete: (id: string) => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ id, handleDelete }: DeleteButtonProps) => {
  const callDelete = useCallback(() => {
    if (!id) return;
    handleDelete(id);
  }, [id, handleDelete]);

  return (
    <ButtonIcon
      icon={MinusIcon}
      size={10}
      type="delete"
      className="ml-2"
      onClick={callDelete}
    />
  );
};
