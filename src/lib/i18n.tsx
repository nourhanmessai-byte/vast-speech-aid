import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "fr" | "ar";

const dict = {
  appName: { fr: "VAST Speech", ar: "فاست سبيتش" },
  tagline: {
    fr: "Thérapie de la parole assistée par vidéo pour l'aphasie de Broca",
    ar: "علاج النطق بمساعدة الفيديو لفقدان القدرة الكلامية بروكا",
  },
  welcome: { fr: "Bon retour", ar: "مرحباً بعودتك" },
  startTherapy: { fr: "Démarrer la séance", ar: "ابدأ الجلسة" },
  dailyExercises: { fr: "Exercices du jour", ar: "تمارين اليوم" },
  progress: { fr: "Progression", ar: "التقدم" },
  exercises: { fr: "Exercices", ar: "التمارين" },
  videos: { fr: "Vidéos", ar: "الفيديوهات" },
  record: { fr: "Enregistrer", ar: "تسجيل" },
  therapist: { fr: "Thérapeute", ar: "المعالج" },
  home: { fr: "Accueil", ar: "الرئيسية" },
  letters: { fr: "Lettres", ar: "الحروف" },
  syllables: { fr: "Syllabes", ar: "المقاطع" },
  words: { fr: "Mots", ar: "الكلمات" },
  sentences: { fr: "Phrases", ar: "الجمل" },
  conversation: { fr: "Conversation", ar: "المحادثة" },
  letterDesc: { fr: "Sons des lettres", ar: "أصوات الحروف المفردة" },
  syllableDesc: { fr: "Répétition de syllabes", ar: "تكرار المقاطع الثنائية" },
  wordDesc: { fr: "Prononciation des mots courants", ar: "نطق الكلمات الشائعة" },
  sentenceDesc: { fr: "Entraînement à la fluidité", ar: "تدريب طلاقة الجمل" },
  convDesc: { fr: "Pratique de la conversation", ar: "ممارسة المحادثة الواقعية" },
  videoTitle: { fr: "Parole assistée par vidéo", ar: "النطق بمساعدة الفيديو" },
  videoSub: { fr: "Mouvement de la bouche au ralenti", ar: "حركة الفم بطيئة" },
  replay: { fr: "Rejouer", ar: "إعادة" },
  fullscreen: { fr: "Plein écran", ar: "ملء الشاشة" },
  recordTitle: { fr: "Enregistrement vocal", ar: "تسجيل الصوت" },
  recordSub: { fr: "Enregistrez et comparez avec le modèle", ar: "سجّل وقارن مع النموذج" },
  startRec: { fr: "Démarrer", ar: "ابدأ التسجيل" },
  stopRec: { fr: "Arrêter", ar: "إيقاف" },
  playback: { fr: "Lecture", ar: "تشغيل" },
  target: { fr: "Modèle", ar: "النموذج" },
  fluencyScore: { fr: "Score de fluidité", ar: "درجة الطلاقة" },
  completedSessions: { fr: "Séances", ar: "الجلسات" },
  weeklyImprovement: { fr: "Progrès hebdomadaire", ar: "التحسن الأسبوعي" },
  monitorPatients: { fr: "Suivi des patients", ar: "متابعة المرضى" },
  addExercise: { fr: "Ajouter un exercice", ar: "إضافة تمرين" },
  uploadVideo: { fr: "Téléverser une vidéo", ar: "رفع فيديو" },
  patient: { fr: "Patient", ar: "المريض" },
  continue: { fr: "Continuer", ar: "متابعة" },
  todayGoal: { fr: "Objectif du jour", ar: "هدف اليوم" },
  exercisesDone: { fr: "exercices terminés", ar: "تمرين مكتمل" },
  practice: { fr: "S'entraîner", ar: "تمرّن" },
  listen: { fr: "Écouter", ar: "استمع" },
  goodJob: { fr: "Excellents progrès !", ar: "تقدم رائع!" },
  fruitsVeg: { fr: "Fruits et Légumes", ar: "الفواكه والخضر" },
  fruitsVegDesc: { fr: "Nommer les fruits et les légumes", ar: "تسمية الفواكه والخضروات" },
  fruits: { fr: "Fruits", ar: "الفواكه" },
  vegetables: { fr: "Légumes", ar: "الخضر" },
  fruitsDesc: { fr: "Nommer les fruits courants", ar: "تسمية الفواكه الشائعة" },
  vegetablesDesc: { fr: "Nommer les légumes courants", ar: "تسمية الخضروات الشائعة" },
  tapToOpen: { fr: "Touchez pour pratiquer", ar: "اضغط للتدرب" },
  watchMouth: { fr: "Regardez la bouche", ar: "راقب حركة الفم" },
  next: { fr: "Suivant", ar: "التالي" },
  back: { fr: "Retour", ar: "رجوع" },
  pronunciation: { fr: "Prononciation", ar: "النطق" },
  slowMode: { fr: "Mode lent", ar: "وضع بطيء" },
  normalMode: { fr: "Vitesse normale", ar: "سرعة عادية" },
  numbers: { fr: "Nombres", ar: "الأرقام" },
  numbersDesc: { fr: "Compter de 1 à 10", ar: "العد من 1 إلى 10" },
  days: { fr: "Jours de la semaine", ar: "أيام الأسبوع" },
  daysDesc: { fr: "Nommer les jours de la semaine", ar: "تسمية أيام الأسبوع" },
  months: { fr: "Mois de l'année", ar: "أشهر السنة" },
  monthsDesc: { fr: "Nommer les douze mois", ar: "تسمية الأشهر الإثني عشر" },
  verbs: { fr: "Verbes d'action", ar: "أفعال الحركة" },
  verbsDesc: { fr: "Verbes courants (test MTA)", ar: "أفعال شائعة (اختبار MTA)" },
  classify: { fr: "Classification", ar: "التصنيف" },
  classifyDesc: { fr: "Classer les objets : fruits, légumes, vêtements", ar: "صنّف الأشياء: فواكه، خضر، ملابس" },
  clothing: { fr: "Vêtements", ar: "الملابس" },
};

type Key = keyof typeof dict;

const Ctx = createContext<{ lang: Lang; t: (k: Key) => string; setLang: (l: Lang) => void }>({
  lang: "fr",
  t: (k) => k,
  setLang: () => {},
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("fr");

  useEffect(() => {
    const saved = (typeof window !== "undefined" && localStorage.getItem("lang")) as Lang | null;
    if (saved === "fr" || saved === "ar") setLangState(saved);
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
