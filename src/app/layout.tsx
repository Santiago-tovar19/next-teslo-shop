import type { Metadata } from "next";
import { inter } from "@/config/font";
import "./globals.css";
import { Providers } from "@/components/providers/Providers";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

export const metadata: Metadata = {
  title: {
    template: "Teslo | Shop - %s ",
    default: "Home - Teslo | Shop",
  },
  description: "Tienda virtual de productos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  console.log(process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID);
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
