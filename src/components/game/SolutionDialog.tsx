
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { Parentheses, X, Divide, Plus, Minus } from "lucide-react";
import { MathProblem } from "@/utils/mathProblemGenerator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useIsMobile } from "@/hooks/use-mobile";

interface SolutionDialogProps {
  open: boolean;
  onClose: () => void;
  problem: MathProblem;
  isCorrect: boolean;
  currentStepIndex: number;
  onNextStep: () => void;
  onPreviousStep: () => void;
}

const SolutionDialog = ({
  open,
  onClose,
  problem,
  isCorrect,
  currentStepIndex,
  onNextStep,
  onPreviousStep
}: SolutionDialogProps) => {
  const isLastStep = currentStepIndex === problem.steps.length;
  const showSummary = isLastStep;
  const isMobile = useIsMobile();
  
  const maxDialogHeight = isMobile ? "70vh" : "80vh";

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl bg-white/95 border-2 border-magic-purple max-h-screen">
        <DialogHeader>
          <DialogTitle className="text-2xl text-magic-dark-purple font-bold">
            {isCorrect ? "Solution Overview" : "Let's Learn How to Solve This"}
          </DialogTitle>
          <DialogDescription className="text-magic-dark-purple/70">
            Review the steps to solve this problem correctly.
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="pr-4" style={{ maxHeight: maxDialogHeight }}>
          <div className="p-4 bg-white/80 rounded-lg shadow-inner">
            <div className="text-xl font-bold text-center mb-4 text-magic-dark-purple">
              {problem.question} = {problem.correctAnswer}
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
                {problem.steps.map((step, index) => (
                  <div key={index} className="p-2 bg-magic-light-purple/20 rounded">
                    {step}
                  </div>
                ))}
                <div className="mt-6 flex justify-center">
                  <Button onClick={onClose} className="bg-magic-dark-purple hover:bg-magic-dark-purple/80">
                    Got it!
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-4 bg-white rounded-lg shadow border border-magic-purple">
                  {showSummary ? (
                    <div className="space-y-3">
                      <h3 className="text-lg font-bold text-magic-dark-purple">Solution Summary:</h3>
                      {problem.steps.map((step, index) => (
                        <div key={index} className="p-2 bg-magic-light-purple/20 rounded mb-2">
                          <span className="font-medium">Step {index + 1}:</span> {step}
                        </div>
                      ))}
                      <div className="p-2 bg-green-100 rounded mt-4">
                        <span className="font-bold text-green-700">Final Answer:</span> {problem.correctAnswer}
                      </div>
                    </div>
                  ) : (
                    <div className="text-lg font-medium">
                      {problem.steps[currentStepIndex]}
                    </div>
                  )}
                </div>
                
                <div className="flex justify-between items-center mt-6">
                  <Button 
                    onClick={onPreviousStep}
                    disabled={currentStepIndex === 0}
                    className="bg-magic-purple hover:bg-magic-purple/80"
                  >
                    Previous Step
                  </Button>
                  
                  {showSummary ? (
                    <Button 
                      onClick={onClose}
                      className="bg-magic-green hover:bg-magic-green/80"
                    >
                      I Understand
                    </Button>
                  ) : (
                    <Button 
                      onClick={onNextStep}
                      className="bg-magic-dark-purple hover:bg-magic-dark-purple/80"
                    >
                      {currentStepIndex === problem.steps.length - 1 ? "See Summary" : "Next Step"}
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default SolutionDialog;
