import clsx from "clsx";
import React from "react";
import { IoCardOutline } from "react-icons/io5";

interface Props {
  isPais: boolean;
}

export const OrderStatus = ({ isPais }: Props) => {
  return (
    <div
      className={clsx(
        "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
        {
          "bg-red-500": !isPais,
          "bg-green-600": isPais,
        }
      )}
    >
      <IoCardOutline size={30} className="" />
      {/* <span className="mx-2">Pendiente de pago</span> */}
      <span className="mx-2">{isPais ? "Orden pagada" : "Pendiente de pago"}</span>
    </div>
  );
};
