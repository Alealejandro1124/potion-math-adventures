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

const generateProblem = (): MathProblem => {
  const problemType = Math.floor(Math.random() * 18);
  
  let question = '';
  let correctAnswer = 0;
  let commonMistakeAnswers: number[] = [];
  let steps: string[] = [];
  
  switch(problemType) {
    // ... keep existing code (problem generation logic)
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
      
      <div className="w-full md:w-1/2 flex flex-col items-center">
        <div className="relative w-64 h-64">
          <div className="absolute bottom-0 w-full h-3/4 bg-black rounded-b-full"></div>
          <div className="absolute bottom-[75%] w-full h-[10%] bg-gray-700 rounded-full"></div>
          <div 
            className="cauldron-content w-[80%] h-[60%] bg-magic-purple bg-opacity-80"
            style={{top: '45%'}}
          >
            <div className="absolute w-6 h-6 bg-white rounded-full opacity-50 animate-cauldron-bubble" 
                 style={{left: '20%', top: '20%', animationDelay: '0s'}}></div>
            <div className="absolute w-4 h-4 bg-white rounded-full opacity-50 animate-cauldron-bubble" 
                 style={{left: '60%', top: '30%', animationDelay: '0.5s'}}></div>
            <div className="absolute w-5 h-5 bg-white rounded-full opacity-50 animate-cauldron-bubble" 
                 style={{left: '40%', top: '50%', animationDelay: '1s'}}></div>
            
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
                  <X className="h-5 w-5" />
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
