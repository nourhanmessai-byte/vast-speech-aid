import apple from "@/assets/food/apple.jpg";
import banana from "@/assets/food/banana.jpg";
import orange from "@/assets/food/orange.jpg";
import grapes from "@/assets/food/grapes.jpg";
import strawberry from "@/assets/food/strawberry.jpg";
import tomato from "@/assets/food/tomato.jpg";
import carrot from "@/assets/food/carrot.jpg";
import cucumber from "@/assets/food/cucumber.jpg";

export type FoodKind = "fruit" | "vegetable";

export interface FoodItem {
  id: string;
  en: string;
  ar: string;
  ipa: string;
  kind: FoodKind;
  image: string;
  tint: string; // tailwind gradient classes for card backdrop
}

export const FOODS: FoodItem[] = [
  { id: "apple", en: "Apple", ar: "تفاح", ipa: "/ˈæp.əl/", kind: "fruit", image: apple, tint: "from-rose-100 to-rose-50" },
  { id: "banana", en: "Banana", ar: "موز", ipa: "/bəˈnæn.ə/", kind: "fruit", image: banana, tint: "from-amber-100 to-yellow-50" },
  { id: "orange", en: "Orange", ar: "برتقال", ipa: "/ˈɒr.ɪndʒ/", kind: "fruit", image: orange, tint: "from-orange-100 to-amber-50" },
  { id: "grapes", en: "Grapes", ar: "عنب", ipa: "/ɡreɪps/", kind: "fruit", image: grapes, tint: "from-violet-100 to-purple-50" },
  { id: "strawberry", en: "Strawberry", ar: "فراولة", ipa: "/ˈstrɔː.bər.i/", kind: "fruit", image: strawberry, tint: "from-pink-100 to-rose-50" },
  { id: "tomato", en: "Tomato", ar: "طماطم", ipa: "/təˈmɑː.toʊ/", kind: "vegetable", image: tomato, tint: "from-red-100 to-rose-50" },
  { id: "carrot", en: "Carrot", ar: "جزر", ipa: "/ˈkær.ət/", kind: "vegetable", image: carrot, tint: "from-orange-100 to-amber-50" },
  { id: "cucumber", en: "Cucumber", ar: "خيار", ipa: "/ˈkjuː.kʌm.bər/", kind: "vegetable", image: cucumber, tint: "from-emerald-100 to-green-50" },
];

export const getFood = (id: string) => FOODS.find((f) => f.id === id);
