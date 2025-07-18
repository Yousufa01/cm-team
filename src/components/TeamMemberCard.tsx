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
        return "bg-card/80";
    }
  };

  return (
    <div className="space-y-2">
      <Card 
        className={`cursor-pointer liquid-glass liquid-hover group transition-all duration-300 ${getCardTheme()} ${isExpanded ? 'scale-105 shadow-2xl' : ''}`}
        onClick={handleExpandClick}
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
          <p className="text-sm text-muted-foreground mb-3">
            {isExpanded ? "Click to collapse" : "Click to read your message"}
          </p>
          <div className="flex justify-center">
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-primary" />
            ) : (
              <ChevronDown className="w-5 h-5 text-primary" />
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
                  }}
                  className="bg-gradient-to-r from-primary/80 to-accent/80 hover:from-primary hover:to-accent text-primary-foreground rounded-2xl px-6 py-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 backdrop-blur-sm"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  {showReplyBox ? "Cancel Reply" : "Reply to Yousuf"}
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