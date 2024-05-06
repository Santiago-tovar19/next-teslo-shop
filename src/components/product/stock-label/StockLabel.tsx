"use client";
import { getStockBySlug } from "@/actions/products/get-stock-by-slug";
import { titleFont } from "@/config/font";
import React, { useEffect, useState } from "react";

interface Props {
  slug: string;
}

export const StockLabel = ({ slug }: Props) => {
  const [stock, setStock] = useState<number | null>(0);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getStock();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getStock = async () => {
    const inStock = await getStockBySlug(slug);
    setStock(inStock);
    setIsLoading(false);
  };

  return (
    <>
      {isLoading ? (
        <h1
          className={`${titleFont.className} antialiased font-bold text-lg animate-pulse bg-gray-300 rounded-[4px] mb-1`}
        >
          &nbsp;
        </h1>
      ) : (
        <h1 className={`${titleFont.className} antialiased font-bold text-lg mb-1`}>
          Stock: {stock}
        </h1>
      )}
    </>
  );
};
