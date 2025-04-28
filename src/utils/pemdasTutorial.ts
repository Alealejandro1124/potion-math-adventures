
interface Step {
  id: string;
  operation: string;
  description: string;
  expression: string;
  rule: string;
}

// Helper function to generate a random integer within range
const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Generate a random PEMDAS equation with steps
export const generateRandomPemdasEquation = () => {
  // Let's create different types of equations to teach different aspects of PEMDAS
  const equationTypes = [
    "parentheses-and-operations",
    "all-operations",
    "multiplication-division",
    "addition-subtraction",
  ];
  
  const selectedType = equationTypes[getRandomInt(0, equationTypes.length - 1)];
  
  switch (selectedType) {
    case "parentheses-and-operations":
      return generateParenthesesEquation();
    case "all-operations":
      return generateAllOperationsEquation();
    case "multiplication-division":
      return generateMultDivEquation();
    case "addition-subtraction":
      return generateAddSubEquation();
    default:
      return generateAllOperationsEquation();
  }
};

const generateParenthesesEquation = () => {
  // Generate numbers
  const a = getRandomInt(1, 10);
  const b = getRandomInt(1, 10);
  const c = getRandomInt(1, 10);
  const d = getRandomInt(1, 10);
  
  // Create equation: (a + b) * c - d
  const equation = `( ${a} + ${b} ) * ${c} - ${d}`;
  
  // Calculate intermediate results
  const step1Result = a + b;
  const step2Result = step1Result * c;
  const finalResult = step2Result - d;
  
  // Define steps
  const steps: Step[] = [
    {
      id: "step1",
      operation: "Parentheses",
      description: `Calculate ${a} + ${b} inside the parentheses`,
      expression: `( ${a} + ${b} )`,
      rule: "PEMDAS starts with Parentheses: Always solve expressions inside parentheses first."
    },
    {
      id: "step2",
      operation: "Multiplication",
      description: `Multiply ${step1Result} by ${c}`,
      expression: `${step1Result} * ${c}`,
      rule: "After parentheses, we handle multiplication and division from left to right."
    },
    {
      id: "step3",
      operation: "Subtraction",
      description: `Subtract ${d} from ${step2Result}`,
      expression: `${step2Result} - ${d}`,
      rule: "Finally, we handle addition and subtraction from left to right."
    }
  ];
  
  return { equation, steps, result: finalResult };
};

const generateAllOperationsEquation = () => {
  // Generate numbers
  const a = getRandomInt(2, 5);
  const b = getRandomInt(2, 4);
  const c = getRandomInt(1, 10);
  const d = getRandomInt(1, 10);
  
  // Create equation: a ^ b + c * d
  const equation = `${a} ^ ${b} + ${c} * ${d}`;
  
  // Calculate intermediate results
  const step1Result = Math.pow(a, b);
  const step2Result = c * d;
  const finalResult = step1Result + step2Result;
  
  // Define steps
  const steps: Step[] = [
    {
      id: "step1",
      operation: "Exponent",
      description: `Calculate ${a} raised to power ${b}`,
      expression: `${a} ^ ${b}`,
      rule: `After parentheses, we calculate exponents. ${a} raised to power ${b} equals ${step1Result}.`
    },
    {
      id: "step2",
      operation: "Multiplication",
      description: `Multiply ${c} by ${d}`,
      expression: `${c} * ${d}`,
      rule: "Next in PEMDAS is multiplication and division, from left to right."
    },
    {
      id: "step3",
      operation: "Addition",
      description: `Add ${step1Result} and ${step2Result}`,
      expression: `${step1Result} + ${step2Result}`,
      rule: "Finally, we handle addition and subtraction from left to right."
    }
  ];
  
  return { equation, steps, result: finalResult };
};

const generateMultDivEquation = () => {
  // Generate numbers
  const a = getRandomInt(2, 20);
  const b = getRandomInt(2, 5);
  const c = getRandomInt(2, 10);
  
  // Create equation: a / b * c
  const equation = `${a} / ${b} * ${c}`;
  
  // Calculate intermediate results
  const step1Result = a / b;
  const finalResult = step1Result * c;
  
  // Define steps
  const steps: Step[] = [
    {
      id: "step1",
      operation: "Division",
      description: `Divide ${a} by ${b}`,
      expression: `${a} / ${b}`,
      rule: `For multiplication and division, we work from left to right. Since division appears first, we calculate ${a} ÷ ${b} first.`
    },
    {
      id: "step2",
      operation: "Multiplication",
      description: `Multiply ${step1Result} by ${c}`,
      expression: `${step1Result} * ${c}`,
      rule: "After division, we continue with multiplication moving from left to right."
    }
  ];
  
  return { equation, steps, result: finalResult };
};

const generateAddSubEquation = () => {
  // Generate numbers
  const a = getRandomInt(10, 50);
  const b = getRandomInt(5, 20);
  const c = getRandomInt(1, 15);
  
  // Create equation: a - b + c
  const equation = `${a} - ${b} + ${c}`;
  
  // Calculate intermediate results
  const step1Result = a - b;
  const finalResult = step1Result + c;
  
  // Define steps
  const steps: Step[] = [
    {
      id: "step1",
      operation: "Subtraction",
      description: `Subtract ${b} from ${a}`,
      expression: `${a} - ${b}`,
      rule: `For addition and subtraction, we work from left to right. Since subtraction appears first, we calculate ${a} - ${b} first.`
    },
    {
      id: "step2",
      operation: "Addition",
      description: `Add ${c} to ${step1Result}`,
      expression: `${step1Result} + ${c}`,
      rule: "After subtraction, we continue with addition moving from left to right."
    }
  ];
  
  return { equation, steps, result: finalResult };
};
