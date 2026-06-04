"use client";
import { PrimaryButton } from "@/components/Buttons";
import { PhotoFrame } from "@/components/PhotoFrame";
import { CinematicVideo } from "@/components/CinematicVideo";
import { STORY } from "@/lib/data";
import { Reveal, SectionHead, Paras, PullQuote } from "./StoryUtils";

const STORY_VIDEO = "https://res.cloudinary.com/dhmqhless/video/upload/v1780596187/ozi_video2_vl0e0t.mp4";

export function Story({ onNext }: { onNext: () => void }) {
  const s = STORY[1]; // "our story"

  return (
    <div className="screen story-screen">
      <div className="story-inner">
        <section className="story-sec">
          <SectionHead s={s} />
          <Paras list={s.paras} />
          {s.quote && <PullQuote>{s.quote}</PullQuote>}
          <Paras list={s.parasAfter} />

          {/* photo */}
          <div className="photos-block">
            <div className="photo-grid" style={{ justifyContent: "center" }}>
              <PhotoFrame caption="always her 🌸" idx={0} src="https://res.cloudinary.com/dhmqhless/image/upload/v1780596175/ozi3_nz6cjd.jpg" />
            </div>
          </div>

          <CinematicVideo src={STORY_VIDEO} />
        </section>

        <section className="story-sec end-sec">
          <Reveal delay={0.1}>
            <PrimaryButton onClick={onNext}>The Good ☀️</PrimaryButton>
          </Reveal>
        </section>
      </div>
    </div>
  );
}
