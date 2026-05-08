import apple from "@/assets/food/apple.jpg";
import banana from "@/assets/food/banana.jpg";
import orange from "@/assets/food/orange.jpg";
import grapes from "@/assets/food/grapes.jpg";
import strawberry from "@/assets/food/strawberry.jpg";
import watermelon from "@/assets/food/watermelon.jpg";
import peach from "@/assets/food/peach.jpg";
import pear from "@/assets/food/pear.jpg";
import pineapple from "@/assets/food/pineapple.jpg";
import kiwi from "@/assets/food/kiwi.jpg";
import cherry from "@/assets/food/cherry.jpg";
import lemon from "@/assets/food/lemon.jpg";
import tomato from "@/assets/food/tomato.jpg";
import carrot from "@/assets/food/carrot.jpg";
import potato from "@/assets/food/potato.jpg";
import cucumber from "@/assets/food/cucumber.jpg";
import pepper from "@/assets/food/pepper.jpg";
import onion from "@/assets/food/onion.jpg";
import lettuce from "@/assets/food/lettuce.jpg";
import zucchini from "@/assets/food/zucchini.jpg";
import eggplant from "@/assets/food/eggplant.jpg";
import spinach from "@/assets/food/spinach.jpg";
import cabbage from "@/assets/food/cabbage.jpg";
import beans from "@/assets/food/beans.jpg";

export type FoodKind = "fruit" | "vegetable";

export interface FoodItem {
  id: string;
  fr: string;
  ar: string;
  ipa: string;
  kind: FoodKind;
  image: string;
  tint: string;
}

export const FOODS: FoodItem[] = [
  // Fruits
  { id: "apple", fr: "Pomme", ar: "تفاح", ipa: "/pɔm/", kind: "fruit", image: apple, tint: "from-rose-100 to-rose-50" },
  { id: "banana", fr: "Banane", ar: "موز", ipa: "/banan/", kind: "fruit", image: banana, tint: "from-amber-100 to-yellow-50" },
  { id: "orange", fr: "Orange", ar: "برتقال", ipa: "/ɔʁɑ̃ʒ/", kind: "fruit", image: orange, tint: "from-orange-100 to-amber-50" },
  { id: "strawberry", fr: "Fraise", ar: "فراولة", ipa: "/fʁɛz/", kind: "fruit", image: strawberry, tint: "from-pink-100 to-rose-50" },
  { id: "grapes", fr: "Raisin", ar: "عنب", ipa: "/ʁɛzɛ̃/", kind: "fruit", image: grapes, tint: "from-violet-100 to-purple-50" },
  { id: "watermelon", fr: "Pastèque", ar: "بطيخ", ipa: "/pastɛk/", kind: "fruit", image: watermelon, tint: "from-rose-100 to-emerald-50" },
  { id: "peach", fr: "Pêche", ar: "خوخ", ipa: "/pɛʃ/", kind: "fruit", image: peach, tint: "from-orange-100 to-rose-50" },
  { id: "pear", fr: "Poire", ar: "كمثرى", ipa: "/pwaʁ/", kind: "fruit", image: pear, tint: "from-lime-100 to-yellow-50" },
  { id: "pineapple", fr: "Ananas", ar: "أناناس", ipa: "/ananas/", kind: "fruit", image: pineapple, tint: "from-yellow-100 to-amber-50" },
  { id: "kiwi", fr: "Kiwi", ar: "كيوي", ipa: "/kiwi/", kind: "fruit", image: kiwi, tint: "from-green-100 to-lime-50" },
  { id: "cherry", fr: "Cerise", ar: "كرز", ipa: "/səʁiz/", kind: "fruit", image: cherry, tint: "from-red-100 to-rose-50" },
  { id: "lemon", fr: "Citron", ar: "ليمون", ipa: "/sitʁɔ̃/", kind: "fruit", image: lemon, tint: "from-yellow-100 to-lime-50" },

  // Légumes
  { id: "tomato", fr: "Tomate", ar: "طماطم", ipa: "/tɔmat/", kind: "vegetable", image: tomato, tint: "from-red-100 to-rose-50" },
  { id: "carrot", fr: "Carotte", ar: "جزر", ipa: "/kaʁɔt/", kind: "vegetable", image: carrot, tint: "from-orange-100 to-amber-50" },
  { id: "potato", fr: "Pomme de terre", ar: "بطاطا", ipa: "/pɔm.də.tɛʁ/", kind: "vegetable", image: potato, tint: "from-amber-100 to-stone-50" },
  { id: "cucumber", fr: "Concombre", ar: "خيار", ipa: "/kɔ̃kɔ̃bʁ/", kind: "vegetable", image: cucumber, tint: "from-emerald-100 to-green-50" },
  { id: "pepper", fr: "Poivron", ar: "فلفل", ipa: "/pwavʁɔ̃/", kind: "vegetable", image: pepper, tint: "from-red-100 to-orange-50" },
  { id: "onion", fr: "Oignon", ar: "بصل", ipa: "/ɔɲɔ̃/", kind: "vegetable", image: onion, tint: "from-amber-100 to-yellow-50" },
  { id: "lettuce", fr: "Laitue", ar: "خس", ipa: "/lɛty/", kind: "vegetable", image: lettuce, tint: "from-lime-100 to-green-50" },
  { id: "zucchini", fr: "Courgette", ar: "قرع", ipa: "/kuʁʒɛt/", kind: "vegetable", image: zucchini, tint: "from-emerald-100 to-lime-50" },
  { id: "eggplant", fr: "Aubergine", ar: "باذنجان", ipa: "/obɛʁʒin/", kind: "vegetable", image: eggplant, tint: "from-violet-100 to-purple-50" },
  { id: "spinach", fr: "Épinard", ar: "سبانخ", ipa: "/epinaʁ/", kind: "vegetable", image: spinach, tint: "from-green-100 to-emerald-50" },
  { id: "cabbage", fr: "Chou", ar: "ملفوف", ipa: "/ʃu/", kind: "vegetable", image: cabbage, tint: "from-lime-100 to-emerald-50" },
  { id: "beans", fr: "Haricot", ar: "فاصوليا", ipa: "/aʁiko/", kind: "vegetable", image: beans, tint: "from-green-100 to-lime-50" },
];

export const FRUITS = FOODS.filter((f) => f.kind === "fruit");
export const VEGETABLES = FOODS.filter((f) => f.kind === "vegetable");

export const getFood = (id: string) => FOODS.find((f) => f.id === id);
