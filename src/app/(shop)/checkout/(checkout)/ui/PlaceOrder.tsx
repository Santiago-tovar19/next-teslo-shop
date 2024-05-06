"use client";
import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { useAddressStore } from "@/store/address/address-store";
import { useCartStore } from "@/store/cart/cart-store";
import { currencyFormat } from "@/utils/currencyformat";
import { placeOrder } from "@/actions/order/place-order";
import { useRouter } from "next/navigation";

export const PlaceOrder = () => {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [errorMessage, setErrorMesagge] = useState(false);

  const address = useAddressStore((state) => state.address);
  const clearCart = useCartStore((state) => state.clearCart);
  const cart = useCartStore((state) => state.cart);

  const { itemsInCart, tax, subTotal, total } = useCartStore((state) =>
    state.getSummaryInformation()
  );

  useEffect(() => {
    setLoaded(true);
  }, []);

  const onPlaceOrder = async () => {
    setIsPlacingOrder(true);
    const productsToOrder = cart.map((product) => {
      return {
        productId: product.id,
        quantity: product.quantity,
        size: product.size,
      };
    });

    console.log({ productsToOrder, address });

    const resp = await placeOrder(productsToOrder, address);

    console.log(resp);

    if (!resp.ok) {
      setIsPlacingOrder(false);
      setErrorMesagge(resp.message);
      return;
    }

    clearCart();
    router.replace(`/orders/${resp.order?.id}`);
  };

  if (!loaded) {
    return <p>Cargando...</p>;
  }
  return (
    <div className="bg-white rounded-xl shadow-xl p-7">
      <h2 className="text-2xl">Direccion de entrega</h2>
      <div className="mb-6 mt-2">
        <p className="text-xl font-bold mb-2">
          {address.firstName} {address.lastName}
        </p>
        <p>{address.address}</p>
        <p>{address.address2 ? address.address2 : ""}</p>
        <p>{address.postalCode}</p>
        <p>
          {address.city}, {address.country}
        </p>
        <p>{address.phone}</p>
      </div>
      <div className="w-full h-0.5 rounded bg-gray-200 mb-8" />
      <h2 className="text-2xl mb-2">Resumen de la orden</h2>
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
      <div className="mt-3 mb-2 w-full">
        <p className="mb-5">
          <span className="text-xs font-semibold">
            Al hacer click en <span className="text-blue-600">Colocar Orden</span>, aceptas
            nuestros{" "}
            <a href="#" className="underline">
              Terminos y condiciones
            </a>{" "}
            y{" "}
            <a href="#" className="underline">
              Política de privacidad
            </a>
          </span>
        </p>

        <div
          className={clsx("flex  justify-between items-center", {
            "flex-row-reverse": errorMessage,
            "": !errorMessage,
          })}
        >
          {errorMessage && (
            <span className="  px-4 py-2 bg-red-500 text-white rounded-md fade-in">
              {errorMessage ? errorMessage : ""}
            </span>
          )}

          <button
            onClick={onPlaceOrder}
            className={clsx({
              "btn-primary": !isPlacingOrder,
              "btn-disabled": isPlacingOrder,
            })}
            // href="/orders/123"
          >
            Colocar Orden
          </button>
        </div>
      </div>
    </div>
  );
};
