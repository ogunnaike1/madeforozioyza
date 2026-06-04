"use client";
import { motion } from "framer-motion";

interface PhotoFrameProps {
  caption: string;
  idx?: number;
  src?: string;
}

export function PhotoFrame({ caption, idx = 0, src }: PhotoFrameProps) {
  const tilt = [-3, 2.5, -2, 3][idx % 4];

  return (
    <motion.figure
      className="pf-wrap"
      style={{ rotate: `${tilt}deg` }}
      initial={{ opacity: 0, y: 70, scale: 0.85, rotate: `${tilt + 12}deg`, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, scale: 1, rotate: `${tilt}deg`, filter: "blur(0px)" }}
      whileHover={{ scale: 1.06, rotate: "0deg", y: -8, zIndex: 10 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, delay: idx * 0.15, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="pf-glow"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        whileHover={{ opacity: 1.4 }}
        transition={{ duration: 1.4, delay: idx * 0.15 + 0.3 }}
      />

      <div className="pf-frame">
        <div className="pf-shine" aria-hidden="true" />
        <div className="pf-img">
          {src ? (
            <img src={src} alt={caption} />
          ) : (
            <div className="photo-ph">
              <span className="photo-ph-ic">♡</span>
              <span className="photo-ph-txt">your photo here</span>
            </div>
          )}
        </div>
      </div>

      <motion.figcaption
        className="ff-script pf-caption"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: idx * 0.15 + 0.45 }}
      >
        {caption}
      </motion.figcaption>
    </motion.figure>
  );
}
