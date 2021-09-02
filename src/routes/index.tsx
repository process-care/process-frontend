import React from "react";

import IRoute from "types/routes/routes";
import { Authentification } from "pages/Authentification";
import { CreateSurvey } from "pages/Survey";
import { CreateForm } from "pages/Survey/CreateForm";
import { Dashboard } from "pages/Dashboard";
import { Landing } from "pages/Landing";
import { Portail } from "pages/Portail";
import { CreateLanding } from "pages/Survey/CreateLanding";

const routes: IRoute[] = [
  {
    name: "Connexion / Inscription",
    path: "/connexion",
    component: <Authentification />,
    exact: true,
  },
  {
    name: "Création d'enquète",
    path: "/survey/create",
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
    name: "Portail process",
    path: "/portail",
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
