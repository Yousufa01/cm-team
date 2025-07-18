import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Mail, Send, X } from "lucide-react";

interface PersonReplyBoxProps {
  personName: string;
  onClose: () => void;
  onSuccess?: () => void;
}

export const PersonReplyBox = ({ personName, onClose, onSuccess }: PersonReplyBoxProps) => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !message.trim()) {
      toast({
        title: "Missing information",
        description: "Please fill in both your name and message.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from("comments")
        .insert([
          {
            name: name.trim(),
            message: message.trim(),
          },
        ]);

      if (error) throw error;

      setShowThankYou(true);
      setTimeout(() => {
        setShowThankYou(false);
        onSuccess?.();
      }, 2000);
    } catch (error) {
      console.error("Error submitting reply:", error);
      toast({
        title: "Error",
        description: "Failed to submit your reply. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showThankYou) {
    return (
      <div className="mt-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="relative backdrop-blur-md bg-gradient-to-r from-blush-pink/20 via-gentle-lavender/30 to-sky-blue/20 border border-primary/30 rounded-2xl p-6 shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-r from-blush-pink/10 to-sky-blue/10 rounded-2xl blur-lg"></div>
          <div className="relative text-center">
            <div className="text-3xl mb-3 animate-bounce">🎉</div>
            <h4 className="text-lg font-semibold text-foreground mb-2">
              Thanks for leaving your mark! ✨
            </h4>
            <p className="text-sm text-muted-foreground">
              Your message has been received! 💌
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="relative liquid-glass liquid-glass-glow rounded-2xl p-4">
        <div className="absolute inset-0 liquid-bg-3 rounded-2xl blur-lg opacity-20"></div>
        
        <div className="relative">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">
                Replying to Yousuf...
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0 hover:bg-primary/10 rounded-full"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <Input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-background/90 border-border text-foreground placeholder:text-muted-foreground rounded-xl text-sm focus:ring-2 focus:ring-primary/30"
              disabled={isSubmitting}
            />
            
            <Textarea
              placeholder="Your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-[80px] bg-background/90 border-border text-foreground placeholder:text-muted-foreground rounded-xl text-sm focus:ring-2 focus:ring-primary/30 resize-none"
              disabled={isSubmitting}
            />
            
            <div className="flex justify-end gap-2">
              <Button 
                type="button"
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="rounded-xl text-sm"
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                size="sm"
                disabled={isSubmitting}
                className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground rounded-xl px-4 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 border-2 border-primary-foreground/20 border-t-primary-foreground rounded-full animate-spin"></div>
                    Sending...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Send className="w-3 h-3" />
                    Send
                  </div>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};