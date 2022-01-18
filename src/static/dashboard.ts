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

export const getLabelStatus = (status: string): string => {
  switch (status) {
    case "draft":
      return "Brouillon";
    case "pending":
      return "En cours";
    case "closed":
      return "Fermé";
    case "archived":
      return "Archivé";
    default:
      return "";
  }
};
