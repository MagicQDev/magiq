type Category = {
  id: string;
  name: string;
};

type BusinessType = {
  [key: string]: Category[];
};

export const PRODUCT_CATEGORIES_MOCK: BusinessType[] = [
  {
    Restaurante: [
      {
        id: "beebeb59-ea69-4d27-b919-c9ba058cdbeb",
        name: "Hamburguesas",
      },
      {
        id: "c7874828-4063-4a32-8129-cf838887c60e",
        name: "Pizzas",
      },
      {
        id: "9e506d8d-8910-4c11-98cd-83d20505fc81",
        name: "Alitas",
      },
      {
        id: "1816219d-12ae-4eb2-a7f6-e7c4a6cca6b7",
        name: "Tacos",
      },
      {
        id: "16bce63c-a306-48ff-bb58-39bf27b7b5c3",
        name: "Ensaladas",
      },
      {
        id: "1c8ff43b-fc50-4db7-9d8d-0123819fbb8a",
        name: "Postres",
      },
      {
        id: "cf00ac55-e0da-440a-ad71-05ebbb615a8c",
        name: "Bebidas",
      },
    ],
  },
];

export const getAllCategories = (business_type: string): any[] => {
  const foundCategory = PRODUCT_CATEGORIES_MOCK.find(
    (category) => category[business_type]
  );
  return foundCategory ? foundCategory[business_type] : [];
};
