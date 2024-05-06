"use server";

import prisma from "@/lib/prisma";

export const getStockBySlug = async (slug: string): Promise<number | null> => {
  try {
    const product = await prisma.product.findFirst({
      where: { slug: slug },
      select: { inStock: true },
    });

    if (!product) return null; //en revision, es mejor retornar null o 0? depende de la logica de negocio

    return product?.inStock ?? 0;
  } catch (error) {
    console.log(error);
    return 0;
  }
};
