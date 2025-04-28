
interface CauldronProps {
  ingredients: {type: string, animation: string}[];
}

const Cauldron = ({ ingredients }: CauldronProps) => {
  return (
    <div className="w-full md:w-1/2 flex flex-col items-center">
      <div className="relative w-64 h-64">
        <div className="absolute bottom-0 w-full h-3/4 bg-black rounded-b-full"></div>
        <div className="absolute bottom-[75%] w-full h-[10%] bg-gray-700 rounded-full"></div>
        <div 
          className="cauldron-content w-[80%] h-[60%] bg-magic-purple bg-opacity-80"
          style={{top: '45%'}}
        >
          <div className="absolute w-6 h-6 bg-white rounded-full opacity-50 animate-cauldron-bubble" 
               style={{left: '20%', top: '20%', animationDelay: '0s'}}></div>
          <div className="absolute w-4 h-4 bg-white rounded-full opacity-50 animate-cauldron-bubble" 
               style={{left: '60%', top: '30%', animationDelay: '0.5s'}}></div>
          <div className="absolute w-5 h-5 bg-white rounded-full opacity-50 animate-cauldron-bubble" 
               style={{left: '40%', top: '50%', animationDelay: '1s'}}></div>
          
          {ingredients.map((ingredient, i) => (
            <div 
              key={i} 
              className={`absolute w-8 h-8 rounded-full ${
                ingredient.type === 'magical' ? 'bg-magic-green' : 'bg-orange-400'
              }`}
              style={{
                left: `${25 + (i * 8)}%`, 
                top: `${40 + (i % 3) * 15}%`,
                animation: `float 2s ease-in-out infinite`,
                animationDelay: `${i * 0.3}s`
              }}
            ></div>
          ))}
        </div>
      </div>
      
      <div className="mt-4 text-center">
        <p className="text-xl font-semibold text-magic-dark-purple">
          Ingredients: {ingredients.length}
        </p>
        <p className="text-sm text-magic-purple">
          Magical: {ingredients.filter(i => i.type === 'magical').length}
          <span className="mx-2">|</span>
          Silly: {ingredients.filter(i => i.type === 'silly').length}
        </p>
      </div>
    </div>
  );
};

export default Cauldron;
