"use client";
import { PrimaryButton } from "@/components/Buttons";
import { CinematicVideo } from "@/components/CinematicVideo";
import { STORY } from "@/lib/data";
import { Reveal, SectionHead, SectionBody } from "./StoryUtils";

const GOOD_VIDEO = "https://res.cloudinary.com/dhmqhless/video/upload/v1780596187/ozi_video3_bfmbft.mp4";

export function Good({ onNext }: { onNext: () => void }) {
  const s = STORY[2];

  return (
    <div className="story-screen">
      <div className="story-body">
        <section className="s-section">
          <SectionHead s={s} />
          <SectionBody s={s} />
          <CinematicVideo src={GOOD_VIDEO} />
        </section>

        <section className="s-section s-end">
          <Reveal delay={0.1}>
            <PrimaryButton onClick={onNext}>The Bad &amp; The Ugly 🌧️</PrimaryButton>
          </Reveal>
        </section>
      </div>
    </div>
  );
}
