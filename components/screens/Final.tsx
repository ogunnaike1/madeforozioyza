"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Confetti } from "@/components/Confetti";
import { PhotoFrame } from "@/components/PhotoFrame";
import { CONFIG } from "@/lib/data";

const ease = [0.22, 1, 0.36, 1] as const;

const rise = {
  hidden: { opacity: 0, y: 28 },
  show: (d: number) => ({ opacity: 1, y: 0, transition: { duration: 0.9, delay: d, ease } }),
};

export function Final({ onReplay }: { onReplay: () => void }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="final-screen">
      <Confetti run={show} />

      <motion.div
        className="final-inner"
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.4, delayChildren: 0.35 } } }}
      >
        <motion.p className="ff-script final-pre" variants={rise} custom={0}>
          happy birthday
        </motion.p>

        <motion.h1
          className="ff-serif final-name"
          initial={{ opacity: 0, scale: 0.82, filter: "blur(8px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.1, delay: 0.7, ease }}
        >
          {CONFIG.displayName}{" "}
          <span className="final-heart">♡</span>
        </motion.h1>

        <motion.div className="final-photo" variants={rise} custom={0.6}>
          <PhotoFrame
            caption="the birthday girl ✨"
            idx={0}
            src="https://res.cloudinary.com/dhmqhless/image/upload/v1780596181/ozi4_skenxg.jpg"
          />
        </motion.div>

        <motion.p className="ff-serif final-sub" variants={rise} custom={0.9}>
          You mean more to me than words can say…
        </motion.p>

        <motion.div className="final-actions" variants={rise} custom={1.1}>
          <button className="btn-ghost" onClick={onReplay}>read it again ↺</button>
        </motion.div>
      </motion.div>
    </div>
  );
}
