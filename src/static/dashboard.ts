export const t = {
  menu_title: "Tableau de Bord",
  my_projects: "Mes projets",
  noData: "No surveys in your account",
  cta: "Créer une nouvelle enquête",
  filters: [
    { label: "Tout voir", id: "all" },
    { label: "Brouillon", id: "draft" },
    { label: "En cours", id: "pending" },
    { label: "Fermés", id: "closed" },
    { label: "Archivés", id: "archived" },
  ],
  header: [
    { Header: "Status", accessor: "status" },
    { Header: "Date", accessor: "createdAt" },
    { Header: "Titre", accessor: "title" },
    { Header: "Participants", accessor: "total" },
  ],
};
