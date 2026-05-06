export const webinarPrice = 249;

export interface TrustBadgeItem {
  label: string;
  icon: "users" | "badge-check" | "sparkles" | "leaf";
}

export interface FeatureCardItem {
  title: string;
  icon:
    | "activity"
    | "users"
    | "flame"
    | "battery-low"
    | "moon-star"
    | "weight"
    | "heart-pulse"
    | "salad"
    | "candy"
    | "sparkles"
    | "droplets"
    | "apple";
}

export interface ModuleItem {
  title: string;
  description: string;
}

export interface AccessCardItem {
  title: string;
  price: number;
  features: string[];
  recommended?: boolean;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface SuccessStoryItem {
  name: string;
  quote: string;
  result: string;
}

export interface AchievementItem {
  title: string;
  icon: "sun" | "sprout" | "clock-3";
}

export const trustBadges: TrustBadgeItem[] = [
  { label: "500+ Women Guided", icon: "users" },
  { label: "Certified Gut & Hormonal Health Expert", icon: "badge-check" },
  { label: "Personalized Guidance", icon: "sparkles" },
  { label: "Vegetarian Friendly", icon: "leaf" },
];

export const symptoms: FeatureCardItem[] = [
  { title: "Bloating", icon: "activity" },
  { title: "Acidity", icon: "flame" },
  { title: "Constipation", icon: "apple" },
  { title: "Low Energy", icon: "battery-low" },
  { title: "Belly Fat", icon: "weight" },
  { title: "Hormonal Imbalance", icon: "heart-pulse" },
  { title: "Poor Digestion", icon: "salad" },
  { title: "Sugar Cravings", icon: "candy" },
  { title: "Skin Issues", icon: "sparkles" },
  { title: "Poor Sleep", icon: "moon-star" },
  { title: "Fatigue", icon: "battery-low" },
  { title: "Inflammation", icon: "droplets" },
];

export const benefits: FeatureCardItem[] = [
  { title: "Digestion", icon: "salad" },
  { title: "Hormones", icon: "heart-pulse" },
  { title: "Energy", icon: "battery-low" },
  { title: "Immunity", icon: "activity" },
  { title: "Mood", icon: "sparkles" },
  { title: "Skin", icon: "droplets" },
];

export const modules: ModuleItem[] = [
  {
    title: "Module 1 - Health Assessment",
    description: "Understand your symptoms, current routines, and core gut triggers.",
  },
  {
    title: "Module 2 - Remove Trigger Foods",
    description: "Reduce inflammation by identifying and replacing aggravating foods.",
  },
  {
    title: "Module 3 - Heal The Gut Lining",
    description: "Use targeted nutrition to rebuild and repair the gut barrier naturally.",
  },
  {
    title: "Module 4 - Improve Digestion",
    description: "Support enzyme function, regular bowel movement, and nutrient absorption.",
  },
  {
    title: "Module 5 - Hormonal Support",
    description: "Stabilize insulin, thyroid, and female hormone patterns through food and lifestyle.",
  },
  {
    title: "Module 6 - Sustainable Fat Loss",
    description: "Create a long-term routine for belly fat reduction without crash dieting.",
  },
];

export const whoIsThisFor: FeatureCardItem[] = [
  { title: "Women 35+", icon: "users" },
  { title: "PCOS", icon: "heart-pulse" },
  { title: "Thyroid", icon: "activity" },
  { title: "Bloating", icon: "activity" },
  { title: "Weight Gain", icon: "weight" },
  { title: "Hormonal Imbalance", icon: "heart-pulse" },
  { title: "Poor Digestion", icon: "salad" },
  { title: "Skin Issues", icon: "sparkles" },
  { title: "Fatigue", icon: "battery-low" },
];

export const programIncludes: FeatureCardItem[] = [
  { title: "Webinar Recording", icon: "activity" },
  { title: "Meal Plan Sample", icon: "salad" },
  { title: "Introductory Modules", icon: "sparkles" },
  { title: "WhatsApp Support", icon: "heart-pulse" },
  { title: "Bonus PDFs", icon: "apple" },
  { title: "Root Cause Healing", icon: "droplets" },
];

export const webinarAccessCards: AccessCardItem[] = [
  {
    title: "Webinar Access Pass",
    price: webinarPrice,
    features: [
      "Webinar Recording",
      "Meal Plan Sample",
      "Introductory Modules",
      "WhatsApp Support",
    ],
  },
  {
    title: "VIP Webinar Access",
    price: webinarPrice,
    recommended: true,
    features: [
      "Bonus PDFs",
      "Priority Q&A",
      "Extra Resources",
      "Consultation Eligibility",
    ],
  },
];

export const faq: FAQItem[] = [
  {
    question: "Is this suitable for thyroid and PCOS?",
    answer:
      "Yes. The webinar is designed for women facing thyroid, PCOS, and hormonal symptoms linked to gut health.",
  },
  {
    question: "Is it vegetarian friendly?",
    answer: "Yes. The framework and sample guidance are vegetarian friendly and Indian-meal compatible.",
  },
  {
    question: "Will I get meal plans?",
    answer: "You receive a meal plan sample and a clear nutrition structure you can apply immediately.",
  },
  {
    question: "Will I get WhatsApp support?",
    answer: "Yes. WhatsApp support is included with webinar enrollment access.",
  },
  {
    question: "How long is the webinar?",
    answer: "The core session is designed to be concise and actionable, with replay access after attendance.",
  },
  {
    question: "Is this suitable for women over 35?",
    answer: "Absolutely. This webinar is highly relevant for women 35+ managing gut and hormonal changes.",
  },
  {
    question: "Do I get supplement guidance?",
    answer: "Yes. Supplement discussions are included where relevant and presented in a practical way.",
  },
  {
    question: "Is there a refund policy?",
    answer: "Please refer to the official refund policy page for complete terms before payment.",
  },
];

export const successStories: SuccessStoryItem[] = [
  {
    name: "Ritika, 39",
    quote: "Within 4 weeks I had less bloating, better sleep, and started losing stubborn belly fat.",
    result: "Less bloating + improved energy",
  },
  {
    name: "Megha, 42",
    quote: "My acidity dropped and my sugar cravings reduced after following the gut reset structure.",
    result: "Better digestion + stable cravings",
  },
];

export const whatYoullAchieve: AchievementItem[] = [
  { title: "Sustainable Energy", icon: "sun" },
  { title: "Regular & Healthy Digestion", icon: "sprout" },
  { title: "Mental Clarity & Balance", icon: "clock-3" },
];

