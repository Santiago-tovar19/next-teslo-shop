"use client";
import { authenticate } from "@/actions/auth/login";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";

import { IoInformationOutline } from "react-icons/io5";

export const LoginForm = () => {
  const [state, dispatch] = useFormState(authenticate, undefined);
  const router = useRouter();

  useEffect(() => {
    if (state === "Success") {
      // router.refresh();
      window.location.replace("/");
    }
  }, [state]);

  console.log({ state, dispatch });
  return (
    <form action={dispatch} className="flex flex-col">
      <label htmlFor="email">Correo electrónico</label>
      <input className="px-5 py-2 border bg-gray-200 rounded mb-5" name="email" type="email" />

      <label htmlFor="password">Contraseña</label>
      <input
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        name="password"
        type="password"
      />

      {state === "Invalid credentials." && (
        <div className="mb-2 flex flex-row">
          <IoInformationOutline className="text-red-500" />
          <p className="text-red-500 text-sm">Credenciales inválidas.</p>
        </div>
      )}

      <LoginButton />

      {/* <button type="submit" className="btn-primary">
        Ingresar
      </button> */}

      {/* divisor l ine */}
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link href="/auth/new-account" className="btn-secondary text-center">
        Crear una nueva cuenta
      </Link>
    </form>
  );
};

function LoginButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className={clsx({
        "btn-primary": true,
        "opacity-50": pending,
      })}
      disabled={pending}
    >
      Ingresar
    </button>
  );
}
