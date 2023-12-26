export const recipes = [
  {
    name: "chocolate_chip_cookies",
    img: "/statics/cookie.webp",
    ingredients: [
      { name: "chocolate-chips", quantity: 200, unit: "gr" },
      { name: "egg", quantity: 1, unit: "" },
      { name: "sugar", quantity: 50, unit: "gr" },
      { name: "soft-butter", quantity: 70, unit: "gr" },
      { name: "flour", quantity: 140, unit: "gr" },
      { name: "baking-powder", quantity: 1, unit: "packet" },
    ],
    steps: [
      {
        action: "add",
        ingredients: ["egg", "sugar"],
        container: "bowl 1",
        description: "chocolate_chip_cookies_step1",
      },
      {
        action: "add",
        ingredients: ["soft-butter", "flour", "baking-powder", "chocolate-chips"],
        container: "bowl 2",
        description: "chocolate_chip_cookies_step2",
      },
      { action: "mix", container: "bowl 2", description: "chocolate_chip_cookies_step3" },
      {
        action: "combine",
        containers: ["bowl 1", "bowl 2"],
        description: "chocolate_chip_cookies_step4",
      },
      { action: "place", description: "Place 12 balls of dough" },
      {
        action: "bake",
        temperature: "200°C",
        time: "12 min",
        description: "chocolate_chip_cookies_step5",
      },
    ],
  },
]
