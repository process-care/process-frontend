export default interface Operator {
  id:
    | "equal_or_superior"
    | "equal_or_inferior"
    | "equal"
    | "superior"
    | "inferior"
    | "not_equal";
  name?:
    | "Egal ou supérieur à"
    | "Egal ou inférieur à"
    | "Egal à"
    | "Supérieur à"
    | "Inférieur à"
    | "Différent de";
}
