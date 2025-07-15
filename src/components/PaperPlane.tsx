import { Plane } from "lucide-react";

interface PaperPlaneProps {
  className?: string;
  size?: number;
}

export const PaperPlane = ({ className = "", size = 24 }: PaperPlaneProps) => {
  return (
    <div className={`text-primary/30 ${className}`}>
      <Plane size={size} className="drop-shadow-sm" />
    </div>
  );
};

export const FloatingPaperPlane = ({ 
  className = "", 
  size = 20,
  animationClass = "float-gentle"
}: PaperPlaneProps & { animationClass?: string }) => {
  return (
    <div className={`absolute ${animationClass} ${className}`}>
      <PaperPlane size={size} />
    </div>
  );
};

export const DriftingPaperPlane = ({ 
  className = "", 
  size = 16,
  direction = "right"
}: PaperPlaneProps & { direction?: "left" | "right" }) => {
  const animationClass = direction === "right" ? "drift-right" : "drift-left";
  
  return (
    <div className={`fixed z-0 ${animationClass} ${className}`}>
      <PaperPlane size={size} />
    </div>
  );
};