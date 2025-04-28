
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

interface ResultScreenProps {
  mistakes: number;
  onPlayAgain: () => void;
}

interface PotionType {
  name: string;
  color: string;
  bubbleColor: string;
  description: string;
}

const ResultScreen = ({ mistakes, onPlayAgain }: ResultScreenProps) => {
  const [showResults, setShowResults] = useState(false);
  
  // Define potion types based on number of mistakes
  const getPotionType = (mistakeCount: number): PotionType => {
    if (mistakeCount === 0) {
      return {
        name: "Perfect PEMDAS Potion",
        color: "bg-gradient-to-b from-magic-green to-magic-blue",
        bubbleColor: "bg-white",
        description: "Amazing! You've created the perfect magical potion with no mistakes!"
      };
    } else if (mistakeCount <= 2) {
      return {
        name: "Magnificent Magical Mixture",
        color: "bg-gradient-to-b from-magic-purple to-magic-blue",
        bubbleColor: "bg-blue-200",
        description: `You made only ${mistakeCount} mistake${mistakeCount === 1 ? '' : 's'}, creating a near-perfect potion!`
      };
    } else if (mistakeCount <= 4) {
      return {
        name: "Sparkling Sorcerer's Solution",
        color: "bg-gradient-to-b from-blue-400 to-purple-400",
        bubbleColor: "bg-purple-200",
        description: `You made ${mistakeCount} mistakes, creating a strong but slightly unpredictable potion!`
      };
    } else if (mistakeCount <= 6) {
      return {
        name: "Whimsical Wizard's Brew",
        color: "bg-gradient-to-b from-yellow-400 to-orange-400",
        bubbleColor: "bg-yellow-200",
        description: `You made ${mistakeCount} mistakes, creating a quirky potion with unexpected properties!`
      };
    } else if (mistakeCount <= 8) {
      return {
        name: "Chaotic Concoction",
        color: "bg-gradient-to-b from-orange-400 to-pink-400",
        bubbleColor: "bg-pink-200",
        description: `With ${mistakeCount} mistakes, your potion is unpredictable but still magical in its own way!`
      };
    } else {
      return {
        name: "Super Silly Potion",
        color: "bg-gradient-to-b from-red-500 to-red-700",
        bubbleColor: "bg-black",
        description: `You made ${mistakeCount} mistakes, creating a funny and completely unpredictable potion!`
      };
    }
  };
  
  const potionType = getPotionType(mistakes);
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
              <span className="magical-gradient bg-clip-text text-transparent">{potionType.name}!</span>
            ) : (
              <span className="text-magic-purple">{potionType.name}!</span>
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
                className={`absolute top-12 w-[90%] h-40 rounded-xl left-[5%] ${potionType.color}`}
              >
                {/* Bubbles/sparkles */}
                {Array(8).fill(0).map((_, i) => (
                  <div 
                    key={i}
                    className={`absolute w-3 h-3 rounded-full ${potionType.bubbleColor} animate-float opacity-70`}
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
            {potionType.description}
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
