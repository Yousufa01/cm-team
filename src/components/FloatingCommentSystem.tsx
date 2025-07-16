import { useState } from "react";
import { MessageCircle, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const FloatingCommentSystem = () => {
  const [isOpen, setIsOpen] = useState(false);
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
        description: "Please fill in your name and message.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from("comments")
        .insert({
          name: name.trim(),
          message: message.trim(),
        });

      if (error) throw error;

      // Show thank you animation
      setShowThankYou(true);
      
      // Reset form
      setName("");
      setMessage("");
      
      // Hide thank you message after 3 seconds and close modal
      setTimeout(() => {
        setShowThankYou(false);
        setIsOpen(false);
      }, 3000);

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

  const handleClose = () => {
    setIsOpen(false);
    setShowThankYou(false);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 group"
        aria-label="Leave a message"
      >
        <div className="relative">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-primary-glow/30 rounded-full blur-lg scale-110 opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
          
          {/* Main button */}
          <div className="relative bg-gradient-to-r from-primary to-primary-glow text-primary-foreground px-6 py-4 rounded-full shadow-elegant hover:shadow-glow transition-all duration-300 transform hover:scale-105 flex items-center gap-3">
            <MessageCircle className="w-5 h-5" />
            <span className="font-medium hidden sm:block">Drop a Note</span>
            <span className="font-medium sm:hidden">Message</span>
          </div>
        </div>
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-300"
          onClick={(e) => e.target === e.currentTarget && handleClose()}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
          
          {/* Modal Content */}
          <div className="relative w-full max-w-md mx-auto animate-in slide-in-from-bottom-4 scale-in duration-300">
            {!showThankYou ? (
              // Comment Form
              <div className="bg-gradient-to-br from-card/90 to-card/70 backdrop-blur-xl border border-primary/20 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                {/* Close Button */}
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 p-2 hover:bg-muted/50 rounded-full transition-colors duration-200"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Header */}
                <div className="text-center mb-6">
                  <div className="inline-flex items-center gap-2 text-primary mb-2">
                    <Sparkles className="w-6 h-6" />
                    <h2 className="text-2xl font-bold">Leave Your Mark</h2>
                  </div>
                  <p className="text-muted-foreground">
                    Share your thoughts and make this moment special
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      className="bg-background/50 border-primary/20 rounded-2xl px-4 py-3 text-center font-medium backdrop-blur-sm focus:border-primary/40 transition-all duration-200"
                      required
                    />
                  </div>
                  
                  <div>
                    <Textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Drop your message here... ✨"
                      rows={4}
                      className="bg-background/50 border-primary/20 rounded-2xl px-4 py-3 backdrop-blur-sm focus:border-primary/40 transition-all duration-200 resize-none"
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-primary to-primary-glow hover:from-primary-glow hover:to-primary text-primary-foreground font-medium py-3 rounded-2xl shadow-lg hover:shadow-glow transition-all duration-300 transform hover:scale-[1.02]" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                        Sending...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4" />
                        Send Message
                      </div>
                    )}
                  </Button>
                </form>
              </div>
            ) : (
              // Thank You Message
              <div className="bg-gradient-to-br from-card/90 to-card/70 backdrop-blur-xl border border-primary/20 rounded-3xl p-8 shadow-2xl text-center animate-in zoom-in duration-500">
                <div className="text-6xl mb-4 animate-bounce">✨</div>
                <h3 className="text-2xl font-bold text-primary mb-3">
                  Thanks for leaving your mark!
                </h3>
                <p className="text-lg text-muted-foreground mb-4">
                  Your words mean a lot and will be cherished. 💌
                </p>
                <div className="flex justify-center">
                  <div className="flex gap-1">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="w-2 h-2 bg-primary rounded-full animate-pulse"
                        style={{ animationDelay: `${i * 0.2}s` }}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};