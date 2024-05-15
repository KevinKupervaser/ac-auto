"use client";
import Card from "@ui/Card";
import Image from "next/image";
import Link from "next/link";
import Logo from "/public/logo.jpg";
import Engine from "/public/engine.png";
import Miles from "/public/miles.png";
import Calendar from "/public/calendar.png";

interface Props {
  rest: any;
  product: {
    id: string;
    marca: string;
    modelo: string;
    description: string;
    category: string;
    thumbnail: string;
    engine: string;
    kilometros: number;
    doors: number;
    fuel: string;
    transmition: string;
    year: number;
  };
}

export default function ProductCard({ product, rest }: Props) {
  const {
    marca,
    id,
    thumbnail,
    description,
    category,
    modelo,
    engine,
    kilometros,
    year,
  } = product;

  return (
    <Card>
      <Link className="" href={`/${marca}/${id}`}>
        <div className="">
          <Image
            src={thumbnail}
            alt="thumbnail"
            priority={true}
            width="0"
            height="0"
            sizes="100vw"
            className="w-full h-auto rounded-tr-lg rounded-tl-lg"
          />
        </div>
        <div className="p-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-semibold mt-2">
              {marca + " " + modelo}
            </h3>
            <div>
              <Image
                src={Logo}
                width={20}
                height={20}
                alt="logo"
                className="rounded-full"
              />
            </div>
          </div>

          <div className="flex justify-between font-extralight text-xs text-gray-600 p-2">
            <div className="flex items-center gap-1">
              <Image
                src={Engine}
                width={20}
                height={20}
                alt="engine"
                className="opacity-50"
              />
              <p>{engine}</p>
            </div>
            <div className="flex items-center gap-1">
              <Image
                src={Miles}
                width={17}
                height={17}
                alt="miles"
                className="opacity-50"
              />
              <p>{kilometros} km</p>
            </div>
            <div className="flex items-center gap-1">
              <Image
                src={Calendar}
                width={15}
                height={15}
                alt="calendar"
                className="opacity-50"
              />
              <p>{year}</p>
            </div>
          </div>
        </div>
      </Link>
    </Card>
  );
}
