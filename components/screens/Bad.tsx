"use client";
import { PrimaryButton } from "@/components/Buttons";
import { STORY } from "@/lib/data";
import { Reveal, SectionHead, SectionBody } from "./StoryUtils";

export function Bad({ onNext }: { onNext: () => void }) {
  const bad    = STORY[3];
  const wishes = STORY[4];

  return (
    <div className="story-screen">
      <div className="story-body">
        <section className="s-section">
          <SectionHead s={bad} />
          <SectionBody s={bad} />
        </section>

        <section className="s-section">
          <SectionHead s={wishes} />
          <SectionBody s={wishes} />
        </section>

        <section className="s-section s-end">
          <Reveal delay={0.05}>
            <p className="s-more-note">but wait…</p>
          </Reveal>
          <Reveal delay={0.15}>
            <PrimaryButton onClick={onNext}>There&apos;s more 👀</PrimaryButton>
          </Reveal>
        </section>
      </div>
    </div>
  );
}
