import React from "react";
import JoditReact from "jodit-react-ts";
import { useFormikContext } from "formik";
import { FormControl } from "@chakra-ui/react";
import { QuestionRedux } from "redux/slices/types";

interface Props {
  id: string;
}

export const Wysiwyg: React.FC<Props> = ({ id }) => {
  const { setFieldValue, values } = useFormikContext<QuestionRedux>();
  return React.useMemo(
    () => (
      <FormControl id={id} textAlign="left">
        <JoditReact
          onChange={(newContent: string) => {
            setFieldValue(id, newContent);
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
            // buttonsMD: ["bold", "italic", "underline", "link", "indent", "ul", "ol", !simpleMode ? "image" : ""],
            // buttonsSM: ["bold", "italic", "underline", "link", "indent", "ul", "ol", !simpleMode ? "image" : ""],
            // buttonsXS: ["bold", "italic", "underline", "link", "indent", "ul", "ol", !simpleMode ? "image" : ""],
          }}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          // value={values[id]}
          defaultValue={values[id]}
        />
      </FormControl>
    ),
    []
  );
};
