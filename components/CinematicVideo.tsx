"use client";
import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

export function CinematicVideo({ src }: { src: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [activeSrc, setActiveSrc] = useState("");
  const [inView, setInView] = useState(false);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const preloadObserver = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setActiveSrc(src); preloadObserver.disconnect(); } },
      { rootMargin: "1200px", threshold: 0 }
    );
    const playObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setEntered(true);
        setInView(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    preloadObserver.observe(el);
    playObserver.observe(el);
    return () => { preloadObserver.disconnect(); playObserver.disconnect(); };
  }, [src]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v || !activeSrc) return;
    if (inView) { v.play().catch(() => {}); }
    else { v.pause(); v.currentTime = 0; }
  }, [inView, activeSrc]);

  return (
    <motion.div
      ref={wrapRef}
      className="cv-outer"
      initial={{ opacity: 0, y: 80, scale: 0.9, filter: "blur(14px)" }}
      animate={entered ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" } : {}}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, scale: 1.02 }}
      style={{ perspective: 1000 }}
    >
      {/* ambient bloom behind the frame */}
      <motion.div
        className="cv-bloom"
        animate={{
          opacity: inView ? [0.5, 0.9, 0.5] : 0,
          scale: inView ? [1, 1.08, 1] : 0.9,
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* elegant border frame */}
      <motion.div
        className="cv-border"
        animate={{ opacity: inView ? 1 : 0.3 }}
        transition={{ duration: 0.8 }}
      />

      <div className="cv-frame" style={{ position: "relative" }}>
        {activeSrc ? (
          <video
            ref={videoRef}
            src={activeSrc}
            loop muted playsInline preload="auto"
            crossOrigin="anonymous"
            className="cv-video"
          />
        ) : (
          <div style={{ width: "100%", aspectRatio: "9/16", background: "rgba(0,0,0,0.4)" }} />
        )}

        {/* soft inner glow overlay */}
        <div className="cv-inner-glow" aria-hidden="true" />

        {/* play overlay */}
        <motion.div
          className="cv-overlay"
          animate={{ opacity: inView && activeSrc ? 0 : 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="cv-play"
            animate={{ scale: [1, 1.08, 1], opacity: [0.85, 1, 0.85] }}
            transition={{ repeat: Infinity, duration: 2.6, ease: "easeInOut" }}
          >
            <span className="cv-play-icon">▶</span>
          </motion.div>
          <motion.p
            className="ff-script cv-play-label"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ repeat: Infinity, duration: 2.6, ease: "easeInOut" }}
          >
            just her 🌸
          </motion.p>
        </motion.div>

        <div className="cv-vignette" />
      </div>

      <motion.p
        className="ff-script cv-caption"
        initial={{ opacity: 0, y: 12 }}
        animate={entered ? { opacity: inView ? 1 : 0.4, y: 0 } : { opacity: 0, y: 12 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        unbothered & beautiful 🎞️
      </motion.p>
    </motion.div>
  );
}
