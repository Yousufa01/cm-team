import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Send, MessageCircle } from "lucide-react";

export const InlineCommentBox = () => {
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
      setName("");
      setMessage("");
      
      setTimeout(() => setShowThankYou(false), 4000);
    } catch (error) {
      console.error("Error submitting comment:", error);
      toast({
        title: "Error",
        description: "Failed to submit your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showThankYou) {
    return (
      <div className="w-full max-w-2xl mx-auto mb-8">
        <div className="relative backdrop-blur-md bg-gradient-to-r from-blush-pink/20 via-gentle-lavender/30 to-sky-blue/20 border border-primary/30 rounded-3xl p-8 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="absolute inset-0 bg-gradient-to-r from-blush-pink/10 to-sky-blue/10 rounded-3xl blur-xl"></div>
          <div className="relative text-center">
            <div className="text-4xl mb-4 animate-bounce">✨</div>
            <h3 className="text-2xl font-bold text-foreground mb-3">
              Thanks for leaving your mark! 
            </h3>
            <p className="text-lg text-muted-foreground">
              Your words mean a lot and will be cherished. 💌
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div className="relative backdrop-blur-md bg-gradient-to-r from-soft-white/40 via-gentle-lavender/20 to-blush-pink/30 border border-primary/30 rounded-3xl p-6 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-sky-blue/5 to-pastel-mint/10 rounded-3xl blur-xl"></div>
        
        <form onSubmit={handleSubmit} className="relative space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-primary/10 rounded-full">
              <MessageCircle className="w-5 h-5 text-primary" />
            </div>
            <Input
              type="text"
              placeholder="Got something to say? Drop your thoughts here… ✈️"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="flex-1 bg-soft-white/60 border-primary/20 rounded-2xl placeholder:text-muted-foreground/70 focus:ring-2 focus:ring-primary/30 backdrop-blur-sm"
              disabled={isSubmitting}
            />
          </div>
          
          <Textarea
            placeholder="Share your thoughts, memories, or just say hello..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="min-h-[120px] bg-soft-white/60 border-primary/20 rounded-2xl placeholder:text-muted-foreground/70 focus:ring-2 focus:ring-primary/30 backdrop-blur-sm resize-none"
            disabled={isSubmitting}
          />
          
          <div className="flex justify-end">
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground rounded-2xl px-6 py-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-primary-foreground/20 border-t-primary-foreground rounded-full animate-spin"></div>
                  Sending...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Send className="w-4 h-4" />
                  Send Message
                </div>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};