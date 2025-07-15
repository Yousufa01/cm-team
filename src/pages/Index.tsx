import { FloatingPaperPlane, DriftingPaperPlane } from "@/components/PaperPlane";
import { TeamMemberCard } from "@/components/TeamMemberCard";

const teamMembers = [
  {
    name: "Vrindha",
    message: "My last and forever QC buddy. From your AI giraffe snaps to your epic roasts, I've learnt so much from your patience and people skills. This one's QC'd by you in spirit 🦒."
  },
  {
    name: "Hardik", 
    message: "COD Marshal and pitstop partner. I still remember you weren't thrilled about a guy joining the team — hope I changed your mind 😄. Our go-kart battle is still pending."
  },
  {
    name: "Jenna",
    message: "One of the best managers I've had. Your eye for detail and support helped me grow so much. Missing our Winning Streak rivalry already!"
  },
  {
    name: "Deno",
    message: "Desk buddy by force, friend by chaos. From nun dances to Malayalam 101, it's been a ride. I'll miss my volunteer partner and your mad creativity."
  },
  {
    name: "Harshitha", 
    message: "My OG desk buddy who patiently answered all my questions. Your curiosity and calm are something I'll always admire."
  },
  {
    name: "Surbhi",
    message: "My first trainee. From basketball chaos to quick learning, it's been fun watching you grow. And no, my Death Note still isn't for sale 😄."
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-soft-blue to-sky-blue relative overflow-hidden">
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
        {/* Hero section */}
        <section className="text-center py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
              Thank You, Team ✈️
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              One last scroll through the people who made this journey unforgettable.
            </p>
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

        {/* Final message */}
        <section className="py-20 px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="bg-card/60 backdrop-blur-sm border border-primary/20 rounded-2xl p-8 shadow-lg">
              <p className="text-lg md:text-xl text-foreground italic opacity-80">
                Ctrl + Alt + Leave — One last sign-off, 
                <span className="font-semibold text-primary"> Yousuf</span> 💙
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Index;
