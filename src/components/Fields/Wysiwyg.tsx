import React from "react";
import JoditEditor from "jodit-react";
import { useFormikContext } from "formik";
import { FormControl } from "@chakra-ui/react";

interface Props {
  id: string;
  simpleMode?: boolean;
}

export const Wysiwyg: React.FC<Props> = ({ id, simpleMode }) => {
  const editor = React.useRef(null);
  const { setFieldValue, values } = useFormikContext();

  return React.useMemo(
    () => (
      <FormControl id={id} textAlign="left">
        <JoditEditor
          id={id}
          onChange={(newContent: string) => {
            setFieldValue("wysiwyg", newContent);
          }}
          config={{
            tabIndex: -1,
            namespace: id,
            allowTabNavigation: true,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            uploader: {
              insertImageAsBase64URI: true,
            },
            readonly: false,
            enableDragAndDropFileToEditor: true,
            language: "fr",
            toolbarButtonSize: "middle",
            showCharsCounter: false,
            showWordsCounter: false,
            showPlaceholder: false,
            buttonsSM: [
              "bold",
              "italic",
              "underline",
              "link",
              "indent",
              "ul",
              "ol",
              simpleMode ? "" : "image",
              "fullSize",
            ],
          }}
          ref={editor}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          value={values.wysiwyg}
        />
      </FormControl>
    ),
    []
  );
};
