interface MathProblem {
  question: string;
  options: number[];
  correctAnswer: number;
  commonMistakeAnswers: number[];
  steps: string[];
  problemType: number;
}

// Track recently used problem types to avoid repetition
let recentlyUsedProblemTypes: number[] = [];

const generateProblem = (): MathProblem => {
  // Get a problem type that hasn't been used recently
  let problemType: number;
  do {
    problemType = Math.floor(Math.random() * 18);
  } while (recentlyUsedProblemTypes.includes(problemType));
  
  // Update recently used types (keep only the last 3)
  recentlyUsedProblemTypes.push(problemType);
  if (recentlyUsedProblemTypes.length > 3) {
    recentlyUsedProblemTypes.shift();
  }
  
  let question = '';
  let correctAnswer = 0;
  let commonMistakeAnswers: number[] = [];
  let steps: string[] = [];
  
  switch(problemType) {
    case 0: // Complex addition and multiplication
      const a1 = Math.floor(Math.random() * 10) + 5;
      const b1 = Math.floor(Math.random() * 10) + 5;
      const c1 = Math.floor(Math.random() * 10) + 5;
      const d1 = Math.floor(Math.random() * 10) + 5;
      question = `(${a1} + ${b1}) × (${c1} + ${d1})`;
      correctAnswer = (a1 + b1) * (c1 + d1);
      commonMistakeAnswers = [
        a1 + b1 + c1 + d1, 
        a1 * b1 * c1 * d1, 
        (a1 + b1 + c1) * d1
      ];
      steps = [
        `Step 1: Calculate the first parenthesis (${a1} + ${b1})`,
        `Step 2: (${a1} + ${b1}) = ${a1 + b1}`,
        `Step 3: Calculate the second parenthesis (${c1} + ${d1})`,
        `Step 4: (${c1} + ${d1}) = ${c1 + d1}`,
        `Step 5: Multiply the results: ${a1 + b1} × ${c1 + d1}`,
        `Step 6: ${a1 + b1} × ${c1 + d1} = ${correctAnswer}`
      ];
      break;
      
    case 1: // Complex subtraction and division
      const b2 = Math.floor(Math.random() * 5) + 3;
      const c2 = Math.floor(Math.random() * 5) + 2;
      const a2 = (b2 * c2) * (Math.floor(Math.random() * 5) + 3); // Ensure clean division
      const d2 = Math.floor(Math.random() * 10) + 5;
      question = `(${a2} ÷ ${b2}) - (${c2} × ${d2})`;
      correctAnswer = (a2 / b2) - (c2 * d2);
      commonMistakeAnswers = [
        a2 / (b2 - c2 * d2), 
        (a2 / b2) * (c2 * d2), 
        a2 / b2 - c2 - d2
      ];
      steps = [
        `Step 1: Calculate the first parenthesis (${a2} ÷ ${b2})`,
        `Step 2: (${a2} ÷ ${b2}) = ${a2 / b2}`,
        `Step 3: Calculate the second parenthesis (${c2} × ${d2})`,
        `Step 4: (${c2} × ${d2}) = ${c2 * d2}`,
        `Step 5: Subtract the results: ${a2 / b2} - ${c2 * d2}`,
        `Step 6: ${a2 / b2} - ${c2 * d2} = ${correctAnswer}`
      ];
      break;
      
    case 2: // Complex PEMDAS with nested operations
      const a3 = Math.floor(Math.random() * 10) + 5;
      const b3 = Math.floor(Math.random() * 10) + 5;
      const c3 = Math.floor(Math.random() * 5) + 2;
      const d3 = Math.floor(Math.random() * 5) + 2;
      question = `${a3} + ${b3} × (${c3} + ${d3}) - ${c3}`;
      correctAnswer = a3 + (b3 * (c3 + d3)) - c3;
      commonMistakeAnswers = [
        (a3 + b3) * (c3 + d3) - c3, 
        a3 + b3 * c3 + d3 - c3, 
        a3 + (b3 * c3) + (b3 * d3) - c3
      ];
      steps = [
        `Step 1: Follow PEMDAS - first calculate what's inside the parentheses (${c3} + ${d3})`,
        `Step 2: (${c3} + ${d3}) = ${c3 + d3}`,
        `Step 3: Handle multiplication: ${b3} × ${c3 + d3}`,
        `Step 4: ${b3} × ${c3 + d3} = ${b3 * (c3 + d3)}`,
        `Step 5: Calculate left to right: ${a3} + ${b3 * (c3 + d3)} - ${c3}`,
        `Step 6: ${a3} + ${b3 * (c3 + d3)} = ${a3 + b3 * (c3 + d3)}`,
        `Step 7: ${a3 + b3 * (c3 + d3)} - ${c3} = ${correctAnswer}`
      ];
      break;
      
    case 3: // Complex mixed operations
      const a4 = Math.floor(Math.random() * 10) + 5;
      const b4 = Math.floor(Math.random() * 10) + 5; 
      const c4 = Math.floor(Math.random() * 5) + 2;
      const d4 = Math.floor(Math.random() * 5) + 3;
      question = `${a4} × ${b4} - ${a4} × (${c4} - ${d4})`;
      correctAnswer = a4 * b4 - a4 * (c4 - d4);
      commonMistakeAnswers = [
        a4 * (b4 - c4 + d4), 
        a4 * b4 - a4 * c4 + a4 * d4, 
        a4 * (b4 - c4) + a4 * d4
      ];
      steps = [
        `Step 1: Follow PEMDAS - first calculate what's inside the parentheses (${c4} - ${d4})`,
        `Step 2: (${c4} - ${d4}) = ${c4 - d4}`,
        `Step 3: Calculate the first multiplication: ${a4} × ${b4}`,
        `Step 4: ${a4} × ${b4} = ${a4 * b4}`,
        `Step 5: Calculate the second multiplication: ${a4} × ${c4 - d4}`,
        `Step 6: ${a4} × ${c4 - d4} = ${a4 * (c4 - d4)}`,
        `Step 7: Subtract the results: ${a4 * b4} - ${a4 * (c4 - d4)}`,
        `Step 8: ${a4 * b4} - ${a4 * (c4 - d4)} = ${correctAnswer}`
      ];
      break;
      
    case 4: // Complex factoring
      const a5 = Math.floor(Math.random() * 5) + 2;
      const b5 = Math.floor(Math.random() * 5) + 3;
      const c5 = Math.floor(Math.random() * 5) + 2;
      question = `${a5} × (${b5} + ${c5}) - ${a5} × ${b5}`;
      correctAnswer = a5 * (b5 + c5) - a5 * b5;
      commonMistakeAnswers = [
        a5 * b5 + a5 * c5 - a5 * b5, 
        a5 * (b5 + c5 - b5), 
        a5 * b5 + c5 - a5 * b5
      ];
      steps = [
        `Step 1: Calculate what's inside the parentheses (${b5} + ${c5})`,
        `Step 2: (${b5} + ${c5}) = ${b5 + c5}`,
        `Step 3: Calculate the first multiplication: ${a5} × ${b5 + c5}`,
        `Step 4: ${a5} × ${b5 + c5} = ${a5 * (b5 + c5)}`,
        `Step 5: Calculate the second multiplication: ${a5} × ${b5}`,
        `Step 6: ${a5} × ${b5} = ${a5 * b5}`,
        `Step 7: Subtract the results: ${a5 * (b5 + c5)} - ${a5 * b5}`,
        `Step 8: ${a5 * (b5 + c5)} - ${a5 * b5} = ${correctAnswer}`
      ];
      break;
      
    case 5: // Distributing and combining like terms
      const a6 = Math.floor(Math.random() * 5) + 3;
      const b6 = Math.floor(Math.random() * 5) + 2;
      const c6 = Math.floor(Math.random() * 5) + 2;
      question = `${a6} × (${b6} + ${c6}) - ${a6} × ${b6} + ${a6}`;
      correctAnswer = a6 * (b6 + c6) - a6 * b6 + a6;
      commonMistakeAnswers = [
        a6 * b6 + a6 * c6 - a6 * b6 + a6, 
        a6 * (b6 + c6 - b6) + a6, 
        a6 * (b6 + c6 - b6 + 1)
      ];
      steps = [
        `Step 1: Calculate what's inside the parentheses (${b6} + ${c6})`,
        `Step 2: (${b6} + ${c6}) = ${b6 + c6}`,
        `Step 3: Calculate the first multiplication: ${a6} × ${b6 + c6}`,
        `Step 4: ${a6} × ${b6 + c6} = ${a6 * (b6 + c6)}`,
        `Step 5: Calculate the second multiplication: ${a6} × ${b6}`,
        `Step 6: ${a6} × ${b6} = ${a6 * b6}`,
        `Step 7: Work through the operations left to right: ${a6 * (b6 + c6)} - ${a6 * b6} + ${a6}`,
        `Step 8: ${a6 * (b6 + c6)} - ${a6 * b6} = ${a6 * (b6 + c6) - a6 * b6}`,
        `Step 9: ${a6 * (b6 + c6) - a6 * b6} + ${a6} = ${correctAnswer}`
      ];
      break;
      
    case 6: // Multi-step division and multiplication
      const a7 = Math.floor(Math.random() * 10) + 10;
      const b7 = Math.floor(Math.random() * 5) + 2;
      const c7 = Math.floor(Math.random() * 5) + 2;
      const d7 = a7 * b7 * c7; // To ensure clean division
      question = `${d7} ÷ (${a7} × ${b7}) + ${c7} × ${a7}`;
      correctAnswer = d7 / (a7 * b7) + c7 * a7;
      commonMistakeAnswers = [
        d7 / a7 * b7 + c7 * a7, 
        (d7 / a7) * (b7 + c7) * a7, 
        d7 / (a7 * b7 + c7 * a7)
      ];
      steps = [
        `Step 1: Calculate the multiplication in the parentheses (${a7} × ${b7})`,
        `Step 2: (${a7} × ${b7}) = ${a7 * b7}`,
        `Step 3: Calculate the division: ${d7} ÷ ${a7 * b7}`,
        `Step 4: ${d7} ÷ ${a7 * b7} = ${d7 / (a7 * b7)}`,
        `Step 5: Calculate the multiplication: ${c7} × ${a7}`,
        `Step 6: ${c7} × ${a7} = ${c7 * a7}`,
        `Step 7: Add the results: ${d7 / (a7 * b7)} + ${c7 * a7}`,
        `Step 8: ${d7 / (a7 * b7)} + ${c7 * a7} = ${correctAnswer}`
      ];
      break;
      
    case 7: // Multi-level parentheses
      const a8 = Math.floor(Math.random() * 5) + 2;
      const b8 = Math.floor(Math.random() * 5) + 2;
      const c8 = Math.floor(Math.random() * 5) + 2;
      const d8 = Math.floor(Math.random() * 5) + 3;
      question = `(${a8} + ${b8}) × ((${c8} × ${d8}) - ${c8})`;
      correctAnswer = (a8 + b8) * ((c8 * d8) - c8);
      commonMistakeAnswers = [
        a8 + b8 * (c8 * d8 - c8), 
        (a8 + b8) * (c8 * d8) - c8, 
        (a8 + b8) * (c8 * (d8 - 1))
      ];
      steps = [
        `Step 1: Calculate the first parenthesis (${a8} + ${b8})`,
        `Step 2: (${a8} + ${b8}) = ${a8 + b8}`,
        `Step 3: Calculate the innermost parenthesis (${c8} × ${d8})`,
        `Step 4: (${c8} × ${d8}) = ${c8 * d8}`,
        `Step 5: Calculate the second main parenthesis ((${c8} × ${d8}) - ${c8})`,
        `Step 6: (${c8 * d8} - ${c8}) = ${(c8 * d8) - c8}`,
        `Step 7: Multiply the results: ${a8 + b8} × ${(c8 * d8) - c8}`,
        `Step 8: ${a8 + b8} × ${(c8 * d8) - c8} = ${correctAnswer}`
      ];
      break;
      
    case 8: // Mixed operations with parentheses
      const a9 = Math.floor(Math.random() * 5) + 3;
      const b9 = Math.floor(Math.random() * 5) + 2;
      const c9 = Math.floor(Math.random() * 5) + 2;
      const d9 = Math.floor(Math.random() * 5) + 3;
      question = `(${a9} - ${b9}) × ${c9} + (${b9} + ${d9})`;
      correctAnswer = (a9 - b9) * c9 + (b9 + d9);
      commonMistakeAnswers = [
        a9 - b9 * c9 + b9 + d9, 
        (a9 - b9) * (c9 + b9 + d9), 
        (a9 - b9) * c9 + b9 + d9
      ];
      steps = [
        `Step 1: Calculate the first parenthesis (${a9} - ${b9})`,
        `Step 2: (${a9} - ${b9}) = ${a9 - b9}`,
        `Step 3: Calculate the second parenthesis (${b9} + ${d9})`,
        `Step 4: (${b9} + ${d9}) = ${b9 + d9}`,
        `Step 5: Multiply (${a9} - ${b9}) by ${c9}`,
        `Step 6: ${a9 - b9} × ${c9} = ${(a9 - b9) * c9}`,
        `Step 7: Add the results: ${(a9 - b9) * c9} + ${b9 + d9}`,
        `Step 8: ${(a9 - b9) * c9} + ${b9 + d9} = ${correctAnswer}`
      ];
      break;
      
    case 9: // Complex division with addition
      const b10 = Math.floor(Math.random() * 5) + 2;
      const c10 = Math.floor(Math.random() * 5) + 2;
      const a10 = b10 * c10 * (Math.floor(Math.random() * 5) + 2); // For clean division
      const d10 = Math.floor(Math.random() * 10) + 5;
      question = `${a10} ÷ (${b10} × ${c10}) + ${d10}`;
      correctAnswer = a10 / (b10 * c10) + d10;
      commonMistakeAnswers = [
        a10 / b10 * c10 + d10, 
        a10 / (b10 * c10 * d10), 
        (a10 / b10 * c10) + d10
      ];
      steps = [
        `Step 1: Calculate what's inside the parentheses (${b10} × ${c10})`,
        `Step 2: (${b10} × ${c10}) = ${b10 * c10}`,
        `Step 3: Perform the division: ${a10} ÷ ${b10 * c10}`,
        `Step 4: ${a10} ÷ ${b10 * c10} = ${a10 / (b10 * c10)}`,
        `Step 5: Add the result to ${d10}`,
        `Step 6: ${a10 / (b10 * c10)} + ${d10} = ${correctAnswer}`
      ];
      break;
      
    case 10: // Pattern recognition
      const a11 = Math.floor(Math.random() * 5) + 3;
      const b11 = Math.floor(Math.random() * 5) + 2;
      const c11 = Math.floor(Math.random() * 5) + 2;
      question = `${a11} × ${b11} + ${a11} × ${c11}`;
      correctAnswer = a11 * b11 + a11 * c11;
      commonMistakeAnswers = [
        a11 * (b11 + c11), // This is actually correct by distributive property
        (a11 * b11) * c11, 
        a11 * b11 * c11
      ];
      steps = [
        `Step 1: Calculate the first multiplication: ${a11} × ${b11}`,
        `Step 2: ${a11} × ${b11} = ${a11 * b11}`,
        `Step 3: Calculate the second multiplication: ${a11} × ${c11}`,
        `Step 4: ${a11} × ${c11} = ${a11 * c11}`,
        `Step 5: Add the results: ${a11 * b11} + ${a11 * c11}`,
        `Step 6: ${a11 * b11} + ${a11 * c11} = ${correctAnswer}`,
        `Step 7: Note: This could also be solved using the distributive property: ${a11} × (${b11} + ${c11}) = ${a11} × ${b11 + c11} = ${a11 * (b11 + c11)}`
      ];
      break;
      
    case 11: // Nested operations with multiple operations
      const a12 = Math.floor(Math.random() * 5) + 3;
      const b12 = Math.floor(Math.random() * 5) + 2;
      const c12 = Math.floor(Math.random() * 5) + 2;
      const d12 = Math.floor(Math.random() * 5) + 3;
      question = `${a12} × (${b12} + ${c12} × ${d12})`;
      correctAnswer = a12 * (b12 + c12 * d12);
      commonMistakeAnswers = [
        a12 * b12 + c12 * d12, 
        a12 * b12 + a12 * c12 * d12, 
        (a12 * b12) + (c12 * d12)
      ];
      steps = [
        `Step 1: Follow PEMDAS - first handle the multiplication inside parentheses (${c12} × ${d12})`,
        `Step 2: (${c12} × ${d12}) = ${c12 * d12}`,
        `Step 3: Calculate the full expression inside parentheses: ${b12} + ${c12 * d12}`,
        `Step 4: ${b12} + ${c12 * d12} = ${b12 + c12 * d12}`,
        `Step 5: Multiply by ${a12}: ${a12} × ${b12 + c12 * d12}`,
        `Step 6: ${a12} × ${b12 + c12 * d12} = ${correctAnswer}`
      ];
      break;
      
    case 12: // Complex subtraction with multiplication
      const a13 = Math.floor(Math.random() * 10) + 15;
      const b13 = Math.floor(Math.random() * 5) + 2;
      const c13 = Math.floor(Math.random() * 5) + 2;
      question = `${a13} - ${b13} × ${c13} + ${b13}`;
      correctAnswer = a13 - (b13 * c13) + b13;
      commonMistakeAnswers = [
        (a13 - b13) * c13 + b13, 
        a13 - (b13 * c13 + b13), 
        a13 - b13 * (c13 + 1)
      ];
      steps = [
        `Step 1: Follow PEMDAS - first handle the multiplication (${b13} × ${c13})`,
        `Step 2: ${b13} × ${c13} = ${b13 * c13}`,
        `Step 3: Calculate from left to right: ${a13} - ${b13 * c13} + ${b13}`,
        `Step 4: ${a13} - ${b13 * c13} = ${a13 - (b13 * c13)}`,
        `Step 5: ${a13 - (b13 * c13)} + ${b13} = ${correctAnswer}`
      ];
      break;
      
    case 13: // Complex parentheses with factoring
      const a14 = Math.floor(Math.random() * 5) + 3;
      const b14 = Math.floor(Math.random() * 5) + 2;
      const c14 = Math.floor(Math.random() * 5) + 2;
      question = `${a14} × (${b14} + ${c14}) - ${a14} × ${b14} - ${a14}`;
      correctAnswer = a14 * (b14 + c14) - a14 * b14 - a14;
      commonMistakeAnswers = [
        a14 * (b14 + c14 - b14 - 1), 
        a14 * (b14 + c14) - (a14 * b14 - a14), 
        a14 * (b14 + c14 - b14) - a14
      ];
      steps = [
        `Step 1: Calculate what's inside the parentheses (${b14} + ${c14})`,
        `Step 2: (${b14} + ${c14}) = ${b14 + c14}`,
        `Step 3: Calculate the first multiplication: ${a14} × ${b14 + c14}`,
        `Step 4: ${a14} × ${b14 + c14} = ${a14 * (b14 + c14)}`,
        `Step 5: Calculate the second multiplication: ${a14} × ${b14}`,
        `Step 6: ${a14} × ${b14} = ${a14 * b14}`,
        `Step 7: Calculate from left to right: ${a14 * (b14 + c14)} - ${a14 * b14} - ${a14}`,
        `Step 8: ${a14 * (b14 + c14)} - ${a14 * b14} = ${a14 * (b14 + c14) - a14 * b14}`,
        `Step 9: ${a14 * (b14 + c14) - a14 * b14} - ${a14} = ${correctAnswer}`
      ];
      break;
      
    case 14: // Complex division with subtraction
      const b15 = Math.floor(Math.random() * 5) + 3;
      const c15 = Math.floor(Math.random() * 5) + 2; 
      const a15 = b15 * c15 * (Math.floor(Math.random() * 5) + 2); // Ensure clean division
      const d15 = Math.floor(Math.random() * 5) + 1;
      question = `${a15} ÷ (${b15} × ${c15}) - ${d15}`;
      correctAnswer = a15 / (b15 * c15) - d15;
      commonMistakeAnswers = [
        a15 / (b15 * c15 - d15), 
        (a15 / b15 * c15) - d15, 
        a15 / b15 * c15 - d15
      ];
      steps = [
        `Step 1: Calculate what's inside the parentheses (${b15} × ${c15})`,
        `Step 2: (${b15} × ${c15}) = ${b15 * c15}`,
        `Step 3: Calculate the division: ${a15} ÷ ${b15 * c15}`,
        `Step 4: ${a15} ÷ ${b15 * c15} = ${a15 / (b15 * c15)}`,
        `Step 5: Subtract ${d15}: ${a15 / (b15 * c15)} - ${d15}`,
        `Step 6: ${a15 / (b15 * c15)} - ${d15} = ${correctAnswer}`
      ];
      break;
      
    case 15: // Mixed operations and grouping
      const a16 = Math.floor(Math.random() * 5) + 3;
      const b16 = Math.floor(Math.random() * 5) + 2;
      const c16 = Math.floor(Math.random() * 5) + 2;
      const d16 = Math.floor(Math.random() * 5) + 2;
      question = `${a16} × ${b16} - (${c16} - ${d16}) × ${b16}`;
      correctAnswer = a16 * b16 - (c16 - d16) * b16;
      commonMistakeAnswers = [
        (a16 * b16 - c16 + d16) * b16,
        a16 * b16 - c16 + d16 * b16,
        (a16 - c16 + d16) * b16
      ];
      steps = [
        `Step 1: Calculate what's inside the parentheses (${c16} - ${d16})`,
        `Step 2: (${c16} - ${d16}) = ${c16 - d16}`,
        `Step 3: Calculate the first multiplication: ${a16} × ${b16}`,
        `Step 4: ${a16} × ${b16} = ${a16 * b16}`,
        `Step 5: Calculate the second multiplication: (${c16} - ${d16}) × ${b16}`,
        `Step 6: ${c16 - d16} × ${b16} = ${(c16 - d16) * b16}`,
        `Step 7: Subtract the results: ${a16 * b16} - ${(c16 - d16) * b16}`,
        `Step 8: ${a16 * b16} - ${(c16 - d16) * b16} = ${correctAnswer}`
      ];
      break;
      
    case 16: // Complex factoring and distributive property
      const a17 = Math.floor(Math.random() * 5) + 2;
      const b17 = Math.floor(Math.random() * 5) + 3;
      const c17 = Math.floor(Math.random() * 5) + 2;
      const d17 = Math.floor(Math.random() * 5) + 1;
      question = `${a17} × (${b17} + ${c17}) + ${a17} × ${d17}`;
      correctAnswer = a17 * (b17 + c17) + a17 * d17;
      commonMistakeAnswers = [
        a17 * (b17 + c17 + d17),
        a17 * b17 + c17 + a17 * d17,
        a17 * (b17 + c17 * d17)
      ];
      steps = [
        `Step 1: Calculate what's inside the parentheses (${b17} + ${c17})`,
        `Step 2: (${b17} + ${c17}) = ${b17 + c17}`,
        `Step 3: Calculate the first multiplication: ${a17} × ${b17 + c17}`,
        `Step 4: ${a17} × ${b17 + c17} = ${a17 * (b17 + c17)}`,
        `Step 5: Calculate the second multiplication: ${a17} × ${d17}`,
        `Step 6: ${a17} × ${d17} = ${a17 * d17}`,
        `Step 7: Add the results: ${a17 * (b17 + c17)} + ${a17 * d17}`,
        `Step 8: ${a17 * (b17 + c17)} + ${a17 * d17} = ${correctAnswer}`,
        `Step 9: Note: This could also be solved using the distributive property: ${a17} × (${b17} + ${c17} + ${d17}) = ${a17 * (b17 + c17 + d17)}`
      ];
      break;
      
    case 17: // Complex nested operations
      const a18 = Math.floor(Math.random() * 5) + 3;
      const b18 = Math.floor(Math.random() * 5) + 2;
      const c18 = Math.floor(Math.random() * 5) + 2;
      const d18 = Math.floor(Math.random() * 5) + 1;
      question = `(${a18} × ${b18} - ${c18}) ÷ (${b18} - ${d18})`;
      // Ensure we don't divide by zero
      if (b18 - d18 === 0) {
        return generateProblem();
      }
      correctAnswer = (a18 * b18 - c18) / (b18 - d18);
      commonMistakeAnswers = [
        a18 * b18 - c18 / (b18 - d18),
        a18 * (b18 - c18) / (b18 - d18),
        (a18 * b18) / (b18 - d18) - c18
      ];
      steps = [
        `Step 1: Calculate the first parenthesis (${a18} × ${b18} - ${c18})`,
        `Step 2: ${a18} × ${b18} = ${a18 * b18}`,
        `Step 3: ${a18 * b18} - ${c18} = ${a18 * b18 - c18}`,
        `Step 4: Calculate the second parenthesis (${b18} - ${d18})`,
        `Step 5: ${b18} - ${d18} = ${b18 - d18}`,
        `Step 6: Perform the division: ${a18 * b18 - c18} ÷ ${b18 - d18}`,
        `Step 7: ${a18 * b18 - c18} ÷ ${b18 - d18} = ${correctAnswer}`
      ];
      break;
  }
  
  // Check if we have a non-integer result, and regenerate if we do
  if (correctAnswer % 1 !== 0) {
    return generateProblem();
  }
  
  // Filter out non-integer and duplicate answers
  commonMistakeAnswers = commonMistakeAnswers
    .filter(answer => answer % 1 === 0 && answer !== correctAnswer)
    .filter((value, index, self) => self.indexOf(value) === index);
  
  // Generate additional wrong answers if needed
  while (commonMistakeAnswers.length < 3) {
    const offset = Math.floor(Math.random() * 10) + 1;
    const mistakeAnswer = correctAnswer + (Math.random() > 0.5 ? offset : -offset);
    
    if (!commonMistakeAnswers.includes(mistakeAnswer) && 
        mistakeAnswer !== correctAnswer && 
        mistakeAnswer % 1 === 0) {
      commonMistakeAnswers.push(mistakeAnswer);
    }
  }
  
  // Limit to 3 wrong answers
  commonMistakeAnswers = commonMistakeAnswers.slice(0, 3);
  
  // Combine correct and wrong answers and shuffle
  let options = [correctAnswer, ...commonMistakeAnswers];
  options = options.sort(() => Math.random() - 0.5);
  
  // Ensure all options are unique
  const uniqueOptions = [...new Set(options)];
  if (uniqueOptions.length < 4) {
    return generateProblem();
  }
  
  return { question, options, correctAnswer, commonMistakeAnswers, steps, problemType };
};

export { generateProblem };
export type { MathProblem };
