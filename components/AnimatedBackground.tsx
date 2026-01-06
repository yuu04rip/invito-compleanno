'use client';

import { useEffect, useRef } from 'react';

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
    }> = [];

    const colors = ['#FFB6D9', '#D5AAFF', '#A8D8FF', '#A8FFE5', '#FFD4B2', '#E7C6FF', '#FFF8B8'];

    // Create balloons
    for (let i = 0; i < 15; i++) {
      balloons.push({
        x: Math.random() * canvas.width,
        y: canvas.height + Math.random() * 200,
        radius: 20 + Math.random() * 30,
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: 0.3 + Math.random() * 0.5,
        angle: Math.random() * Math.PI * 2,
      });
    }

    const confetti: Array<{
      x: number;
      y: number;
      rotation: number;
      color: string;
      speed: number;
      rotationSpeed: number;
    }> = [];

    // Create confetti
    for (let i = 0; i < 30; i++) {
      confetti.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        rotation: Math.random() * 360,
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: 0.5 + Math.random() * 1,
        rotationSpeed: (Math.random() - 0.5) * 2,
      });
    }

    function drawBalloon(balloon: typeof balloons[0]) {
      if (!ctx) return;
      
      ctx.save();
      ctx.translate(balloon.x, balloon.y);
      
      // Balloon body
      ctx.beginPath();
      ctx.arc(0, 0, balloon.radius, 0, Math.PI * 2);
      ctx.fillStyle = balloon.color;
      ctx.fill();
      
      // Highlight
      ctx.beginPath();
      ctx.arc(-balloon.radius / 3, -balloon.radius / 3, balloon.radius / 4, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.fill();
      
      // String
      ctx.beginPath();
      ctx.moveTo(0, balloon.radius);
      ctx.lineTo(0, balloon.radius + 40);
      ctx.strokeStyle = balloon.color;
      ctx.lineWidth = 1;
      ctx.stroke();
      
      ctx.restore();
    }

    function drawConfetti(conf: typeof confetti[0]) {
      if (!ctx) return;
      
      ctx.save();
      ctx.translate(conf.x, conf.y);
      ctx.rotate((conf.rotation * Math.PI) / 180);
      ctx.fillStyle = conf.color;
      ctx.fillRect(-3, -6, 6, 12);
      ctx.restore();
    }

    function animate() {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw balloons
      balloons.forEach((balloon) => {
        balloon.y -= balloon.speed;
        balloon.x += Math.sin(balloon.angle) * 0.5;
        balloon.angle += 0.01;

        if (balloon.y < -balloon.radius - 50) {
          balloon.y = canvas.height + balloon.radius;
          balloon.x = Math.random() * canvas.width;
        }

        drawBalloon(balloon);
      });

      // Update and draw confetti
      confetti.forEach((conf) => {
        conf.y += conf.speed;
        conf.rotation += conf.rotationSpeed;

        if (conf.y > canvas.height) {
          conf.y = -10;
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
      className="fixed top-0 left-0 w-full h-full -z-10 opacity-50"
    />
  );
}
