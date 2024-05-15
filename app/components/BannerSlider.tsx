"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ToyotaBanner from "/public/t-corolla.jpg";
import FordBanner from "/public/f-ranger.jpg";
import ChevroletBanner from "/public/c-cruze.jpg";
import Image from "next/image";

interface BannerSliderProps {}

const BannerSlider: React.FC<BannerSliderProps> = () => {
  const settings: SliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="pb-8">
      <Slider {...settings}>
        <div>
          <Image
            src={ToyotaBanner}
            className="w-full h-[300px] object-cover"
            alt="Banner 1"
          />
        </div>
        <div>
          <Image
            src={FordBanner}
            className="w-full h-[300px] object-cover"
            alt="Banner 1"
          />
        </div>
        <div>
          <Image
            src={ChevroletBanner}
            className="w-full h-[300px] object-cover"
            alt="Banner 1"
          />
        </div>
        {/* Add more slides as needed */}
      </Slider>
    </div>
  );
};

interface SliderSettings {
  dots: boolean;
  infinite: boolean;
  speed: number;
  slidesToShow: number;
  slidesToScroll: number;
  autoplay: boolean;
  autoplaySpeed: number;
}

export default BannerSlider;
