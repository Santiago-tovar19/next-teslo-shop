"use client";
import { useCartStore } from "@/store/cart/cart-store";
import { currencyFormat } from "@/utils/currencyformat";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export const OrderSummary = () => {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const { itemsInCart, tax, subTotal, total } = useCartStore((state) =>
    state.getSummaryInformation()
  );

  useEffect(() => {
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (itemsInCart === 0 && loaded === true) {
      router.replace("/empty");
    }
  }, [itemsInCart, loaded, router]);

  if (!loaded) {
    return <div>Loading...</div>;
  }
  return (
    <div className="grid grid-cols-2">
      <span>No. de Productos</span>
      <span className="text-right">
        {itemsInCart === 1 ? `${itemsInCart} articulos` : `${itemsInCart} articulos`}{" "}
      </span>
      <span>Subtotal</span>
      <span className="text-right">{currencyFormat(subTotal)} </span>
      <span>Impuestos (15%)</span>
      <span className="text-right">{currencyFormat(tax)}</span>
      <span className="mt-5 text-2xl">Total:</span>
      <span className="text-right mt-5 text-2xl">${total} </span>
    </div>
  );
};
