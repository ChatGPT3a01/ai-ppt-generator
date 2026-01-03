import React, { useRef, useEffect, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
}

// 粒子顏色 - 使用漸層主色調（香蕉黃/橙色系）
const colors = [
  'rgba(251, 191, 36, 0.8)',   // 香蕉黃
  'rgba(245, 158, 11, 0.7)',   // 橙黃
  'rgba(249, 115, 22, 0.6)',   // 橙色
  'rgba(234, 179, 8, 0.7)',    // 金黃
  'rgba(255, 255, 255, 0.5)'   // 白色
];

function createParticle(x: number, y: number): Particle {
  const angle = Math.random() * Math.PI * 2;
  const speed = Math.random() * 2 + 0.5;
  return {
    x,
    y,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed - 1, // 稍微往上飄
    life: 0,
    maxLife: Math.random() * 30 + 20, // 20-50 幀
    size: Math.random() * 4 + 2,
    color: colors[Math.floor(Math.random() * colors.length)]
  };
}

export const ParticleEffect: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationIdRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 設定畫布大小
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();

    // 滑鼠移動事件
    const handleMouseMove = (e: MouseEvent) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      // 每次移動產生 2-3 個粒子
      const count = Math.floor(Math.random() * 2) + 2;
      for (let i = 0; i < count; i++) {
        particlesRef.current.push(createParticle(mouseX, mouseY));
      }

      // 限制粒子數量避免效能問題
      if (particlesRef.current.length > 100) {
        particlesRef.current = particlesRef.current.slice(-100);
      }
    };

    // 更新粒子
    const updateParticles = () => {
      particlesRef.current = particlesRef.current.filter(p => p.life < p.maxLife);

      for (const p of particlesRef.current) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.05; // 微小重力
        p.life++;
      }
    };

    // 繪製粒子
    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particlesRef.current) {
        const progress = p.life / p.maxLife;
        const alpha = 1 - progress;
        const size = p.size * (1 - progress * 0.5);

        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fillStyle = p.color.replace(/[\d.]+\)$/, `${alpha})`);
        ctx.fill();
      }
    };

    // 動畫循環
    const animate = () => {
      updateParticles();
      drawParticles();
      animationIdRef.current = requestAnimationFrame(animate);
    };

    // 添加事件監聽器
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    animate();

    // 清理
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-screen h-screen pointer-events-none"
      style={{ zIndex: 9999 }}
    />
  );
};

export default ParticleEffect;
