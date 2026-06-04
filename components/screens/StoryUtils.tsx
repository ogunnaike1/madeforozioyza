"use client";
import { motion } from "framer-motion";
import { PhotoFrame } from "@/components/PhotoFrame";
import { StorySection } from "@/lib/data";

const ease = [0.22, 1, 0.36, 1] as const;

export function Reveal({
  children,
  delay = 0,
  y = 24,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.85, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHead({ s }: { s: StorySection }) {
  return (
    <div style={{ marginBottom: 36 }}>
      <Reveal><span className="s-emoji">{s.emoji}</span></Reveal>
      <Reveal delay={0.08}><span className="s-eyebrow">{s.kicker}</span></Reveal>
      <Reveal delay={0.08}><div className="s-rule" /></Reveal>
      {s.title && <Reveal delay={0.16}><h2 className="ff-serif s-title">{s.title}</h2></Reveal>}
    </div>
  );
}

export function Paras({ list }: { list?: string[] }) {
  if (!list) return null;
  return (
    <>
      {list.map((p, i) => (
        <Reveal key={i} delay={0.05 * i}>
          <p className="ff-body s-para">{p}</p>
        </Reveal>
      ))}
    </>
  );
}

export function PullQuote({ children }: { children: React.ReactNode }) {
  return (
    <Reveal>
      <div className="s-quote">
        <p className="ff-serif s-quote-text">{children}</p>
      </div>
    </Reveal>
  );
}

export function SectionBody({ s }: { s: StorySection }) {
  return (
    <>
      <Paras list={s.paras} />
      {s.quote && <PullQuote>{s.quote}</PullQuote>}
      <Paras list={s.parasAfter} />
      {s.quote2 && <PullQuote>{s.quote2}</PullQuote>}

      {s.photos && (
        <div className="s-media">
          {s.photoNote && (
            <Reveal>
              <span className="ff-script s-photo-note">{s.photoNote}</span>
            </Reveal>
          )}
          <div className="s-photo-grid">
            {s.photos.map((p, i) => (
              <PhotoFrame key={i} caption={p.caption} idx={i} src={p.src} />
            ))}
          </div>
        </div>
      )}

      {s.wishlist && (
        <div className="s-wishlist">
          {s.wishlist.map((w, i) => (
            <Reveal key={i} delay={0.07 * i}>
              <div className="s-wish">
                <span className="s-wish-dot">✦</span>
                <span className="ff-body s-wish-txt">{w}</span>
              </div>
            </Reveal>
          ))}
        </div>
      )}

      {s.blessing && (
        <div className="s-blessing">
          {s.blessing.map((b, i) => (
            <Reveal key={i} delay={0.09 * i}>
              <p className="ff-serif s-blessing-line">{b}</p>
            </Reveal>
          ))}
        </div>
      )}

      {s.closing && (
        <Reveal>
          <span className="ff-script s-closing">{s.closing}</span>
        </Reveal>
      )}
    </>
  );
}
