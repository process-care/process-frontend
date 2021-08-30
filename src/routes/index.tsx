import React from "react";

import IRoute from "interfaces/routes/routes";
import { Authentification } from "pages/Authentification";
import { CreateSurvey } from "pages/CreateSurvey";
import { CreateForm } from "pages/CreateSurvey/CreateForm";
import { Dashboard } from "pages/Dashboard";
import { Landing } from "pages/Landing";
import { Portail } from "pages/Portail";
import { Survey } from "pages/Survey";
import { CreateLanding } from "pages/CreateSurvey/CreateLanding";

const routes: IRoute[] = [
  {
    name: "Connexion / Inscription",
    path: "/auth",
    component: <Authentification />,
    exact: true,
  },
  {
    name: "Création d'enquète",
    path: "/create-survey",
    component: <CreateSurvey />,
    exact: true,
  },
  {
    name: "Création de landing page",
    path: "/create-survey/:id/create-landing",
    component: <CreateLanding />,
    exact: true,
  },
  {
    name: "Création du formulaire",
    path: "/create-survey/:id/create-form",
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
    name: "Landing page",
    path: "/landing/:id",
    component: <Landing />,
    exact: true,
  },

  {
    name: "Survey",
    path: "/survey/:id",
    component: <Survey />,
    exact: false,
  },
  {
    name: "Portail",
    path: "/",
    component: <Portail />,
    exact: true,
  },
];

export default routes;
