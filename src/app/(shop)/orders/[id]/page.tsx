import React from "react";
import { redirect } from "next/navigation";
import Image from "next/image";
import clsx from "clsx";
import { IoCardOutline } from "react-icons/io5";
import { Title } from "@/components/ui/title/Title";
import { initialData } from "@/seed/seed";
import { getOrderById } from "@/actions/order/get-order-by-id";
import { currencyFormat } from "@/utils/currencyformat";
import { PaypalButton } from "@/components/paypal/PaypalButton";
import { OrderStatus } from "@/components/orders/OrderStatus";

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];

interface Props {
  params: {
    id: string;
  };
}

export default async function OrderPage({ params }: Props) {
  const { id } = params;

  const { ok, order } = await getOrderById(id);

  console.log(order);

  if (!ok) {
    redirect("/");
  }

  const address = order?.OrderAddress;

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title={`Orden #${id.split("-").at(-1)}`} />

        <div className="grid grid-cols- sm:grid-cols-2 gap-10">
          {/* carrito */}

          <div className="flex flex-col mt-5">
            <OrderStatus isPais={order!.isPais} />

            {/* items */}

            {order!.OrderItem.map((item) => {
              return (
                <div key={item.product.slug + "-" + item.size} className="flex mb-5">
                  <Image
                    alt={item.product.slug}
                    src={`/products/${item.product.ProductImage[0].url}`}
                    width={100}
                    height={100}
                    className="mr-5 rounded"
                    style={{
                      width: "100px",
                      height: "100px",
                    }}
                  />

                  <div>
                    <p>{item.product.title}</p>
                    <p>
                      {item.price} x {item.quantity}{" "}
                    </p>
                    <p className="font-bold">
                      Subtotal: {currencyFormat(item.price * item.quantity)}{" "}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* resumen de la orden  */}
          <div className="bg-white rounded-xl shadow-xl p-7">
            <h2 className="text-2xl">Direccion de entrega</h2>
            <div className="mb-6 mt-2">
              <p className="text-2xl font-bold mb-2">
                {address!.firstName} {address!.lastName}
              </p>
              <p className="">{address!.address}</p>
              <p className="">{address!.address2 ? address!.address2 : ""}</p>
              <p className="">{address!.postalCode}</p>
              <p className="">
                {address!.city}, {address!.countryId}
              </p>
              <p>{address!.phone}</p>
            </div>
            <div className="w-full h-0.5 rounded bg-gray-200 " />
            <h2 className="text-2xl mb-2">Resumen de la orden</h2>
            <div className="grid grid-cols-2">
              <span>No. de Productos</span>

              <span className="text-right">
                {order?.itemsInOrder === 1
                  ? `${order?.itemsInOrder} 1 articulo`
                  : `${order?.itemsInOrder} articulos`}{" "}
              </span>
              <span>Subtotal</span>
              <span className="text-right">{currencyFormat(order!.subTotal)} </span>
              <span>Impuestos (15%)</span>
              <span className="text-right">{currencyFormat(order!.tax)}</span>
              <span className="mt-5 text-2xl">Total:</span>
              <span className="text-right mt-5 text-2xl">${order!.total} </span>
            </div>
            <div className="mt-4  w-full">
              {order?.isPais ? (
                <OrderStatus isPais={order!.isPais} />
              ) : (
                <PaypalButton orderId={id} amount={order!.total} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
