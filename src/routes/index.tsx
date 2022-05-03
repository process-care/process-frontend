import IRoute from "types/routes/routes";
import { Login } from "pages/Auth/Login";
import { CreateSurvey } from "pages/Survey";
import { CreateForm } from "pages/Survey/FormBuilder";
import { Dashboard } from "pages/Dashboard";
import { Landing } from "pages/Landing";
import { Portail } from "pages/Portail";
import { CreateLanding } from "pages/Survey/CreateLanding";
import { Participation } from "pages/Survey/Participation";
import { CreateConsent } from "pages/Survey/CreateConsent";
import { ForgotPassword } from "pages/Auth/ForgotPassword";
import { NewPassword } from "pages/Auth/NewPassword";
import { SuccessPage } from "components/Authentification/SucessPage";

export const routes: IRoute[] = [
  {
    name: "Connexion",
    path: "/connexion",
    component: <Login />,
    exact: true,
  },
  {
    name: "Mot de passe oublié",
    path: "/mot-de-passe-oublie",
    component: <ForgotPassword />,
    exact: true,
  },
  {
    name: "Mot de passe oublié",
    path: "/nouveau-mot-de-passe",
    component: <NewPassword />,
    exact: true,
  },
  {
    name: "Portail Process",
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
  {
    name: "Consent",
    path: "/survey/:slug/:step",
    component: <Participation />,
    exact: true,
  },
];

export const protectedRoutes: IRoute[] = [
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
    name: "Attente de validation",
    path: "/attente-de-validation",
    component: <SuccessPage />,
    exact: true,
  },
];
