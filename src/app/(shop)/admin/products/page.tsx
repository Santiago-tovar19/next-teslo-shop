export const revalidate = 0;
import { getPaginatedProductsWithImages } from "@/actions/products/product-pagination";
import { ProductImage } from "@/components/product/product-image/ProductImage";
import { Pagination } from "@/components/ui/pagination/Pagination";
import { Title } from "@/components/ui/title/Title";
import { currencyFormat } from "@/utils/currencyformat";
import Link from "next/link";

interface Props {
  searchParams: {
    page?: string;
  };
}

export default async function OrdersAdminPage({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const { products, currentPage, totalPages } = await getPaginatedProductsWithImages({ page });

  return (
    <>
      <Title title="Mantenimiento de productos" />

      <div className="flex justify-end mb-8">
        <Link className="btn-primary" href="/admin/product/new">
          Nuevo Producto
        </Link>
      </div>

      <div className="mb-10">
        <table className="min-w-full">
          <thead className="bg-gray-200 border-b">
            <tr>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Imagen
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Tiutlo
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                precio
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Genero
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Inventario
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Tallas
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              return (
                <tr
                  key={product.id}
                  className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    <Link href={`/product/${product.slug}`}>
                      <ProductImage
                        src={product.ProductImage[0]?.url}
                        width={80}
                        height={80}
                        alt={product.title}
                        className="w-20 h-20 object-cover rounded"
                      />
                    </Link>
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    <Link href={`/admin/product/${product.slug} `}>{product.title}</Link>
                  </td>
                  <td className=" text-sm  text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
                    {currencyFormat(product.price)}
                  </td>
                  <td className=" text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {product.gender}
                  </td>
                  <td className=" text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {product.inStock}
                  </td>
                  <td className=" text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {product.sizes.join(", ")}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Pagination totalPages={totalPages} />
      </div>
    </>
  );
}
