import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PaperPlane } from "./PaperPlane";
import { PersonReplyBox } from "./PersonReplyBox";
import { Heart, Mail, ChevronDown, ChevronUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TeamMemberCardProps {
  name: string;
  message: string;
}

export const TeamMemberCard = ({ name, message }: TeamMemberCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [showSpecialAnimation, setShowSpecialAnimation] = useState(false);
  const { toast } = useToast();

  const handleExpandClick = () => {
    setIsExpanded(!isExpanded);
  };

  const handleReplySuccess = () => {
    setShowReplyBox(false);
    toast({
      title: "🎉 Your message to Yousuf has been sent! 💌",
      description: "Thank you for sharing your thoughts!",
      duration: 3000,
    });
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
        return "bg-gradient-to-br from-soft-white/50 to-gentle-lavender/30";
    }
  };

  const getPersonalAnimation = () => {
    switch (name) {
      case "Vrindha":
        return "🦒"; // Giraffe for the tall roast reference
      case "Hardik":
        return "🚴‍♂️"; // Bike for COD and go-kart reference
      case "Jenna":
        return "🏆"; // Trophy for manager/perfection reference
      case "Deno":
        return "🎨"; // Artist emoji for the mad artist reference
      case "Harshitha":
        return "❓"; // Question mark for all the questions reference
      case "Surbhi":
        return "🏀"; // Basketball for the sessions reference
      default:
        return "✨";
    }
  };

  return (
    <div className="space-y-2 card-float">
      <Card 
        className={`cursor-pointer liquid-glass liquid-hover group transition-all duration-300 balloon-effect ${getCardTheme()} ${isExpanded ? 'scale-105 shadow-2xl' : ''}`}
        onClick={handleExpandClick}
      >
        <CardContent className="p-6 text-center relative overflow-hidden">
          {/* Animated character overlay */}
          <div className="absolute top-2 left-2 text-2xl animate-bounce opacity-70 group-hover:opacity-100 transition-opacity duration-300">
            {getPersonalAnimation()}
          </div>
          
          {/* Sparkle effects on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
            <div className="absolute top-4 right-4 text-yellow-400 animate-pulse">✨</div>
            <div className="absolute bottom-4 left-4 text-yellow-400 animate-pulse" style={{ animationDelay: '0.5s' }}>✨</div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-yellow-400 animate-pulse" style={{ animationDelay: '1s' }}>💫</div>
          </div>
          
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <PaperPlane size={16} />
          </div>
          
          <div className="mb-3 relative">
            <div className="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
              <Heart className="w-6 h-6 text-primary group-hover:text-red-500 transition-colors duration-300" />
            </div>
          </div>
          
          <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:scale-105 transition-transform duration-300">{name}</h3>
          <p className="text-sm text-muted-foreground mb-3">
            {isExpanded ? "Click to collapse" : "Click to read your message"}
          </p>
          <div className="flex justify-center">
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-primary group-hover:scale-110 transition-transform duration-300" />
            ) : (
              <ChevronDown className="w-5 h-5 text-primary group-hover:scale-110 transition-transform duration-300" />
            )}
          </div>
        </CardContent>
      </Card>

      {/* Expanded Message Content */}
      {isExpanded && (
        <div className="animate-in slide-in-from-top-2 duration-500 fade-in">
          <Card className="liquid-glass liquid-glass-glow">
            <CardContent className="p-6">
              <div className="text-foreground leading-relaxed space-y-4 text-left">
                {message.split('\n').map((line, index) => (
                  <p key={index} className="text-sm md:text-base">{line}</p>
                ))}
              </div>
              
              <div className="mt-6 flex flex-col items-center gap-4">
                <PaperPlane size={24} className="text-primary/50" />
                
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowReplyBox(!showReplyBox);
                    // Trigger special animation for Hardik's bike
                    if (name === "Hardik" && !showReplyBox) {
                      setShowSpecialAnimation(true);
                      setTimeout(() => setShowSpecialAnimation(false), 2000);
                    }
                  }}
                  className="bg-gradient-to-r from-primary/80 to-accent/80 hover:from-primary hover:to-accent text-primary-foreground rounded-2xl px-6 py-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 backdrop-blur-sm relative overflow-hidden"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  {showReplyBox ? "Cancel Reply" : "Reply to Yousuf"}
                  
                  {/* Special bike animation for Hardik */}
                  {name === "Hardik" && showSpecialAnimation && (
                    <div className="absolute top-1/2 left-0 transform -translate-y-1/2 text-xl animate-ping">
                      🚴‍♂️
                    </div>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Inline Reply Box */}
      {showReplyBox && isExpanded && (
        <div className="animate-in slide-in-from-bottom-2 duration-300 fade-in">
          <PersonReplyBox 
            personName="Yousuf" 
            onClose={() => setShowReplyBox(false)}
            onSuccess={handleReplySuccess}
          />
        </div>
      )}
    </div>
  );
};