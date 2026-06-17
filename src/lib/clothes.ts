import tshirt from "@/assets/clothes/tshirt.jpg";
import pants from "@/assets/clothes/pants.jpg";
import shoes from "@/assets/clothes/shoes.jpg";
import hat from "@/assets/clothes/hat.jpg";
import jacket from "@/assets/clothes/jacket.jpg";
import socks from "@/assets/clothes/socks.jpg";

export interface ClothingItem {
  id: string;
  fr: string;
  ar: string;
  ipa: string;
  image: string;
  tint: string;
}

export const CLOTHES: ClothingItem[] = [
  { id: "tshirt", fr: "T-shirt", ar: "قميص", ipa: "/ti.ʃœʁt/", image: tshirt, tint: "from-rose-100 to-pink-50" },
  { id: "pants", fr: "Pantalon", ar: "سروال", ipa: "/pɑ̃talɔ̃/", image: pants, tint: "from-sky-100 to-blue-50" },
  { id: "shoes", fr: "Chaussures", ar: "حذاء", ipa: "/ʃosyʁ/", image: shoes, tint: "from-amber-100 to-orange-50" },
  { id: "hat", fr: "Chapeau", ar: "قبعة", ipa: "/ʃapo/", image: hat, tint: "from-teal-100 to-emerald-50" },
  { id: "jacket", fr: "Veste", ar: "سترة", ipa: "/vɛst/", image: jacket, tint: "from-stone-100 to-amber-50" },
  { id: "socks", fr: "Chaussettes", ar: "جوارب", ipa: "/ʃosɛt/", image: socks, tint: "from-violet-100 to-indigo-50" },
];
