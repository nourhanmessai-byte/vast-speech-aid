import eat from "@/assets/verbs/eat.jpg";
import drink from "@/assets/verbs/drink.jpg";
import sleep from "@/assets/verbs/sleep.jpg";
import write from "@/assets/verbs/write.jpg";
import read from "@/assets/verbs/read.jpg";
import walk from "@/assets/verbs/walk.jpg";
import open from "@/assets/verbs/open.jpg";
import close from "@/assets/verbs/close.jpg";
import sit from "@/assets/verbs/sit.jpg";
import stand from "@/assets/verbs/stand.jpg";
import cat from "@/assets/animals/cat.jpg";
import dog from "@/assets/animals/dog.jpg";
import bird from "@/assets/animals/bird.jpg";
import animalFish from "@/assets/animals/fish.jpg";
import horse from "@/assets/animals/horse.jpg";
import cow from "@/assets/animals/cow.jpg";
import sheep from "@/assets/animals/sheep.jpg";
import rabbit from "@/assets/animals/rabbit.jpg";
import chair from "@/assets/furniture/chair.jpg";
import furnTable from "@/assets/furniture/table.jpg";
import bed from "@/assets/furniture/bed.jpg";
import wardrobe from "@/assets/furniture/wardrobe.jpg";
import sofa from "@/assets/furniture/sofa.jpg";
import lamp from "@/assets/furniture/lamp.jpg";
import pen from "@/assets/objects/pen.jpg";
import book from "@/assets/objects/book.jpg";
import key from "@/assets/objects/key.jpg";
import phone from "@/assets/objects/phone.jpg";
import watch from "@/assets/objects/watch.jpg";
import bag from "@/assets/objects/bag.jpg";

export type LessonCategory = "numbers" | "days" | "months" | "verbs" | "animals" | "furniture" | "objects";

export interface LessonItem {
  id: string;
  fr: string;
  ar: string;
  ipa: string;
  /** Big emoji or symbol shown when no image */
  symbol?: string;
  /** Optional illustration */
  image?: string;
  /** Tailwind gradient classes for the hero tint */
  tint: string;
}

  fr: string;
  ar: string;
  ipa: string;
  /** Big emoji or symbol shown when no image */
  symbol?: string;
  /** Optional illustration */
  image?: string;
  /** Tailwind gradient classes for the hero tint */
  tint: string;
}

export const NUMBERS: LessonItem[] = [
  { id: "1", fr: "Un", ar: "واحد", ipa: "/œ̃/", symbol: "1", tint: "from-violet-100 to-indigo-50" },
  { id: "2", fr: "Deux", ar: "اثنان", ipa: "/dø/", symbol: "2", tint: "from-rose-100 to-pink-50" },
  { id: "3", fr: "Trois", ar: "ثلاثة", ipa: "/tʁwa/", symbol: "3", tint: "from-amber-100 to-yellow-50" },
  { id: "4", fr: "Quatre", ar: "أربعة", ipa: "/katʁ/", symbol: "4", tint: "from-emerald-100 to-lime-50" },
  { id: "5", fr: "Cinq", ar: "خمسة", ipa: "/sɛ̃k/", symbol: "5", tint: "from-sky-100 to-cyan-50" },
  { id: "6", fr: "Six", ar: "ستة", ipa: "/sis/", symbol: "6", tint: "from-fuchsia-100 to-purple-50" },
  { id: "7", fr: "Sept", ar: "سبعة", ipa: "/sɛt/", symbol: "7", tint: "from-orange-100 to-amber-50" },
  { id: "8", fr: "Huit", ar: "ثمانية", ipa: "/ɥit/", symbol: "8", tint: "from-teal-100 to-emerald-50" },
  { id: "9", fr: "Neuf", ar: "تسعة", ipa: "/nœf/", symbol: "9", tint: "from-indigo-100 to-violet-50" },
  { id: "10", fr: "Dix", ar: "عشرة", ipa: "/dis/", symbol: "10", tint: "from-pink-100 to-rose-50" },
];

export const DAYS: LessonItem[] = [
  { id: "mon", fr: "Lundi", ar: "الإثنين", ipa: "/lœ̃di/", symbol: "🌙", tint: "from-violet-100 to-indigo-50" },
  { id: "tue", fr: "Mardi", ar: "الثلاثاء", ipa: "/maʁdi/", symbol: "🔥", tint: "from-rose-100 to-orange-50" },
  { id: "wed", fr: "Mercredi", ar: "الأربعاء", ipa: "/mɛʁkʁədi/", symbol: "💧", tint: "from-sky-100 to-cyan-50" },
  { id: "thu", fr: "Jeudi", ar: "الخميس", ipa: "/ʒødi/", symbol: "⚡", tint: "from-amber-100 to-yellow-50" },
  { id: "fri", fr: "Vendredi", ar: "الجمعة", ipa: "/vɑ̃dʁədi/", symbol: "🌸", tint: "from-pink-100 to-rose-50" },
  { id: "sat", fr: "Samedi", ar: "السبت", ipa: "/samdi/", symbol: "🪐", tint: "from-indigo-100 to-violet-50" },
  { id: "sun", fr: "Dimanche", ar: "الأحد", ipa: "/dimɑ̃ʃ/", symbol: "☀️", tint: "from-yellow-100 to-amber-50" },
];

export const MONTHS: LessonItem[] = [
  { id: "01", fr: "Janvier", ar: "يناير", ipa: "/ʒɑ̃vje/", symbol: "❄️", tint: "from-sky-100 to-indigo-50" },
  { id: "02", fr: "Février", ar: "فبراير", ipa: "/fevʁije/", symbol: "💜", tint: "from-violet-100 to-pink-50" },
  { id: "03", fr: "Mars", ar: "مارس", ipa: "/maʁs/", symbol: "🌱", tint: "from-emerald-100 to-lime-50" },
  { id: "04", fr: "Avril", ar: "أبريل", ipa: "/avʁil/", symbol: "🌷", tint: "from-pink-100 to-rose-50" },
  { id: "05", fr: "Mai", ar: "مايو", ipa: "/mɛ/", symbol: "🌺", tint: "from-rose-100 to-fuchsia-50" },
  { id: "06", fr: "Juin", ar: "يونيو", ipa: "/ʒɥɛ̃/", symbol: "☀️", tint: "from-amber-100 to-yellow-50" },
  { id: "07", fr: "Juillet", ar: "يوليو", ipa: "/ʒɥijɛ/", symbol: "🏖️", tint: "from-cyan-100 to-sky-50" },
  { id: "08", fr: "Août", ar: "أغسطس", ipa: "/u(t)/", symbol: "🌞", tint: "from-orange-100 to-amber-50" },
  { id: "09", fr: "Septembre", ar: "سبتمبر", ipa: "/sɛptɑ̃bʁ/", symbol: "🍂", tint: "from-amber-100 to-orange-50" },
  { id: "10", fr: "Octobre", ar: "أكتوبر", ipa: "/ɔktɔbʁ/", symbol: "🍁", tint: "from-rose-100 to-orange-50" },
  { id: "11", fr: "Novembre", ar: "نوفمبر", ipa: "/nɔvɑ̃bʁ/", symbol: "🌧️", tint: "from-slate-100 to-indigo-50" },
  { id: "12", fr: "Décembre", ar: "ديسمبر", ipa: "/desɑ̃bʁ/", symbol: "🎄", tint: "from-emerald-100 to-rose-50" },
];

export const VERBS: LessonItem[] = [
  { id: "eat", fr: "Manger", ar: "يأكل", ipa: "/mɑ̃ʒe/", image: eat, tint: "from-orange-100 to-rose-50" },
  { id: "drink", fr: "Boire", ar: "يشرب", ipa: "/bwaʁ/", image: drink, tint: "from-sky-100 to-cyan-50" },
  { id: "sleep", fr: "Dormir", ar: "ينام", ipa: "/dɔʁmiʁ/", image: sleep, tint: "from-violet-100 to-pink-50" },
  { id: "write", fr: "Écrire", ar: "يكتب", ipa: "/ekʁiʁ/", image: write, tint: "from-violet-100 to-indigo-50" },
  { id: "read", fr: "Lire", ar: "يقرأ", ipa: "/liʁ/", image: read, tint: "from-pink-100 to-violet-50" },
  { id: "walk", fr: "Marcher", ar: "يمشي", ipa: "/maʁʃe/", image: walk, tint: "from-rose-100 to-pink-50" },
  { id: "open", fr: "Ouvrir", ar: "يفتح", ipa: "/uvʁiʁ/", image: open, tint: "from-fuchsia-100 to-violet-50" },
  { id: "close", fr: "Fermer", ar: "يغلق", ipa: "/fɛʁme/", image: close, tint: "from-violet-100 to-indigo-50" },
  { id: "sit", fr: "S'asseoir", ar: "يجلس", ipa: "/saswaʁ/", image: sit, tint: "from-violet-100 to-rose-50" },
  { id: "stand", fr: "Se lever", ar: "يقف", ipa: "/sə ləve/", image: stand, tint: "from-pink-100 to-rose-50" },
];

export const ANIMALS: LessonItem[] = [
  { id: "cat", fr: "Chat", ar: "قطة", ipa: "/ʃa/", image: cat, tint: "from-rose-100 to-pink-50" },
  { id: "dog", fr: "Chien", ar: "كلب", ipa: "/ʃjɛ̃/", image: dog, tint: "from-amber-100 to-orange-50" },
  { id: "bird", fr: "Oiseau", ar: "عصفور", ipa: "/wazo/", image: bird, tint: "from-sky-100 to-cyan-50" },
  { id: "fish", fr: "Poisson", ar: "سمكة", ipa: "/pwasɔ̃/", image: animalFish, tint: "from-orange-100 to-amber-50" },
  { id: "horse", fr: "Cheval", ar: "حصان", ipa: "/ʃəval/", image: horse, tint: "from-amber-100 to-stone-50" },
  { id: "cow", fr: "Vache", ar: "بقرة", ipa: "/vaʃ/", image: cow, tint: "from-stone-100 to-rose-50" },
  { id: "sheep", fr: "Mouton", ar: "خروف", ipa: "/mutɔ̃/", image: sheep, tint: "from-pink-100 to-rose-50" },
  { id: "rabbit", fr: "Lapin", ar: "أرنب", ipa: "/lapɛ̃/", image: rabbit, tint: "from-violet-100 to-pink-50" },
];

export const FURNITURE: LessonItem[] = [
  { id: "chair", fr: "Chaise", ar: "كرسي", ipa: "/ʃɛz/", image: chair, tint: "from-amber-100 to-stone-50" },
  { id: "table", fr: "Table", ar: "طاولة", ipa: "/tabl/", image: furnTable, tint: "from-rose-100 to-amber-50" },
  { id: "bed", fr: "Lit", ar: "سرير", ipa: "/li/", image: bed, tint: "from-violet-100 to-pink-50" },
  { id: "wardrobe", fr: "Armoire", ar: "خزانة", ipa: "/aʁmwaʁ/", image: wardrobe, tint: "from-amber-100 to-yellow-50" },
  { id: "sofa", fr: "Canapé", ar: "أريكة", ipa: "/kanape/", image: sofa, tint: "from-slate-100 to-stone-50" },
  { id: "lamp", fr: "Lampe", ar: "مصباح", ipa: "/lɑ̃p/", image: lamp, tint: "from-amber-100 to-orange-50" },
];

export const OBJECTS: LessonItem[] = [
  { id: "pen", fr: "Stylo", ar: "قلم", ipa: "/stilo/", image: pen, tint: "from-sky-100 to-blue-50" },
  { id: "book", fr: "Livre", ar: "كتاب", ipa: "/livʁ/", image: book, tint: "from-rose-100 to-pink-50" },
  { id: "key", fr: "Clé", ar: "مفتاح", ipa: "/kle/", image: key, tint: "from-amber-100 to-yellow-50" },
  { id: "phone", fr: "Téléphone", ar: "هاتف", ipa: "/telefɔn/", image: phone, tint: "from-pink-100 to-rose-50" },
  { id: "watch", fr: "Montre", ar: "ساعة", ipa: "/mɔ̃tʁ/", image: watch, tint: "from-stone-100 to-amber-50" },
  { id: "bag", fr: "Sac", ar: "حقيبة", ipa: "/sak/", image: bag, tint: "from-cyan-100 to-sky-50" },
];

export const LESSONS: Record<LessonCategory, LessonItem[]> = {
  numbers: NUMBERS,
  days: DAYS,
  months: MONTHS,
  verbs: VERBS,
  animals: ANIMALS,
  furniture: FURNITURE,
  objects: OBJECTS,
};

export const getLesson = (category: string, id: string): LessonItem | undefined => {
  const list = LESSONS[category as LessonCategory];
  return list?.find((it) => it.id === id);
};

export const isLessonCategory = (c: string): c is LessonCategory =>
  c === "numbers" || c === "days" || c === "months" || c === "verbs" ||
  c === "animals" || c === "furniture" || c === "objects";

