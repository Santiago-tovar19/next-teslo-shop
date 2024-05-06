"use client";
import { ProductImage } from "@/components/product/product-image/ProductImage";
import { ProductImageChanged } from "@/components/product/product-image/ProductImageChanged";
import { Product } from "@/interfaces/product.interface";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

interface Props {
  product: Product;
}

export const ProductGridItem = ({ product }: Props) => {
  const [displayImage, setDisplayImage] = useState(product.images[0]);

  return (
    <div className="rounded-md overflow-hidden fade-in">
      <Link href={`/product/${product.slug}`}>
        <ProductImageChanged
          src={displayImage}
          // src={`https://elfarandi.com/wp-content/uploads/2017/05/Chayanne.png`}
          alt={product.title}
          className="w-full object-cover rounded-xl"
          width={500}
          height={500}
          onMouseEnter={() => setDisplayImage(product.images[1])}
          onMouseLeave={() => setDisplayImage(product.images[0])}
        />
      </Link>
      <div className="p-4 flex flex-col">
        <Link className="hover:text-blue-600" href={`/product/${product.slug}`}>
          {product.title}
        </Link>
        <span className="font-bold">${product.price}</span>
      </div>
    </div>
  );
};
