
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles, Star, Plus, Minus, Equal, X, Parentheses, Divide } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface GameScreenProps {
  onComplete: (mistakes: number) => void;
}

interface MathProblem {
  question: string;
  options: number[];
  correctAnswer: number;
  commonMistakeAnswers: number[];
  steps: string[];
}

// Generate a random PEMDAS problem with at least 4 steps
// and ensures whole number answers
const generateProblem = (): MathProblem => {
  // Problem types (expanded to 18 different formats):
  const problemType = Math.floor(Math.random() * 18);
  
  let question = '';
  let correctAnswer = 0;
  let commonMistakeAnswers: number[] = [];
  let steps: string[] = [];
  
  switch(problemType) {
    case 0: // Nested parentheses with operations
      const p1 = Math.floor(Math.random() * 10) + 2;
      const p2 = Math.floor(Math.random() * 10) + 2;
      const p3 = Math.floor(Math.random() * 10) + 2;
      const p4 = Math.floor(Math.random() * p3) + 1; // Ensure p4 < p3 for whole number result
      
      question = `(${p1} + ${p2}) × (${p3} - ${p4})`;
      correctAnswer = (p1 + p2) * (p3 - p4);
      
      // Solution steps
      steps = [
        `Step 1: Evaluate the first parenthesis (${p1} + ${p2}) = ${p1 + p2}`,
        `Step 2: Evaluate the second parenthesis (${p3} - ${p4}) = ${p3 - p4}`,
        `Step 3: Multiply the results ${p1 + p2} × ${p3 - p4} = ${correctAnswer}`
      ];
      
      // Common mistakes: not using parentheses properly
      commonMistakeAnswers = [
        p1 + (p2 * p3) - p4, // didn't respect first parenthesis
        p1 + p2 * p3 - p4,   // ignored both parentheses
        (p1 + p2 * p3) - p4, // only respected first parenthesis
      ];
      break;
      
    case 1: // Exponents with parentheses
      const base1 = Math.floor(Math.random() * 4) + 2; // 2-5
      const exp1 = 2; // Using 2 for squares to keep answers reasonable
      const n1 = Math.floor(Math.random() * 6) + 2;
      const n2 = Math.floor(Math.random() * 6) + 2;
      
      question = `${base1}^${exp1} + (${n1} × ${n2})`;
      correctAnswer = Math.pow(base1, exp1) + (n1 * n2);
      
      // Solution steps
      steps = [
        `Step 1: Calculate the exponent ${base1}^${exp1} = ${Math.pow(base1, exp1)}`,
        `Step 2: Evaluate the parenthesis (${n1} × ${n2}) = ${n1 * n2}`,
        `Step 3: Add the results ${Math.pow(base1, exp1)} + ${n1 * n2} = ${correctAnswer}`
      ];
      
      // Common mistakes: exponent rules
      commonMistakeAnswers = [
        Math.pow(base1, exp1 + (n1 * n2)), // added exponent to the product instead
        Math.pow(base1, exp1) * (n1 + n2), // multiplication distributed incorrectly
        Math.pow(base1, exp1 + n1 * n2),   // incorrect order of operations with exponent
      ];
      break;
      
    case 2: // Complex multiplication/division and addition/subtraction
      const m1 = Math.floor(Math.random() * 8) + 3;
      const m2 = Math.floor(Math.random() * 8) + 3;
      const m3 = Math.floor(Math.random() * 8) + 3;
      const m4 = Math.floor(Math.random() * 8) + 3;
      
      question = `${m1} + ${m2} × ${m3} - ${m4}`;
      correctAnswer = m1 + (m2 * m3) - m4;
      
      // Solution steps
      steps = [
        `Step 1: Perform multiplication first ${m2} × ${m3} = ${m2 * m3}`,
        `Step 2: Perform addition and subtraction left to right: ${m1} + ${m2 * m3} - ${m4}`,
        `Step 3: ${m1} + ${m2 * m3} = ${m1 + (m2 * m3)}`,
        `Step 4: ${m1 + (m2 * m3)} - ${m4} = ${correctAnswer}`
      ];
      
      // Common mistakes: incorrect order of operations
      commonMistakeAnswers = [
        (m1 + m2) * m3 - m4, // addition before multiplication
        m1 + m2 * (m3 - m4), // subtraction before multiplication
        (m1 + m2) * (m3 - m4), // parentheses where there are none
      ];
      break;
      
    case 3: // Multi-step mixed operations with exponents
      const a = Math.floor(Math.random() * 3) + 2; // 2-4 to keep answers small
      const b = Math.floor(Math.random() * 4) + 2;
      const c = Math.floor(Math.random() * 3) + 2;
      
      question = `${a}^2 × ${b} + ${c} × ${a}`;
      correctAnswer = Math.pow(a, 2) * b + c * a;
      
      // Solution steps
      steps = [
        `Step 1: Calculate the exponent ${a}^2 = ${Math.pow(a, 2)}`,
        `Step 2: Perform both multiplications: ${Math.pow(a, 2)} × ${b} = ${Math.pow(a, 2) * b}, and ${c} × ${a} = ${c * a}`,
        `Step 3: Add the results: ${Math.pow(a, 2) * b} + ${c * a} = ${correctAnswer}`
      ];
      
      // Common mistakes: exponent and multiplication order
      commonMistakeAnswers = [
        Math.pow(a * b, 2) + c * a, // squared the product instead of just a
        Math.pow(a, 2) + b * c * a, // incorrect grouping
        Math.pow(a, 2 * b) + c * a, // put the multiplier inside the exponent
      ];
      break;
      
    case 4: // Parentheses with exponents
      const pe1 = Math.floor(Math.random() * 4) + 2; // 2-5
      const pe2 = Math.floor(Math.random() * 4) + 2; // 2-5
      
      question = `(${pe1} + ${pe2})^2 - ${pe1}`;
      correctAnswer = Math.pow((pe1 + pe2), 2) - pe1;
      
      // Common mistakes: distributing exponents incorrectly
      commonMistakeAnswers = [
        Math.pow(pe1, 2) + Math.pow(pe2, 2) - pe1, // didn't square the sum correctly
        (pe1 + pe2) * (pe1 + pe2) - pe1, // expanded incorrectly
        Math.pow(pe1 + pe2, 2) * pe1, // multiplied instead of subtracted
      ];
      break;
      
    case 5: // Division with addition/multiplication
      const d1 = Math.floor(Math.random() * 6) + 5; // Larger number
      const d2 = Math.floor(Math.random() * 3) + 2; // 2-4
      const d3 = Math.floor(Math.random() * 3) + 2; // 2-4
      
      // Ensure d1 is divisible by d2 for whole number result
      const adjustedD1 = d1 * d2;
      
      question = `${adjustedD1} ÷ ${d2} + ${d3} × ${d2}`;
      correctAnswer = (adjustedD1 / d2) + (d3 * d2);
      
      // Common mistakes: division and multiplication order
      commonMistakeAnswers = [
        adjustedD1 / (d2 + d3 * d2), // division applied last
        (adjustedD1 / d2 + d3) * d2, // incorrect grouping
        adjustedD1 / (d2 + d3) * d2, // incorrect parentheses
      ];
      break;
      
    case 6: // Operations with negative numbers
      const neg1 = Math.floor(Math.random() * 8) + 3;
      const neg2 = Math.floor(Math.random() * 8) + 3;
      
      question = `-${neg1} + ${neg2} × 2`;
      correctAnswer = -neg1 + (neg2 * 2);
      
      // Common mistakes: handling negative numbers
      commonMistakeAnswers = [
        (-neg1 + neg2) * 2, // incorrect grouping with negative
        -(neg1 + neg2 * 2), // negative applied to entire expression
        -neg1 * neg2 * 2, // treating addition as multiplication
      ];
      break;
      
    case 7: // Complex multi-operation problems
      const co1 = Math.floor(Math.random() * 5) + 2;
      const co2 = Math.floor(Math.random() * 4) + 2;
      const co3 = Math.floor(Math.random() * 3) + 2;
      
      question = `${co1} × (${co2} + ${co3}) - ${co2}^2`;
      correctAnswer = co1 * (co2 + co3) - Math.pow(co2, 2);
      
      // Common mistakes: complex operations
      commonMistakeAnswers = [
        co1 * co2 + co3 - Math.pow(co2, 2), // ignored parentheses
        co1 * (co2 + co3 - Math.pow(co2, 2)), // incorrect grouping with the exponent
        co1 * (co2 + co3) - co2 * co2, // calculated exponent incorrectly
      ];
      break;
      
    case 8: // Multiple parentheses with operations
      const mp1 = Math.floor(Math.random() * 5) + 2;
      const mp2 = Math.floor(Math.random() * 5) + 2;
      const mp3 = Math.floor(Math.random() * 5) + 2;
      
      question = `${mp1} × (${mp2} + ${mp3}) - (${mp1} - ${mp3})`;
      correctAnswer = mp1 * (mp2 + mp3) - (mp1 - mp3);
      
      commonMistakeAnswers = [
        mp1 * mp2 + mp3 - (mp1 - mp3), // ignored first parenthesis
        mp1 * (mp2 + mp3) - mp1 + mp3, // ignored second parenthesis
        mp1 * (mp2 + mp3 - mp1 + mp3), // combined all terms in parentheses
      ];
      break;
      
    case 9: // Exponents with multiple operations
      const em1 = Math.floor(Math.random() * 3) + 2; // 2-4
      const em2 = Math.floor(Math.random() * 4) + 2;
      const em3 = Math.floor(Math.random() * 3) + 2;
      
      question = `${em1}^2 - ${em2} + ${em3} × ${em1}`;
      correctAnswer = Math.pow(em1, 2) - em2 + em3 * em1;
      
      commonMistakeAnswers = [
        Math.pow(em1, 2) - (em2 + em3 * em1), // incorrect grouping
        Math.pow(em1, 2 - em2) + em3 * em1, // incorrect exponent application
        Math.pow(em1, 2) - em2 + em3 + em1, // multiplication changed to addition
      ];
      break;
      
    case 10: // Nested operations with different operators
      const no1 = Math.floor(Math.random() * 5) + 3;
      const no2 = Math.floor(Math.random() * 3) + 2;
      const no3 = Math.floor(Math.random() * 4) + 2;
      const no4 = Math.floor(Math.random() * 3) + 1;
      
      question = `${no1} - (${no2} × ${no3} - ${no4})`;
      correctAnswer = no1 - (no2 * no3 - no4);
      
      commonMistakeAnswers = [
        no1 - no2 * no3 - no4, // ignored parenthesis completely
        no1 - no2 * (no3 - no4), // incorrect parenthesis placement
        (no1 - no2) * no3 - no4, // completely wrong parenthesis application
      ];
      break;
      
    case 11: // Multiple exponents
      const me1 = Math.floor(Math.random() * 3) + 2; // 2-4
      const me2 = Math.floor(Math.random() * 2) + 2; // 2-3
      
      question = `${me1}^2 + ${me2}^2 + ${me1} × ${me2}`;
      correctAnswer = Math.pow(me1, 2) + Math.pow(me2, 2) + me1 * me2;
      
      commonMistakeAnswers = [
        Math.pow(me1 + me2, 2) + me1 * me2, // combined exponents incorrectly
        Math.pow(me1, 2) + Math.pow(me2, 2 + me1 * me2), // incorrect grouping
        Math.pow(me1, 2 + Math.pow(me2, 2)) + me1 * me2, // nested exponents incorrectly
      ];
      break;
      
    case 12: // Division with multiple operations
      const dm1 = Math.floor(Math.random() * 7) + 4;
      const dm2 = Math.floor(Math.random() * 3) + 2;
      const dm3 = Math.floor(Math.random() * 4) + 2;
      
      // Ensure divisibility for whole number result
      const adjustedDm1 = dm1 * dm2;
      
      question = `${adjustedDm1} ÷ ${dm2} + (${dm3} - ${dm1 % dm3})`;
      correctAnswer = (adjustedDm1 / dm2) + (dm3 - (dm1 % dm3));
      
      commonMistakeAnswers = [
        adjustedDm1 / (dm2 + (dm3 - (dm1 % dm3))), // division applied to entire expression
        adjustedDm1 / dm2 + dm3 - dm1 % dm3, // ignored parenthesis
        (adjustedDm1 / dm2 + dm3) - dm1 % dm3, // incorrect grouping
      ];
      break;
      
    case 13: // Complex parentheses with multiple operations
      const cp1 = Math.floor(Math.random() * 4) + 2;
      const cp2 = Math.floor(Math.random() * 3) + 2;
      const cp3 = Math.floor(Math.random() * 3) + 2;
      
      question = `(${cp1} + ${cp2})^2 - ${cp3} × (${cp2} - 1)`;
      correctAnswer = Math.pow((cp1 + cp2), 2) - cp3 * (cp2 - 1);
      
      commonMistakeAnswers = [
        Math.pow(cp1 + cp2, 2) - cp3 * cp2 - 1, // ignored second parenthesis
        (Math.pow(cp1, 2) + Math.pow(cp2, 2)) - cp3 * (cp2 - 1), // incorrect squaring
        (cp1 + cp2) * (cp1 + cp2) - cp3 * cp2 - 1, // multiple errors
      ];
      break;
      
    case 14: // Mixed operations with negative numbers
      const mn1 = Math.floor(Math.random() * 5) + 3;
      const mn2 = Math.floor(Math.random() * 4) + 2;
      const mn3 = Math.floor(Math.random() * 3) + 1;
      
      question = `${mn1} × (-${mn2}) + ${mn3}^2`;
      correctAnswer = mn1 * (-mn2) + Math.pow(mn3, 2);
      
      commonMistakeAnswers = [
        -mn1 * mn2 + Math.pow(mn3, 2), // misplaced negative
        mn1 * (-(mn2 + Math.pow(mn3, 2))), // negative applied to entire expression
        mn1 * (-mn2 + Math.pow(mn3, 2)), // incorrect grouping with negative
      ];
      break;
      
    case 15: // Division with parentheses
      const div1 = Math.floor(Math.random() * 5) + 3; // 3-7
      const div2 = Math.floor(Math.random() * 4) + 2; // 2-5
      // Make divisor small for whole number results
      const div3 = Math.floor(Math.random() * 3) + 2; // 2-4
      // Additional number to make problem more complex
      const div4 = Math.floor(Math.random() * 5) + 1; // 1-5
      
      // Ensure whole number answers by making dividend a multiple of divisor
      const product = div1 * div2;
      
      question = `(${div1} × ${div2}) ÷ ${div3} + ${div4}`;
      correctAnswer = (product / div3) + div4;
      
      // Solution steps
      steps = [
        `Step 1: Evaluate the parenthesis (${div1} × ${div2}) = ${product}`,
        `Step 2: Perform the division ${product} ÷ ${div3} = ${product / div3}`,
        `Step 3: Add the last number ${product / div3} + ${div4} = ${correctAnswer}`
      ];
      
      // Common mistakes: incorrect order with division
      commonMistakeAnswers = [
        div1 * div2 / (div3 + div4), // applied division to the addition
        div1 * (div2 / div3) + div4, // incorrect parenthesis placement
        div1 * div2 / div3 / div4, // treating addition as division
      ];
      break;
      
    case 16: // Division with multiple operations
      const md1 = Math.floor(Math.random() * 4) + 3; // 3-6
      const md2 = Math.floor(Math.random() * 3) + 2; // 2-4
      const md3 = Math.floor(Math.random() * 3) + 2; // 2-4
      
      // Make md4 be a factor of md2*md3 to ensure whole number result
      const mProduct = md2 * md3;
      const md4 = [1, 2, mProduct][Math.floor(Math.random() * 3)]; // Divisor is either 1, 2, or the product itself
      
      question = `${md1} + (${md2} × ${md3}) ÷ ${md4}`;
      correctAnswer = md1 + ((md2 * md3) / md4);
      
      // Solution steps
      steps = [
        `Step 1: Evaluate the parenthesis (${md2} × ${md3}) = ${mProduct}`,
        `Step 2: Perform the division ${mProduct} ÷ ${md4} = ${mProduct / md4}`,
        `Step 3: Add with the first number ${md1} + ${mProduct / md4} = ${correctAnswer}`
      ];
      
      // Common mistakes: division order errors
      commonMistakeAnswers = [
        (md1 + md2 * md3) / md4, // applied division to the entire expression
        md1 + md2 * (md3 / md4), // incorrect parenthesis placement
        md1 + md2 * md3 * (1/md4), // division as multiplication by reciprocal with wrong precedence
      ];
      break;
      
    case 17: // Nested divisions with operations
      const nd1 = Math.floor(Math.random() * 5) + 6; // 6-10
      
      // Generate divisor values that will produce whole number results
      // Choose between 1, 2, 3 for both divisors
      const nd2 = Math.floor(Math.random() * 3) + 1; // 1-3
      const nd3 = Math.floor(Math.random() * 3) + 1; // 1-3
      
      // Calculate sum for denominator
      const denominator = nd2 + nd3;
      
      // Adjust nd1 to be divisible by denominator for whole number result
      const adjustedNd1 = nd1 * denominator;
      
      // Make nd4 a small multiplier
      const nd4 = Math.floor(Math.random() * 3) + 2; // 2-4
      
      question = `${adjustedNd1} ÷ (${nd2} + ${nd3}) × ${nd4}`;
      correctAnswer = (adjustedNd1 / denominator) * nd4;
      
      // Solution steps
      steps = [
        `Step 1: Evaluate the parenthesis (${nd2} + ${nd3}) = ${denominator}`,
        `Step 2: Perform the division ${adjustedNd1} ÷ ${denominator} = ${adjustedNd1 / denominator}`,
        `Step 3: Multiply by the last number ${adjustedNd1 / denominator} × ${nd4} = ${correctAnswer}`
      ];
      
      // Common mistakes: incorrect division order
      commonMistakeAnswers = [
        adjustedNd1 / nd2 + nd3 * nd4, // ignored parentheses completely
        adjustedNd1 / ((nd2 + nd3) * nd4), // division applied before multiplication
        (adjustedNd1 / nd2 + nd3) * nd4, // incorrect grouping for division
      ];
      break;
      
    default:
      return generateProblem(); // Recursively try again if we somehow get an invalid type
  }
  
  // Filter out non-whole number answers and ensure they are unique
  if (correctAnswer % 1 !== 0) {
    return generateProblem(); // Try again if the correct answer isn't a whole number
  }
  
  // Filter out non-whole number mistakes and ensure they are unique
  commonMistakeAnswers = commonMistakeAnswers
    .filter(answer => answer % 1 === 0 && answer !== correctAnswer)
    .filter((value, index, self) => self.indexOf(value) === index);
  
  // Ensure we have enough unique mistake answers
  while (commonMistakeAnswers.length < 3) {
    // Add some random offsets if we don't have enough logical mistakes
    const offset = Math.floor(Math.random() * 10) + 1;
    const mistakeAnswer = correctAnswer + (Math.random() > 0.5 ? offset : -offset);
    
    if (!commonMistakeAnswers.includes(mistakeAnswer) && 
        mistakeAnswer !== correctAnswer && 
        mistakeAnswer % 1 === 0) { // Ensure whole number mistakes
      commonMistakeAnswers.push(mistakeAnswer);
    }
  }
  
  // Only take first 3 mistake answers if we have more
  commonMistakeAnswers = commonMistakeAnswers.slice(0, 3);
  
  // Combine correct and incorrect answers
  let options = [correctAnswer, ...commonMistakeAnswers];
  
  // Shuffle options
  options = options.sort(() => Math.random() - 0.5);
  
  // Check for duplicates in options (this should never happen due to our filtering)
  const uniqueOptions = [...new Set(options)];
  if (uniqueOptions.length < 4) {
    return generateProblem(); // Try again if we have duplicates
  }
  
  return { question, options, correctAnswer, commonMistakeAnswers, steps };
};

const GameScreen = ({ onComplete }: GameScreenProps) => {
  const [problems, setProblems] = useState<MathProblem[]>([]);
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [mistakes, setMistakes] = useState(0);
  const [ingredients, setIngredients] = useState<{type: string, animation: string}[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  
  // Initialize problems
  useEffect(() => {
    const newProblems = Array(10).fill(0).map(() => generateProblem());
    setProblems(newProblems);
  }, []);
  
  const handleAnswerSelect = (answer: number) => {
    setSelectedAnswer(answer);
    const currentProblem = problems[currentProblemIndex];
    const correct = answer === currentProblem.correctAnswer;
    setIsCorrect(correct);
    
    if (!correct) {
      setMistakes(mistakes + 1);
    }
    
    // Add ingredient based on answer
    const newIngredient = {
      type: correct ? 'magical' : 'silly',
      animation: `ingredient-${ingredients.length + 1}`
    };
    
    setIngredients([...ingredients, newIngredient]);
    setShowFeedback(true);
  };
  
  const handleNext = () => {
    if (currentProblemIndex < problems.length - 1) {
      setCurrentProblemIndex(currentProblemIndex + 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
      setShowFeedback(false);
      setShowSolution(false);
      setCurrentStepIndex(0);
    } else {
      onComplete(mistakes);
    }
  };

  const handleShowSolution = () => {
    setShowSolution(true);
    setCurrentStepIndex(0);
  };

  const handleNextStep = () => {
    if (currentStepIndex < problems[currentProblemIndex].steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const handleCloseSolution = () => {
    setShowSolution(false);
    setCurrentStepIndex(0);
  };
  
  if (problems.length === 0) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }
  
  const currentProblem = problems[currentProblemIndex];
  
  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-6 p-4">
      {/* Math problem card */}
      <Card className="w-full md:w-1/2 p-6 border-2 border-magic-purple bg-white/90 shadow-xl">
        <h2 className="text-xl font-bold text-magic-dark-purple mb-2">
          Problem {currentProblemIndex + 1} of {problems.length}
        </h2>
        
        <div className="text-3xl font-bold text-center py-6">
          {currentProblem.question}
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-4">
          {currentProblem.options.map((option, index) => (
            <Button
              key={index}
              onClick={() => !selectedAnswer && handleAnswerSelect(option)}
              disabled={selectedAnswer !== null}
              className={`answer-button h-16 text-xl ${
                selectedAnswer === option 
                  ? (isCorrect ? 'bg-green-100 border-green-500' : 'bg-red-100 border-red-500') 
                  : selectedAnswer !== null && option === currentProblem.correctAnswer
                    ? 'bg-green-100 border-green-500'
                    : ''
              }`}
            >
              {option}
            </Button>
          ))}
        </div>
        
        {showFeedback && (
          <div className={`mt-6 p-4 rounded-lg text-center ${
            isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {isCorrect ? (
              <div className="flex items-center justify-center">
                <Sparkles className="mr-2" />
                <span>Correct! A magical ingredient is added!</span>
                <Star className="ml-2" />
              </div>
            ) : (
              <div>Oops! A silly ingredient falls in!</div>
            )}
            
            <div className="flex justify-center gap-4 mt-4">
              <Button onClick={handleShowSolution} className="bg-magic-blue hover:bg-magic-blue/80">
                {isCorrect ? "See Solution" : "Learn Correct Solution"}
              </Button>
              
              <Button onClick={handleNext} className="magical-button">
                {currentProblemIndex < problems.length - 1 ? 'Next Problem' : 'See Your Potion'}
              </Button>
            </div>
          </div>
        )}
      </Card>
      
      {/* Cauldron display */}
      <div className="w-full md:w-1/2 flex flex-col items-center">
        <div className="relative w-64 h-64">
          {/* Cauldron base */}
          <div className="absolute bottom-0 w-full h-3/4 bg-black rounded-b-full"></div>
          
          {/* Cauldron rim */}
          <div className="absolute bottom-[75%] w-full h-[10%] bg-gray-700 rounded-full"></div>
          
          {/* Cauldron content */}
          <div 
            className="cauldron-content w-[80%] h-[60%] bg-magic-purple bg-opacity-80"
            style={{top: '45%'}}
          >
            {/* Bubbles */}
            <div className="absolute w-6 h-6 bg-white rounded-full opacity-50 animate-cauldron-bubble" 
                 style={{left: '20%', top: '20%', animationDelay: '0s'}}></div>
            <div className="absolute w-4 h-4 bg-white rounded-full opacity-50 animate-cauldron-bubble" 
                 style={{left: '60%', top: '30%', animationDelay: '0.5s'}}></div>
            <div className="absolute w-5 h-5 bg-white rounded-full opacity-50 animate-cauldron-bubble" 
                 style={{left: '40%', top: '50%', animationDelay: '1s'}}></div>
            
            {/* Ingredient indicators */}
            {ingredients.map((ingredient, i) => (
              <div 
                key={i} 
                className={`absolute w-8 h-8 rounded-full ${
                  ingredient.type === 'magical' ? 'bg-magic-green' : 'bg-orange-400'
                }`}
                style={{
                  left: `${25 + (i * 8)}%`, 
                  top: `${40 + (i % 3) * 15}%`,
                  animation: `float 2s ease-in-out infinite`,
                  animationDelay: `${i * 0.3}s`
                }}
              ></div>
            ))}
          </div>
        </div>
        
        <div className="mt-4 text-center">
          <p className="text-xl font-semibold text-magic-dark-purple">
            Ingredients: {ingredients.length}/{problems.length}
          </p>
          <p className="text-sm text-magic-purple">
            Magical: {ingredients.filter(i => i.type === 'magical').length}
            <span className="mx-2">|</span>
            Silly: {ingredients.filter(i => i.type === 'silly').length}
          </p>
        </div>
      </div>

      {/* Solution Dialog */}
      <Dialog open={showSolution} onOpenChange={handleCloseSolution}>
        <DialogContent className="max-w-3xl bg-white/95 border-2 border-magic-purple">
          <DialogHeader>
            <DialogTitle className="text-2xl text-magic-dark-purple font-bold">
              {isCorrect ? "Solution Overview" : "Let's Learn How to Solve This"}
            </DialogTitle>
          </DialogHeader>
          
          <div className="p-4 bg-white/80 rounded-lg shadow-inner">
            <div className="text-xl font-bold text-center mb-4 text-magic-dark-purple">
              {currentProblem.question} = {currentProblem.correctAnswer}
            </div>
            
            <div className="bg-magic-light-purple/30 p-4 rounded-lg mb-4">
              <p className="font-semibold text-magic-dark-purple mb-2">
                Remember PEMDAS:
              </p>
              <div className="flex flex-wrap justify-around gap-2 text-center">
                <div className="flex items-center gap-1">
                  <Parentheses className="h-5 w-5" />
                  <span>Parentheses</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>E</span>
                  <span>xponents</span>
                </div>
                <div className="flex items-center gap-1">
                  <Multiply className="h-5 w-5" />
                  <Divide className="h-5 w-5" />
                  <span>Multiplication/Division</span>
                </div>
                <div className="flex items-center gap-1">
                  <Plus className="h-5 w-5" />
                  <Minus className="h-5 w-5" />
                  <span>Addition/Subtraction</span>
                </div>
              </div>
            </div>
            
            {isCorrect ? (
              /* Quick overview for correct answers */
              <div className="space-y-2">
                {currentProblem.steps.map((step, index) => (
                  <div key={index} className="p-2 bg-magic-light-purple/20 rounded">
                    {step}
                  </div>
                ))}
                <div className="mt-6 flex justify-center">
                  <Button onClick={handleCloseSolution} className="bg-magic-dark-purple hover:bg-magic-dark-purple/80">
                    Got it!
                  </Button>
                </div>
              </div>
            ) : (
              /* Step-by-step interactive learning for incorrect answers */
              <div className="space-y-4">
                <div className="p-4 bg-white rounded-lg shadow border border-magic-purple">
                  {currentStepIndex < currentProblem.steps.length ? (
                    <div className="text-lg font-medium">
                      {currentProblem.steps[currentStepIndex]}
                    </div>
                  ) : (
                    <div className="text-lg font-medium text-green-700">
                      Now you know how to get the correct answer: {currentProblem.correctAnswer}
                    </div>
                  )}
                </div>
                
                <div className="flex justify-between items-center mt-6">
                  <Button 
                    onClick={handlePreviousStep}
                    disabled={currentStepIndex === 0}
                    className="bg-magic-purple hover:bg-magic-purple/80"
                  >
                    Previous Step
                  </Button>
                  
                  {currentStepIndex < currentProblem.steps.length - 1 ? (
                    <Button 
                      onClick={handleNextStep}
                      className="bg-magic-dark-purple hover:bg-magic-dark-purple/80"
                    >
                      Next Step
                    </Button>
                  ) : (
                    <Button 
                      onClick={handleCloseSolution}
                      className="bg-magic-green hover:bg-magic-green/80"
                    >
                      I Understand
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GameScreen;
