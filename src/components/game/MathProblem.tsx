
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MathProblem } from "@/utils/mathProblemGenerator";

interface MathProblemProps {
  problem: MathProblem;
  currentProblemIndex: number;
  totalProblems: number;
  selectedAnswer: number | null;
  isCorrect: boolean | null;
  onAnswerSelect: (answer: number) => void;
}

const MathProblemDisplay = ({
  problem,
  currentProblemIndex,
  totalProblems,
  selectedAnswer,
  isCorrect,
  onAnswerSelect
}: MathProblemProps) => {
  return (
    <Card className="w-full md:w-1/2 p-6 border-2 border-magic-purple bg-white/90 shadow-xl">
      <h2 className="text-xl font-bold text-magic-dark-purple mb-2">
        Problem {currentProblemIndex + 1} of {totalProblems}
      </h2>
      
      <div className="text-3xl font-bold text-center py-6">
        {problem.question}
      </div>
      
      <div className="grid grid-cols-2 gap-4 mt-4">
        {problem.options.map((option, index) => (
          <Button
            key={index}
            onClick={() => !selectedAnswer && onAnswerSelect(option)}
            disabled={selectedAnswer !== null}
            className={`answer-button h-16 text-xl ${
              selectedAnswer === option 
                ? (isCorrect ? 'bg-green-100 border-green-500' : 'bg-red-100 border-red-500') 
                : selectedAnswer !== null && option === problem.correctAnswer
                  ? 'bg-green-100 border-green-500'
                  : ''
            }`}
          >
            {option}
          </Button>
        ))}
      </div>
    </Card>
  );
};

export default MathProblemDisplay;
