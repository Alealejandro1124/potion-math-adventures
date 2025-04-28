
import { Button } from "@/components/ui/button";
import { Sparkles, Star, BookOpen } from "lucide-react";

interface FeedbackDisplayProps {
  isCorrect: boolean;
  onShowSolution: () => void;
  onNext: () => void;
  isLastProblem: boolean;
}

const FeedbackDisplay = ({
  isCorrect,
  onShowSolution,
  onNext,
  isLastProblem
}: FeedbackDisplayProps) => {
  return (
    <div className={`mt-6 p-4 rounded-lg text-center ${
      isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
    }`}>
      {isCorrect ? (
        <div className="flex items-center justify-center">
          <Sparkles className="mr-2" />
          <span className="text-lg font-medium">Correct! A magical ingredient is added to your potion!</span>
          <Star className="ml-2" />
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <span className="text-lg font-medium">Oops! A silly ingredient falls into your cauldron!</span>
        </div>
      )}
      
      <p className="mt-2 text-sm opacity-80">
        {isCorrect 
          ? "Great job solving this multi-step problem!" 
          : "Don't worry! Math wizards learn from their mistakes."}
      </p>
      
      <div className="flex justify-center gap-4 mt-4">
        <Button 
          onClick={onShowSolution} 
          className="bg-magic-blue hover:bg-magic-blue/80 flex items-center gap-2"
        >
          <BookOpen className="w-4 h-4" />
          {isCorrect ? "See Solution Steps" : "Learn the Correct Solution"}
        </Button>
        
        <Button onClick={onNext} className="magical-button">
          {!isLastProblem ? 'Next Problem' : 'See Your Potion'}
        </Button>
      </div>
    </div>
  );
};

export default FeedbackDisplay;
