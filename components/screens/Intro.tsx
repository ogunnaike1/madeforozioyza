"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const line1Words = ["Wait", "for", "it…"];
const line2Words = ["This", "one", "is", "all", "for", "you", "✨"];

function WordReveal({ words, delay = 0, glow = false }: { words: string[]; delay?: number; glow?: boolean }) {
  return (
    <span style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0.28em" }}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 24, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, delay: delay + i * 0.14, ease }}
          style={glow ? {
            background: "linear-gradient(135deg, #ff0080, #c026d3, #a855f7)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            filter: "drop-shadow(0 0 12px rgba(255,0,128,0.5))",
          } : undefined}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

export function Intro({ onNext }: { onNext: () => void }) {
  const [showLine2, setShowLine2] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShowLine2(true), 1400);
    const t2 = setTimeout(() => setShowButton(true), 3200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div className="intro-screen">
      <div className="intro-inner">

        <motion.p
          className="ff-serif intro-line"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <WordReveal words={line1Words} delay={0.3} />
        </motion.p>

        <AnimatePresence>
          {showLine2 && (
            <motion.p
              className="ff-serif intro-line accent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <WordReveal words={line2Words} delay={0} glow />
            </motion.p>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showButton && (
            <motion.div
              key="btn"
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, ease }}
            >
              <button className="btn-neon" onClick={onNext}>Continue</button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
