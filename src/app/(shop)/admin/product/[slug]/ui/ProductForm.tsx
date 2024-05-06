"use client";

import { createUpdateProduct } from "@/actions/products/create-update-product";
import { deleteProductImage } from "@/actions/products/delete-product-image";
import { ProductImage } from "@/components/product/product-image/ProductImage";
import { Category } from "@/interfaces/category.interface";
import { Product, ProductImage as ProductWithImage } from "@/interfaces/product.interface";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

interface Props {
  product: Partial<Product> & { ProductImage?: ProductWithImage[] };
  categories: Category[];
}

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

interface FormInputs {
  title: string;
  slug: string;
  description: string;
  price: number;
  inStock: number;
  sizes: string[];
  tags: string;
  gender: "men" | "women" | "kid" | "unisex";
  categoryId: string;
  images?: FileList;
  countImages?: number;
}

export const ProductForm = ({ product, categories }: Props) => {
  const [sendPendig, setSendPending] = useState(false);
  const [imagePending, setImagePending] = useState(false);
  const router = useRouter();
  const [ImgCount, setImgCount] = useState(0);
  const [selectedImages, setSelectedImages] = useState<FileList | null>(null);

  useEffect(() => {
    console.log(ImgCount);
  }, [ImgCount]);
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors, isValid },
    getValues,
    watch,
  } = useForm<FormInputs>({
    defaultValues: {
      ...product,
      tags: product.tags?.join(","),
      sizes: product.sizes ?? [],
      images: undefined,
    },
  });

  watch("sizes");

  const onSizeChange = (size: string) => {
    const sizes = new Set(getValues("sizes"));
    sizes.has(size) ? sizes.delete(size) : sizes.add(size);
    setValue("sizes", Array.from(sizes));
  };

  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const images = event.target.files;
    if (images) {
      setSelectedImages(images);
      setImgCount(images.length);
    }
  };

  const deleteImageProductUnique = async (imageId: number, imageUrl: string) => {
    setImagePending(true);
    await deleteProductImage(imageId, imageUrl);
    setImagePending(false);
  };

  const onSubmit = async (data: FormInputs) => {
    setSendPending(true);
    const formData = new FormData();

    const { images, ...productToSave } = data;
    if (product.id) formData.append("id", product.id ?? "");

    formData.append("title", productToSave.title);
    formData.append("slug", productToSave.slug);
    formData.append("description", productToSave.description);
    formData.append("price", productToSave.price.toString());
    formData.append("inStock", productToSave.inStock.toString());
    formData.append("sizes", productToSave.sizes.toString());
    formData.append("tags", productToSave.tags);
    formData.append("categoryId", productToSave.categoryId);
    formData.append("gender", productToSave.gender);

    if (images) {
      for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
      }
    }

    const { ok, product: updatedProduct } = await createUpdateProduct(formData);

    if (!ok) {
      alert("Error al guardar el producto");
      return;
    }

    setValue("images", undefined);
    setImgCount(0);

    router.replace(`/admin/product/${updatedProduct?.slug}`);
    setSendPending(false);
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid px-5 mb-16 grid-cols-1 sm:px-0 sm:grid-cols-2 gap-3 bg-white shadow-2xl rounded-lg py-3"
      >
        {/* Textos */}
        <div className="w-full px-4 py-4">
          <div className="flex flex-col mb-3">
            <span className="text-gray-600 font-medium text-xl mb-2">Título</span>
            <input
              type="text"
              placeholder="Titulo del producto"
              className="px-2 py-3 border-b-2  rounded-[8px] bg-gray-50"
              {...register("title", { required: true })}
            />
          </div>

          <div className="flex flex-col mb-3">
            <span className="text-gray-600 font-medium text-xl mb-2">Slug</span>
            <input
              type="text"
              placeholder="Slug Del Producto"
              className="px-2 py-3 border-b-2 rounded-[8px] bg-gray-50"
              {...register("slug", { required: true })}
            />
          </div>

          <div className="flex flex-col mb-3">
            <span className="text-gray-600 font-medium text-xl mb-2">Descripción</span>
            <textarea
              rows={5}
              placeholder="Descripcion del Producto"
              className="px-2 py-3 border-b-2 rounded-[8px] bg-gray-50"
              {...register("description", { required: true })}
            ></textarea>
          </div>

          <div className="flex flex-col mb-3">
            <span className="text-gray-600 font-medium text-xl mb-2">Price</span>
            <input
              type="number"
              placeholder="Precio del Producto"
              className="px-2 py-3 border-b-2 rounded-[8px] bg-gray-50"
              {...register("price", { required: true, min: 0 })}
            />
          </div>

          <div className="flex flex-col mb-3">
            <span className="text-gray-600 font-medium text-xl mb-2">Tags</span>
            <input
              type="text"
              placeholder="Tags del Prodcuto"
              className="px-2 py-3 border-b-2 rounded-[8px] bg-gray-50"
              {...register("tags", { required: true })}
            />
          </div>

          <div className="flex flex-col mb-3">
            <span className="text-gray-600 font-medium text-xl mb-2 ">Gender</span>
            <select
              className="px-2 py-3 border-b-2 rounded-[8px]  bg-gray-50 text-gray-500"
              {...register("gender", { required: true })}
            >
              <option value="" className="">
                [Seleccione]
              </option>
              <option value="men">Men</option>
              <option value="women">Women</option>
              <option value="kid">Kid</option>
              <option value="unisex">Unisex</option>
            </select>
          </div>

          <div className="flex flex-col mb-3">
            <span className="text-gray-600 font-medium text-xl mb-2">Categoria</span>
            <select
              className="px-2 py-3 border-b-2 rounded-[8px] bg-gray-50 text-gray-500"
              {...register("categoryId", { required: true })}
            >
              <option value="" className="text-gray-500">
                [Seleccione]
              </option>
              {categories.map((category) => {
                return (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                );
              })}
            </select>
          </div>

          <button
            className={clsx({
              "btn-primary w-full mt-3": !sendPendig,
              "btn-disabled w-full mt-3": sendPendig,
            })}
            disabled={sendPendig}
          >
            Guardar
          </button>
        </div>

        {/* Selector de tallas y fotos */}
        <div className="w-full px-4 py-4 ">
          {/* As checkboxes */}
          <div className="flex flex-col">
            <span className="text-gray-600 font-medium text-xl mb-2">Tallas</span>
            <div className="flex flex-wrap">
              {sizes.map((size) => (
                // bg-gray-100 text-white <--- si está seleccionado
                <div
                  key={size}
                  onClick={() => onSizeChange(size)}
                  className={clsx(
                    "p-2 border rounded-md mr-2 mb-2 w-14 transition-all text-center cursor-pointer",
                    {
                      "bg-blue-500 text-white": getValues("sizes").includes(size),
                    }
                  )}
                >
                  <span>{size}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col mb-2 mt-3">
              <span className="text-gray-600 font-medium text-xl mb-2">Inventario</span>
              <input
                type="number"
                placeholder="Inventario del Producto"
                className="px-2 py-3 border-b-2 rounded-[8px] bg-gray-50"
                {...register("inStock", { required: true, min: 0 })}
              />
            </div>

            <div className="flex flex-col mt-6 ">
              <span className="text-gray-600 font-medium text-xl mb-2">Fotos</span>
              <div className="flex w-full items-center justify-center bg-grey-lighter">
                <label className="w-full flex justify-center items-center px-4 py-2 bg-gray-50 text-blue rounded-lg  tracking-wide capitalize border-b-2 border-blue cursor-pointer hover:bg-blue">
                  <svg
                    className="w-8 h-8"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                  </svg>
                  <span className="text-base leading-normal ml-4 text-gray-400">
                    Selecciona tus Archivos {ImgCount}
                  </span>
                  <input
                    type="file"
                    multiple
                    {...register("images")}
                    onInput={onImageChange}
                    className="hidden"
                    accept="image/png, image/jpeg, image/avif"
                  />
                </label>
              </div>
            </div>
            <div className="grid grid-cols1 sm:grid-cols-3 gap-3">
              {product.ProductImage?.map((image) => (
                <div key={image.id}>
                  <ProductImage
                    src={image.url}
                    alt={product.title ?? ""}
                    width={300}
                    height={300}
                    className="rounded-t-md shadow-md mt-4"
                  />

                  <button
                    onClick={() => deleteImageProductUnique(image.id, image.url)}
                    type="button"
                    className={clsx("rounded-b-xl w-full ", {
                      "btn-danger rounded-b-xl": !imagePending,
                      "btn-disabled-2": imagePending,
                    })}
                    disabled={imagePending}
                  >
                    Eliminar
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </form>
    </>
  );
};
