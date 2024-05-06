export const revalidate = 60800;
import { getProductBySlug } from "@/actions/products/get-product-by-slug";
import { QuantitySelector } from "@/components/product/quantity-selector/QuantitySelector";
import { SizeSelector } from "@/components/product/size-selector/SizeSelector";
import { ProductMobileSlidesShow } from "@/components/product/slideshow/ProductMobileSlidesShow";
import { ProductSlidesShow } from "@/components/product/slideshow/ProductSlidesShow";
import { StockLabel } from "@/components/product/stock-label/StockLabel";
import { titleFont } from "@/config/font";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import React from "react";
import { AddToCart } from "./ui/AddToCart";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = params.slug;

  const product = await getProductBySlug(slug);

  return {
    title: product?.title ?? "Producto no encontrado",
    description: product?.description ?? "Producto no encontrado",
    openGraph: {
      title: product?.title ?? "Producto no encontrado",
      description: product?.description ?? "Producto no encontrado",
      images: [`/products/${product?.images[1]}`],
    },
  };
}

export default async function ProductSlugPage({ params }: Props) {
  const { slug } = params;

  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }
  return (
    <div className="mt-5 mb-20 grid md:grid-cols-3 gap-3 ">
      {/* slideshow */}
      <div className="col-span-1 md:col-span-2">
        {/* mobile slideshow */}
        <ProductMobileSlidesShow
          images={product.images}
          title={product.title}
          className="block md:hidden"
        />

        {/* desktop slieshow */}
        <ProductSlidesShow
          images={product.images}
          title={product.title}
          className="hidden md:block"
        />
      </div>
      {/* detalles */}

      <div className="col-span-1 px-5 ">
        {/* label del total del stock */}
        <StockLabel slug={slug} />
        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
          {product.title}
        </h1>
        <p className="text-lg mb-5">$ {product.price}</p>

        {/* descripcion */}

        <AddToCart product={product} />

        <h3 className="font-bold text-sm">Descripción</h3>
        <p className="font-light">{product.description}</p>
      </div>
    </div>
  );
}
