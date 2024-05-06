import { titleFont } from "@/config/font";
import Link from "next/link";
import React from "react";
import useState from "react";
import { NewAccountForm } from "./ui/NewAccountForm";

export default function NewAccountPage() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      <h1 className={`${titleFont.className} text-4xl mb-5`}>Nueva Cuenta</h1>
      <NewAccountForm />
    </div>
  );
}
