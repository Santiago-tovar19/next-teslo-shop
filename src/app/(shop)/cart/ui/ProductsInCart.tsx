"use client";
import { ProductImage } from "@/components/product/product-image/ProductImage";
import { QuantitySelector } from "@/components/product/quantity-selector/QuantitySelector";
import { Size } from "@/interfaces/product.interface";
import { useCartStore } from "@/store/cart/cart-store";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

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
  const updateProductQuantity = useCartStore((state) => state.updateProductQuantity);
  const deleteProductFromCart = useCartStore((state) => state.removeProduct);

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
            <ProductImage
              alt={product.slug}
              src={product.image}
              width={100}
              height={100}
              className="mr-5 rounded"
              style={{
                width: "100px",
                height: "100px",
              }}
            />

            <div>
              <Link
                className="hover:underline cursor-pointer"
                href={`/product/${product.slug}`}
              >
                {product.size} - {product.title}
              </Link>
              <p>{product.price}</p>
              <QuantitySelector
                quantity={product.quantity}
                onQuantityChanged={(value) => updateProductQuantity(product, value)}
              />
              <button
                onClick={() => deleteProductFromCart(product)}
                className="underline mt-3"
              >
                Remover
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
};
