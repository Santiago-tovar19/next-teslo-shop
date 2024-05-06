export const revalidate = 0;

import { getPaginatedOrders } from "@/actions/order/get-paginated-orders";
import { Title } from "@/components/ui/title/Title";
import Link from "next/link";
import { redirect } from "next/navigation";
import { IoCardOutline } from "react-icons/io5";
import { UsersTable } from "./ui/UsersTable";
import { getPaginatedUsers } from "@/actions/user/get-paginated-user";
import { Pagination } from "@/components/ui/pagination/Pagination";

export default async function UsersAdminPage() {
  const { ok, users = [] } = await getPaginatedUsers();

  if (!ok) {
    redirect("/auth/login");
  }
  return (
    <>
      <Title title="Administrar usuarios" />

      <div className="mb-10">
        <UsersTable users={users} />

        <Pagination totalPages={1} />
      </div>
    </>
  );
}
