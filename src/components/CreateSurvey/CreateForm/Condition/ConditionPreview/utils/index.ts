export const renderTitle = (step: number): string => {
  switch (step) {
    case 1:
      return "Sélectionner la question conditionnant l’affichage de la question en cours";
      break;
    case 2:
      return "Sélectionner un opérateur pour définir la condition";
      break;
    case 3:
      return "Sélectionner une valeur pour définir la condition";
      break;
    default:
      return "";
      break;
  }
};
