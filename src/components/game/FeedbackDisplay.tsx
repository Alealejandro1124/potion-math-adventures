
import { Button } from "@/components/ui/button";
import { Sparkles, Star } from "lucide-react";

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
          <span>Correct! A magical ingredient is added!</span>
          <Star className="ml-2" />
        </div>
      ) : (
        <div>Oops! A silly ingredient falls in!</div>
      )}
      
      <div className="flex justify-center gap-4 mt-4">
        <Button onClick={onShowSolution} className="bg-magic-blue hover:bg-magic-blue/80">
          {isCorrect ? "See Solution" : "Learn Correct Solution"}
        </Button>
        
        <Button onClick={onNext} className="magical-button">
          {!isLastProblem ? 'Next Problem' : 'See Your Potion'}
        </Button>
      </div>
    </div>
  );
};

export default FeedbackDisplay;
