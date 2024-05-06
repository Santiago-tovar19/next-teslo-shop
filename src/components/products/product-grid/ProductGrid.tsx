import { Product } from "@/interfaces/product.interface";
import React from "react";
import { ProductGridItem } from "./ProductGridItem";

interface Props {
  products: Product[];
}

export const ProductGrid = ({ products }: Props) => {
  return (
    <div className="grid grid-cols2 sm:grid-cols-3 gap-10 mb-10">
      {products.map((product) => {
        return <ProductGridItem key={product.slug} product={product} />;
      })}
    </div>
  );
};
