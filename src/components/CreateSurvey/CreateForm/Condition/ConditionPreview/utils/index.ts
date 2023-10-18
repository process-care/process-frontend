export const renderTitle = (step: number): string => {
  switch (step) {
    case 1: return "Question conditionnant l'affichage";
    case 2: return "Opérateur de comparaison";
    case 3: return "Valeur à comparer";
    
    default:
      return "";
  }
};
