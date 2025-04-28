
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
      rule: `PEMDAS starts with Parentheses, working from innermost to outermost. ${a} + ${b} = ${step1Result}`,
      result: step1Result
    },
    {
      id: "step2",
      operation: "Exponent",
      description: `Calculate ${step1Result} raised to power ${c}`,
      expression: `${step1Result} ^ ${c}`,
      rule: `After parentheses, we calculate exponents. ${step1Result} raised to power ${c} equals ${step2Result}.`,
      result: step2Result
    },
    {
      id: "step3",
      operation: "Division",
      description: `Divide ${step2Result} by ${d}`,
      expression: `${step2Result} ÷ ${d}`,
      rule: `Next in PEMDAS is multiplication and division, from left to right. ${step2Result} ÷ ${d} = ${step3Result}`,
      result: step3Result
    },
    {
      id: "step4",
      operation: "Subtraction",
      description: `Subtract ${e} from ${step3Result}`,
      expression: `${step3Result} - ${e}`,
      rule: `Finally, we handle addition and subtraction from left to right. ${step3Result} - ${e} = ${finalResult}`,
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
      operation: "Exponent",
      description: `Calculate ${a} raised to power ${b}`,
      expression: `${a} ^ ${b}`,
      rule: `After checking for parentheses, we calculate exponents. ${a} raised to power ${b} equals ${step1Result}.`,
      result: step1Result
    },
    {
      id: "step2",
      operation: "Parentheses/Multiplication",
      description: `Calculate ${c} * ${d} inside the parentheses`,
      expression: `( ${c} * ${d} )`,
      rule: `Now we handle the expression inside parentheses. Since it's a simple multiplication, we get ${c} * ${d} = ${step2Result}`,
      result: step2Result
    },
    {
      id: "step3",
      operation: "Addition",
      description: `Add ${step1Result} and ${step2Result}`,
      expression: `${step1Result} + ${step2Result}`,
      rule: `After exponents and multiplication/division, we handle addition and subtraction from left to right. ${step1Result} + ${step2Result} = ${step3Result}`,
      result: step3Result
    },
    {
      id: "step4",
      operation: "Subtraction",
      description: `Subtract ${e} from ${step3Result}`,
      expression: `${step3Result} - ${e}`,
      rule: `Finally, we continue with addition/subtraction from left to right. ${step3Result} - ${e} = ${finalResult}`,
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
  const step1Result = a / b;
  const step2Result = c + d;
  const step3Result = step1Result * step2Result;
  const step4Result = Math.pow(e, 2);
  const finalResult = step3Result - step4Result;
  
  // Define steps
  const steps: Step[] = [
    {
      id: "step1",
      operation: "Division",
      description: `Divide ${a} by ${b}`,
      expression: `${a} ÷ ${b}`,
      rule: `For multiplication and division, we work from left to right. Since division appears first, we calculate ${a} ÷ ${b} = ${step1Result}`,
      result: step1Result
    },
    {
      id: "step2",
      operation: "Parentheses/Addition",
      description: `Calculate ${c} + ${d} inside the parentheses`,
      expression: `( ${c} + ${d} )`,
      rule: `Now we handle the expression inside parentheses. ${c} + ${d} = ${step2Result}`,
      result: step2Result
    },
    {
      id: "step3",
      operation: "Multiplication",
      description: `Multiply ${step1Result} by ${step2Result}`,
      expression: `${step1Result} * ${step2Result}`,
      rule: `Continuing with multiplication from left to right. ${step1Result} * ${step2Result} = ${step3Result}`,
      result: step3Result
    },
    {
      id: "step4",
      operation: "Exponent",
      description: `Calculate ${e} squared`,
      expression: `${e} ^ 2`,
      rule: `Next we calculate the exponent: ${e} squared equals ${step4Result}`,
      result: step4Result
    },
    {
      id: "step5",
      operation: "Subtraction",
      description: `Subtract ${step4Result} from ${step3Result}`,
      expression: `${step3Result} - ${step4Result}`,
      rule: `Finally, we handle subtraction: ${step3Result} - ${step4Result} = ${finalResult}`,
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
  const step1Result = b * c;
  const step2Result = Math.pow(d, e);
  const step3Result = a - step1Result;
  const finalResult = step3Result + step2Result;
  
  // Define steps
  const steps: Step[] = [
    {
      id: "step1",
      operation: "Multiplication",
      description: `Multiply ${b} by ${c}`,
      expression: `${b} * ${c}`,
      rule: `Following PEMDAS, we handle multiplication before addition/subtraction. ${b} * ${c} = ${step1Result}`,
      result: step1Result
    },
    {
      id: "step2",
      operation: "Parentheses/Exponent",
      description: `Calculate ${d} raised to power ${e} inside the parentheses`,
      expression: `( ${d} ^ ${e} )`,
      rule: `Now we handle the expression inside parentheses with the exponent. ${d} raised to power ${e} equals ${step2Result}`,
      result: step2Result
    },
    {
      id: "step3",
      operation: "Subtraction",
      description: `Subtract ${step1Result} from ${a}`,
      expression: `${a} - ${step1Result}`,
      rule: `After handling multiplication/division and exponents, we proceed with addition/subtraction from left to right. ${a} - ${step1Result} = ${step3Result}`,
      result: step3Result
    },
    {
      id: "step4",
      operation: "Addition",
      description: `Add ${step3Result} and ${step2Result}`,
      expression: `${step3Result} + ${step2Result}`,
      rule: `Finally, we continue with addition/subtraction from left to right. ${step3Result} + ${step2Result} = ${finalResult}`,
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
      rule: `PEMDAS starts with Parentheses. Calculate ${a} + ${b} = ${step1Result}`,
      result: step1Result
    },
    {
      id: "step2",
      operation: "Exponent",
      description: `Calculate ${d} raised to power ${e}`,
      expression: `${d} ^ ${e}`,
      rule: `After parentheses, we calculate exponents. ${d} raised to power ${e} equals ${step2Result}`,
      result: step2Result
    },
    {
      id: "step3",
      operation: "Multiplication",
      description: `Multiply ${step1Result} by ${c}`,
      expression: `${step1Result} * ${c}`,
      rule: `Next in PEMDAS is multiplication and division, from left to right. First, we multiply: ${step1Result} * ${c} = ${step3Result}`,
      result: step3Result
    },
    {
      id: "step4",
      operation: "Division",
      description: `Divide ${step3Result} by ${step2Result}`,
      expression: `${step3Result} ÷ ${step2Result}`,
      rule: `Next we continue with division: ${step3Result} ÷ ${step2Result} = ${finalResult}`,
      result: finalResult
    }
  ];
  
  return { equation, steps, result: finalResult };
};
