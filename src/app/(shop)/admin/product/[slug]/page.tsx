import { getProductBySlug } from "@/actions/products/get-product-by-slug";
import { Title } from "@/components/ui/title/Title";
import { redirect } from "next/navigation";
import React from "react";
import { ProductForm } from "./ui/ProductForm";
import { getCategories } from "@/actions/category/get-categories";
import { ProductForm2 } from "./ui/ProductForm2";
import { Product, ProductImage, Size } from "@/interfaces/product.interface";
import { Category } from "@prisma/client";

interface Props {
  params: {
    slug: string;
  };
}

const ProductAdminpage = async ({ params }: Props) => {
  const { slug } = params;
  const product = await getProductBySlug(slug);
  const categories = await getCategories();

  //todo new

  if (!product && slug !== "new") {
    redirect("/admin/products");
  }

  const title = slug === "new" ? "Nuevo Producto" : "Editar Producto";

  return (
    <>
      {/* <Title title={product?.title ? product.title : ""} /> */}
      <Title title={title} />
      <ProductForm product={product ?? {}} categories={categories} />
      {/* <ProductForm2 product={product ?? {}} /> */}
    </>
  );
};

export default ProductAdminpage;
