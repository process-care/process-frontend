import { Enum_Condition_Operator, Maybe } from "@/api/graphql/sdk.generated.js"

export interface EvaluationCondition {
  id: string;
  group?: Maybe<string>;
  operator: Maybe<Enum_Condition_Operator> | undefined;
  target_value: Maybe<string> | undefined;
  answer?: any;
}
