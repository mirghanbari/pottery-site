export type Category = {
  id: string;
  name: string;
  image: string;
  href: string;
  count: number;
  tone: string;
};

export type Product = {
  id: string;
  name: string;
  category: string;
  price: string;
  image: string;
  available: boolean;
};

export const categories: Category[] = [
  {
    id: "cups",
    name: "Cups & Mugs",
    image: "/assets/pottery/cup-01.jpg",
    href: "#featured",
    count: 8,
    tone: "Morning ritual"
  },
  {
    id: "bowls",
    name: "Bowls",
    image: "/assets/pottery/bowl-01.jpg",
    href: "#featured",
    count: 4,
    tone: "Hand-thrown comfort"
  },
  {
    id: "sets",
    name: "Sets",
    image: "/assets/pottery/set-01.jpg",
    href: "#featured",
    count: 3,
    tone: "Gathering pieces"
  },
  {
    id: "art",
    name: "Art Objects",
    image: "/assets/pottery/art-01.jpg",
    href: "#featured",
    count: 5,
    tone: "Sculptural forms"
  },
  {
    id: "studio",
    name: "Studio Process",
    image: "/assets/pottery/process-01.jpg",
    href: "#story",
    count: 6,
    tone: "From clay to kiln"
  }
];

export const featuredPieces: Product[] = [
  {
    id: "speckled-rim-mug",
    name: "Speckled Rim Mug",
    category: "Cups & Mugs",
    price: "$48",
    image: "/assets/pottery/cup-02.jpg",
    available: true
  },
  {
    id: "ember-serving-bowl",
    name: "Ember Serving Bowl",
    category: "Bowls",
    price: "$84",
    image: "/assets/pottery/bowl-01.jpg",
    available: true
  },
  {
    id: "sunset-pair",
    name: "Sunset Pair Set",
    category: "Sets",
    price: "$102",
    image: "/assets/pottery/set-02.jpg",
    available: false
  },
  {
    id: "ocean-loop-vessel",
    name: "Ocean Loop Vessel",
    category: "Art Objects",
    price: "$136",
    image: "/assets/pottery/art-02.jpg",
    available: true
  },
  {
    id: "coastal-cup",
    name: "Coastal Cup",
    category: "Cups & Mugs",
    price: "$46",
    image: "/assets/pottery/cup-03.jpg",
    available: true
  },
  {
    id: "wheelborn-form",
    name: "Wheelborn Form",
    category: "Studio Process",
    price: "$95",
    image: "/assets/pottery/process-02.jpg",
    available: true
  }
];
