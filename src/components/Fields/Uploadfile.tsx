import { Box, Button, Text, Flex, FormHelperText, FormControl, FormErrorMessage } from "@chakra-ui/react"
import React from "react"
import { useField, useFormikContext } from "formik"
import { ReactComponent as Delete } from "./assets/delete.svg";
import { SvgHover } from "components/SvgHover";
import { useDispatch } from "react-redux";
import { updateLanding } from "redux/slices/landingBuilder";
import { toBase64 } from "components/CreateSurvey/CreateLanding/ToolBox/Form/utils";


interface Props {
    label: string,
    id: string,
    helpText?: string
}

export const UploadFile: React.FC<Props> = ({ label, id, helpText }) => {
    const dispatch = useDispatch()
    const hiddenFileInput = React.useRef<HTMLInputElement>(null);
    const [fileName, setFileName] = React.useState("")
    const [, meta,] = useField(id);
    const { setFieldValue } = useFormikContext()



    const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const data = event.currentTarget.files && event.currentTarget.files[0]
        if (data) {
            setFileName(data.name)
            const base64: any = await toBase64(data).then((data: string) => data)
            setFieldValue(id, base64)
            dispatch(updateLanding({
                data: {
                    [id]: base64,
                },
            }))

        }
    }

    const handleDelete = () => {
        dispatch(updateLanding({
            data: {
                [id]: "",
            },
        }))
        setFileName("")
    }

    return (
        <FormControl my={4}>
            <Flex alignItems="center" justifyContent="space-between" >
                <Button variant="roundedTransparent" onClick={() => hiddenFileInput.current !== null && hiddenFileInput.current.click()}>
                    {label}
                </Button>
                <Box d="none">
                    <input type="file" placeholder="upload" ref={hiddenFileInput} onChange={(event) => handleChange(event)} />
                </Box>
                <Text variant="xsMedium">{fileName}</Text>
                {fileName && <SvgHover>
                    <Delete onClick={() => handleDelete()} />
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


