export const recipes = [
  {
    name: "chocolate_chip_cookies",
    img: "/statics/cookie.webp",
    ingredients: [
      { name: "chocolate-chips", quantity: 200, unit: "gr" },
      { name: "egg", quantity: 2 /* TODO 1 */, unit: "" },
      { name: "sugar", quantity: 50, unit: "gr" },
      { name: "soft-butter", quantity: 70, unit: "gr" },
      { name: "flour", quantity: 140, unit: "gr" },
      { name: "baking-powder", quantity: 1, unit: "packet" },
    ],
    step: [
      {
        action: "add",
        ingredients: ["egg", "sugar"],
        container: "bowl 1",
        description: "Add egg and sugar into bowl 1 and mix",
      },
      {
        action: "add",
        ingredients: ["soft-butter", "flour", "baking-powder", "chocolate-chips"],
        container: "bowl 2",
        description: "Add soft butter, flour, baking powder, and chocolate chips into bowl 2",
      },
      { action: "mix", container: "bowl 2", description: "Mix the contents of bowl 2" },
      {
        action: "combine",
        containers: ["bowl 1", "bowl 2"],
        description: "Add contents of bowl 1 to bowl 2 and mix",
      },
      { action: "place", description: "Place 12 balls of dough" },
      {
        action: "bake",
        temperature: "200°C",
        time: "12 min",
        description: "Bake at 200°C for 12 minutes",
      },
    ],
  },
]
