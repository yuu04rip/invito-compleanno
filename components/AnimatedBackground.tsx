'use client';

import { useEffect, useRef } from 'react';

// Animation configuration
const BALLOON_COUNT = 20;
const CONFETTI_COUNT = 50;

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const balloons: Array<{
      x: number;
      y: number;
      radius: number;
      color: string;
      speed: number;
      angle: number;
      swingAngle: number;
    }> = [];

    // Enhanced birthday color palette
    const colors = [
      '#FFB6D9', // pink
      '#D5AAFF', // purple
      '#A8D8FF', // blue
      '#A8FFE5', // mint
      '#FFD4B2', // peach
      '#E7C6FF', // lavender
      '#FFF8B8', // yellow
      '#FF9CEE', // magenta
      '#B4E7CE', // seafoam
    ];

    // Create balloons
    for (let i = 0; i < BALLOON_COUNT; i++) {
      balloons.push({
        x: Math.random() * canvas.width,
        y: canvas.height + Math.random() * 300,
        radius: 25 + Math.random() * 35,
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: 0.4 + Math.random() * 0.6,
        angle: Math.random() * Math.PI * 2,
        swingAngle: Math.random() * Math.PI * 2,
      });
    }

    const confetti: Array<{
      x: number;
      y: number;
      rotation: number;
      color: string;
      speed: number;
      rotationSpeed: number;
      size: number;
      shape: 'rect' | 'circle';
    }> = [];

    // Create confetti
    for (let i = 0; i < CONFETTI_COUNT; i++) {
      confetti.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        rotation: Math.random() * 360,
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: 0.5 + Math.random() * 1.5,
        rotationSpeed: (Math.random() - 0.5) * 3,
        size: 4 + Math.random() * 6,
        shape: Math.random() > 0.5 ? 'rect' : 'circle',
      });
    }

    function drawBalloon(balloon: typeof balloons[0]) {
      if (!ctx) return;
      
      ctx.save();
      ctx.translate(balloon.x, balloon.y);
      
      // Balloon body with gradient
      const gradient = ctx.createRadialGradient(-balloon.radius / 4, -balloon.radius / 4, 0, 0, 0, balloon.radius);
      gradient.addColorStop(0, balloon.color);
      gradient.addColorStop(1, balloon.color + 'CC'); // Add some transparency at edges
      
      ctx.beginPath();
      ctx.arc(0, 0, balloon.radius, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
      
      // Highlight for shine effect
      ctx.beginPath();
      ctx.arc(-balloon.radius / 3, -balloon.radius / 3, balloon.radius / 3, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.fill();
      
      // String with slight curve
      ctx.beginPath();
      ctx.moveTo(0, balloon.radius);
      ctx.quadraticCurveTo(5, balloon.radius + 25, 0, balloon.radius + 50);
      ctx.strokeStyle = balloon.color + 'DD';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Small knot at the bottom of balloon
      ctx.beginPath();
      ctx.arc(0, balloon.radius, 3, 0, Math.PI * 2);
      ctx.fillStyle = balloon.color;
      ctx.fill();
      
      ctx.restore();
    }

    function drawConfetti(conf: typeof confetti[0]) {
      if (!ctx) return;
      
      ctx.save();
      ctx.translate(conf.x, conf.y);
      ctx.rotate((conf.rotation * Math.PI) / 180);
      
      ctx.fillStyle = conf.color;
      
      if (conf.shape === 'circle') {
        ctx.beginPath();
        ctx.arc(0, 0, conf.size / 2, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillRect(-conf.size / 2, -conf.size * 1.5 / 2, conf.size, conf.size * 1.5);
      }
      
      ctx.restore();
    }

    function animate() {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw balloons
      balloons.forEach((balloon) => {
        balloon.y -= balloon.speed;
        balloon.swingAngle += 0.02;
        balloon.x += Math.sin(balloon.swingAngle) * 0.8;

        if (balloon.y < -balloon.radius - 60) {
          balloon.y = canvas.height + balloon.radius + Math.random() * 100;
          balloon.x = Math.random() * canvas.width;
        }

        drawBalloon(balloon);
      });

      // Update and draw confetti
      confetti.forEach((conf) => {
        conf.y += conf.speed;
        conf.rotation += conf.rotationSpeed;
        conf.x += Math.sin(conf.y / 50) * 0.5;

        if (conf.y > canvas.height + 20) {
          conf.y = -20;
          conf.x = Math.random() * canvas.width;
        }

        drawConfetti(conf);
      });

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 opacity-60"
    />
  );
}
