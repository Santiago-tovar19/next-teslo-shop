import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export const getOrderById = async (id: string) => {
  const session = await auth();

  if (!session?.user) return { ok: false, message: "Debe de estar autenticado" };

  try {
    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        OrderAddress: true,
        OrderItem: {
          select: {
            price: true,
            quantity: true,
            size: true,
            product: {
              select: {
                title: true,
                slug: true,
                ProductImage: { select: { url: true }, take: 1 },
              },
            },
          },
        },
      },
    });

    if (!order) throw new Error(`${id} No se encontró la orden`);

    if (session.user.role === "user") {
      if (session.user.id !== order.userId) {
        throw new Error(`No tienes permisos para ver esta orden`);
      }
    }
    return {
      ok: true,
      order: order,
    };
  } catch (error) {
    console.log(error);

    return {
      ok: false,
      message: `La orden no existe`,
    };
  }
};
