import { useCallback, useEffect } from "react"
import { FieldArray, FieldArrayRenderProps, useField, useFormikContext } from "formik"
import { Flex, Box, Button, Text } from "@chakra-ui/react"

import { useAppSelector } from "@/redux/hooks/index.js"
import { selectors as selectorsApplication } from "@/redux/slices/application/index.js"
import { Enum_Question_Rows } from "@/api/graphql/types.generated.ts"
import { Textarea } from "@/components/Fields/index.ts"
import Modalities from "./Modalities/index.tsx"

interface Props {
  name: string
}

export default function AssociatedSubfields({ name }: Props): JSX.Element {
  const [field, meta] = useField(name)
  const { setFieldValue } = useFormikContext()
  const isEditing = useAppSelector(selectorsApplication.isEditing)

  const factors = field.value

  useEffect(() => {
    // Populate answers field on edit.
    if (isEditing) {
      factors?.map((value: string, index: number) => {
        setFieldValue(`${name}.${index}`, value);
      })
    }
  }, [factors, isEditing, name, setFieldValue])

  console.log(factors)

  return (
    <Box w="100%">
      <FieldArray
        name={name}
        render={(arrayHelpers) => (
          <Box w="100%">
            { (!factors || factors?.length === 0) && (
              <AddFactorButton error={meta.error} arrayHelpers={arrayHelpers} />
            )}

            { factors?.length > 0 && 
              factors.map((_: string, index: number) => (
                <Factor
                  key={index}
                  index={index}
                  name={name}
                  isEditing={isEditing}
                  factors={factors}
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

// Factor group

interface FactorProps {
  index: number
  name: string
  isEditing: boolean
  error: string | undefined
  factors: any
  arrayHelpers: FieldArrayRenderProps
}

function Factor({ index, name, isEditing, error, factors, arrayHelpers }: FactorProps): JSX.Element {

  const addFactor = useCallback(() => {
    arrayHelpers.push("")
  }, [arrayHelpers])

  const removeFactor = useCallback(() => {
    arrayHelpers.remove(index)
  }, [arrayHelpers, index])

  return (
    <Box key={index} w="100%" backgroundColor="brand.gray.100" p="5">
      <Flex w="100%">
        <Textarea
          id={`${name}.${index}.title`}
          label={`Titre du facteur #${index + 1}`}
          placeholder={isEditing ? factors[index] : `Facteur ${index}`}
          rows={Enum_Question_Rows.Small}
          isRequired
        />

        <Flex ml={3} mt={8}>
          <Button type="button" onClick={removeFactor}>
            -
          </Button>

          {(index + 1 === factors.length || (index + 1 !== 1 && isEditing)) && (
            <Button
              ml={3}
              type="button"
              onClick={addFactor}
              variant="solid"
            >
              +
            </Button>
          )}
        </Flex>
      </Flex>

      <Modalities name={`factors.${index}.modalities`} />

      <Text mt={1} fontSize="10px" color="red">
        { error }
      </Text>
    </Box>
  )
}

// Add button for new factor

interface AddFactorButtonProps {
  error: string | undefined
  arrayHelpers: FieldArrayRenderProps
}

function AddFactorButton({ error, arrayHelpers }: AddFactorButtonProps): JSX.Element {
  const addFactor = useCallback(() => {
    arrayHelpers.push("")
  }, [arrayHelpers])

  return (
    <>
      <Button
        onClick={addFactor}
        variant="rounded"
        type="button"
        size="sm"
      >
        Ajouter un facteur
      </Button>
      <Text mt={1} fontSize="10px" color="red">
        { error }
      </Text>
    </>
  )
}