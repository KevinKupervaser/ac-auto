"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ToyotaBanner from "/public/1.jpg";
import FordBanner from "/public/2.jpg";
import { motion } from "framer-motion";
import Image from "next/image";
import Logo from "/public/logo.jpg";

interface BannerSliderProps {}

const BannerSlider: React.FC<BannerSliderProps> = () => {
  return (
    <>
      <div className="relative hidden lg:block">
        <div className="absolute w-full h-screen object-cover bg-black bg-opacity-60 flex items-center justify-center">
          <h1 className="text-5xl font-semibold text-white mt-20">
            ALEJANDRO CARDOZO | AUTOS EXCLUSIVOS
          </h1>
        </div>
        <Image
          src={ToyotaBanner}
          priority={true}
          alt="Banner 1"
          className="w-full h-screen object-cover"
        />
      </div>
      <div className="lg:hidden">
        <Image
          src={Logo}
          priority={true}
          alt="Banner 1"
          className="w-full h-auto object-cover lg:hidden"
        />
      </div>
    </>
  );
};

export default BannerSlider;
