
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

interface ResultScreenProps {
  mistakes: number;
  onPlayAgain: () => void;
}

const ResultScreen = ({ mistakes, onPlayAgain }: ResultScreenProps) => {
  const [showResults, setShowResults] = useState(false);
  const isPerfectPotion = mistakes === 0;
  
  useEffect(() => {
    // Animation delay
    const timer = setTimeout(() => {
      setShowResults(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
      {showResults ? (
        <div className={`transform transition-all duration-700 ${showResults ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {isPerfectPotion ? (
              <span className="magical-gradient bg-clip-text text-transparent">Perfect Potion!</span>
            ) : (
              <span className="text-magic-purple">Funny Potion!</span>
            )}
          </h2>
          
          <div className="relative w-72 h-72 mx-auto mb-8">
            {/* Potion bottle */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-40 h-56">
              {/* Bottle neck */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-12 bg-blue-200 rounded-t-lg"></div>
              
              {/* Bottle body */}
              <div className="absolute top-8 w-full h-48 bg-blue-200 rounded-2xl"></div>
              
              {/* Potion liquid */}
              <div 
                className={`absolute top-12 w-[90%] h-40 rounded-xl left-[5%] ${
                  isPerfectPotion 
                    ? 'bg-gradient-to-b from-magic-purple to-magic-blue' 
                    : 'bg-gradient-to-b from-orange-400 to-yellow-300'
                }`}
              >
                {/* Bubbles/sparkles */}
                {Array(8).fill(0).map((_, i) => (
                  <div 
                    key={i}
                    className={`absolute w-3 h-3 rounded-full ${
                      isPerfectPotion ? 'bg-white' : 'bg-orange-200'
                    } animate-float opacity-70`}
                    style={{
                      left: `${Math.random() * 80 + 10}%`,
                      top: `${Math.random() * 80 + 10}%`,
                      animationDelay: `${i * 0.2}s`
                    }}
                  ></div>
                ))}
              </div>
              
              {/* Cork */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-8 bg-yellow-800 rounded-md"></div>
            </div>
            
            {/* Sparkles for perfect potion */}
            {isPerfectPotion && (
              <>
                <Sparkles 
                  size={24}
                  className="absolute text-yellow-400 animate-float" 
                  style={{top: '10%', left: '20%', animationDelay: '0s'}}
                />
                <Sparkles 
                  size={16}
                  className="absolute text-yellow-400 animate-float" 
                  style={{top: '20%', left: '70%', animationDelay: '0.5s'}}
                />
                <Sparkles 
                  size={20}
                  className="absolute text-yellow-400 animate-float" 
                  style={{top: '60%', left: '80%', animationDelay: '1s'}}
                />
              </>
            )}
          </div>
          
          <p className="text-xl mb-8">
            {isPerfectPotion ? (
              "Amazing! You've created the perfect magical potion with no mistakes!"
            ) : (
              `You made ${mistakes} mistake${mistakes > 1 ? 's' : ''}, creating a funny but interesting potion!`
            )}
          </p>
          
          <Button onClick={onPlayAgain} className="magical-button">
            Brew Another Potion
          </Button>
        </div>
      ) : (
        <div className="text-2xl">
          Brewing your potion...
        </div>
      )}
    </div>
  );
};

export default ResultScreen;
