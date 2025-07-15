import { useState } from "react";
import { CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { PaperPlane } from "./PaperPlane";
import { Character3D } from "./Character3D";
import { InteractiveCard3D } from "./InteractiveCard3D";
import { Heart } from "lucide-react";

interface TeamMemberCardProps {
  name: string;
  message: string;
}

export const TeamMemberCard = ({ name, message }: TeamMemberCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const handleCardClick = () => {
    setIsOpen(true);
    setShowAnimation(true);
    setShowMessage(false);
  };

  const handleAnimationComplete = () => {
    setShowMessage(true);
  };

  const getCardTheme = () => {
    switch (name) {
      case "Vrindha":
        return "bg-gradient-to-br from-blush-pink/30 to-gentle-lavender/30";
      case "Hardik":
        return "bg-gradient-to-br from-sky-blue/30 to-pastel-mint/30";
      case "Jenna":
        return "bg-gradient-to-br from-gentle-lavender/30 to-blush-pink/30";
      case "Deno":
        return "bg-gradient-to-br from-pastel-mint/30 to-sky-blue/30";
      case "Harshitha":
        return "bg-gradient-to-br from-soft-white/50 to-gentle-lavender/30";
      case "Surbhi":
        return "bg-gradient-to-br from-blush-pink/30 to-sky-blue/30";
      default:
        return "bg-card/80";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <InteractiveCard3D name={name} onClick={handleCardClick}>
          <CardContent className="p-6 text-center relative overflow-hidden">
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <PaperPlane size={16} />
            </div>
            <div className="mb-3">
              <div className="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-3">
                <Heart className="w-6 h-6 text-primary" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">{name}</h3>
            <p className="text-sm text-muted-foreground">Click to read your message</p>
          </CardContent>
        </InteractiveCard3D>
      </DialogTrigger>
      
      <DialogContent className="max-w-2xl mx-auto bg-gradient-to-br from-soft-white to-gentle-lavender/20 border border-primary/20 shadow-xl">
        <div className="text-center p-6">
          {showAnimation && (
            <Character3D name={name} onComplete={handleAnimationComplete} />
          )}
          
          {showMessage && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-2xl font-bold text-foreground mb-6">{name}</h2>
              
              <div className="text-foreground leading-relaxed space-y-4 text-left max-w-lg mx-auto">
                {message.split('\n').map((line, index) => (
                  <p key={index} className="text-sm md:text-base">{line}</p>
                ))}
              </div>
              
              <div className="mt-8 flex justify-center">
                <PaperPlane size={24} className="text-primary/50" />
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};