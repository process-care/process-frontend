import { useCallback, useMemo, useState } from "react"
import { useField } from "formik"
import { QuestionRedux } from "@/redux/slices/types"

// ---- TYPES & STATICS

export interface Factor {
  modalities: Modality[]
  title: string
}

export interface Modality {
  file: any
  description: string
}

export interface FactorState {
  variations: number[][][]
  isMounted: boolean
}

export type AssociatedAnswer = {
  value: any
  associatedInput: QuestionRedux
}

// ---- HOOKS

export const useAssociatedLogic = (
  factors: Factor[],
  name: string,
  maxLoop: number,
  nbCards: number
) => {
  const [field, , helpers] = useField(name)
  const [state, setState] = useState<FactorState>({ variations: [], isMounted: false })
  const [step, setStep] = useState(0)

  console.group('Vignette')
  console.log('Vignette values: ', field.value)
  console.log('Vignette variations: ', state.variations)
  console.log('Vignette step: ', step)
  console.groupEnd()

  const filteredFactors = useMemo(
    () => factors?.filter((f) => f !== null),
    [factors]
  )

  const modalitiesPerFactor = useMemo(() =>
    filteredFactors?.map((f) => f.modalities?.length ?? 0).filter((m) => m !== 0),
    [filteredFactors]
  )

  const maxVariations = useMemo(() => {
    const totalVariations = modalitiesPerFactor?.reduce((a, b) => a * b, 1) ?? 0
    if (totalVariations === 0) return 0
    return getMaxVariation(totalVariations, nbCards)
  }, [nbCards, modalitiesPerFactor])

  // TODO: Having a function to generate a new variation is useless.
  // We should generate all the variations at once and then just pick them from the stack.
  // Callback to add a new variation to the stack
  const generate = useCallback(() => {
    const nbVariations = state.variations.length

    // Don't generate a new variation if there is already enough
    if (nbVariations >= maxLoop) return
    // Can't generate more variations than what is possible
    if (maxVariations === nbVariations) return
    // Can't generate variations if there is no modalities available
    if (!modalitiesPerFactor) return

    // Generate a random and unique variation
    const variation = generateUniqueVariation(nbCards, modalitiesPerFactor, state.variations)

    // Save the new variation in the state
    setState({
      variations: [...state.variations, variation],
      isMounted: true,
    })
  }, [state.variations, maxLoop, maxVariations, modalitiesPerFactor, nbCards])

  // Callback to save the new value in the formik field and generate a new variation
  const handleValidate = useCallback((cardIdx: number, associatedAnswer?: AssociatedAnswer) => {
    // Sanitize the new payload
    const currentVariation = state.variations[step]
    const payload = formatPayload(
      cardIdx,
      nbCards,
      currentVariation,
      filteredFactors,
      associatedAnswer,
    )

    // Save the new value in the formik field
    if (!field.value) {
      helpers.setValue([payload])
    // If we already have values, save the payload to the corresponding step
    } else {
      const newValues = [...field.value]
      newValues[step] = payload
      helpers.setValue(newValues)
    }

    // Regenerate a new variation on the stack
    generate()
    // Progress to next step (only if we are not at the last step already)
    setStep(prev => {
      return (prev + 1 === maxLoop) ? prev : prev + 1
    })
  }, [state.variations, step, nbCards, filteredFactors, field.value, generate, helpers, maxLoop])

  // Callback to see a specific step
  const navigateToStep = useCallback((step: number) => {
    setStep(step)
  }, [])

  // TODO: refactor this
  // Flags
  const isFinished =
    step === Math.min(maxVariations, maxLoop)
    || field.value?.length === Math.min(maxLoop, maxVariations)
  const nbAnswers = field?.value?.length ?? 0

  return {
    generate,
    navigateToStep,
    handleValidate,
    state,
    filteredFactors,
    step,
    nbAnswers,
    maxVariations,
    isFinished,
    answers: field.value,
  }
}

// ---- LOGIC

// Max number of tries to generate a variation
const TIMEOUT = 1000

function generateUniqueVariation(nbCards: number, modalitiesPerFactor: number[], existingVariations: number[][][]): number[][] {
  let created: number[][]
  let i = 0

  // Generate a variation until it is not in the existing variations
  do {
    created = generateVariation(nbCards, modalitiesPerFactor)
    i++ // Safety system to avoid infinite loop
  } while (existingVariations.some((v) => variationsAreSame(v, created)) && i < TIMEOUT)

  if (i > TIMEOUT) {
    console.error("Timeout reached - Could not generate a unique variation.")
  }

  return created
}

// FIXME: refactor this to handle more than 2 cards and in a generic way
function generateVariation(nbCards: number, modalitiesPerFactor: number[]): number[][] {
  if (nbCards > 2) {
    throw new Error("Generated variations only handle 2 cards for now.")
  }

  // If we have only one card, we generate a single variation
  if (nbCards === 1) {
    return [randomize(modalitiesPerFactor)]
  }

  // Else, we generate a couple variation
  let cardA: number[]
  let cardB: number[]
  let i = 0

  // Generate a pair of cards until they are different
  do {
    cardA = randomize(modalitiesPerFactor)
    cardB = randomize(modalitiesPerFactor)
    i++ // Safety system to avoid infinite loop
  } while (arraysAreSame(cardA, cardB) && i < TIMEOUT)

  if (arraysAreSame(cardA, cardB)) {
    console.error("Timeout reached - Could not generate a distinct couple for a new variation.")
  }

  return [cardA, cardB]
}

function formatPayload(cardIdx: number, TOTAL_CARDS: number, lastVariation: number[][], factors: Factor[], associatedAnswer?: AssociatedAnswer) {
  const format = (el: number) => {
    return factors?.map((f, idx) => (
      { [f.title]: f.modalities[lastVariation[el][idx]].description }
    ))
  }

  // If associatedAnswer !== undefined, it means that the we are on AssociatedClassification, we need choice but we dont need associated_input
  if (!associatedAnswer) {
    return {
      variations: [...Array(TOTAL_CARDS)].map((_, idx) => format(idx)),
      choice: cardIdx,
    }
  }

  // Else, that means we are on MonoThumbnail, we dont need choice but we need associated_input
  // const isRadiobox = Boolean(associatedAnswer.associatedInput.attributes.radio)
  return {
    variations: [...Array(TOTAL_CARDS)].map((_, idx) => format(idx))[0],
    associated_input: associatedAnswer.associatedInput,
    value: associatedAnswer.value
    // value: isRadiobox ? values.attributes.radio : values[values.attributes.type],
  }
}

// ---- HELPERS

function getMaxVariation(n: number, k: number): number {
  return permutations(n, k) / factorialize(k)
}

function factorialize(num: number): number {
  if (isNaN(num)) {
    throw new Error('Input is not a number')
  }
  
  if (num < 0) throw new Error('Factorial is not defined for negative numbers')
  if (num === 0) return 1

  return num * factorialize(num - 1)
}

function permutations(n: number, k: number): number {
  if (n < k) return 0
  return factorialize(n) / factorialize(n - k)
}

function randomize(array: number[]): number[] {
  return array?.map((m) => Math.floor(Math.random() * m))
}

// Function that compares if 2 arrays composed of numbers are the same
function arraysAreSame(arrA: number[], arrB: number[]): boolean {
  if (arrA.length !== arrB.length) {
    return false
  }

  for (let i = 0; i < arrA.length; i++) {
    if (arrA[i] !== arrB[i]) {
      return false
    }
  }

  return true
}

/**
 * Function that compares pair of variations. They are equal if they have the same cards, no matter the order.
 * Note : Variations with duplicate cards inside are not possible.
 * 
 * Examples :
 * const cardA = [0, 1]
 * const cardB = [1, 0]
 * const cardC = [1, 1]
 * const cardD = [0, 0]
 * 
 * const variationA = [cardA, cardB]
 * const variationB = [cardC, cardD] // unique
 * const variationC = [cardA, cardC] // unique
 * const variationD = [cardA, cardB] // same as variationA
 * const variationE = [cardB, cardA] // same as variationA
 */
function variationsAreSame(varA: number[][], varB: number[][]): boolean {
  if (varA.length !== varB.length) {
    return false
  }

  for (let i = 0; i < varA.length; i++) {
    if (!varB.some((v) => arraysAreSame(varA[i], v))) {
      return false
    }
  }

  return true
}
