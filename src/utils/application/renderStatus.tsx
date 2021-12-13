import { Survey } from "redux/slices/surveyBuilder";

interface StatusTrad {
  trad: "📝 Non publié" | "🔐 Finalisé" | "💾 Archivé" | "✅ En cours";
}

export const renderStatus = (
  status: Survey["survey"]["status"]
): StatusTrad["trad"] => {
  switch (status) {
    case "draft":
      return "📝 Non publié";
      break;

    case "closed":
      return "🔐 Finalisé";
      break;

    case "archived":
      return "💾 Archivé";
      break;

    case "pending":
      return "✅ En cours";
      break;
    default:
      return "✅ En cours";
      break;
  }
};
