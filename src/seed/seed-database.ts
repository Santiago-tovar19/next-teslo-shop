import { Prisma } from "@prisma/client";
import { initialData } from "./seed";
import prisma from "../lib/prisma";
import { countries } from "./seed-contries";

async function main() {
  await prisma.orderAddress.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.userAddress.deleteMany();

  await prisma.user.deleteMany();
  await prisma.country.deleteMany();

  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  const paises = countries;

  const { categories, products, users } = initialData;

  await prisma.country.createMany({
    data: paises,
  });

  await prisma.user.createMany({
    data: users,
  });

  //categorias

  const categoriesData = categories.map((name) => ({ name }));

  await prisma.category.createMany({
    data: categoriesData,
  });

  const categoriesDB = await prisma.category.findMany();

  const categoriesMap = categoriesDB.reduce((map, category) => {
    map[category.name.toLocaleLowerCase()] = category.id;
    return map;
  }, {} as Record<string, string>);

  const { images, type, ...product1 } = products[0];

  products.forEach(async (product) => {
    const { type, images, ...rest } = product;
    const dbProduct = await prisma.product.create({
      data: {
        ...rest,
        categoryId: categoriesMap[type],
      },
    });

    //images

    const imagesData = images.map((image) => ({
      url: image,
      productId: dbProduct.id,
    }));

    await prisma.productImage.createMany({
      data: imagesData,
    });
  });

  console.log("seed ejecutado correctamente");
}

(() => {
  if (process.env.NODE_ENV == "production") return;
  main();
})();
