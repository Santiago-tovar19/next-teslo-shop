"use client";
import { QuantitySelector } from "@/components/product/quantity-selector/QuantitySelector";
import { SizeSelector } from "@/components/product/size-selector/SizeSelector";
import { CartProducts, Product, Size } from "@/interfaces/product.interface";
import { useCartStore } from "@/store/cart/cart-store";
import React, { useState } from "react";

interface Props {
  product: Product;
}

export const AddToCart = ({ product }: Props) => {
  const addProductToCart = useCartStore((state) => state.addProducttoCart);
  const [selectedSize, setSelectedSize] = useState<Size | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const [posted, setPosted] = useState(false);

  const addToCart = () => {
    setPosted(true);
    if (!selectedSize) return;

    console.log({ product, selectedSize, quantity });
    const cartProduct: CartProducts = {
      id: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      quantity,
      size: selectedSize,
      image: product.images[0],
    };

    addProductToCart(cartProduct);

    setPosted(false);
    setQuantity(1);
    setSelectedSize(undefined);
  };
  return (
    <>
      {posted && !selectedSize && (
        <span className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md fade-in">
          Debe de seleccionar una talla
        </span>
      )}
      {/* selector de tallas  */}
      <SizeSelector
        onSizeChanged={(size) => setSelectedSize(size)}
        selectedSize={selectedSize}
        availableSizes={product.sizes}
      />

      {/* selector de cantidad  */}
      <QuantitySelector quantity={quantity} onQuantityChanged={setQuantity} />

      <button onClick={addToCart} className="btn-primary my-5">
        Agregar al carrito
      </button>
    </>
  );
};
