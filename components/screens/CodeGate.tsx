"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { CONFIG } from "@/lib/data";

const ease = [0.22, 1, 0.36, 1] as const;

export function CodeGate({ onUnlock, onCorrect }: { onUnlock: () => void; onCorrect?: () => void }) {
  const [val, setVal] = useState("");
  const [err, setErr] = useState(false);
  const [ok, setOk] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const guess = val.trim().toLowerCase();
    const answer = String(CONFIG.secretCode).trim().toLowerCase();
    if (guess === answer) {
      setOk(true);
      setErr(false);
      onCorrect?.();
      setTimeout(onUnlock, 1000);
    } else {
      setErr(true);
      setTimeout(() => setErr(false), 600);
    }
  };

  return (
    <div className="gate-screen">
      <motion.form
        onSubmit={submit}
        className={"gate-inner " + (err ? "gate-shake" : "")}
        initial={{ opacity: 0, y: 40 }}
        animate={ok
          ? { opacity: 0, y: -20, transition: { duration: 0.8 } }
          : { opacity: 1, y: 0, transition: { duration: 0.9, ease } }
        }
      >
        <motion.p
          className="ff-script gate-greet"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease }}
        >
          Happy Birthday,
        </motion.p>

        <motion.p
          className="ff-serif gate-name"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease }}
        >
          {CONFIG.fullName}
        </motion.p>

        <motion.div
          className="gate-icon"
          animate={ok ? { scale: [1, 1.3, 1], rotate: [0, -10, 10, 0] } : {}}
          transition={{ duration: 0.6 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.45 }}
        >
          {ok ? "💝" : "🔒"}
        </motion.div>

        <motion.p
          className="gate-sub"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.55 }}
        >
          enter your secret code to come in
        </motion.p>

        <div className="gate-rule" />

        <motion.input
          className="gate-input"
          value={val}
          onChange={(e) => setVal(e.target.value)}
          placeholder="· · · ·"
          autoComplete="off"
          spellCheck={false}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.55 }}
        />

        {CONFIG.codeHint && (
          <motion.p
            className={"gate-hint " + (err ? "err" : "")}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            {err ? "not quite… try again" : CONFIG.codeHint}
          </motion.p>
        )}

        <motion.div
          className="gate-submit"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.85, ease }}
        >
          <button type="submit" className="btn-solid">Unlock 🔓</button>
        </motion.div>
      </motion.form>
    </div>
  );
}
