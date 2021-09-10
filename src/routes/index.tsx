import React from "react";

import IRoute from "types/routes/routes";
import { Authentification } from "pages/Authentification";
import { CreateSurvey } from "pages/Survey";
import { CreateForm } from "pages/Survey/CreateForm";
import { Dashboard } from "pages/Dashboard";
import { Landing } from "pages/Landing";
import { Portail } from "pages/Portail";
import { CreateLanding } from "pages/Survey/CreateLanding";
import { CreateConsent } from "pages/Survey/CreateConsent";

const routes: IRoute[] = [
  {
    name: "Connexion / Inscription",
    path: "/connexion",
    component: <Authentification />,
    exact: true,
  },
  {
    name: "Création d'enquète",
    path: "/survey/:slug/create/metadatas",
    component: <CreateSurvey />,
    exact: true,
  },
  {
    name: "Création de landing page",
    path: "/survey/:slug/create/landing",
    component: <CreateLanding />,
    exact: true,
  },
  {
    name: "Création du consentement",
    path: "/survey/:slug/create/consent",
    component: <CreateConsent />,
    exact: true,
  },
  {
    name: "Création du formulaire",
    path: "/survey/:slug/create/form",
    component: <CreateForm />,
    exact: true,
  },
  {
    name: "Dashboard",
    path: "/dashboard",
    component: <Dashboard />,
    exact: true,
  },
  {
    name: "Profil",
    path: "/profil",
    component: <Dashboard />,
    exact: true,
  },
  {
    name: "Portail process",
    path: "/",
    component: <Portail />,
    exact: true,
  },
  {
    name: "Landing page",
    path: "/survey/:slug",
    component: <Landing />,
    exact: true,
  },
];

export default routes;
