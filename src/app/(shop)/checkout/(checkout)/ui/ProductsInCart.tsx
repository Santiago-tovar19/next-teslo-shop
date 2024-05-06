"use client";
import React, { useEffect, useState } from "react";
import { Size } from "@/interfaces/product.interface";
import { useCartStore } from "@/store/cart/cart-store";
import { currencyFormat } from "@/utils/currencyformat";
import Image from "next/image";

interface ProductInTheCart {
  id: string;
  image: string;
  price: number;
  quantity: number;
  size: Size;
  slug: string;
  title: string;
}

export const ProductsInCart = () => {
  const [loaded, setLoaded] = useState(false);
  const productsInCart = useCartStore((state) => state.cart);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <div>Loading...</div>;
  }
  return (
    <>
      {productsInCart.map((product: ProductInTheCart) => {
        return (
          <div key={`${product.slug}-${product.size}`} className="flex mb-5 mt-2 sm:mt-8">
            <Image
              alt={product.slug}
              src={`/products/${product.image}`}
              width={100}
              height={100}
              className="mr-5 rounded"
              style={{
                width: "100px",
                height: "100px",
              }}
            />

            <div>
              <span>
                {product.size} - {product.title} ({product.quantity})
              </span>
              <p className="font-bold">{currencyFormat(product.price * product.quantity)}</p>
            </div>
          </div>
        );
      })}
    </>
  );
};
