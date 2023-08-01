import IOperator from "@/types/operator";

export const operatorsForMultiple: IOperator[] = [
  {
    id: "equal",
    name: "Egal à",
  },
  {
    id: "not_equal",
    name: "Différent de",
  },
];

export const operators: IOperator[] = [
  ...operatorsForMultiple,
  {
    id: "equal_or_inferior",
    name: "Egal ou inférieur à",
  },
  {
    id: "equal_or_superior",
    name: "Egal ou supérieur à",
  },

  {
    id: "superior",
    name: "Supérieur à",
  },
  {
    id: "inferior",
    name: "Inférieur à",
  },
];
