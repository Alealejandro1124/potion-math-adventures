
import { useState } from "react";
import TitleScreen from "./TitleScreen";
import InstructionScreen from "./InstructionScreen";
import GameScreen from "./GameScreen";
import ResultScreen from "./ResultScreen";

type GameStage = "title" | "instructions" | "playing" | "results";

const GameContainer = () => {
  const [gameStage, setGameStage] = useState<GameStage>("title");
  const [mistakes, setMistakes] = useState(0);
  
  const handleStartGame = () => {
    setGameStage("instructions");
  };
  
  const handleStartPlaying = () => {
    setGameStage("playing");
    setMistakes(0);
  };
  
  const handleGameComplete = (mistakesMade: number) => {
    setMistakes(mistakesMade);
    setGameStage("results");
  };
  
  const handlePlayAgain = () => {
    setGameStage("title");
  };
  
  return (
    <div className="min-h-screen w-full max-w-5xl mx-auto py-8 px-4">
      {gameStage === "title" && (
        <TitleScreen onStartGame={handleStartGame} />
      )}
      
      {gameStage === "instructions" && (
        <InstructionScreen onContinue={handleStartPlaying} />
      )}
      
      {gameStage === "playing" && (
        <GameScreen onComplete={handleGameComplete} />
      )}
      
      {gameStage === "results" && (
        <ResultScreen mistakes={mistakes} onPlayAgain={handlePlayAgain} />
      )}
    </div>
  );
};

export default GameContainer;
