import { useCallback, useEffect, useState } from "react";

// ---- CONSTANTS

const LS_PARTICIPATION = "process__participations";

// ---- TYPES

export type StoredParticipation = {
  id: string;
  completed: boolean;
  consent: boolean;
};

type StoredParticipations = Record<string, StoredParticipation>;

// ---- HOOKS

export function useLocalParticipation(slug: string) {
  const [loading, setLoading] = useState(true)
  const [participation, setParticipation] = useState<StoredParticipation | undefined>(undefined)

  // Load participation
  useEffect(() => {
    const existingParticipation = findExistingParticipation(slug)
    setParticipation(existingParticipation);
    setLoading(false)
  }, [slug])

  const startParticipation = useCallback((id: string) => {
    const newP = { id, completed: false, consent: true };
    setParticipation(newP)
    storeParticipation(slug, newP)  
  }, [slug])

  // Callback to finish a participation
  const finishParticipation = useCallback(() => {
    if (!participation) return
    const completedP = { ...participation, completed: true }
    setParticipation(completedP)
    storeParticipation(slug, completedP)  
  }, [participation, slug])


  return {
    loading,
    participation,
    startParticipation,
    finishParticipation,
  }
}

// ---- ACTIONS

/**
 * Returns (from the local storage) the participation associated with the given survey slug (if any).
 * @param slug
 * @returns
 */
function findExistingParticipation(slug: string): StoredParticipation | undefined {
  const participations = readLocalParticipations();
  return participations[slug];
}

/**
 * Associates and saves a new participation (id) with a the given survey slug in the local storage.
 * @param slug
 * @param participation
 */
function storeParticipation(slug: string, participation: StoredParticipation): void {
  const localParticipations = readLocalParticipations();
  localParticipations[slug] = participation;
  localStorage.setItem(LS_PARTICIPATION, JSON.stringify(localParticipations));
}

// export function finishParticipation(slug: string | undefined): void {
//   if (!slug) {
//     console.error("Missing slug to complete the participation !");
//     return;
//   }

//   // Find participations and target
//   const localParticipations = readLocalParticipations();
//   const participation = localParticipations[slug];

//   if (!participation) return;

//   // Mark the target as completed
//   localParticipations[slug] = { ...participation, completed: true };
//   // Save update list of participations
//   localStorage.setItem(LS_PARTICIPATION, JSON.stringify(localParticipations));
// }

// ---- ACCESSORS

/**
 * Returns (from the local storage) all the survey slug / participation associations.
 * @returns
 */
function readLocalParticipations(): StoredParticipations {
  const data = localStorage.getItem(LS_PARTICIPATION);
  return data ? JSON.parse(data) : {};
}
