
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface InstructionScreenProps {
  onContinue: () => void;
}

const InstructionScreen = ({ onContinue }: InstructionScreenProps) => {
  return (
    <div className="flex flex-col items-center justify-center p-6">
      <Card className="w-full max-w-2xl p-6 border-2 border-magic-purple bg-white/90 shadow-xl">
        <h2 className="text-3xl font-bold text-magic-dark-purple mb-6 text-center">How to Play</h2>
        
        <div className="space-y-6 text-lg">
          <div className="flex items-start space-x-3">
            <div className="bg-magic-purple text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
              1
            </div>
            <p>Solve three PEMDAS math problems (Parenthesis, Exponents, Multiply/Divide, Add/Subtract).</p>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="bg-magic-purple text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
              2
            </div>
            <p>Each <span className="font-bold text-magic-dark-purple">correct answer</span> adds a magical ingredient to your cauldron!</p>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="bg-magic-purple text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
              3
            </div>
            <p>Each <span className="font-bold text-red-500">incorrect answer</span> adds a silly ingredient instead.</p>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="bg-magic-purple text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
              4
            </div>
            <p>At the end, you'll see what kind of potion you've created!</p>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <Button onClick={onContinue} className="magical-button">
            Let's Brew!
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default InstructionScreen;
