
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

interface TitleScreenProps {
  onStartGame: () => void;
}

const TitleScreen = ({ onStartGame }: TitleScreenProps) => {
  const [sparklePos, setSparklePos] = useState<{x: number, y: number, size: number, opacity: number}[]>([]);
  
  // Generate random sparkles
  useEffect(() => {
    const generateSparkles = () => {
      const newSparkles = Array(15).fill(0).map(() => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 1 + 0.5,
        opacity: Math.random() * 0.7 + 0.3
      }));
      setSparklePos(newSparkles);
    };
    
    generateSparkles();
    const interval = setInterval(generateSparkles, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="relative min-h-[70vh] flex flex-col items-center justify-center p-6">
      {/* Magical floating sparkles background */}
      {sparklePos.map((spark, i) => (
        <Sparkles 
          key={i}
          className="absolute animate-float text-magic-purple" 
          style={{
            top: `${spark.y}%`,
            left: `${spark.x}%`,
            transform: `scale(${spark.size})`,
            opacity: spark.opacity,
            animationDelay: `${i * 0.2}s`
          }}
        />
      ))}
      
      <div className="text-center z-10">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-magic-dark-purple">
          PEMDAS <br/>
          <span className="magical-gradient bg-clip-text text-transparent">Potion Maker</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-magic-purple mb-12">
          Mix magical ingredients with math!
        </p>
        
        <Button 
          onClick={onStartGame}
          className="magical-button group"
        >
          <span>Start Brewing</span>
          <Sparkles className="ml-2 inline-block group-hover:animate-puff" />
        </Button>
      </div>
    </div>
  );
};

export default TitleScreen;
