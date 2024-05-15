"use client";
import React from "react";
import BuyingOptions from "@components/BuyingOptions";
import ProductImageGallery from "@components/ProductImageGallery";
import { BoltIcon } from "@heroicons/react/24/outline";

interface Props {
  marca: string;
  description: string;
  images: string[];
  points?: string[];
  category: string;
  modelo: string;
}

export default function ProductView({
  description,
  images,
  marca,
  points,
  category,
  modelo,
}: Props) {
  return (
    <div className="flex lg:flex-row flex-col md:gap-4 gap-2">
      <div className="flex-1 lg:self-start self-center">
        <ProductImageGallery images={images} />
      </div>

      <div className="flex-1 md:space-y-4 space-y-2">
        <h1 className="text-2xl font-semibold uppercase text-gray-900">
          {category + " " + modelo}
        </h1>

        <p className="max-w-[300px] mx-auto lg:mx-0 lg:max-w-[500px] text-sm text-gray-700">
          {description}
        </p>

        <div className="pl-4 space-y-2 text-sm">
          {points?.map((point, index) => {
            return <li key={index}>{point}</li>;
          })}
        </div>

        <div className="flex items-center space-x-2 mb-2">
          <p className="text-xl"></p>
        </div>

        <div className="flex py-4">
          <BuyingOptions rest={{}} modelo={modelo} />
        </div>
      </div>
    </div>
  );
}
