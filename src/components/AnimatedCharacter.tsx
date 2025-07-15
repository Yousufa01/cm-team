import { useEffect, useState } from "react";

interface AnimatedCharacterProps {
  name: string;
  onAnimationComplete?: () => void;
}

export const AnimatedCharacter = ({ name, onAnimationComplete }: AnimatedCharacterProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      onAnimationComplete?.();
    }, 2000);
    return () => clearTimeout(timer);
  }, [onAnimationComplete]);

  const getCharacterContent = () => {
    switch (name) {
      case "Vrindha":
        return (
          <div className={`flex items-center justify-center space-x-2 ${isVisible ? 'giraffe-appear' : 'opacity-0'}`}>
            <div className="text-6xl">🦒</div>
            <div className="text-2xl">🔥</div>
          </div>
        );
      case "Hardik":
        return (
          <div className={`flex items-center justify-center ${isVisible ? 'motorbike-zip' : 'opacity-0'}`}>
            <div className="text-6xl">🏍️</div>
            <div className="text-2xl">💨</div>
          </div>
        );
      case "Jenna":
        return (
          <div className={`flex items-center justify-center space-x-2 ${isVisible ? 'trophy-sparkle' : 'opacity-0'}`}>
            <div className="text-6xl">🏆</div>
            <div className="text-2xl">✨</div>
          </div>
        );
      case "Deno":
        return (
          <div className={`flex items-center justify-center space-x-2 ${isVisible ? 'nun-dance' : 'opacity-0'}`}>
            <div className="text-6xl">👯‍♀️</div>
            <div className="text-2xl">🎨</div>
          </div>
        );
      case "Harshitha":
        return (
          <div className={`flex items-center justify-center space-x-2 ${isVisible ? 'lightbulb-burst' : 'opacity-0'}`}>
            <div className="text-6xl">💡</div>
            <div className="text-2xl">❓</div>
          </div>
        );
      case "Surbhi":
        return (
          <div className={`flex items-center justify-center space-x-2 ${isVisible ? 'basketball-bounce' : 'opacity-0'}`}>
            <div className="text-6xl">🏀</div>
            <div className="text-2xl">📚</div>
          </div>
        );
      default:
        return <div className="text-6xl">✈️</div>;
    }
  };

  return (
    <div className="py-8">
      {getCharacterContent()}
    </div>
  );
};