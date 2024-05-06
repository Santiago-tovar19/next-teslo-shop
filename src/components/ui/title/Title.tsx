import { titleFont } from "@/config/font";
import React from "react";

interface Props {
  title: string;
  subtitle?: string;
  className?: string;
}

export const Title = ({ title, subtitle, className }: Props) => {
  return (
    <div className={`mt-3 mb-3 ${className}`}>
      <h1 className={`${titleFont.className} antialiased text-4xl font-semibold mt-7 mb-4`}>
        {title}
      </h1>

      {subtitle && <h3 className="text-xl">{subtitle}</h3>}
    </div>
  );
};
