import { useRef, useEffect } from 'react';
import { createFluidSimulation } from './utils/fluidSim';

function SplashCursor() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const sim = createFluidSimulation(canvasRef.current);
    return () => sim.dispose();
  }, []);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, zIndex: 50, pointerEvents: 'none', width: '100%', height: '100%' }}>
      <canvas ref={canvasRef} id="fluid" style={{ width: '100vw', height: '100vh', display: 'block' }} />
    </div>
  );
}

export default SplashCursor;