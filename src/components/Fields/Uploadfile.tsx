import { Box, Button, Text, Flex } from "@chakra-ui/react"
import React from "react"
import { useField } from "formik"
import { ReactComponent as Delete } from "./assets/delete.svg";
import { SvgHover } from "components/SvgHover";


interface Props {
    label: string,
    id: string
}

export const UploadFile: React.FC<Props> = ({ label, id }) => {
    const hiddenFileInput = React.useRef<HTMLInputElement>(null);
    const [field, , helpers] = useField(id);

    return (
        <Flex alignItems="center" justifyContent="space-between" mt={4}>
            <Button variant="roundedTransparent" onClick={() => hiddenFileInput.current !== null && hiddenFileInput.current.click()}>
                {label}
            </Button>
            <Box d="none">
                <input type="file" placeholder="upload" ref={hiddenFileInput} onChange={(event) => {
                    helpers.setValue(event.currentTarget.files && event.currentTarget.files[0])
                }} />
            </Box>
            <Text variant="xsMedium">{field.value?.name}</Text>
            {field.value?.name && <SvgHover>
                <Delete onClick={() => helpers.setValue(null)} />
            </SvgHover>}
        </Flex>)
}
