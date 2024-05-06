import { QuantitySelector } from "@/components/product/quantity-selector/QuantitySelector";
import { Title } from "@/components/ui/title/Title";
import { initialData } from "@/seed/seed";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { IoReturnUpBackOutline } from "react-icons/io5";
import { ProductsInCart } from "./ui/ProductsInCart";
import { OrderSummary } from "./ui/OrderSummary";

interface ProductsInTheCart {
  description: string;
  images: string[];
  inStock: number;
  price: number;
  sizes: string[];
  slug: string;
  type: string;
  tags: string[];
  title: string;
  gender: string;
}

export default function CartPage() {
  // if (productsInCart.length === 0) {
  //   redirect("/empty");
  // }
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title="Carrito" className="-mb-3 " />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* carrito */}

          <div className="flex flex-col">
            <span className="text-xl">Agregar mas Items</span>
            <Link
              href="/"
              className="mt-3 mb-3 flex items-center bg-blue-500 text-white w-[250px] px-3 py-2 rounded-md"
            >
              <IoReturnUpBackOutline size={25} />
              <span className="ml-4">Continua Comprando</span>
            </Link>

            {/* items */}
            <ProductsInCart />
          </div>

          {/* resumen de la orden  */}
          <div className="bg-white rounded-xl shadow-xl p-7 h-[300px] ">
            <h2 className="text-2xl mb-2">Resumen de la orden</h2>
            {/* ordersummary */}
            <OrderSummary />
            <div className="mt-5 mb-2 w-full">
              <Link className="flex btn-primary justify-center" href="/checkout/address">
                Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
