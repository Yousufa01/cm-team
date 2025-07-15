import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { PaperPlane } from "./PaperPlane";
import { Heart } from "lucide-react";

interface TeamMemberCardProps {
  name: string;
  message: string;
}

export const TeamMemberCard = ({ name, message }: TeamMemberCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Card className="cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg bg-card/80 backdrop-blur-sm border border-primary/20 group">
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
      
      <DialogContent className="max-w-md mx-auto bg-warm-white border border-primary/20 shadow-xl">
        <div className="text-center p-6">
          <div className="mb-4">
            <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Heart className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">{name}</h2>
          </div>
          
          <div className="text-foreground leading-relaxed space-y-3">
            {message.split('\n').map((line, index) => (
              <p key={index} className="text-sm md:text-base">{line}</p>
            ))}
          </div>
          
          <div className="mt-6 flex justify-center">
            <PaperPlane size={24} className="text-primary/50" />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};