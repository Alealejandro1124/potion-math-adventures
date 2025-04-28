
interface Step {
  id: string;
  operation: string;
  description: string;
  expression: string;
  rule: string;
  result?: number | string;
}

// Helper function to generate a random integer within range
const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Generate a random PEMDAS equation with steps
export const generateRandomPemdasEquation = () => {
  // Let's create 5 different equation structures, each with all PEMDAS operations
  const equationTypes = [
    "nested-parentheses",
    "exponent-first",
    "multiplication-division-mix",
    "complex-addition-subtraction",
    "all-operations-balanced"
  ];
  
  const selectedType = equationTypes[getRandomInt(0, equationTypes.length - 1)];
  
  switch (selectedType) {
    case "nested-parentheses":
      return generateNestedParenthesesEquation();
    case "exponent-first":
      return generateExponentFirstEquation();
    case "multiplication-division-mix":
      return generateMultDivMixEquation();
    case "complex-addition-subtraction":
      return generateComplexAddSubEquation();
    case "all-operations-balanced":
      return generateBalancedEquation();
    default:
      return generateBalancedEquation();
  }
};

const generateNestedParenthesesEquation = () => {
  // Generate numbers
  const a = getRandomInt(2, 5);
  const b = getRandomInt(2, 4);
  const c = getRandomInt(2, 3);
  const d = getRandomInt(2, 5);
  const e = getRandomInt(2, 4);
  
  // Create equation: ((a + b) ^ c) ÷ d - e
  const equation = `( ( ${a} + ${b} ) ^ ${c} ) ÷ ${d} - ${e}`;
  
  // Calculate intermediate results
  const step1Result = a + b;
  const step2Result = Math.pow(step1Result, c);
  const step3Result = step2Result / d;
  const finalResult = step3Result - e;
  
  // Define steps
  const steps: Step[] = [
    {
      id: "step1",
      operation: "Parentheses (Inner)",
      description: `Calculate ${a} + ${b} inside the innermost parentheses`,
      expression: `( ${a} + ${b} )`,
      rule: "PEMDAS starts with Parentheses, working from innermost to outermost. Always solve expressions inside parentheses first.",
      result: step1Result
    },
    {
      id: "step2",
      operation: "Exponent",
      description: `Calculate ${step1Result} raised to power ${c}`,
      expression: `${step1Result} ^ ${c}`,
      rule: "After parentheses, we calculate exponents. This is the 'E' in PEMDAS.",
      result: step2Result
    },
    {
      id: "step3",
      operation: "Division",
      description: `Divide ${step2Result} by ${d}`,
      expression: `${step2Result} ÷ ${d}`,
      rule: "Next in PEMDAS is multiplication and division, from left to right. Since division appears first from left to right, we calculate it next.",
      result: step3Result
    },
    {
      id: "step4",
      operation: "Subtraction",
      description: `Subtract ${e} from ${step3Result}`,
      expression: `${step3Result} - ${e}`,
      rule: "Finally, we handle addition and subtraction from left to right. This is the last step in the PEMDAS sequence.",
      result: finalResult
    }
  ];
  
  return { equation, steps, result: finalResult };
};

const generateExponentFirstEquation = () => {
  // Generate numbers
  const a = getRandomInt(2, 4);
  const b = getRandomInt(2, 3);
  const c = getRandomInt(2, 5);
  const d = getRandomInt(2, 4);
  const e = getRandomInt(2, 6);
  
  // Create equation: a ^ b + (c * d) - e
  const equation = `${a} ^ ${b} + ( ${c} * ${d} ) - ${e}`;
  
  // Calculate intermediate results
  const step1Result = Math.pow(a, b);
  const step2Result = c * d;
  const step3Result = step1Result + step2Result;
  const finalResult = step3Result - e;
  
  // Define steps
  const steps: Step[] = [
    {
      id: "step1",
      operation: "Parentheses",
      description: `Calculate ${c} * ${d} inside the parentheses`,
      expression: `( ${c} * ${d} )`,
      rule: "PEMDAS begins with Parentheses. Even though there's an exponent elsewhere in the equation, we must first solve what's inside parentheses.",
      result: step2Result
    },
    {
      id: "step2",
      operation: "Exponent",
      description: `Calculate ${a} raised to power ${b}`,
      expression: `${a} ^ ${b}`,
      rule: "After handling parentheses, we move to Exponents. This is the second priority in the PEMDAS sequence.",
      result: step1Result
    },
    {
      id: "step3",
      operation: "Addition",
      description: `Add ${step1Result} and ${step2Result}`,
      expression: `${step1Result} + ${step2Result}`,
      rule: "Next, we handle addition and subtraction from left to right. Since addition appears first, we calculate it first.",
      result: step3Result
    },
    {
      id: "step4",
      operation: "Subtraction",
      description: `Subtract ${e} from ${step3Result}`,
      expression: `${step3Result} - ${e}`,
      rule: "Finally, we continue with addition/subtraction from left to right, completing the PEMDAS sequence.",
      result: finalResult
    }
  ];
  
  return { equation, steps, result: finalResult };
};

const generateMultDivMixEquation = () => {
  // Generate numbers to ensure clean division
  const b = getRandomInt(2, 5);
  const c = getRandomInt(2, 5);
  const a = b * c * getRandomInt(1, 3); // Ensure clean division
  const d = getRandomInt(2, 4);
  const e = getRandomInt(2, 5);
  
  // Create equation: a ÷ b * (c + d) - e^2
  const equation = `${a} ÷ ${b} * ( ${c} + ${d} ) - ${e} ^ 2`;
  
  // Calculate intermediate results
  const step1Result = c + d;
  const step2Result = Math.pow(e, 2);
  const step3Result = a / b;
  const step4Result = step3Result * step1Result;
  const finalResult = step4Result - step2Result;
  
  // Define steps
  const steps: Step[] = [
    {
      id: "step1",
      operation: "Parentheses",
      description: `Calculate ${c} + ${d} inside the parentheses`,
      expression: `( ${c} + ${d} )`,
      rule: "Following PEMDAS, we first solve expressions inside Parentheses. This is always the first priority.",
      result: step1Result
    },
    {
      id: "step2",
      operation: "Exponent",
      description: `Calculate ${e} squared`,
      expression: `${e} ^ 2`,
      rule: "Next in PEMDAS is Exponents. We calculate any terms with exponents before moving on to multiplication and division.",
      result: step2Result
    },
    {
      id: "step3",
      operation: "Division",
      description: `Divide ${a} by ${b}`,
      expression: `${a} ÷ ${b}`,
      rule: "For multiplication and division, we work from left to right. Since division appears first from left to right, we calculate it next.",
      result: step3Result
    },
    {
      id: "step4",
      operation: "Multiplication",
      description: `Multiply ${step3Result} by ${step1Result}`,
      expression: `${step3Result} * ${step1Result}`,
      rule: "Continuing with multiplication/division from left to right. After division, we handle multiplication next.",
      result: step4Result
    },
    {
      id: "step5",
      operation: "Subtraction",
      description: `Subtract ${step2Result} from ${step4Result}`,
      expression: `${step4Result} - ${step2Result}`,
      rule: "Finally, we handle addition and subtraction from left to right. This is the last step in the PEMDAS sequence.",
      result: finalResult
    }
  ];
  
  return { equation, steps, result: finalResult };
};

const generateComplexAddSubEquation = () => {
  // Generate numbers
  const a = getRandomInt(10, 20);
  const b = getRandomInt(3, 8);
  const c = getRandomInt(2, 5);
  const d = getRandomInt(2, 4);
  const e = getRandomInt(2, 4);
  
  // Create equation: a - b * c + (d ^ e)
  const equation = `${a} - ${b} * ${c} + ( ${d} ^ ${e} )`;
  
  // Calculate intermediate results
  const step1Result = Math.pow(d, e);
  const step2Result = b * c;
  const step3Result = a - step2Result;
  const finalResult = step3Result + step1Result;
  
  // Define steps
  const steps: Step[] = [
    {
      id: "step1",
      operation: "Parentheses/Exponent",
      description: `Calculate ${d} raised to power ${e} inside the parentheses`,
      expression: `( ${d} ^ ${e} )`,
      rule: "PEMDAS begins with Parentheses. Inside these parentheses, we have an exponent to calculate.",
      result: step1Result
    },
    {
      id: "step2",
      operation: "Multiplication",
      description: `Multiply ${b} by ${c}`,
      expression: `${b} * ${c}`,
      rule: "Following PEMDAS, after Parentheses and Exponents, we handle Multiplication and Division from left to right.",
      result: step2Result
    },
    {
      id: "step3",
      operation: "Subtraction",
      description: `Subtract ${step2Result} from ${a}`,
      expression: `${a} - ${step2Result}`,
      rule: "Next in PEMDAS is Addition and Subtraction from left to right. Since subtraction appears first, we calculate it first.",
      result: step3Result
    },
    {
      id: "step4",
      operation: "Addition",
      description: `Add ${step3Result} and ${step1Result}`,
      expression: `${step3Result} + ${step1Result}`,
      rule: "Finally, we continue with addition/subtraction from left to right, completing the PEMDAS sequence.",
      result: finalResult
    }
  ];
  
  return { equation, steps, result: finalResult };
};

const generateBalancedEquation = () => {
  // Generate numbers
  const a = getRandomInt(2, 5);
  const b = getRandomInt(2, 4);
  const c = getRandomInt(2, 5);
  const d = getRandomInt(2, 4);
  const e = getRandomInt(2, 3);
  
  // Create equation: (a + b) * c ÷ d ^ e
  const equation = `( ${a} + ${b} ) * ${c} ÷ ${d} ^ ${e}`;
  
  // Calculate intermediate results
  const step1Result = a + b;
  const step2Result = Math.pow(d, e);
  const step3Result = step1Result * c;
  const finalResult = step3Result / step2Result;
  
  // Define steps
  const steps: Step[] = [
    {
      id: "step1",
      operation: "Parentheses",
      description: `Calculate ${a} + ${b} inside the parentheses`,
      expression: `( ${a} + ${b} )`,
      rule: "PEMDAS starts with Parentheses. Always solve expressions inside parentheses first.",
      result: step1Result
    },
    {
      id: "step2",
      operation: "Exponent",
      description: `Calculate ${d} raised to power ${e}`,
      expression: `${d} ^ ${e}`,
      rule: "After parentheses, we calculate Exponents. This is the second priority in the PEMDAS sequence.",
      result: step2Result
    },
    {
      id: "step3",
      operation: "Multiplication",
      description: `Multiply ${step1Result} by ${c}`,
      expression: `${step1Result} * ${c}`,
      rule: "Next in PEMDAS is Multiplication and Division, from left to right. Since multiplication appears first, we calculate it next.",
      result: step3Result
    },
    {
      id: "step4",
      operation: "Division",
      description: `Divide ${step3Result} by ${step2Result}`,
      expression: `${step3Result} ÷ ${step2Result}`,
      rule: "Continuing with multiplication/division from left to right. After handling multiplication, we now perform division.",
      result: finalResult
    }
  ];
  
  return { equation, steps, result: finalResult };
};
