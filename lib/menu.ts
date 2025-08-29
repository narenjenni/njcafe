export const MENU = [
  {
    "id": "espresso",
    "title": "Espresso",
    "price": 25000,
    "category": "Coffee"
  },
  {
    "id": "americano",
    "title": "Americano",
    "price": 28000,
    "category": "Coffee"
  },
  {
    "id": "cappuccino",
    "title": "Cappuccino",
    "price": 35000,
    "category": "Coffee"
  },
  {
    "id": "latte",
    "title": "Caff\u00e8 Latte",
    "price": 36000,
    "category": "Coffee"
  },
  {
    "id": "mocha",
    "title": "Mocha",
    "price": 38000,
    "category": "Coffee"
  },
  {
    "id": "caramel-macchiato",
    "title": "Caramel Macchiato",
    "price": 40000,
    "category": "Coffee"
  },
  {
    "id": "matcha-latte",
    "title": "Matcha Latte",
    "price": 32000,
    "category": "Tea"
  },
  {
    "id": "english-breakfast",
    "title": "English Breakfast Tea",
    "price": 22000,
    "category": "Tea"
  },
  {
    "id": "earl-grey",
    "title": "Earl Grey Tea",
    "price": 23000,
    "category": "Tea"
  },
  {
    "id": "lemon-tea",
    "title": "Lemon Tea",
    "price": 24000,
    "category": "Tea"
  },
  {
    "id": "honey-ginger-tea",
    "title": "Honey Ginger Tea",
    "price": 25000,
    "category": "Tea"
  },
  {
    "id": "iced-lemonade",
    "title": "Iced Lemonade",
    "price": 28000,
    "category": "Cold & Refreshers"
  },
  {
    "id": "strawberry-fizz",
    "title": "Strawberry Fizz",
    "price": 30000,
    "category": "Cold & Refreshers"
  },
  {
    "id": "tropical-punch",
    "title": "Tropical Punch",
    "price": 30000,
    "category": "Cold & Refreshers"
  },
  {
    "id": "choco-croissant",
    "title": "Chocolate Croissant",
    "price": 27000,
    "category": "Pastries & Desserts"
  },
  {
    "id": "almond-croissant",
    "title": "Almond Croissant",
    "price": 30000,
    "category": "Pastries & Desserts"
  },
  {
    "id": "cheesecake",
    "title": "Cheesecake Slice",
    "price": 32000,
    "category": "Pastries & Desserts"
  },
  {
    "id": "brownie",
    "title": "Fudgy Brownie",
    "price": 24000,
    "category": "Pastries & Desserts"
  },
  {
    "id": "tiramisu",
    "title": "Tiramisu Cup",
    "price": 34000,
    "category": "Pastries & Desserts"
  },
  {
    "id": "chicken-sandwich",
    "title": "Grilled Chicken Sandwich",
    "price": 42000,
    "category": "Mains & Snacks"
  },
  {
    "id": "beef-burger",
    "title": "Classic Beef Burger",
    "price": 55000,
    "category": "Mains & Snacks"
  },
  {
    "id": "truffle-fries",
    "title": "Truffle Fries",
    "price": 38000,
    "category": "Mains & Snacks"
  },
  {
    "id": "caesar-salad",
    "title": "Caesar Salad",
    "price": 40000,
    "category": "Mains & Snacks"
  },
  {
    "id": "aglio-olio",
    "title": "Spaghetti Aglio e Olio",
    "price": 45000,
    "category": "Mains & Snacks"
  },
  {
    "id": "nasi-goreng",
    "title": "Nasi Goreng Special",
    "price": 45000,
    "category": "Mains & Snacks"
  }
] as const;
export type MenuItem = (typeof MENU)[number];
