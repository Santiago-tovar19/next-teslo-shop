import Image from "next/image";
import React from "react";
import { any } from "zod";
interface Props {
  src?: string;
  alt: string;
  className?: React.StyleHTMLAttributes<HTMLImageElement>["className"];
  width?: number;
  height?: number;
  style?: React.StyleHTMLAttributes<HTMLImageElement>["style"];
  onMouseEnter?: any;
  onMouseLeave?: any;
}

export const ProductImageChanged = ({
  src,
  alt,
  className,
  width,
  height,
  style,
  onMouseEnter,
  onMouseLeave,
}: Props) => {
  const localSrc = src
    ? src.startsWith("http")
      ? src
      : `/products/${src}`
    : "/imgs/placeholder.jpg";
  return (
    <>
      <Image
        src={localSrc}
        alt={alt}
        width={width}
        height={height}
        className={className}
        style={style}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      />
    </>
  );
};
