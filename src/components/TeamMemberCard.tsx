import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PaperPlane } from "./PaperPlane";
import { AnimatedCharacter } from "./AnimatedCharacter";
import { PersonReplyBox } from "./PersonReplyBox";
import { Heart, Mail } from "lucide-react";

interface TeamMemberCardProps {
  name: string;
  message: string;
}

export const TeamMemberCard = ({ name, message }: TeamMemberCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showReplyBox, setShowReplyBox] = useState(false);

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
        <Card 
          className={`cursor-pointer liquid-glass liquid-hover group ${getCardTheme()}`}
          onClick={handleCardClick}
        >
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
        </Card>
      </DialogTrigger>
      
      <DialogContent className="max-w-2xl mx-auto liquid-glass liquid-glass-glow">
        <div className="text-center p-6">
          {showAnimation && (
            <AnimatedCharacter name={name} onAnimationComplete={handleAnimationComplete} />
          )}
          
          {showMessage && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-2xl font-bold text-foreground mb-6">{name}</h2>
              
              <div className="text-foreground leading-relaxed space-y-4 text-left max-w-lg mx-auto">
                {message.split('\n').map((line, index) => (
                  <p key={index} className="text-sm md:text-base">{line}</p>
                ))}
              </div>
              
              <div className="mt-8 flex flex-col items-center gap-4">
                <PaperPlane size={24} className="text-primary/50" />
                
                <Button
                  onClick={() => setShowReplyBox(!showReplyBox)}
                  className="bg-gradient-to-r from-primary/80 to-accent/80 hover:from-primary hover:to-accent text-primary-foreground rounded-2xl px-6 py-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 backdrop-blur-sm"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Leave a message
                </Button>
              </div>

              {showReplyBox && (
                <PersonReplyBox 
                  personName={name} 
                  onClose={() => setShowReplyBox(false)} 
                />
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};