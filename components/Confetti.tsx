"use client";
import { useRef, useEffect } from "react";

type Shape = "heart" | "star" | "sparkle" | "circle";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  s: number;
  rot: number;
  vr: number;
  color: string;
  shape: Shape;
  sway: number;
}

const COLORS = ["#ff0080", "#ff4da6", "#c026d3", "#a855f7", "#7c3aed", "#e879f9", "#ff66b3", "#d946ef"];
const SHAPES: Shape[] = ["heart", "star", "sparkle", "circle"];

export function Confetti({ run }: { run: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!run) return;
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf: number;
    const DPR = Math.min(window.devicePixelRatio || 1, 2);

    function size() {
      if (!canvas) return;
      canvas.width = window.innerWidth * DPR;
      canvas.height = window.innerHeight * DPR;
    }
    size();
    window.addEventListener("resize", size);

    const N = 180;

    function spawn(initial: boolean): Particle {
      const w = canvas!.width, h = canvas!.height;
      return {
        x: Math.random() * w,
        y: initial ? Math.random() * h - h : -20 * DPR,
        vx: (Math.random() - 0.5) * 1.6 * DPR,
        vy: (1.2 + Math.random() * 2.4) * DPR,
        s: (5 + Math.random() * 8) * DPR,
        rot: Math.random() * Math.PI * 2,
        vr: (Math.random() - 0.5) * 0.18,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
        sway: Math.random() * Math.PI * 2,
      };
    }

    const parts: Particle[] = Array.from({ length: N }).map(() => spawn(true));

    function drawHeart(x: number, y: number, s: number, rot: number, color: string) {
      ctx!.save();
      ctx!.translate(x, y);
      ctx!.rotate(rot);
      ctx!.scale(s / 16, s / 16);
      ctx!.fillStyle = color;
      ctx!.beginPath();
      ctx!.moveTo(0, 5);
      ctx!.bezierCurveTo(0, 2, -3, -3, -8, -3);
      ctx!.bezierCurveTo(-15, -3, -15, 6, -15, 6);
      ctx!.bezierCurveTo(-15, 11, -9, 16, 0, 21);
      ctx!.bezierCurveTo(9, 16, 15, 11, 15, 6);
      ctx!.bezierCurveTo(15, 6, 15, -3, 8, -3);
      ctx!.bezierCurveTo(3, -3, 0, 2, 0, 5);
      ctx!.fill();
      ctx!.restore();
    }

    function drawStar(x: number, y: number, s: number, rot: number, color: string) {
      ctx!.save();
      ctx!.translate(x, y);
      ctx!.rotate(rot);
      ctx!.fillStyle = color;
      ctx!.beginPath();
      for (let i = 0; i < 5; i++) {
        const outer = (Math.PI * 2 * i) / 5 - Math.PI / 2;
        const inner = outer + Math.PI / 5;
        if (i === 0) ctx!.moveTo(Math.cos(outer) * s, Math.sin(outer) * s);
        else ctx!.lineTo(Math.cos(outer) * s, Math.sin(outer) * s);
        ctx!.lineTo(Math.cos(inner) * s * 0.42, Math.sin(inner) * s * 0.42);
      }
      ctx!.closePath();
      ctx!.fill();
      ctx!.restore();
    }

    function drawSparkle(x: number, y: number, s: number, rot: number, color: string) {
      ctx!.save();
      ctx!.translate(x, y);
      ctx!.rotate(rot);
      ctx!.fillStyle = color;
      ctx!.beginPath();
      for (let i = 0; i < 4; i++) {
        const a = (Math.PI / 2) * i;
        const b = a + Math.PI / 4;
        if (i === 0) ctx!.moveTo(Math.cos(a) * s, Math.sin(a) * s);
        else ctx!.lineTo(Math.cos(a) * s, Math.sin(a) * s);
        ctx!.lineTo(Math.cos(b) * s * 0.22, Math.sin(b) * s * 0.22);
      }
      ctx!.closePath();
      ctx!.fill();
      ctx!.restore();
    }

    function drawCircle(x: number, y: number, s: number, color: string) {
      ctx!.save();
      ctx!.fillStyle = color;
      ctx!.globalAlpha = 0.85;
      ctx!.beginPath();
      ctx!.arc(x, y, s * 0.5, 0, Math.PI * 2);
      ctx!.fill();
      ctx!.restore();
    }

    function frame() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      parts.forEach((p) => {
        p.sway += 0.02;
        p.x += p.vx + Math.sin(p.sway) * 0.55 * DPR;
        p.y += p.vy;
        p.rot += p.vr;
        if (p.y > canvas!.height + 30 * DPR) Object.assign(p, spawn(false));

        switch (p.shape) {
          case "heart":    drawHeart(p.x, p.y, p.s * 1.3, p.rot, p.color); break;
          case "star":     drawStar(p.x, p.y, p.s, p.rot, p.color); break;
          case "sparkle":  drawSparkle(p.x, p.y, p.s, p.rot, p.color); break;
          case "circle":   drawCircle(p.x, p.y, p.s, p.color); break;
        }
      });
      raf = requestAnimationFrame(frame);
    }
    frame();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", size);
    };
  }, [run]);

  return <canvas ref={ref} className="confetti-canvas" aria-hidden="true" />;
}
