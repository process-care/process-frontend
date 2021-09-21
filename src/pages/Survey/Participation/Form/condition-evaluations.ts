import { EvaluationCondition } from "call/actions/formBuider/question";

/**
 * 
 * @param conditions 
 * @returns 
 */
export function shouldShow(conditions: [EvaluationCondition] | undefined): boolean {
  if (!conditions || conditions.length < 1) return true;
  
  console.log('evaluating...');
  console.log('here are the conditions: ', conditions);

  const groupEvals = conditions.reduce((acc, c) => {
    // Evaluate the condtion
    const evalued = evaluate(c);
    
    // Find the group, if it's true, it takes the latest eval value (because it's an AND)
    // (if the AND chain is false, it stays false)
    const group = acc.get(c.group);
    if (group || group === undefined) acc.set(c.group, evalued);

    return acc;
  }, new Map());
  
  console.log('here are the grouped conditions: ', groupEvals);

  // If there is at least one true value, the OR chain is valid
  const finalEval = Array.from(groupEvals.values()).find(v => v === true);
  return finalEval;
}

/**
 * 
 * @param c 
 * @returns 
 */
function evaluate(c: EvaluationCondition): boolean {
  switch(c.operator) {
    case 'equal': return c.answer === c.target_value;

    default:
      return false;
  }
}