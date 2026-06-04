"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QUIZ } from "@/lib/data";

type Phase = "quiz" | "gift" | "count";
const ease = [0.22, 1, 0.36, 1] as const;

export function Interlude({ onNext }: { onNext: () => void }) {
  const [phase, setPhase] = useState<Phase>("quiz");
  const [count, setCount] = useState(3);

  useEffect(() => {
    if (phase !== "count") return;
    if (count <= 0) {
      const t = setTimeout(onNext, 700);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setCount((c) => c - 1), 900);
    return () => clearTimeout(t);
  }, [phase, count, onNext]);

  return (
    <div className="il-screen">
      <AnimatePresence mode="wait">
        {phase === "quiz" && (
          <motion.div
            key="quiz"
            className="il-stack"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.6, ease }}
          >
            <h2 className="ff-serif il-question">{QUIZ.question}</h2>
            <div className="il-opts">
              {QUIZ.options.map((o, i) => (
                <button key={i} className="btn-ghost" onClick={() => setPhase("gift")}>
                  {o}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {phase === "gift" && (
          <motion.div
            key="gift"
            className="il-stack"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.55, ease }}
          >
            <p className="ff-serif il-tap">tap the gift</p>
            <motion.button
              className="il-gift"
              onClick={() => setPhase("count")}
              animate={{ rotate: [0, -5, 5, -5, 0], y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              whileTap={{ scale: 0.88 }}
            >
              🎁
            </motion.button>
          </motion.div>
        )}

        {phase === "count" && (
          <motion.div
            key="count"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={count}
                className="ff-serif il-count"
                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.6, y: -20 }}
                transition={{ duration: 0.45, ease }}
              >
                {count > 0 ? count : "♡"}
              </motion.span>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
