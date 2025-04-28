
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles, Star, Plus, Minus } from "lucide-react";

interface GameScreenProps {
  onComplete: (mistakes: number) => void;
}

interface MathProblem {
  question: string;
  options: number[];
  correctAnswer: number;
  commonMistakeAnswers: number[];
}

// Generate a random PEMDAS problem with at least 4 steps
const generateProblem = (): MathProblem => {
  // Problem types:
  // 0: Parentheses with multiple operations
  // 1: Exponents with addition/subtraction/multiplication
  // 2: Complex multiplication/division and addition/subtraction combinations
  // 3: Multi-step mixed operations
  const problemType = Math.floor(Math.random() * 4);
  
  let question = '';
  let correctAnswer = 0;
  let commonMistakeAnswers: number[] = [];
  
  switch(problemType) {
    case 0: // Parentheses with multiple operations
      const p1 = Math.floor(Math.random() * 10) + 2;
      const p2 = Math.floor(Math.random() * 10) + 2;
      const p3 = Math.floor(Math.random() * 10) + 2;
      const p4 = Math.floor(Math.random() * 10) + 2;
      
      question = `(${p1} + ${p2}) × (${p3} - ${p4})`;
      correctAnswer = (p1 + p2) * (p3 - p4);
      
      // Common mistakes: not using parentheses properly
      commonMistakeAnswers = [
        p1 + (p2 * p3) - p4, // didn't respect first parenthesis
        p1 + p2 * p3 - p4,   // ignored both parentheses
        (p1 + p2 * p3) - p4, // only respected first parenthesis
      ];
      break;
      
    case 1: // Exponents with other operations
      const base = Math.floor(Math.random() * 5) + 2; // 2-6
      const exp = Math.floor(Math.random() * 2) + 2; // 2-3
      const n1 = Math.floor(Math.random() * 8) + 2;
      const n2 = Math.floor(Math.random() * 8) + 2;
      
      question = `${base}² × ${n1} + ${n2}`;
      correctAnswer = Math.pow(base, 2) * n1 + n2;
      
      // Common mistakes: doing operations in incorrect order
      commonMistakeAnswers = [
        Math.pow(base * n1, 2) + n2, // squared after multiplication
        Math.pow(base, 2) + (n1 * n2), // addition before multiplication
        Math.pow(base, 2 + n1) + n2, // exponentiation with wrong grouping
      ];
      break;
      
    case 2: // Complex multiplication/division and addition/subtraction
      const m1 = Math.floor(Math.random() * 8) + 3;
      const m2 = Math.floor(Math.random() * 8) + 3;
      const m3 = Math.floor(Math.random() * 8) + 3;
      const m4 = Math.floor(Math.random() * 8) + 3;
      
      question = `${m1} + ${m2} × ${m3} - ${m4}`;
      correctAnswer = m1 + (m2 * m3) - m4;
      
      // Common mistakes: incorrect order of operations
      commonMistakeAnswers = [
        (m1 + m2) * m3 - m4, // addition before multiplication
        m1 + m2 * (m3 - m4), // subtraction before multiplication
        (m1 + m2) * (m3 - m4), // parentheses where there are none
      ];
      break;
      
    case 3: // Multi-step mixed operations
      const a = Math.floor(Math.random() * 8) + 2;
      const b = Math.floor(Math.random() * 8) + 2;
      const c = Math.floor(Math.random() * 4) + 2;
      const d = Math.floor(Math.random() * 4) + 2;
      
      question = `${a} × ${b} + ${c} × ${d}`;
      correctAnswer = (a * b) + (c * d);
      
      // Common mistakes: incorrect order of operations
      commonMistakeAnswers = [
        a * (b + c) * d, // not respecting multiplication order
        (a * b + c) * d, // incorrect grouping
        a * b + c + d,   // adding all numbers together after first multiplication
      ];
      break;
  }
  
  // Ensure we have exactly 3 incorrect answers
  while (commonMistakeAnswers.length < 3) {
    // Add some random offsets if we don't have enough logical mistakes
    const offset = Math.floor(Math.random() * 10) + 1;
    const mistakeAnswer = correctAnswer + (Math.random() > 0.5 ? offset : -offset);
    
    if (!commonMistakeAnswers.includes(mistakeAnswer) && mistakeAnswer !== correctAnswer) {
      commonMistakeAnswers.push(mistakeAnswer);
    }
  }
  
  // Only take first 3 mistake answers if we have more
  commonMistakeAnswers = commonMistakeAnswers.slice(0, 3);
  
  // Combine correct and incorrect answers
  let options = [correctAnswer, ...commonMistakeAnswers];
  
  // Shuffle options
  options = options.sort(() => Math.random() - 0.5);
  
  return { question, options, correctAnswer, commonMistakeAnswers };
};

const GameScreen = ({ onComplete }: GameScreenProps) => {
  const [problems, setProblems] = useState<MathProblem[]>([]);
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [mistakes, setMistakes] = useState(0);
  const [ingredients, setIngredients] = useState<{type: string, animation: string}[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  
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
    } else {
      onComplete(mistakes);
    }
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
            
            <Button onClick={handleNext} className="mt-4 magical-button">
              {currentProblemIndex < problems.length - 1 ? 'Next Problem' : 'See Your Potion'}
            </Button>
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
    </div>
  );
};

export default GameScreen;
