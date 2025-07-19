import { useEffect, useRef } from "react";

function SplashCursor() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Particle system for splash effect
    const particles = [];
    const maxParticles = 50;

    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 8;
        this.vy = (Math.random() - 0.5) * 8;
        this.life = 1;
        this.decay = Math.random() * 0.02 + 0.01;
        this.size = Math.random() * 4 + 2;
        this.color = {
          r: Math.floor(Math.random() * 100 + 155),
          g: Math.floor(Math.random() * 100 + 155),
          b: Math.floor(Math.random() * 100 + 255),
        };
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vx *= 0.99;
        this.vy *= 0.99;
        this.life -= this.decay;
        this.size *= 0.98;
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.life;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.life})`;
        ctx.fill();
        ctx.restore();
      }
    }

    // Mouse/touch event handlers
    const createSplash = (x, y) => {
      for (let i = 0; i < 8; i++) {
        if (particles.length < maxParticles) {
          particles.push(new Particle(x, y));
        }
      }
    };

    const handleMouseMove = (e) => {
      createSplash(e.clientX, e.clientY);
    };

    const handleTouchMove = (e) => {
      e.preventDefault();
      for (let touch of e.touches) {
        createSplash(touch.clientX, touch.clientY);
      }
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const particle = particles[i];
        particle.update();
        particle.draw();

        // Remove dead particles
        if (particle.life <= 0 || particle.size <= 0.1) {
          particles.splice(i, 1);
        }
      }

      requestAnimationFrame(animate);
    };

    // Start animation
    animate();

    // Add event listeners
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 50,
        pointerEvents: 'none',
        width: '100%',
        height: '100%',
      }}
    >
      <canvas
        ref={canvasRef}
        id="fluid"
        style={{
          width: '100vw',
          height: '100vh',
          display: 'block',
        }}
      />
    </div>
  );
}

export default SplashCursor;