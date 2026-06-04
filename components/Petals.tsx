"use client";
import { useMemo } from "react";

const GLYPHS = ["🌸", "✿", "❀", "✦", "⭐", "🌺", "✶", "❋", "★", "✽"];
const COLORS = ["#ff0080", "#ff4da6", "#c026d3", "#a855f7", "#7c3aed", "#e879f9", "#ffffff"];

export function Petals({ count = 22 }: { count?: number }) {
  const items = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 14 + Math.random() * 18,
      delay: -Math.random() * 28,
      dur: 12 + Math.random() * 14,
      sx: (Math.random() - 0.5) * 120,
      op: 0.45 + Math.random() * 0.4,
      glyph: GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    }));
  }, [count]);

  return (
    <div className="sparkles" aria-hidden="true">
      {items.map((p) => (
        <span
          key={p.id}
          style={{
            left: `${p.left}%`,
            fontSize: `${p.size}px`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.dur}s`,
            ["--sx" as string]: `${p.sx}px`,
            opacity: p.op,
            color: p.color,
            filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.08))",
          }}
        >
          {p.glyph}
        </span>
      ))}
    </div>
  );
}
