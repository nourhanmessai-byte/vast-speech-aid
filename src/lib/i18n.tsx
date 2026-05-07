import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "en" | "ar";

const dict = {
  appName: { en: "VAST Speech", ar: "فاست سبيتش" },
  tagline: {
    en: "Video-Assisted Speech Therapy for Broca's Aphasia",
    ar: "علاج النطق بمساعدة الفيديو لفقدان القدرة الكلامية بروكا",
  },
  welcome: { en: "Welcome back", ar: "مرحباً بعودتك" },
  startTherapy: { en: "Start Therapy", ar: "ابدأ الجلسة" },
  dailyExercises: { en: "Daily Exercises", ar: "تمارين اليوم" },
  progress: { en: "Progress", ar: "التقدم" },
  exercises: { en: "Exercises", ar: "التمارين" },
  videos: { en: "Videos", ar: "الفيديوهات" },
  record: { en: "Record", ar: "تسجيل" },
  therapist: { en: "Therapist", ar: "المعالج" },
  home: { en: "Home", ar: "الرئيسية" },
  letters: { en: "Letters", ar: "الحروف" },
  syllables: { en: "Syllables", ar: "المقاطع" },
  words: { en: "Words", ar: "الكلمات" },
  sentences: { en: "Sentences", ar: "الجمل" },
  conversation: { en: "Conversation", ar: "المحادثة" },
  letterDesc: { en: "Single letter sounds", ar: "أصوات الحروف المفردة" },
  syllableDesc: { en: "Two-syllable repetition", ar: "تكرار المقاطع الثنائية" },
  wordDesc: { en: "Common word pronunciation", ar: "نطق الكلمات الشائعة" },
  sentenceDesc: { en: "Sentence fluency training", ar: "تدريب طلاقة الجمل" },
  convDesc: { en: "Real conversation practice", ar: "ممارسة المحادثة الواقعية" },
  videoTitle: { en: "Video-Assisted Speech", ar: "النطق بمساعدة الفيديو" },
  videoSub: { en: "Slow-motion mouth movement", ar: "حركة الفم بطيئة" },
  replay: { en: "Replay", ar: "إعادة" },
  fullscreen: { en: "Fullscreen", ar: "ملء الشاشة" },
  recordTitle: { en: "Voice Recording", ar: "تسجيل الصوت" },
  recordSub: { en: "Record and compare with target", ar: "سجّل وقارن مع النموذج" },
  startRec: { en: "Start Recording", ar: "ابدأ التسجيل" },
  stopRec: { en: "Stop", ar: "إيقاف" },
  playback: { en: "Playback", ar: "تشغيل" },
  target: { en: "Target", ar: "النموذج" },
  fluencyScore: { en: "Fluency Score", ar: "درجة الطلاقة" },
  completedSessions: { en: "Sessions", ar: "الجلسات" },
  weeklyImprovement: { en: "Weekly Improvement", ar: "التحسن الأسبوعي" },
  monitorPatients: { en: "Monitor Patients", ar: "متابعة المرضى" },
  addExercise: { en: "Add Exercise", ar: "إضافة تمرين" },
  uploadVideo: { en: "Upload Video", ar: "رفع فيديو" },
  patient: { en: "Patient", ar: "المريض" },
  continue: { en: "Continue", ar: "متابعة" },
  todayGoal: { en: "Today's goal", ar: "هدف اليوم" },
  exercisesDone: { en: "exercises completed", ar: "تمرين مكتمل" },
  practice: { en: "Practice", ar: "تمرّن" },
  listen: { en: "Listen", ar: "استمع" },
  goodJob: { en: "Great progress!", ar: "تقدم رائع!" },
  fruitsVeg: { en: "Fruits & Vegetables", ar: "الفواكه والخضر" },
  fruitsVegDesc: { en: "Name common fruits and vegetables", ar: "تسمية الفواكه والخضروات الشائعة" },
  fruits: { en: "Fruits", ar: "فواكه" },
  vegetables: { en: "Vegetables", ar: "خضروات" },
  tapToOpen: { en: "Tap to practice", ar: "اضغط للتدرب" },
  watchMouth: { en: "Watch the mouth", ar: "راقب حركة الفم" },
  next: { en: "Next", ar: "التالي" },
  back: { en: "Back", ar: "رجوع" },
  pronunciation: { en: "Pronunciation", ar: "النطق" },
};

type Key = keyof typeof dict;

const Ctx = createContext<{ lang: Lang; t: (k: Key) => string; setLang: (l: Lang) => void }>({
  lang: "en",
  t: (k) => k,
  setLang: () => {},
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const saved = (typeof window !== "undefined" && localStorage.getItem("lang")) as Lang | null;
    if (saved) setLangState(saved);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("lang", l);
  };

  const t = (k: Key) => dict[k][lang];

  return <Ctx.Provider value={{ lang, t, setLang }}>{children}</Ctx.Provider>;
}

export const useI18n = () => useContext(Ctx);
