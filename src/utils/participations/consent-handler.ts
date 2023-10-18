'use client'

import { useCallback } from "react";
import { useRouter } from "next/navigation.js"

import { useLocalParticipation, StoredParticipation } from "./localstorage-handlers.js"

type ConsentHandler = {
  onConsent: (participationId: string) => void;
  onRefuse: () => void;
  participation: StoredParticipation | undefined;
  loading: boolean;
};

export function useConsentHandlers(slug: string): ConsentHandler {
  const router = useRouter()
  const { loading, participation, startParticipation } = useLocalParticipation(slug);

  // Consent
  const onConsent = useCallback(
    (newParticipationId: any) => {
      startParticipation(newParticipationId);
      router.push(`/survey/${slug}/participate`);
    },
    [router, slug, startParticipation]
  );

  // Refuse
  const onRefuse = useCallback(() => {
    router.push(`/`);
  }, [router]);

  return {
    loading,
    participation,
    onConsent,
    onRefuse,
  };
}