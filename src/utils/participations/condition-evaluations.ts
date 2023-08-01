import { Enum_Condition_Operator } from "@/api/graphql/types.generated";
import { EvaluationCondition } from "@/redux/slices/participation/types";

// ---- FUNCTIONS

/**
 *
 * @param conditions
 * @returns
 */
export function shouldShow(conditions: EvaluationCondition[] | undefined): boolean {
  if (!conditions || conditions.length < 1) return true;

  // console.log("evaluating...");
  // console.log("here are the conditions: ", conditions);

  const groupEvals = conditions.reduce((acc, c) => {
    // Evaluate the condition
    const evaluated = evaluate(c);

    // Find the group, if it's true, it takes the latest eval value (because it's an AND)
    // (if the AND chain is false, it stays false)
    const group = acc.get(c.group);
    if (group || group === undefined) acc.set(c.group, evaluated);

    return acc;
  }, new Map());

  // console.log("here are the grouped conditions: ", groupEvals);

  // If there is at least one true value, the OR chain is valid
  const finalEval = Array.from(groupEvals.values()).some((v) => v === true);
  return finalEval;
}

/**
 *
 * @param c
 * @returns
 */
function evaluate(c: EvaluationCondition): boolean {
  const { answer, target_value: value, operator } = c;

  // console.group("NUF");
  // console.log("operator: ", c.operator);
  // console.log("answer: ", answer);
  // console.log("value: ", value);
  // console.groupEnd();

  if (!answer) return false;
  if (!operator) return false;

  const sanitizedValue = answer.answer ?? answer.value ?? answer;

  // NOTE: We use loose equality here because we want to compare strings and numbers
  //       (e.g. "1" == 1)
  
  switch (operator) {
    case Enum_Condition_Operator.Equal:
      return Array.isArray(sanitizedValue) ? sanitizedValue.includes(value) : sanitizedValue == value;
    case Enum_Condition_Operator.NotEqual:
      return Array.isArray(sanitizedValue) ? !sanitizedValue.includes(value) : sanitizedValue != value;

    case Enum_Condition_Operator.EqualOrSuperior:
      return Number(sanitizedValue) >= Number(value);
    case Enum_Condition_Operator.EqualOrInferior:
      return Number(sanitizedValue) <= Number(value);
    case Enum_Condition_Operator.Superior:
      return Number(sanitizedValue) > Number(value);
    case Enum_Condition_Operator.Inferior:
      return Number(sanitizedValue) < Number(value);

    default:
      return false;
  }
}
