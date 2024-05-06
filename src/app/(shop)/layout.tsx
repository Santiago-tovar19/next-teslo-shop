import { Footer } from "@/components/ui/footer/Footer";
import { Pagination } from "@/components/ui/pagination/Pagination";
import { Sidebar } from "@/components/ui/sidebar/Sidebar";
import { TopMenu } from "@/components/ui/top-menu/TopMenu";

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="bg-white min-h-screen text-black ">
      <TopMenu />
      <Sidebar />
      <div className="px-0  sm:px-10">{children}</div>

      <Footer />
    </main>
  );
}
