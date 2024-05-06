"use server";

import { auth } from "@/auth.config";
import type { Address } from "@/interfaces/address.interface";
import type { Product, Size } from "@/interfaces/product.interface";
import prisma from "@/lib/prisma";

interface ProductToOrder {
  productId: string;
  quantity: number;
  size: Size;
}

export const placeOrder = async (productIds: ProductToOrder[], address: Address) => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) return { ok: false, message: "No hay sesion de usuarios" };

  // console.log({ userId, productIds, address });

  //obtener la informacionde los productos, se puede llevar +2 productos con el mismo id

  const products = await prisma.product.findMany({
    where: { id: { in: productIds.map((product) => product.productId) } },
  });

  //calcular los montos

  const itemsOrder = productIds.reduce((count, product) => count + product.quantity, 0);

  const subTotalOrder: number = products.reduce((acc, product) => {
    const productToOrder = productIds.find((p) => p.productId === product.id);
    return acc + product.price * productToOrder!.quantity;
  }, 0);

  const { subTotal, tax, total } = productIds.reduce(
    (totals, item) => {
      const productQuantity: number = item.quantity;

      const product = products.find((product) => product.id === item.productId);

      if (!product) throw new Error(`#${item.productId} - producto no encontrado`);

      const subtotal: number = product.price * productQuantity;

      totals.subTotal += subtotal;
      totals.tax += subtotal * 0.15;
      totals.total += subtotal * 1.15;

      return totals;
    },
    { subTotal: 0, tax: 0, total: 0 }
  );

  console.log({ subTotal, tax, total, subTotalOrder });

  //crear la trasaccion de base de datos
  try {
    const prismaTx = await prisma.$transaction(async (tx) => {
      //1. actualizar el store de los productos

      const updatedProductsPromises = products.map(async (product) => {
        const productQuantity = productIds
          .filter((p) => p.productId === product.id)
          .reduce((acc, item) => item.quantity, 0);

        if (productQuantity === 0) {
          throw new Error(`#${product.id} - No tiene cantidad definida`);
        }

        return tx.product.update({
          where: { id: product.id },
          data: { inStock: { decrement: productQuantity } },
        });
      });

      const updatedProducts = await Promise.all(updatedProductsPromises);

      //verificar valores negativos en las cantidades === no hay stock

      updatedProducts.forEach((product) => {
        if (product.inStock < 0) {
          throw new Error(`#${product.id} - No hay inventario disponible`);
        }
      });
      //2. crear la orden - encabezado - Detalles

      const order = await tx.order.create({
        data: {
          userId: userId,
          itemsInOrder: itemsOrder,
          subTotal: subTotal,
          tax: tax,
          total: total,

          OrderItem: {
            createMany: {
              data: productIds.map((p) => ({
                productId: p.productId,
                quantity: p.quantity,
                size: p.size,
                price: products.find((product) => product.id === p.productId)?.price || 0,
              })),
            },
          },
        },
      });

      //validar si el price es 0, entonces lanzar un error

      //3 . crear la direccion de la orden
      // address

      const { country, ...restAddress } = address;

      const orderAddress = await tx.orderAddress.create({
        data: {
          ...restAddress,
          countryId: country,
          orderId: order.id,
        },
      });

      return {
        ok: true,
        order: order,
        address: orderAddress,
        updateProducts: updatedProducts,
      };
    });

    console.log(products);

    return {
      ok: true,
      order: prismaTx.order,
      prismaTx: prismaTx,
    };
  } catch (error: any) {
    console.error(error);
    return {
      ok: false,
      message: error?.message,
    };
  }
};
