import { Title } from "@/components/ui/title/Title";

import Image from "next/image";
import Link from "next/link";
import { IoReturnUpBackOutline } from "react-icons/io5";
import { ProductsInCart } from "./ui/ProductsInCart";
import { PlaceOrder } from "./ui/PlaceOrder";

export default function CheckoutPage() {
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title="Verificar orden" className="-mb-3" />

        <div className="grid grid-cols- sm:grid-cols-2 gap-10">
          {/* carrito */}

          <div className="flex flex-col ">
            <span className="text-xl">Ajustar Elementos</span>
            <Link
              className="mt-3 mb-3 flex items-center bg-blue-500 text-white w-[200px] px-3 py-2 rounded-md"
              href="/cart"
            >
              <IoReturnUpBackOutline size={25} />
              <span className="ml-4">Editar Carrito</span>
            </Link>

            {/* items */}

            <ProductsInCart />
          </div>

          {/* resumen de la orden  */}
          <PlaceOrder />
        </div>
      </div>
    </div>
  );
}
