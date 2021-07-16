export const t = {
  menu_title: "Tableau de Bord",
  my_projects: "Mes projets",
  filters: [
    { label: "Tout voir", id: "all" },
    { label: "En cours", id: "in_progress" },
    { label: "Archivés", id: "archived" },
    { label: "Par date", id: "per_date" },
  ],
  header: [
    { Header: "Status", accessor: "status" },
    { Header: "Date", accessor: "createdAt" },
    { Header: "Titres", accessor: "description" },
    { Header: "Nombres de participants", accessor: "total" },
  ],
};
