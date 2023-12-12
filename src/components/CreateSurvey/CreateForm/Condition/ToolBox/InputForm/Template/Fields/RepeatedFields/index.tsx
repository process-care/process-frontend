import { useCallback, useEffect } from "react"
import { Flex, Box, Button, Text } from "@chakra-ui/react"
import { FieldArray, FieldArrayRenderProps, useField, useFormikContext } from "formik"

import { Textarea } from "@/components/Fields/index.ts"
import { useAppSelector } from "@/redux/hooks/index.js"
import { selectors as selectorsApplication } from "@/redux/slices/application/index.js"
import { Enum_Question_Rows } from "@/api/graphql/types.generated.ts"

interface Props {
  name: string
}

export default function RepeatedFields({ name }: Props): JSX.Element {
  const [field, meta] = useField(name)
  const { setFieldValue } = useFormikContext()
  const isEditing = useAppSelector(selectorsApplication.isEditing)

  const options = field.value

  useEffect(() => {
    // Populate answers field on edit.
    if (isEditing) {
      options?.map((value: string, index: number) => {
        setFieldValue(`${name}.${index}`, value)
      })
    }
  }, [options, isEditing, name, setFieldValue])

  return (
    <Box w="100%">
      <FieldArray
        name={name}
        render={(arrayHelpers) => (
          <Box w="100%">
            {/* If no options yet, display a button to add the first one */}
            { (!options || options?.length === 0) && (
              <AddButton error={meta.error} arrayHelpers={arrayHelpers} />
            )}

            {/* When options are available, display them */}
            { options?.length > 0 && 
              options.map((_: string, index: number) => (
                <OptionLine
                  key={index}
                  index={index}
                  name={`${name}.${index}`}
                  isEditing={isEditing}
                  options={options}
                  arrayHelpers={arrayHelpers}
                  error={meta.error}
                />
              ))
            }
          </Box>
        )}
      />
    </Box>
  )
}

// ---- SUB COMPONENTS

interface OptionLineProps {
  index: number
  name: string
  isEditing: boolean
  options: string[]
  arrayHelpers: FieldArrayRenderProps
  error: string | undefined
}

function OptionLine({ index, name, isEditing, options, arrayHelpers, error }: OptionLineProps): JSX.Element {

  const addOption = useCallback(() => {
    arrayHelpers.push("")
  }, [arrayHelpers])

  const removeOption = useCallback(() => {
    arrayHelpers.remove(index)
  }, [arrayHelpers, index])

  return (
    <Box key={index} w="100%">
      <Flex w="100%">
        <Textarea
          id={ name }
          label={ `Option ${index + 1}` }
          placeholder={ isEditing ? options[index] : `Option ${index + 1}` }
          rows={ Enum_Question_Rows.Small }
          isRequired
          isCollapsed={ false }
        />

        <Flex ml={3} mt="52px">
          <Button
            type="button"
            onClick={removeOption}
          >
            -
          </Button>

          { (index + 1 === options.length || (index + 1 !== 1 && isEditing)) && (
            <Button
              ml={3}
              type="button"
              variant="solid"
              onClick={addOption}
            >
              +
            </Button>
          )}
        </Flex>
      </Flex>

      <Text mt={1} fontSize="10px" color="red">
        { error }
      </Text>
    </Box>
  )
}

function AddButton({ error, arrayHelpers }: { error: string | undefined, arrayHelpers: FieldArrayRenderProps }) {
  return (
    <>
      <Button
        onClick={() => arrayHelpers.push("")}
        variant="rounded"
        type="button"
        size="sm"
      >
        Ajouter une option de réponse
      </Button>

      <Text mt={1} fontSize="10px" color="red">
        { error }
      </Text>
    </>
  )
}