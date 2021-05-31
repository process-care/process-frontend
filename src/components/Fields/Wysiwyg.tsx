import React from "react";
import JoditEditor from "jodit-react";
import { useFormikContext, useField } from "formik";
import { FormControl } from "@chakra-ui/react";

interface Props {
  id: string;
}

export const Wysiwyg: React.FC<Props> = ({ id }) => {
  const editor = React.useRef(null);
  const { setFieldValue, values } = useFormikContext();
  const [field] = useField(id);

  return React.useMemo(
    () => (
      <FormControl id={id} textAlign="left">
        <JoditEditor
          id={id}
          onChange={(newContent: string) => {
            setFieldValue("wysiwyg", newContent);
          }}
          onIn
          config={{
            tabIndex: -1,
            namespace: id,
            allowTabNavigation: true,
            uploader: {
              insertImageAsBase64URI: true,
            },
            readonly: false,
            enableDragAndDropFileToEditor: true,
            language: "fr",
            toolbarButtonSize: "small",
            removeButtons: [
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
          value={values[field.name]}
        />
      </FormControl>
    ),
    []
  );
};
