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
            toolbarButtonSize: "small",
            removeButtons: [
              simpleMode ? "image" : "",
              simpleMode ? "brush" : "",
              simpleMode ? "paragraph" : "",
              "source",
              "fullsize",
              "about",
              "outdent",
              "indent",
              "video",
              "print",
              "table",
              "superscript",
              "subscript",
              "file",
              "cut",
              "selectall",
              "find",
              "paste",
              "copyformat",
              "dots",
              "ul",
              "ol",
              "hr",
              "undo",
              "redo",
              "strikethrough",
              "classSpan",
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
