"use client";
import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

interface VideoCardProps {
  src: string;
  idx?: number;
  label?: string;
}

const DEFAULT_LABELS = ["just her, in her element 🌸", "she's everything 💜"];

export function VideoCard({ src, idx = 0, label }: VideoCardProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [activeSrc, setActiveSrc] = useState("");
  const [inView, setInView] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const preloadObserver = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setActiveSrc(src); preloadObserver.disconnect(); } },
      { rootMargin: "1200px", threshold: 0 }
    );
    const playObserver = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
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
      className="vc-wrap"
      initial={{ opacity: 0, y: 60, scale: 0.88, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      whileHover={{ y: -6, scale: 1.03 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.85, delay: idx * 0.2, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* soft bloom glow */}
      <motion.div
        className="vc-bloom"
        animate={{
          opacity: inView ? [0.5, 0.85, 0.5] : 0,
          scale: inView ? [1, 1.06, 1] : 0.9,
        }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: idx * 0.2 }}
      />

      <div className="vc-inner">
        {activeSrc && (
          <video
            ref={videoRef}
            src={activeSrc}
            loop muted playsInline preload="auto"
            crossOrigin="anonymous"
            className="vc-video"
            onLoadedMetadata={() => setLoaded(true)}
          />
        )}

        {/* loading shimmer */}
        {(!loaded || !activeSrc) && <div className="vc-shimmer" />}

        {/* play overlay fades out when playing */}
        <motion.div
          className="vc-overlay"
          animate={{ opacity: inView && loaded ? 0 : 1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="vc-play-btn"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="vc-play-icon">▶</span>
          </motion.div>
        </motion.div>

        {/* soft inner vignette */}
        <div className="vc-vignette" />
      </div>

      <motion.p
        className="ff-script vc-label"
        animate={{ opacity: inView ? 1 : 0.4, y: inView ? 0 : 6 }}
        transition={{ duration: 0.4 }}
      >
        {label ?? DEFAULT_LABELS[idx % DEFAULT_LABELS.length]}
      </motion.p>
    </motion.div>
  );
}
