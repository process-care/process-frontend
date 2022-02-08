import { Enum_Survey_Status, Maybe } from "api/graphql/types.generated";

interface StatusTrad {
  trad: "Non publié" | "Finalisé" | "Archivé" | "En cours";
}

export const renderStatus = (
  status: Maybe<Enum_Survey_Status> | undefined
): StatusTrad["trad"] => {
  switch (status) {
    case "draft":
      return "Non publié";
      break;

    case "closed":
      return "Finalisé";
      break;

    case "archived":
      return "Archivé";
      break;

    case "pending":
      return "En cours";
      break;
    default:
      return "En cours";
      break;
  }
};
