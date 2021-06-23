import { Box, Button, Text } from "@chakra-ui/react"
import React from "react"
import { useField } from "formik"

interface Props {
    label: string,
    id: string
}

export const UploadFile: React.FC<Props> = ({ label, id }) => {
    const hiddenFileInput = React.useRef<HTMLInputElement>(null);
    const [field, , helpers] = useField(id);

    return (
        <Box pos="relative">
            <Button variant="roundedTransparent" onClick={() => hiddenFileInput.current !== null && hiddenFileInput.current.click()}>
                {label}
            </Button>
            <Box d="none">
                <input type="file" placeholder="upload" ref={hiddenFileInput} {...field} onChange={(event) => {
                    helpers.setValue(event.currentTarget.files && event.currentTarget.files[0])
                }} />
            </Box>
            <Text>{field.value}</Text>

        </Box>)
}
