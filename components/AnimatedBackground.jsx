import { useEffect, useRef } from "react";

export default function AnimatedBackground({ theme = "dark" }) {
  const ref = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles = [];
    const PARTICLE_COUNT = Math.min(80, Math.floor(window.innerWidth/20));
    function rand(min,max){ return Math.random()*(max-min)+min; }

    for (let i=0;i<PARTICLE_COUNT;i++){
      particles.push({
        x: rand(0,width), y: rand(0,height),
        vx: rand(-0.12,0.12), vy: rand(-0.03,0.03),
        r: rand(0.6,2.6), hue: rand(200,280), alpha: rand(0.06,0.18)
      });
    }

    let t = 0;
    function resize() { width = canvas.width = window.innerWidth; height = canvas.height = window.innerHeight; }
    window.addEventListener("resize", resize);

    function draw(){
      t += 0.0025;
      const g = ctx.createLinearGradient(0,0,width,height);
      g.addColorStop(0, "#05060a");
      g.addColorStop(0.6, "#100a25");
      g.addColorStop(1, "#07071a");
      ctx.fillStyle = g;
      ctx.fillRect(0,0,width,height);

      ctx.globalCompositeOperation = "lighter";
      for (let p of particles){
        p.x += p.vx; p.y += p.vy;
        if (p.x < -20) p.x = width+20;
        if (p.x > width+20) p.x = -20;
        if (p.y < -20) p.y = height+20;
        if (p.y > height+20) p.y = -20;

        const rad = Math.max(0.4,p.r);
        const grad = ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,rad*8);
        const color = `hsla(${p.hue},70%,60%,${p.alpha})`;
        grad.addColorStop(0,color);
        grad.addColorStop(0.4,`hsla(${p.hue},70%,55%,${p.alpha*0.35})`);
        grad.addColorStop(1,"rgba(0,0,0,0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x,p.y,rad*8,0,Math.PI*2);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    }
    draw();
    return () => { cancelAnimationFrame(rafRef.current); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <div aria-hidden style={{ position:"fixed", inset:0, zIndex:-1, pointerEvents:"none", overflow:"hidden" }}>
      <canvas ref={ref} style={{ width:"100%", height:"100%", display:"block" }} />
    </div>
  );
}
