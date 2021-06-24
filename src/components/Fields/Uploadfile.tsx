import { Box, Button, Text, Flex, FormHelperText, FormControl, FormErrorMessage } from "@chakra-ui/react"
import React from "react"
import { useField } from "formik"
import { ReactComponent as Delete } from "./assets/delete.svg";
import { SvgHover } from "components/SvgHover";


interface Props {
    label: string,
    id: string,
    helpText?: string
}

export const UploadFile: React.FC<Props> = ({ label, id, helpText }) => {
    const hiddenFileInput = React.useRef<HTMLInputElement>(null);
    const [field, meta, helpers] = useField(id);

    return (
        <FormControl my={4}>
            <Flex alignItems="center" justifyContent="space-between" >
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
            </Flex>
            <FormErrorMessage mt={1} justifyContent="flex-end" fontSize="10px">
                {meta.error}
            </FormErrorMessage>
            <FormHelperText
                mt={1}
                lineHeight={1.4}
                fontSize="xs"
                color="gray.400">
                {helpText}
            </FormHelperText>
        </FormControl>

    )
}
