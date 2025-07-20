import React, { useState } from "react";
import { FloatingPaperPlane, DriftingPaperPlane } from "@/components/PaperPlane";
import { TeamMemberCard } from "@/components/TeamMemberCard";
import { FloatingCommentSystem } from "@/components/FloatingCommentSystem";
import Iridescence from "@/components/Iridescence";
import SplashCursor from "@/components/SplashCursor";
import TiltedCard from "@/components/TiltedCard";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PersonReplyBox } from "@/components/PersonReplyBox";
import { useToast } from "@/hooks/use-toast";


const teamMembers = [
  {
    name: "Vrindha",
    message: "My last and forever QC buddy. Honestly, the only tomboy one needs in a group. From your AI giraffe snaps to your ability to roast me back with equal fire, I'm going to miss all of it. I've learnt so much from your patience, your insane people skills, and the way you get things done without ever losing your cool. May the traffic gods be kind to you on your new Whitefield commute. And yes, this one's been QC'd by you in spirit (as always)... Tallest roast in the room 🦒."
  },
  {
    name: "Hardik", 
    message: "COD Marshal, pitstop partner, buddy, and the senior I've learnt so much from. I still remember you weren't exactly thrilled when a guy got recruited into the team, guess I changed your mind 😄. The way you tackle work with speed and precision is something I seriously want to steal. Our go-kart battle is still pending. Let's see who really drives better, without a revive this time."
  },
  {
    name: "Jenna",
    message: "One of the best managers I've had, hands down. Your eye for perfection is something I've tried (and failed) to match, but I've grown so much under your mentorship. You've always had my back, always pushed me to do better, and I'm super grateful for that. Also, already missing our Winning Streak rivalry, even though I spent most rounds just trying to catch up 😄."
  },
  {
    name: "Deno",
    message: "My so-called best desk buddy… mostly because I had no choice 😄. But honestly, wouldn't have traded that seat. From our legendary nun dance to your Malayalam crash courses, it's been chaos in the best way. Thank you for always being the one who heard out my rants and stress rambles without flinching. Hopefully this time you'll not \"BE ABLE\" to break any bones. I'll miss my volunteer partner and the mad artist that you are."
  },
  {
    name: "Harshitha", 
    message: "My OG desk buddy and the very first one who had to deal with all my questions. Let's just say... definitely better than the desk buddy I have now. Lol, just kidding. Maybe. Your curiosity to learn across different domains and your dedication is something I'll always carry forward. I've definitely learnt how to be more curious and consistent from you."
  },
  {
    name: "Surbhi",
    message: "My first trainee (feels good to finally be a senior 😄). Didn't get much time together, but it's been fun. From live class chaos to random basketball sessions, you've picked things up super quickly, and seeing you grow has been genuinely cool. And yes, my Death Note is still not for sale."
  }
];

const Index = () => {
  const [selectedMember, setSelectedMember] = useState<typeof teamMembers[0] | null>(null);
  const [showReplyBox, setShowReplyBox] = useState(false);
  const { toast } = useToast();

  const handleReplySuccess = () => {
    setShowReplyBox(false);
    toast({
      title: "🎉 Your message to Yousuf has been sent! 💌",
      description: "Thank you for sharing your thoughts!",
      duration: 3000,
    });
  };

  // Parallax scroll effect and glass message animation
  React.useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const rate = scrolled * -0.5;
      const blur = Math.min(scrolled / 10, 10);
      const scale = 1.1 + (scrolled / 2000);
      
      const heroBg = document.getElementById('hero-bg');
      if (heroBg) {
        heroBg.style.transform = `translateY(${rate}px) scale(${scale})`;
        heroBg.style.filter = `blur(${blur}px)`;
      }

      // Glass message animation
      const glassMessage = document.getElementById('glass-message');
      if (glassMessage) {
        if (scrolled > 50) {
          glassMessage.classList.add('visible');
        } else {
          glassMessage.classList.remove('visible');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen relative">
      <Iridescence color={[1, 1, 1]} mouseReact={false} amplitude={0.1} speed={1.0} />
      <SplashCursor />
      {/* Hero Section with Team Photo Background */}
      <section className="relative h-screen overflow-hidden">
        {/* Parallax Background Image */}
        <div 
          className="absolute inset-0 transition-all duration-1000 ease-out"
          style={{
            backgroundImage: `url('/lovable-uploads/5c54394f-d9e3-4fd1-bf91-23f07fda1f30.png')`,
            backgroundSize: 'contain',
            backgroundPosition: 'center top',
            backgroundRepeat: 'no-repeat',
            transform: `scale(1.1)`,
            filter: `blur(0px)`
          }}
          id="hero-bg"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/40 to-background/90" />
        
        {/* 3D Liquid Glass Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 liquid-bg-2 rounded-full blur-3xl floating-shape opacity-20"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 liquid-bg-3 rounded-full blur-3xl floating-shape-delayed opacity-15"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 liquid-bg-1 rounded-full blur-2xl floating-shape-delayed-2 opacity-10"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-end h-full text-center px-4 pb-32">
          <div 
            id="glass-message"
            className="glass-message liquid-glass liquid-glass-glow rounded-3xl p-8 mb-8 liquid-hover max-w-4xl"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Thank You, Team! 💖
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              One last scroll through the people who made this journey unforgettable.
            </p>
          </div>
          
          {/* Scroll Hint */}
          <div className="absolute bottom-8 animate-bounce">
            <div className="text-4xl">↓</div>
            <p className="text-sm text-muted-foreground mt-2">Scroll to explore</p>
          </div>
        </div>
      </section>

      {/* Floating background paper planes */}
      <FloatingPaperPlane 
        className="fixed top-20 left-10 z-5" 
        size={20} 
        animationClass="float-gentle"
      />
      <FloatingPaperPlane 
        className="fixed top-32 right-20 z-5" 
        size={16} 
        animationClass="float-gentle-delayed"
      />
      <FloatingPaperPlane 
        className="fixed bottom-40 right-16 z-5" 
        size={22} 
        animationClass="float-gentle"
      />

      {/* Main content */}
      <div className="relative z-10 liquid-bg-1 min-h-screen">

        {/* Team members grid */}
        <section className="py-8 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {teamMembers.map((member, index) => (
                <div
                  key={member.name}
                  className="animate-in fade-in slide-in-from-bottom-4 cursor-pointer"
                  style={{ animationDelay: `${index * 150}ms` }}
                  onClick={() => setSelectedMember(member)}
                >
                  <TiltedCard
                    imageSrc=""
                    altText={`${member.name} card`}
                    captionText={`Click to read ${member.name}'s message`}
                    containerHeight="280px"
                    containerWidth="250px"
                    imageHeight="250px"
                    imageWidth="250px"
                    overlayContent={
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-accent/80 rounded-2xl flex flex-col items-center justify-center p-6 text-white text-center">
                        <h3 className="font-bold text-2xl mb-3">{member.name}</h3>
                        <p className="text-sm opacity-90">Click to read message</p>
                      </div>
                    }
                    displayOverlayContent={true}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Closing Message */}
        <section className="py-20 px-4 text-center scroll-reveal">
          <div className="max-w-4xl mx-auto">
            <div className="relative liquid-glass liquid-glass-glow rounded-3xl p-12 liquid-hover">
              <div className="absolute inset-0 liquid-bg-2 rounded-3xl blur-xl opacity-30"></div>
              <div className="relative">
                <p className="text-xl md:text-2xl text-foreground leading-relaxed mb-8">
                  To the whole team, thank you for being the best part of my first job. I'm walking away with more than just skills. I'm carrying friendships, stories, and people I'll always root for.
                </p>
              </div>
            </div>
          </div>
        </section>



        {/* Final Signature */}
        <section className="py-20 px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="relative liquid-glass liquid-glass-glow rounded-3xl p-8 liquid-hover">
              <div className="absolute inset-0 liquid-bg-1 rounded-3xl blur-xl opacity-20"></div>
              <div className="relative">
                <p className="text-lg md:text-xl text-foreground italic opacity-90">
                  Ctrl + Alt + Leave<br />
                  One last sign-off, <span className="font-semibold text-primary">Yousuf</span> 💙
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Floating Comment System */}
      <FloatingCommentSystem />

      {/* Message Modal */}
      <Dialog open={!!selectedMember} onOpenChange={() => setSelectedMember(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">
              Message for {selectedMember?.name}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div className="text-foreground leading-relaxed space-y-4">
              {selectedMember?.message.split('\n').map((line, index) => (
                <p key={index} className="text-base">{line}</p>
              ))}
            </div>
            
            <div className="flex flex-col items-center gap-4 pt-4 border-t">
              <Button
                onClick={() => setShowReplyBox(!showReplyBox)}
                className="bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80 text-primary-foreground rounded-2xl px-6 py-2 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {showReplyBox ? "Cancel Reply" : "Reply to Yousuf"}
              </Button>
              
              {showReplyBox && (
                <div className="w-full animate-in slide-in-from-bottom-2 duration-300 fade-in">
                  <PersonReplyBox 
                    personName="Yousuf" 
                    onClose={() => setShowReplyBox(false)}
                    onSuccess={handleReplySuccess}
                  />
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
