export type Currency = "RUB";

export type NoteGroup = {
  title: string;
  notes: string[];
};

export type Fragrance = {
  id: string;
  name: string;
  fullName: string;
  house: string;
  collection: string;
  concentration: string;
  price: number;
  oldPrice?: number;
  discount?: string;
  currency: Currency;
  size: string;
  badge: string;
  mood: string;
  inventory: number;
  inventoryLabel: string;
  color: string;
  productCode?: string;
  whenToWear?: string;
  longevity?: string;
  sillage?: string;
  releaseYear?: string;
  perfumer?: string;
  notes: string[];
  noteGroups?: NoteGroup[];
  description: string;
  images: string[];
};

export const blondeAmberImages = [
  "/images/products/clive-christian-xxi-art-deco-blonde-amber.png"
];

export const tomFordGreyVetiverImages = [
  "/images/products/tom-ford-grey-vetiver.png"
];

export const gucciGuiltyPourHommeParfumImages = [
  "/images/products/gucci-guilty-pour-homme-parfum.png"
];

export const creedAbsoluAventusImages = [
  "/images/products/creed-absolu-aventus.png"
];

export const kilianBackToBlackImages = [
  "/images/products/kilian-back-to-black.png"
];

export const fragrances: Fragrance[] = [
  {
    id: "blonde-amber",
    name: "XXI Art Deco Blonde Amber",
    fullName: "Clive Christian XXI Art Deco Blonde Amber, parfum 50 мл",
    house: "Clive Christian",
    collection: "Noble Collection",
    concentration: "Parfum",
    price: 61000,
    currency: "RUB",
    size: "50 мл",
    badge: "Хит",
    mood: "янтарь / табак / art deco",
    inventory: 12,
    inventoryLabel: "В наличии 12 штук",
    color: "#c7924f",
    productCode: "CCXXIBA50",
    whenToWear: "вечер, особый случай",
    longevity: "очень стойкий",
    sillage: "выразительный",
    notes: ["Горький апельсин", "Светлый табак", "Абсолют тонка"],
    noteGroups: [
      { title: "Верхние ноты", notes: ["Горький апельсин", "Бергамот", "Розовый перец"] },
      { title: "Средние ноты", notes: ["Светлый табак", "Сухие специи", "Янтарный аккорд"] },
      { title: "Базовые ноты", notes: ["Абсолют тонка", "Ваниль", "Мягкая древесина"] }
    ],
    description:
      "Тёплый янтарный аромат с цитрусовым сиянием, табачной фактурой и мягкой базой тонка. Главный аромат VayMah для вечерней подачи и подарка.",
    images: blondeAmberImages
  },
  {
    id: "tom-ford-grey-vetiver",
    name: "Grey Vetiver",
    fullName: "Tom Ford Grey Vetiver, парфюмерная вода, спрей 100 мл",
    house: "Tom Ford",
    collection: "Мужские ароматы / нишевая парфюмерия",
    concentration: "Парфюмерная вода, спрей",
    price: 20250,
    oldPrice: 27000,
    discount: "25%",
    currency: "RUB",
    size: "100 мл",
    badge: "Скидка 25%",
    mood: "цитрус / ветивер / деловой стиль",
    inventory: 6,
    inventoryLabel: "Осталось 6 штук",
    color: "#d8d1a4",
    productCode: "ESTTOLW01",
    whenToWear: "лето, день",
    longevity: "достаточно стойкий",
    sillage: "средний",
    notes: ["Цветок апельсина", "Грейпфрут", "Цитрусы", "Мускатный орех", "Шалфей", "Корень ириса", "Ветивер", "Дубовый мох", "Древесные ноты"],
    noteGroups: [
      { title: "Верхние ноты", notes: ["Цветок апельсина", "Грейпфрут", "Цитрусы"] },
      { title: "Средние ноты", notes: ["Мускатный орех", "Шалфей", "Корень ириса"] },
      { title: "Базовые ноты", notes: ["Ветивер", "Дубовый мох", "Древесные ноты"] }
    ],
    description:
      "Элегантный цитрусово-ветиверовый аромат с чистым, свежим и деловым характером. Подходит для офиса, деловых встреч, лета и дневного использования.",
    images: tomFordGreyVetiverImages
  },
  {
    id: "gucci-guilty-pour-homme-parfum",
    name: "Guilty Pour Homme Parfum",
    fullName: "Gucci Guilty Pour Homme Parfum, 150 мл",
    house: "Gucci",
    collection: "Мужские ароматы",
    concentration: "Парфюмерная вода / parfum",
    price: 16985,
    oldPrice: 18684,
    discount: "9%",
    currency: "RUB",
    size: "150 мл",
    badge: "Скидка 9%",
    mood: "тёмный / пряный / древесный",
    inventory: 5,
    inventoryLabel: "Осталось 5 штук",
    color: "#1d1b19",
    productCode: "MPL361249",
    whenToWear: "вечер, прохладная погода",
    longevity: "стойкий",
    sillage: "средний",
    notes: ["Лаванда", "Лимон", "Можжевельник", "Апельсиновый цвет", "Мускатный орех", "Пачули", "Кедр", "Амбра"],
    noteGroups: [
      { title: "Ноты", notes: ["Лаванда", "Лимон", "Можжевельник", "Апельсиновый цвет", "Мускатный орех", "Пачули", "Кедр", "Амбра"] }
    ],
    description:
      "Современный мужской аромат с тёмным, пряным и древесным характером. Подходит для вечернего образа, прохладной погоды и уверенного повседневного стиля.",
    images: gucciGuiltyPourHommeParfumImages
  },
  {
    id: "creed-absolu-aventus",
    name: "Absolu Aventus",
    fullName: "Creed Absolu Aventus, 75 мл",
    house: "Creed",
    collection: "Мужские ароматы",
    concentration: "Parfum",
    price: 31000,
    currency: "RUB",
    size: "75 мл",
    badge: "В наличии",
    mood: "фрукты / дым / древесные аккорды",
    inventory: 4,
    inventoryLabel: "В наличии",
    color: "#151313",
    productCode: "MPL494949",
    whenToWear: "вечер, прохладная погода",
    longevity: "стойкий",
    sillage: "выразительный",
    notes: ["Бергамот", "Яблоко", "Берёза", "Фруктово-дымная композиция", "Древесные аккорды"],
    noteGroups: [
      { title: "Верхние ноты", notes: ["Бергамот", "Яблоко", "Берёза"] },
      { title: "Ноты сердца", notes: ["Фруктово-дымная композиция"] },
      { title: "Базовые ноты", notes: ["Древесные аккорды"] }
    ],
    description:
      "Более насыщенная и глубокая версия Aventus. Фруктово-древесный аромат с дымными оттенками и выразительным шлейфом.",
    images: creedAbsoluAventusImages
  },
  {
    id: "kilian-back-to-black",
    name: "Back To Black",
    fullName: "Kilian Paris Back To Black, парфюмерная вода, спрей 50 мл",
    house: "Kilian Paris",
    collection: "Унисекс / нишевая парфюмерия",
    concentration: "Парфюмерная вода, спрей",
    price: 30960,
    oldPrice: 34400,
    discount: "10%",
    currency: "RUB",
    size: "50 мл",
    badge: "Скидка 10%",
    mood: "мёд / табак / сладкий дым",
    inventory: 4,
    inventoryLabel: "Осталось 4 штуки",
    color: "#17110d",
    productCode: "BKIN3EJ01",
    whenToWear: "вечер, зима",
    longevity: "стойкий",
    sillage: "выразительный",
    releaseYear: "2009",
    perfumer: "Калис Беккер",
    notes: ["Мёд", "Табак", "Вишня", "Малина", "Имбирь", "Кардамон", "Миндаль", "Ваниль", "Пачули", "Дубовый мох"],
    noteGroups: [
      { title: "Ноты", notes: ["Мёд", "Табак", "Вишня", "Малина", "Имбирь", "Кардамон", "Миндаль", "Ваниль", "Пачули", "Дубовый мох"] }
    ],
    description:
      "Глубокий сладко-дымный аромат с медовым, табачным и пряным характером. Подходит для вечера, зимы и холодной погоды.",
    images: kilianBackToBlackImages
  }
];

export const featuredFragrance = fragrances[0];

export const cartPreview = [
  { fragranceId: "blonde-amber", quantity: 1 },
  { fragranceId: "tom-ford-grey-vetiver", quantity: 1 }
];

export function formatCurrency(value: number, currency: Currency = "RUB") {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency,
    maximumFractionDigits: 0
  }).format(value);
}
