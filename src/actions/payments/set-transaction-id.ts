"use server";
import prisma from "@/lib/prisma";

export const setTransactionId = async (orderId: string, transactionId: string) => {
  try {
    const order = await prisma.order.update({
      where: { id: orderId },
      data: { transactionId },
    });

    if (!order) {
      return {
        ok: false,
        error: `No se pudo actualizar la orden ${orderId}`,
      };
    }

    return { ok: true, order };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      error: "No se pudo actualizar la orden",
    };
  }
};
