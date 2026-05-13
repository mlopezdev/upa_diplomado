"use client";

import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
}

const NODE_COUNT = 38;
const CONNECTION_DISTANCE = 140;
const SPEED = 0.28;

export function NodeNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const rafRef = useRef<number>(0);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    const W = () => canvas.offsetWidth;
    const H = () => canvas.offsetHeight;

    // Init nodes
    nodesRef.current = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * W(),
      y: Math.random() * H(),
      vx: (Math.random() - 0.5) * SPEED,
      vy: (Math.random() - 0.5) * SPEED,
      radius: Math.random() * 2 + 1.5,
      opacity: Math.random() * 0.5 + 0.3,
    }));

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", () => {
      mouseRef.current = { x: -9999, y: -9999 };
    });

    const draw = () => {
      const w = W();
      const h = H();
      ctx.clearRect(0, 0, w, h);

      const nodes = nodesRef.current;
      const mouse = mouseRef.current;

      // Update positions
      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
        n.x = Math.max(0, Math.min(w, n.x));
        n.y = Math.max(0, Math.min(h, n.y));
      });

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DISTANCE) {
            const alpha = (1 - dist / CONNECTION_DISTANCE) * 0.18;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(37,99,235,${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        // Mouse interaction — highlight nearby nodes
        const mdx = nodes[i].x - mouse.x;
        const mdy = nodes[i].y - mouse.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        const mouseRadius = 120;
        if (mdist < mouseRadius) {
          const alpha = (1 - mdist / mouseRadius) * 0.35;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(37,99,235,${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      // Draw nodes
      nodes.forEach((n) => {
        const mdx = n.x - mouse.x;
        const mdy = n.y - mouse.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        const highlight = mdist < 120 ? (1 - mdist / 120) * 0.5 : 0;

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius + highlight * 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(37,99,235,${n.opacity + highlight})`;
        ctx.fill();
      });

      rafRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.65 }}
    />
  );
}
