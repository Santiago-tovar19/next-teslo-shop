"use client";
import { login } from "@/actions/auth/login";
import { registerUSer } from "@/actions/auth/register";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

type FormInput = {
  name: string;
  email: string;
  password: string;
  verifyPassword: string;
};

export const NewAccountForm = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>();

  const onSubmit = async (data: FormInput) => {
    const { name, email, password, verifyPassword } = data;
    const resp = await registerUSer(name, email, password);

    if (!resp.ok) {
      setErrorMessage(resp.message);
      return;
    }

    await login(email.toLowerCase(), password);
    window.location.replace("/");

    console.log({ resp });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      {/* {errors.name?.type === "required" && (
        <span className="text-red-500 mb-2">El nombre es obligatorio</span>
      )} */}
      <label htmlFor="email"> Nombre Completo</label>
      <input
        className={clsx("px-5 py-2 border bg-gray-200 rounded mb-5", {
          "border-red-500": errors.name,
        })}
        {...register("name", { required: true })}
        autoFocus
        type="text"
      />
      <label htmlFor="email">Correo electrónico</label>
      <input
        className={clsx("px-5 py-2 border bg-gray-200 rounded mb-5", {
          "border-red-500": errors.email,
        })}
        type="email"
        {...register("email", {
          required: true,
          pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        })}
      />

      <label htmlFor="email">Contraseña</label>
      <input
        className={clsx("px-5 py-2 border bg-gray-200 rounded mb-5", {
          "border-red-500": errors.password,
        })}
        {...register("password", { required: true })}
        type="password"
      />
      {/* <label htmlFor="email">Verificar contraseña</label>
      <input
        className={clsx("px-5 py-2 border bg-gray-200 rounded mb-5", {
          "border-red-500": errors.verifyPassword,
        })}
        type="password"
        {...register("verifyPassword", { required: true })}
      /> */}

      <span className="text-red-500 mb-2">{errorMessage}</span>

      <button className="btn-primary">Crear Cuenta</button>

      {/* divisor l ine */}
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link href="/auth/login" className="btn-secondary text-center">
        Ingresar
      </Link>
    </form>
  );
};
