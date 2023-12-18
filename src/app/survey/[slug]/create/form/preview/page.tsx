'use client'

import { createContext, useEffect } from "react"
import { useDispatch } from "react-redux"

import { actions, selectors } from "@/redux/slices/scientistData.js"
import { useAppSelector } from "@/redux/hooks"
import ParticipationForm from "../../../[step]/_components/ParticipationForm"

// ---- TYPES

type Props = {
  params: {
    slug: string;
  }
}

// ---- COMPONENT

export const ParticipationFormContext = createContext<any>(null)

export default function ParticipationFormPreview({ params }: Props): JSX.Element {
  const { slug } = params
  const dispatch = useDispatch()
  const selectedSurveyId = useAppSelector(selectors.survey.getSelectedSurveyId)

  useEffect(() => {
    dispatch(actions.initializeSurvey(slug))
  }, [dispatch, slug])
  
  if (!selectedSurveyId) return <div>Survey not found</div>

  return (
    <ParticipationFormContext.Provider value={{ mode: "preview" }}>
      <ParticipationForm
        surveyId={selectedSurveyId}
        participationId={'xx'}
      />
    </ParticipationFormContext.Provider>
  )
}
