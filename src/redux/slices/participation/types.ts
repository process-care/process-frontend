import { Maybe } from "api/graphql/sdk.generated";
import Operator from "types/form/operator";

export interface EvaluationCondition {
  id: string,
  group?: Maybe<string>,
  operator: Operator['id'],
  target_value: string,
  answer?: unknown,
}
