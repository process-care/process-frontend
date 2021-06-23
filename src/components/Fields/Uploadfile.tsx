import { Box, Button } from "@chakra-ui/react"
import React from "react"
import { Input } from "."

interface Props {
    label: string
}

export const UploadFile: React.FC<Props> = ({ label }) => {
    const hiddenFileInput = React.useRef<HTMLDivElement>(null);

    return (
        <Box pos="relative">
            <Button variant="roundedTransparent" onClick={() => hiddenFileInput.current !== null && hiddenFileInput.current.click()}>
                Importer une image
            </Button>
            <Box>
                <Input type="file" name="title" placeholder="upload" label={label} helpText="help" ref={hiddenFileInput} />
            </Box>

        </Box>)
}
