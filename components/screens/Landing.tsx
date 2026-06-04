"use client";
import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

export function Landing({ onNext }: { onNext: () => void }) {
  return (
    <div className="landing-screen">
      <motion.p
        className="ff-serif landing-pre"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3, ease }}
      >
        a birthday surprise
      </motion.p>

      <motion.div
        className="landing-rule"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.7, ease }}
      />

      <motion.h1
        className="landing-title"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.9, ease }}
      >
        This one&apos;s
        <em>for you,</em>
        <span className="landing-name">Ozi Oyza</span>
      </motion.h1>

      <motion.div
        className="landing-cta"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 1.8, ease }}
      >
        <button className="btn-solid" onClick={onNext}>
          Open ✨
        </button>
      </motion.div>
    </div>
  );
}
