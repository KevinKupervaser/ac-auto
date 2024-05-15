"use client";

import React from "react";
import { Button } from "@material-tailwind/react";
import { useParams } from "next/navigation";
import { PhoneIcon } from "@heroicons/react/24/outline";
import useAuth from "../hooks/useAuth";

interface Props {
  modelo: string;
  rest: any;
}

export default function BuyingOptions({ rest, modelo }: Props) {
  const { product } = useParams();

  const modeloName = modelo;
  const productName = decodeURIComponent(product[0]);

  const sendWappMessage = () => {
    const message = `Hola AC automotores estoy interesado en el vehiculo - ${
      productName + " "
    } ${modeloName}`;
    // Format the message
    const formattedMessage = encodeURIComponent(message);

    // Create the WhatsApp URL with the message
    const whatsappUrl = `https://wa.me/+543794390681?text=${formattedMessage}`;

    // Open WhatsApp in a new tab
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="flex items-center space-x-2">
      <Button
        color="black"
        className="rounded-full flex gap-2"
        onClick={sendWappMessage}
        {...rest}
      >
        Más Info <PhoneIcon className="w-4 h-4" />
      </Button>
    </div>
  );
}
