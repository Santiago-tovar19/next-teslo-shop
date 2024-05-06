"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css/free-mode";
import "swiper/css/pagination";

import "./slideshow.css";
import "swiper/css";
import { Autoplay, FreeMode, Navigation, Pagination } from "swiper/modules";
import Image from "next/image";

interface Props {
  images: string[];
  title: string;
  className?: string;
}

export const ProductMobileSlidesShow = ({ images, title, className }: Props) => {
  return (
    <div className={className}>
      <Swiper
        style={{
          width: "100vw",
          height: "500px",
        }}
        pagination
        navigation={true}
        autoplay={{ delay: 2500 }}
        modules={[FreeMode, Autoplay, Navigation, Pagination]}
        className="mySwiper2"
      >
        {images.map((image) => {
          return (
            <SwiperSlide key={image}>
              <Image
                src={`/products/${image}`}
                alt={title}
                width={600}
                height={500}
                className="object-fill"
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};
