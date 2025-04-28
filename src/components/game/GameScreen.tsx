
import { useState, useEffect } from "react";
import { generateProblem, type MathProblem } from "@/utils/mathProblemGenerator";
import MathProblemDisplay from "./MathProblem";
import Cauldron from "./Cauldron";
import SolutionDialog from "./SolutionDialog";
import FeedbackDialog from "./FeedbackDialog";

interface GameScreenProps {
  onComplete: (mistakes: number) => void;
}

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
  const [solutionViewed, setSolutionViewed] = useState(false);
  
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
    setSolutionViewed(false);
  };
  
  const handleNext = () => {
    if (currentProblemIndex < problems.length - 1) {
      setCurrentProblemIndex(currentProblemIndex + 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
      setShowFeedback(false);
      setShowSolution(false);
      setCurrentStepIndex(0);
      setSolutionViewed(false);
    } else {
      onComplete(mistakes);
    }
  };

  const handleShowSolution = () => {
    setShowSolution(true);
    setCurrentStepIndex(0);
  };

  const handleNextStep = () => {
    if (currentStepIndex < problems[currentProblemIndex].steps.length) {
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
    setSolutionViewed(true);
  };
  
  const handleFeedbackOpenChange = (open: boolean) => {
    setShowFeedback(open);
  };
  
  if (problems.length === 0) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }
  
  const currentProblem = problems[currentProblemIndex];
  
  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-6 p-4">
      <MathProblemDisplay
        problem={currentProblem}
        currentProblemIndex={currentProblemIndex}
        totalProblems={problems.length}
        selectedAnswer={selectedAnswer}
        isCorrect={isCorrect}
        onAnswerSelect={handleAnswerSelect}
      />
      
      <Cauldron ingredients={ingredients} />
      
      <FeedbackDialog
        open={showFeedback}
        onOpenChange={handleFeedbackOpenChange}
        isCorrect={isCorrect!}
        onShowSolution={handleShowSolution}
        onNext={handleNext}
        isLastProblem={currentProblemIndex === problems.length - 1}
        solutionViewed={solutionViewed}
      />

      <SolutionDialog
        open={showSolution}
        onClose={handleCloseSolution}
        problem={currentProblem}
        isCorrect={isCorrect!}
        currentStepIndex={currentStepIndex}
        onNextStep={handleNextStep}
        onPreviousStep={handlePreviousStep}
      />
    </div>
  );
};

export default GameScreen;
