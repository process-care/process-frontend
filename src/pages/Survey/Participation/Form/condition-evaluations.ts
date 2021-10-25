import { EvaluationCondition } from "call/actions/formBuider/question";

// ---- TYPES

enum Operator {
  EQ = 'equal',
  NEQ = 'not_equal',
  EQ_SUP = 'equal_or_superior',
  EQ_INF = 'equal_or_inferior',
  SUP = 'superior',
  INF = 'inferior',
}

// ---- FUNCTIONS

/**
 * 
 * @param conditions 
 * @returns 
 */
export function shouldShow(conditions: EvaluationCondition[] | undefined): boolean {
  if (!conditions || conditions.length < 1) return true;
  
  // console.log('evaluating...');
  // console.log('here are the conditions: ', conditions);

  const groupEvals = conditions.reduce((acc, c) => {
    // Evaluate the condtion
    const evaluated = evaluate(c);
    
    // Find the group, if it's true, it takes the latest eval value (because it's an AND)
    // (if the AND chain is false, it stays false)
    const group = acc.get(c.group);
    if (group || group === undefined) acc.set(c.group, evaluated);

    return acc;
  }, new Map());
  
  // console.log('here are the grouped conditions: ', groupEvals);

  // If there is at least one true value, the OR chain is valid
  const finalEval = Array.from(groupEvals.values()).some(v => v === true);
  return finalEval;
}

/**
 * 
 * @param c 
 * @returns 
 */
function evaluate(c: EvaluationCondition): boolean {
  const { answer, target_value: value, operator } = c;

  // console.log('nuf: ', c.operator, answer, value);

  if (!answer) return false;
  
  switch(operator) {
    case Operator.EQ: return answer === value;
    case Operator.NEQ: return answer !== value;

    case Operator.EQ_SUP: return Number(answer) >= Number(value);
    case Operator.EQ_INF: return Number(answer) <= Number(value);
    case Operator.SUP: return Number(answer) > Number(value);
    case Operator.INF: return Number(answer) < Number(value);

    default:
      return false;
  }
}
