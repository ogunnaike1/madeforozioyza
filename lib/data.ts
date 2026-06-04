export const CONFIG = {
  displayName: "Ozi Oyza",
  fullName: "Ozi Oyza",
  // Change this to something only she would know
  secretCode: "0506",
  codeHint: "four numbers, your android passcode 😉",
  // Optional: set a URL or path like "/audio/song.mp3" to enable music
  musicUrl: "https://res.cloudinary.com/dhmqhless/video/upload/f_mp3,q_auto/v1780527339/CHRISTINA_PERRI_-_A_THOUSAND_YEARS_INSTRUMENTAL_i7qngn.mp3",
};

export interface StorySection {
  id: string;
  kicker: string;
  emoji: string;
  title: string;
  paras: string[];
  quote?: string;
  parasAfter?: string[];
  quote2?: string;
  photos?: { caption: string; src?: string }[];
  photoNote?: string;
  wishlist?: string[];
  blessing?: string[];
  closing?: string;
}

export const STORY: StorySection[] = [
  {
    id: "welcome",
    kicker: "welcome",
    emoji: "\u{1F496}",
    title: "",
    paras: [
      "Before I knew what the world was, I had you. And that has made all the difference.",
      "This is my small way of saying thank you — for every time you showed up, every lesson you didn't even know you were teaching me, and for being the kind of big sister I genuinely look up to.",
      "Take your time going through this. Every word here is real, and every bit of it comes from someone who is proud to call you his sister.",
    ],
    photoNote: "Look at you…",
    photos: [
      { caption: "my big sister 🌸", src: "https://res.cloudinary.com/dhmqhless/image/upload/v1780596172/ozi1_tscbiq.jpg" },
    ],
  },
  {
    id: "story",
    kicker: "our story",
    emoji: "🌸",
    title: "Having you as a big sister",
    paras: [
      "I didn't choose you — but if I could, I'd choose you every single time.",
      "Growing up with you meant I always had someone ahead of me. Someone who had already figured out the hard parts, who showed me how to carry myself, and who never made me feel like I had to figure life out alone.",
      "You were never just an older sibling. You were a guide, a safe place, and my first example of what it looks like to be strong.",
    ],
    parasAfter: [
      "Every piece of advice you gave me — even the ones I pretended not to listen to — I carried with me. You shaped more of who I am than you probably know.",
      "And I am genuinely grateful that out of all the families in the world, I got to be in yours.",
    ],
    photos: [
      { caption: "Signing out ✍🏾", src: "https://res.cloudinary.com/dhmqhless/image/upload/f_auto,q_auto/v1780325617/kanyin-13.jpeg.HEIC.jpeg_cneo1r.heic" },
      { caption: "Fully certified 🎓", src: "https://res.cloudinary.com/dhmqhless/image/upload/f_auto,q_auto/v1780325530/kanyin-12.jpeg.HEIC_fhkelc.jpg" },
    ],
    photoNote: "Some things are just meant to be…",
  },
  {
    id: "good",
    kicker: "the good",
    emoji: "☀️",
    title: "The memories I'll always carry",
    paras: [
      "Growing up with you gave me so much more than I ever said out loud.",
      "The moments you defended me without thinking twice. The times you let me into your world even when you didn't have to. The way you always seemed to know when something was wrong, even before I said a word.",
      "You celebrated my wins like they were your own. You pushed me when I was being lazy and held me together when things got hard.",
      "Those are the kinds of things you don't forget. The kind that quietly shape you into who you are.",
    ],
    photos: [
      { caption: "radiant, always 🌟", src: "https://res.cloudinary.com/dhmqhless/image/upload/v1780596182/ozi5_eb2rml.jpg" },
    ],
    photoNote: "These pictures say more than I can…",
  },
  {
    id: "bad",
    kicker: "the bad and ugly",
    emoji: "🌧️",
    title: "Siblings don't always get it right",
    paras: [
      "We haven't always been perfect with each other, and I think that's okay.",
      "There were times we got on each other's nerves. Times I didn't listen. Times I probably made your job as the older one much harder than it needed to be.",
      "But here's what I've realised — you never gave up on me. Even when I was difficult, even when I didn't appreciate what you were doing, you stayed consistent.",
      "That kind of love doesn't come from obligation. It comes from genuinely caring about someone. And I see that now, even if I didn't always show it.",
      "So if there's anything I owe you, it's this: I'm sorry for the times I made things hard, and thank you for never holding it against me.",
    ],
  },
  {
    id: "wishes",
    kicker: "everything I want for you this year",
    emoji: "🎂",
    title: "You deserve every good thing coming your way.",
    paras: [
      "You've spent so much of your life looking out for others — for us, for family, for the people you love. This year, I want the world to look out for you.",
      "I want this to be the year things start falling into place. The year your efforts are rewarded, your sacrifices are noticed, and your heart finally gets the rest it deserves.",
      "You carry a lot quietly. I see it, even when I don't always say it. And I want you to know — you don't have to carry everything alone.",
    ],
    wishlist: [
      "Rest that actually feels like rest.",
      "Progress that makes you proud of yourself.",
      "People in your corner who match your energy.",
      "Blessings that exceed anything you've even thought to ask for.",
    ],
    blessing: [
      "May this new year be kinder to you than the last.",
      "May you receive love in the same way you give it — fully and without condition.",
      "May every door that's meant for you open at exactly the right time.",
    ],
    closing: "Happy birthday, Ozi Oyza. You are more loved than you know. \u{1F496}",
  },
];

export const QUIZ = {
  question: "Quick one… who's the best big sister ever?",
  options: ["You 😌", "Obviously you 😂"],
};
