export default interface ICondition {
  id: string;
  condition_type: "page" | "input";
  referer_entity_id: string;
}
