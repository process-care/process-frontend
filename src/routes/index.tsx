import { IRoute } from "@/types/routes";

export const routes: IRoute[] = [
  {
    name: "Connexion",
    path: "/connexion",
  },
  {
    name: "Mot de passe oublié",
    path: "/mot-de-passe-oublie",
  },
  {
    name: "Mot de passe oublié",
    path: "/nouveau-mot-de-passe",
  },
  {
    name: "Portail Process",
    path: "/",
  },
  {
    name: "Landing page",
    path: "/survey/:slug",
  },
  {
    name: "Consent",
    path: "/survey/:slug/:step",
  },
];

export const protectedRoutes: IRoute[] = [
  {
    name: "Création d'enquète",
    path: "/survey/:slug/create/metadatas",
  },
  {
    name: "Création de landing page",
    path: "/survey/:slug/create/landing",
  },
  {
    name: "Création du consentement",
    path: "/survey/:slug/create/consent",
  },
  {
    name: "Création du formulaire",
    path: "/survey/:slug/create/form",
  },
  {
    name: "Dashboard",
    path: "/dashboard",
  },
  {
    name: "Profil",
    path: "/profil",
  },
  {
    name: "Attente de validation",
    path: "/attente-de-validation",
  },
];
