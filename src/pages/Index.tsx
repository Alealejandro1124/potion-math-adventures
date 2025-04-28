
import GameContainer from "@/components/game/GameContainer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-magic-light-purple">
      <header className="py-4 text-center">
        <h1 className="text-4xl font-bold text-magic-dark-purple">PEMDAS Potion Master Challenge</h1>
        <p className="text-magic-purple">Test your order of operations skills with 10 challenging problems!</p>
      </header>
      <GameContainer />
    </div>
  );
};

export default Index;
