
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Dialog, 
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { 
  BookOpen, 
  HelpCircle, 
  ArrowRight, 
  LightbulbOff,
  Lightbulb 
} from "lucide-react";
import { generateRandomPemdasEquation } from "@/utils/pemdasTutorial";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Step {
  id: string;
  operation: string;
  description: string;
  expression: string;
  rule: string;
  result?: number | string;
}

const PemdasTutorial = () => {
  const [currentEquation, setCurrentEquation] = useState<string>("");
  const [solvedEquation, setSolvedEquation] = useState<string>("");
  const [steps, setSteps] = useState<Step[]>([]);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [incorrectAttempts, setIncorrectAttempts] = useState<string[]>([]);
  const [showIntroduction, setShowIntroduction] = useState<boolean>(true);
  const [showTip, setShowTip] = useState<boolean>(false);

  // Generate a new equation when the component mounts
  useEffect(() => {
    generateNewProblem();
  }, []);

  const generateNewProblem = () => {
    const { equation, steps } = generateRandomPemdasEquation();
    setCurrentEquation(equation);
    setSolvedEquation(equation);
    setSteps(steps);
    setCompletedSteps([]);
    setCurrentStepIndex(0);
    setIncorrectAttempts([]);
    setIsDialogOpen(false);
    setShowTip(false);
  };

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);
    
    // Check if correct
    if (optionId === steps[currentStepIndex].id) {
      // Correct answer
      setCompletedSteps([...completedSteps, optionId]);
      
      // Update the solved equation to show progress
      updateSolvedEquation(currentStepIndex);
      
      // If this was the last step
      if (currentStepIndex === steps.length - 1) {
        // Tutorial completed
        setIsDialogOpen(true);
      } else {
        // Move to next step
        setCurrentStepIndex(currentStepIndex + 1);
      }
      setIncorrectAttempts([]);
      setShowTip(false);
    } else {
      // Incorrect answer
      setIncorrectAttempts([...incorrectAttempts, optionId]);
    }
    
    // Reset selection after a brief delay
    setTimeout(() => {
      setSelectedOption(null);
    }, 1000);
  };

  // Update the displayed equation to show the solved parts
  const updateSolvedEquation = (stepIndex: number) => {
    if (!steps[stepIndex]) return;
    
    const currentStep = steps[stepIndex];
    let newEquation = solvedEquation;
    
    // Replace the expression with its result
    if (currentStep.result !== undefined) {
      newEquation = newEquation.replace(
        currentStep.expression, 
        currentStep.result.toString()
      );
      setSolvedEquation(newEquation);
    }
  };

  const toggleTip = () => {
    setShowTip(!showTip);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-magic-light-purple p-4">
      <header className="py-4 text-center">
        <h1 className="text-4xl font-bold text-magic-dark-purple">Learn PEMDAS</h1>
        <p className="text-magic-purple">Master the Order of Operations: Parentheses, Exponents, Multiplication/Division, Addition/Subtraction</p>
      </header>

      {/* Introduction Dialog */}
      <Dialog open={showIntroduction} onOpenChange={setShowIntroduction}>
        <DialogContent className="max-w-md bg-white/95 border-2 border-magic-purple fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] z-50">
          <DialogHeader>
            <DialogTitle className="text-xl text-center font-bold">
              Welcome to PEMDAS Tutorial!
            </DialogTitle>
            <DialogDescription className="text-center text-magic-dark-purple/80">
              Learn the proper order of operations in mathematics
            </DialogDescription>
          </DialogHeader>
          <div className="p-4 space-y-4">
            <p className="text-magic-dark-purple">
              <strong>PEMDAS</strong> stands for:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>P</strong>arentheses - Solve expressions inside parentheses first</li>
              <li><strong>E</strong>xponents - Calculate exponents (powers) next</li>
              <li><strong>M</strong>ultiplication & <strong>D</strong>ivision - From left to right</li>
              <li><strong>A</strong>ddition & <strong>S</strong>ubtraction - From left to right</li>
            </ul>
            <p className="mt-4">In this tutorial, we'll give you an equation and guide you through solving it step-by-step according to PEMDAS rules.</p>
            <Button 
              onClick={() => setShowIntroduction(false)}
              className="w-full magical-button mt-4"
            >
              Start Learning
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Main Tutorial Content */}
      <div className="max-w-4xl mx-auto mt-8 grid gap-8">
        {/* Current Equation Display */}
        <Card className="p-6 border-2 border-magic-purple bg-white/90 shadow-xl">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-magic-dark-purple">
              Solve this equation using PEMDAS:
            </h2>
            <Button
              onClick={generateNewProblem}
              className="bg-magic-light-purple hover:bg-magic-purple text-magic-dark-purple"
            >
              New Equation
            </Button>
          </div>
          
          <div className="text-3xl font-bold text-center py-6 flex items-center justify-center flex-wrap gap-2">
            <span className="font-normal text-lg mr-2">Original: </span>
            {currentEquation}
          </div>

          <div className="text-3xl font-bold text-center py-6 bg-green-50 rounded-lg border border-green-200 flex items-center justify-center flex-wrap gap-2">
            <span className="font-normal text-lg mr-2">Working: </span>
            {solvedEquation}
          </div>
        </Card>

        {/* Step Selection */}
        <Card className="p-6 border-2 border-magic-purple bg-white/90 shadow-xl">
          <h2 className="text-xl font-bold text-magic-dark-purple mb-4">
            What should we solve next?
          </h2>

          <Alert className="mb-4 bg-magic-light-purple/30 border-magic-purple">
            <HelpCircle className="h-4 w-4" />
            <AlertTitle>Current Step: {currentStepIndex + 1} of {steps.length}</AlertTitle>
            <AlertDescription>
              According to PEMDAS, which part of the equation should we solve next?
            </AlertDescription>
          </Alert>

          <RadioGroup className="space-y-3">
            {steps.map((step, index) => {
              const isCompleted = completedSteps.includes(step.id);
              const isIncorrect = incorrectAttempts.includes(step.id);
              const isDisabled = isCompleted || isIncorrect;
              
              return (
                <div key={step.id} className={`
                  flex items-center space-x-2 rounded-lg border p-4
                  ${isCompleted ? 'bg-green-100 border-green-500' : ''}
                  ${isIncorrect ? 'bg-red-50 border-red-300' : ''}
                  ${isDisabled ? 'opacity-60' : 'hover:bg-magic-light-purple/30 cursor-pointer'}
                `}>
                  <RadioGroupItem
                    id={step.id}
                    value={step.id}
                    disabled={isDisabled}
                    checked={selectedOption === step.id}
                    onClick={() => !isDisabled && handleOptionSelect(step.id)}
                  />
                  <label 
                    htmlFor={step.id} 
                    className="flex-1 font-medium cursor-pointer"
                  >
                    {step.expression} <span className="ml-2 text-sm italic">({step.operation})</span>
                  </label>
                </div>
              );
            })}
          </RadioGroup>
        </Card>
        
        {/* Rule Explanation */}
        {steps[currentStepIndex] && (
          <Card className="p-6 border-2 border-magic-purple bg-white/90 shadow-xl">
            <div className="flex items-center justify-between gap-2 mb-4">
              <div className="flex items-center gap-2 text-xl font-bold text-magic-dark-purple">
                <BookOpen className="h-6 w-6" />
                <h2>PEMDAS Rule Tip:</h2>
              </div>
              <Button
                onClick={toggleTip}
                variant="outline"
                className="border-magic-purple"
              >
                {showTip ? (
                  <><LightbulbOff className="mr-2 h-4 w-4" /> Hide Tip</>
                ) : (
                  <><Lightbulb className="mr-2 h-4 w-4" /> Show Tip</>
                )}
              </Button>
            </div>
            
            {showTip && steps[currentStepIndex] && (
              <div className="mt-2 p-4 bg-magic-light-purple/20 rounded-lg animate-fadeIn">
                <p className="text-magic-dark-purple/80">
                  {steps[currentStepIndex].rule}
                </p>
              </div>
            )}
          </Card>
        )}
        
        {/* Return to Main Page */}
        <div className="flex justify-center">
          <Button 
            className="magical-button"
            onClick={() => window.location.href = '/'}
          >
            Return to Home <ArrowRight className="ml-2" />
          </Button>
        </div>
      </div>
      
      {/* Completion Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md bg-white/95 border-2 border-magic-purple fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] z-50">
          <DialogHeader>
            <DialogTitle className="text-xl text-center font-bold">
              Congratulations!
            </DialogTitle>
            <DialogDescription className="text-center text-magic-dark-purple/80">
              You've completed this PEMDAS equation!
            </DialogDescription>
          </DialogHeader>
          <div className="p-4 rounded-lg text-center mx-auto w-full bg-green-100 text-green-800">
            <p className="text-lg font-medium">You've mastered the order of operations!</p>
            <p className="mt-2 text-sm opacity-80">
              Remember: Parentheses, Exponents, Multiplication/Division, Addition/Subtraction
            </p>
            
            <div className="flex justify-center gap-4 mt-4">
              <Button 
                onClick={generateNewProblem} 
                className="magical-button"
              >
                Try Another Equation
              </Button>
              
              <Button 
                onClick={() => window.location.href = '/'}
                className="bg-magic-blue hover:bg-magic-blue/80"
              >
                Return to Home
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PemdasTutorial;
