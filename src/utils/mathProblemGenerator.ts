
interface MathProblem {
  question: string;
  options: number[];
  correctAnswer: number;
  commonMistakeAnswers: number[];
  steps: string[];
}

export const generateProblem = (): MathProblem => {
  const problemType = Math.floor(Math.random() * 18);
  
  let question = '';
  let correctAnswer = 0;
  let commonMistakeAnswers: number[] = [];
  let steps: string[] = [];
  
  switch(problemType) {
    case 0: // Simple addition
      const a1 = Math.floor(Math.random() * 20) + 10;
      const b1 = Math.floor(Math.random() * 20) + 10;
      question = `${a1} + ${b1}`;
      correctAnswer = a1 + b1;
      commonMistakeAnswers = [correctAnswer - 1, correctAnswer + 1, correctAnswer + 10];
      steps = [`Calculate ${a1} + ${b1}`, `${correctAnswer}`];
      break;
      
    case 1: // Simple subtraction
      const a2 = Math.floor(Math.random() * 30) + 30;
      const b2 = Math.floor(Math.random() * 20) + 5;
      question = `${a2} - ${b2}`;
      correctAnswer = a2 - b2;
      commonMistakeAnswers = [correctAnswer + 2, correctAnswer - 2, a2 + b2];
      steps = [`Calculate ${a2} - ${b2}`, `${correctAnswer}`];
      break;
      
    case 2: // Simple multiplication
      const a3 = Math.floor(Math.random() * 10) + 2;
      const b3 = Math.floor(Math.random() * 10) + 2;
      question = `${a3} × ${b3}`;
      correctAnswer = a3 * b3;
      commonMistakeAnswers = [a3 + b3, correctAnswer + 1, correctAnswer - 1];
      steps = [`Calculate ${a3} × ${b3}`, `${correctAnswer}`];
      break;
      
    case 3: // Simple division
      const b4 = Math.floor(Math.random() * 9) + 2;
      const a4 = b4 * (Math.floor(Math.random() * 10) + 1);
      question = `${a4} ÷ ${b4}`;
      correctAnswer = a4 / b4;
      commonMistakeAnswers = [a4 * b4, correctAnswer + 1, correctAnswer - 1];
      steps = [`Calculate ${a4} ÷ ${b4}`, `${correctAnswer}`];
      break;
      
    case 4: // PEMDAS with parentheses and addition/subtraction
      const a5 = Math.floor(Math.random() * 10) + 5;
      const b5 = Math.floor(Math.random() * 10) + 5;
      const c5 = Math.floor(Math.random() * 10) + 5;
      question = `(${a5} + ${b5}) - ${c5}`;
      correctAnswer = (a5 + b5) - c5;
      commonMistakeAnswers = [a5 + (b5 - c5), a5 + b5 + c5, a5 + b5 * c5];
      steps = [
        `Follow PEMDAS: First calculate what's inside the parentheses (${a5} + ${b5})`,
        `(${a5} + ${b5}) = ${a5 + b5}`,
        `Now calculate ${a5 + b5} - ${c5}`,
        `${a5 + b5} - ${c5} = ${correctAnswer}`
      ];
      break;
      
    case 5: // PEMDAS with multiplication and addition
      const a6 = Math.floor(Math.random() * 10) + 2;
      const b6 = Math.floor(Math.random() * 10) + 2;
      const c6 = Math.floor(Math.random() * 10) + 2;
      question = `${a6} + ${b6} × ${c6}`;
      correctAnswer = a6 + (b6 * c6);
      commonMistakeAnswers = [(a6 + b6) * c6, a6 * b6 + c6, a6 * (b6 + c6)];
      steps = [
        `Follow PEMDAS: First handle multiplication (${b6} × ${c6})`,
        `${b6} × ${c6} = ${b6 * c6}`,
        `Now calculate ${a6} + ${b6 * c6}`,
        `${a6} + ${b6 * c6} = ${correctAnswer}`
      ];
      break;
      
    case 6: // PEMDAS with division and subtraction
      const a7 = Math.floor(Math.random() * 40) + 20;
      const b7 = Math.floor(Math.random() * 8) + 2;
      const c7 = Math.floor(Math.random() * 10) + 2;
      question = `${a7} - ${b7} ÷ ${c7}`;
      correctAnswer = a7 - (b7 / c7);
      const divResult = b7 / c7;
      commonMistakeAnswers = [(a7 - b7) / c7, a7 / (b7 - c7), a7 - b7 * c7];
      steps = [
        `Follow PEMDAS: First handle division (${b7} ÷ ${c7})`,
        `${b7} ÷ ${c7} = ${divResult}`,
        `Now calculate ${a7} - ${divResult}`,
        `${a7} - ${divResult} = ${correctAnswer}`
      ];
      break;
      
    case 7: // PEMDAS with parentheses and multiplication
      const a8 = Math.floor(Math.random() * 10) + 2;
      const b8 = Math.floor(Math.random() * 10) + 2;
      const c8 = Math.floor(Math.random() * 5) + 2;
      question = `${a8} × (${b8} + ${c8})`;
      correctAnswer = a8 * (b8 + c8);
      commonMistakeAnswers = [a8 * b8 + c8, (a8 * b8) + (a8 * c8), a8 + b8 * c8];
      steps = [
        `Follow PEMDAS: First calculate what's inside the parentheses (${b8} + ${c8})`,
        `(${b8} + ${c8}) = ${b8 + c8}`,
        `Now calculate ${a8} × ${b8 + c8}`,
        `${a8} × ${b8 + c8} = ${correctAnswer}`
      ];
      break;
      
    case 8: // PEMDAS with multiple operations
      const a9 = Math.floor(Math.random() * 10) + 5;
      const b9 = Math.floor(Math.random() * 5) + 2;
      const c9 = Math.floor(Math.random() * 10) + 2;
      question = `${a9} + ${b9} × ${c9} - ${b9}`;
      correctAnswer = a9 + (b9 * c9) - b9;
      commonMistakeAnswers = [(a9 + b9) * c9 - b9, a9 + b9 * (c9 - b9), a9 + (b9 * c9 - b9)];
      steps = [
        `Follow PEMDAS: First handle multiplication (${b9} × ${c9})`,
        `${b9} × ${c9} = ${b9 * c9}`,
        `Now calculate left to right: ${a9} + ${b9 * c9} - ${b9}`,
        `${a9} + ${b9 * c9} = ${a9 + b9 * c9}`,
        `${a9 + b9 * c9} - ${b9} = ${correctAnswer}`
      ];
      break;
      
    case 9: // PEMDAS with parentheses and multiple operations
      const a10 = Math.floor(Math.random() * 5) + 2;
      const b10 = Math.floor(Math.random() * 10) + 2;
      const c10 = Math.floor(Math.random() * 5) + 2;
      question = `${a10} × (${b10} - ${c10}) + ${a10}`;
      correctAnswer = a10 * (b10 - c10) + a10;
      commonMistakeAnswers = [a10 * b10 - c10 + a10, a10 * (b10 - c10 + a10), a10 * b10 - a10 * c10 + a10];
      steps = [
        `Follow PEMDAS: First calculate what's inside the parentheses (${b10} - ${c10})`,
        `(${b10} - ${c10}) = ${b10 - c10}`,
        `Now calculate ${a10} × ${b10 - c10}`,
        `${a10} × ${b10 - c10} = ${a10 * (b10 - c10)}`,
        `Finally, ${a10 * (b10 - c10)} + ${a10} = ${correctAnswer}`
      ];
      break;
      
    case 10: // PEMDAS with division and parentheses
      const b11 = Math.floor(Math.random() * 5) + 2;
      const c11 = Math.floor(Math.random() * 5) + 2;
      const a11 = (b11 + c11) * (Math.floor(Math.random() * 5) + 2); // To ensure clean division
      question = `${a11} ÷ (${b11} + ${c11})`;
      correctAnswer = a11 / (b11 + c11);
      commonMistakeAnswers = [a11 / b11 + c11, a11 / b11 + a11 / c11, (a11 - b11) / c11];
      steps = [
        `Follow PEMDAS: First calculate what's inside the parentheses (${b11} + ${c11})`,
        `(${b11} + ${c11}) = ${b11 + c11}`,
        `Now calculate ${a11} ÷ ${b11 + c11}`,
        `${a11} ÷ ${b11 + c11} = ${correctAnswer}`
      ];
      break;
      
    case 11: // PEMDAS with mixed operations
      const a12 = Math.floor(Math.random() * 10) + 5;
      const b12 = Math.floor(Math.random() * 5) + 2;
      const c12 = Math.floor(Math.random() * 5) + 2;
      question = `${a12} - ${b12} + ${c12} × ${b12}`;
      correctAnswer = a12 - b12 + (c12 * b12);
      commonMistakeAnswers = [(a12 - b12 + c12) * b12, a12 - (b12 + c12) * b12, (a12 - b12 + c12) * b12];
      steps = [
        `Follow PEMDAS: First handle multiplication (${c12} × ${b12})`,
        `${c12} × ${b12} = ${c12 * b12}`,
        `Now calculate left to right: ${a12} - ${b12} + ${c12 * b12}`,
        `${a12} - ${b12} = ${a12 - b12}`,
        `${a12 - b12} + ${c12 * b12} = ${correctAnswer}`
      ];
      break;
      
    case 12: // More complex parentheses
      const a13 = Math.floor(Math.random() * 5) + 2;
      const b13 = Math.floor(Math.random() * 10) + 5;
      const c13 = Math.floor(Math.random() * 5) + 2;
      question = `(${a13} × ${b13}) ÷ (${a13} + ${c13})`;
      correctAnswer = (a13 * b13) / (a13 + c13);
      commonMistakeAnswers = [a13 * (b13 / (a13 + c13)), a13 * b13 / a13 + c13, a13 * (b13 / a13) + c13];
      steps = [
        `Follow PEMDAS: First calculate both expressions inside parentheses`,
        `(${a13} × ${b13}) = ${a13 * b13}`,
        `(${a13} + ${c13}) = ${a13 + c13}`,
        `Now calculate ${a13 * b13} ÷ ${a13 + c13}`,
        `${a13 * b13} ÷ ${a13 + c13} = ${correctAnswer}`
      ];
      break;
      
    case 13: // Multiple parentheses
      const a14 = Math.floor(Math.random() * 5) + 2;
      const b14 = Math.floor(Math.random() * 5) + 2;
      const c14 = Math.floor(Math.random() * 5) + 1;
      question = `(${a14} + ${b14}) × (${a14} - ${c14})`;
      correctAnswer = (a14 + b14) * (a14 - c14);
      commonMistakeAnswers = [a14 + b14 * a14 - c14, a14 + b14 * (a14 - c14), (a14 + b14 * a14) - c14];
      steps = [
        `Follow PEMDAS: First calculate both expressions inside parentheses`,
        `(${a14} + ${b14}) = ${a14 + b14}`,
        `(${a14} - ${c14}) = ${a14 - c14}`,
        `Now calculate ${a14 + b14} × ${a14 - c14}`,
        `${a14 + b14} × ${a14 - c14} = ${correctAnswer}`
      ];
      break;
      
    case 14: // Division before addition
      const a15 = Math.floor(Math.random() * 5) + 5;
      const b15 = Math.floor(Math.random() * 5) + 5;
      const c15 = Math.floor(Math.random() * 5) + 1;
      question = `${a15} + ${b15} ÷ ${c15}`;
      correctAnswer = a15 + (b15 / c15);
      commonMistakeAnswers = [(a15 + b15) / c15, a15 / (b15 + c15), (a15 * c15 + b15) / c15];
      steps = [
        `Follow PEMDAS: First handle division (${b15} ÷ ${c15})`,
        `${b15} ÷ ${c15} = ${b15 / c15}`,
        `Now calculate ${a15} + ${b15 / c15}`,
        `${a15} + ${b15 / c15} = ${correctAnswer}`
      ];
      break;
      
    case 15: // Double parentheses
      const a16 = Math.floor(Math.random() * 3) + 2;
      const b16 = Math.floor(Math.random() * 3) + 2;
      question = `(${a16} + ${b16}) × (${a16} + ${b16})`;
      correctAnswer = (a16 + b16) * (a16 + b16);
      commonMistakeAnswers = [a16 + b16 + a16 + b16, a16 * a16 + b16 * b16, 2 * (a16 + b16)];
      steps = [
        `Follow PEMDAS: First calculate the expression inside parentheses (${a16} + ${b16})`,
        `(${a16} + ${b16}) = ${a16 + b16}`,
        `Now calculate ${a16 + b16} × ${a16 + b16}`,
        `${a16 + b16} × ${a16 + b16} = ${correctAnswer}`
      ];
      break;
      
    case 16: // Nested parentheses
      const a17 = Math.floor(Math.random() * 3) + 2;
      const b17 = Math.floor(Math.random() * 3) + 2;
      const c17 = Math.floor(Math.random() * 3) + 1;
      question = `${a17} × (${b17} + (${c17} + ${b17}))`;
      correctAnswer = a17 * (b17 + (c17 + b17));
      commonMistakeAnswers = [a17 * b17 + c17 + b17, a17 * (b17 + c17 + b17), a17 + b17 * (c17 + b17)];
      steps = [
        `Follow PEMDAS: First calculate the innermost parentheses (${c17} + ${b17})`,
        `(${c17} + ${b17}) = ${c17 + b17}`,
        `Now calculate the outer parentheses: ${b17} + ${c17 + b17}`,
        `${b17} + ${c17 + b17} = ${b17 + c17 + b17}`,
        `Finally, calculate ${a17} × ${b17 + c17 + b17}`,
        `${a17} × ${b17 + c17 + b17} = ${correctAnswer}`
      ];
      break;
      
    case 17: // Complex operations
      const a18 = Math.floor(Math.random() * 5) + 3;
      const b18 = Math.floor(Math.random() * 5) + 2;
      const c18 = Math.floor(Math.random() * 3) + 1;
      question = `${a18} × ${b18} - ${a18} ÷ ${c18}`;
      correctAnswer = a18 * b18 - (a18 / c18);
      commonMistakeAnswers = [(a18 * b18 - a18) / c18, a18 * (b18 - a18 / c18), a18 * b18 / c18 - a18];
      steps = [
        `Follow PEMDAS: First handle multiplication and division from left to right`,
        `${a18} × ${b18} = ${a18 * b18}`,
        `${a18} ÷ ${c18} = ${a18 / c18}`,
        `Now calculate ${a18 * b18} - ${a18 / c18}`,
        `${a18 * b18} - ${a18 / c18} = ${correctAnswer}`
      ];
      break;
  }
  
  if (correctAnswer % 1 !== 0) {
    return generateProblem();
  }
  
  commonMistakeAnswers = commonMistakeAnswers
    .filter(answer => answer % 1 === 0 && answer !== correctAnswer)
    .filter((value, index, self) => self.indexOf(value) === index);
  
  while (commonMistakeAnswers.length < 3) {
    const offset = Math.floor(Math.random() * 10) + 1;
    const mistakeAnswer = correctAnswer + (Math.random() > 0.5 ? offset : -offset);
    
    if (!commonMistakeAnswers.includes(mistakeAnswer) && 
        mistakeAnswer !== correctAnswer && 
        mistakeAnswer % 1 === 0) {
      commonMistakeAnswers.push(mistakeAnswer);
    }
  }
  
  commonMistakeAnswers = commonMistakeAnswers.slice(0, 3);
  
  let options = [correctAnswer, ...commonMistakeAnswers];
  
  options = options.sort(() => Math.random() - 0.5);
  
  const uniqueOptions = [...new Set(options)];
  if (uniqueOptions.length < 4) {
    return generateProblem();
  }
  
  return { question, options, correctAnswer, commonMistakeAnswers, steps };
};

export type { MathProblem };
