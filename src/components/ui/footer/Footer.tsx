import { titleFont } from "@/config/font";
import Link from "next/link";
import React from "react";

export const Footer = () => {
  return (
    <div className="flex w-full justify-center text-xs mb-10">
      <Link href="/">
        <span className={`${titleFont.className} antialised font-bold`}>Teslo </span>
        <span>| shop</span>
        <span> © {new Date().getFullYear()}</span>
      </Link>
      <Link href="/" className="ml-4">
        Privacidad & Legal
      </Link>
      <Link href="/" className="ml-4">
        Contacto
      </Link>
    </div>
  );
};
