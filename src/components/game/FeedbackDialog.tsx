
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { Sparkles, Star, BookOpen } from "lucide-react";

interface FeedbackDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isCorrect: boolean;
  onShowSolution: () => void;
  onNext: () => void;
  isLastProblem: boolean;
  solutionViewed: boolean;
}

const FeedbackDialog = ({
  open,
  onOpenChange,
  isCorrect,
  onShowSolution,
  onNext,
  isLastProblem,
  solutionViewed
}: FeedbackDialogProps) => {
  // Handle dialog close attempts by redirecting to onNext
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      // If dialog is being closed, treat it as clicking "Next"
      if (isCorrect || solutionViewed) {
        onNext();
      }
    }
    onOpenChange(open);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-md bg-white/95 border-2 border-magic-purple fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] z-50">
        <DialogHeader>
          <DialogTitle className="text-xl text-center font-bold">
            {isCorrect ? "Magical Success!" : "Not Quite Right"}
          </DialogTitle>
          <DialogDescription className="text-center text-magic-dark-purple/80">
            {isCorrect 
              ? "You've mastered this spell!" 
              : "Don't worry, you'll improve with practice."}
          </DialogDescription>
        </DialogHeader>
        
        <div className={`p-4 rounded-lg text-center mx-auto w-full ${
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
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4">
            <Button 
              onClick={onShowSolution} 
              className="bg-magic-blue hover:bg-magic-blue/80 flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4" />
              {isCorrect ? "See Solution Steps" : "Learn the Correct Solution"}
            </Button>
            
            <Button 
              onClick={onNext} 
              disabled={!isCorrect && !solutionViewed}
              className={`${!isCorrect && !solutionViewed ? 'opacity-50 cursor-not-allowed' : 'magical-button'}`}
            >
              {!isLastProblem ? 'Next Problem' : 'See Your Potion'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackDialog;
