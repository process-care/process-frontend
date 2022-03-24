const LS_PARTICIPATION = "process__participations";

export type StoredParticipation = {
  id: string;
  completed: boolean;
};

type StoredParticipations = Record<string, StoredParticipation>;

/**
 * Returns (from the local storage) the participation associated with the given survey slug (if any).
 * @param slug
 * @returns
 */
export function findExistingParticipation(slug: string): StoredParticipation | undefined {
  const participations = readLocalParticipations();
  return participations[slug];
}

/**
 * Associates and saves a new participation (id) with a the given survey slug in the local storage.
 * @param slug
 * @param newParticipationId
 */
export function storeParticipation(slug: string, newParticipationId: string): void {
  const localParticipations = readLocalParticipations();
  localParticipations[slug] = { id: newParticipationId, completed: false };
  localStorage.setItem(LS_PARTICIPATION, JSON.stringify(localParticipations));
}

export function finishParticipation(slug: string | undefined): void {
  if (!slug) {
    console.error("Missing slug to complete the participation !");
    return;
  }

  // Find participations and target
  const localParticipations = readLocalParticipations();
  const participation = localParticipations[slug];

  if (!participation) return;

  // Mark the target as completed
  localParticipations[slug] = { ...participation, completed: true };
  // Save update list of participations
  localStorage.setItem(LS_PARTICIPATION, JSON.stringify(localParticipations));
}

/**
 * Returns (from the local storage) all the survey slug / participation associations.
 * @returns
 */
function readLocalParticipations(): StoredParticipations {
  const data = localStorage.getItem(LS_PARTICIPATION);
  return data ? JSON.parse(data) : {};
}
