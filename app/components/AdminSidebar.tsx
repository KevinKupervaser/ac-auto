"use client";
import Link from "next/link";
import React, { ReactNode } from "react";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import SignOutButton from "@components/SignOutButton";
import Logo from "/public/logo.jpg";
import Image from "next/image";
import CarIcon from "/public/car.png";

interface Props {
  children: ReactNode;
}

const AdminSidebar = ({ children }: Props) => {
  return (
    <div className="flex">
      <div className="flex flex-col justify-between bg-gray-300 h-screen sticky top-0 w-64 p-10">
        <ul className="space-y-4 text-white">
          {/* <li className="font-semibold text-lg text-white">Ecommerce</li> */}
          <li className="flex justify-center">
            <Image
              src={Logo}
              alt="Logo"
              width={50}
              height={50}
              className="rounded-full"
            />
          </li>
          <li>
            <Link className="flex items-center space-x-1" href="/products">
              <Image src={CarIcon} alt="Logo" width={25} height={25} />
              <span className="text-gray-800">Autos</span>
            </Link>
            <hr className="w-full bg-gray-700 h-[0.10rem]" />
          </li>
        </ul>

        <div>
          <SignOutButton>
            <div className="cursor-pointer text-gray-800">Logout</div>
          </SignOutButton>
        </div>
      </div>
      <div className="max-w-screen-xl mx-auto flex-1 p-4 overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

export default AdminSidebar;
