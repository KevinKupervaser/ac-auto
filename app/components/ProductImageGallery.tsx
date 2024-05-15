"use client";
import Image from "next/image";
import React, { useRef, useState } from "react";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface Props {
  images: string[];
}

const settings: Settings = {
  dots: false,
  lazyLoad: "anticipated",
  infinite: true,
  speed: 100,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  autoplay: false,
  className: "w-[500px]",
};

export default function ProductImageGallery(props: Props) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { images } = props;
  const slider = useRef<Slider>(null);

  // console.log(images.length)

  const oneImage = images.length === 1;

  const singleImage = images.slice(0, 1);

  return (
    <>
      {oneImage ? (
        <div className="flex justify-center">
          {singleImage.map((img, index) => {
            return (
              <Image
                key={index}
                src={img}
                alt="testing"
                width="0"
                height="0"
                sizes="100vw"
                priority={true}
              />
            );
          })}
        </div>
      ) : (
        <div>
          <Slider
            {...settings}
            afterChange={(currentSlide) => {
              setCurrentSlide(currentSlide);
            }}
            ref={slider}
          >
            {images.map((img, index) => {
              return (
                <Image
                  key={index}
                  src={img}
                  alt="cars"
                  width="0"
                  height="0"
                  sizes="100vw"
                  priority={true}
                />
              );
            })}
          </Slider>
          <div className="flex py-2 space-x-2">
            {images.map((img, index) => {
              return (
                <Image
                  onClick={() => slider.current?.slickGoTo(index)}
                  className={`${
                    index === currentSlide ? "ring ring-blue-500" : ""
                  } w-[80px] h-[80px] object-cover`}
                  key={index}
                  src={img}
                  alt="testing"
                  width="0"
                  height="0"
                  sizes="100vw"
                  priority={true}
                />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
