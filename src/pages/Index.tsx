import { FloatingPaperPlane, DriftingPaperPlane } from "@/components/PaperPlane";
import { TeamMemberCard } from "@/components/TeamMemberCard";
import { FloatingCommentSystem } from "@/components/FloatingCommentSystem";


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
  return (
    <div className="min-h-screen relative overflow-hidden liquid-bg-1">
      {/* 3D Liquid Glass Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated liquid blobs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 liquid-bg-2 rounded-full blur-3xl floating-shape opacity-30"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 liquid-bg-3 rounded-full blur-3xl floating-shape-delayed opacity-25"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 liquid-bg-1 rounded-full blur-2xl floating-shape-delayed-2 opacity-20"></div>
        
        {/* Additional floating 3D shapes */}
        <div className="absolute top-10 right-10 w-32 h-32 liquid-glass rounded-3xl floating-shape rotate-45"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 liquid-glass rounded-full floating-shape-delayed"></div>
        <div className="absolute top-1/3 right-1/3 w-16 h-40 liquid-glass rounded-2xl floating-shape-delayed-2 rotate-12"></div>
      </div>
      {/* Floating background paper planes */}
      <FloatingPaperPlane 
        className="top-20 left-10" 
        size={20} 
        animationClass="float-gentle"
      />
      <FloatingPaperPlane 
        className="top-32 right-20" 
        size={16} 
        animationClass="float-gentle-delayed"
      />
      <FloatingPaperPlane 
        className="top-60 left-1/4" 
        size={18} 
        animationClass="float-gentle-delayed-2"
      />
      <FloatingPaperPlane 
        className="bottom-40 right-16" 
        size={22} 
        animationClass="float-gentle"
      />
      <FloatingPaperPlane 
        className="bottom-60 left-16" 
        size={14} 
        animationClass="float-gentle-delayed"
      />
      
      {/* Drifting paper planes */}
      <DriftingPaperPlane 
        className="top-1/4" 
        size={12} 
        direction="right"
      />
      <DriftingPaperPlane 
        className="top-1/2" 
        size={14} 
        direction="left"
      />
      <DriftingPaperPlane 
        className="top-3/4" 
        size={10} 
        direction="right"
      />
      
      {/* Main content */}
      <div className="relative z-10">
        {/* Group Photo Section */}
        <section className="py-16 px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="relative inline-block mb-12">
              <div className="polaroid-float bg-gradient-to-br from-soft-white to-gentle-lavender/20 backdrop-blur-sm p-6 shadow-2xl rounded-2xl transform rotate-2 border border-primary/20">
                <img 
                  src="/lovable-uploads/5c54394f-d9e3-4fd1-bf91-23f07fda1f30.png"
                  alt="Team Group Photo"
                  className="w-full max-w-2xl rounded-xl"
                />
                <div className="text-center mt-4 text-lg text-foreground font-medium">
                  The amazing team that made it all worthwhile ✨
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Hero section */}
        <section className="text-center py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="liquid-glass liquid-glass-glow rounded-3xl p-8 mb-8 liquid-hover">
              <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                Thank You, Team! 💖
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                One last scroll through the people who made this journey unforgettable.
              </p>
            </div>
            
          </div>
        </section>

        {/* Team members grid */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <div
                  key={member.name}
                  className="animate-in fade-in slide-in-from-bottom-4"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <TeamMemberCard 
                    name={member.name} 
                    message={member.message}
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
    </div>
  );
};

export default Index;
