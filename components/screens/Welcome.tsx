"use client";
import { PrimaryButton } from "@/components/Buttons";
import { PhotoFrame } from "@/components/PhotoFrame";
import { VideoCard } from "@/components/VideoCard";
import { STORY } from "@/lib/data";
import { Reveal } from "./StoryUtils";

const VIDEOS = [
  "https://res.cloudinary.com/dhmqhless/video/upload/v1780596190/ozi_video1_tzd8tx.mp4",
];

export function Welcome({ onNext }: { onNext: () => void }) {
  const s = STORY[0];

  return (
    <div className="story-screen">
      <div className="story-body">
        <section className="s-section">
          <Reveal><span className="s-emoji">{s.emoji}</span></Reveal>
          <Reveal delay={0.08}><span className="s-eyebrow">{s.kicker}</span></Reveal>
          <Reveal delay={0.08}><div className="s-rule" /></Reveal>

          {s.paras.map((p, i) => (
            <Reveal key={i} delay={0.06 * i}>
              <p className="ff-body s-para">{p}</p>
            </Reveal>
          ))}

          {s.photos && (
            <div className="s-media">
              {s.photoNote && (
                <Reveal><span className="ff-script s-photo-note">{s.photoNote}</span></Reveal>
              )}
              <div className="s-photo-grid">
                {s.photos.map((p, i) => (
                  <PhotoFrame key={i} caption={p.caption} idx={i} src={p.src} />
                ))}
              </div>
            </div>
          )}

          <div className="s-media">
            <div className="s-video-grid">
              {VIDEOS.map((url, i) => (
                <VideoCard key={i} src={url} idx={i} />
              ))}
            </div>
          </div>
        </section>

        <section className="s-section s-end">
          <Reveal delay={0.1}>
            <PrimaryButton onClick={onNext}>Our Story →</PrimaryButton>
          </Reveal>
        </section>
      </div>
    </div>
  );
}
