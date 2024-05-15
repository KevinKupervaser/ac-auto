"use client";
import Link from "next/link";
import React from "react";
import useAuth from "../hooks/useAuth";
import SignOutButton from "./SignOutButton";
import Logo from "/public/logo.jpg";
import Image from "next/image";

const Navbar = () => {
  const { loggedIn } = useAuth();

  return (
    <>
      <div className="hidden lg:flex justify-end items-center bg-gray-700 text-white gap-4">
        {loggedIn && (
          <div className="text-xs">
            <Link href="/">Inicio</Link>
          </div>
        )}
        {loggedIn && (
          <div className="text-xs">
            <Link href="/products">Autos</Link>
          </div>
        )}
        {loggedIn ? (
          <SignOutButton className="pr-6 cursor-pointer text-xs">
            Cerrar Sesion
          </SignOutButton>
        ) : (
          <div className="pr-6 text-xs">
            <Link href="/auth/signin">Ingresar</Link>
          </div>
        )}
      </div>
      <div className="bg-black hidden lg:flex items-center justify-center">
        <Link href={"/"}>
          <div className="flex items-center">
            <Image
              src={Logo}
              alt="logo"
              width={50}
              height={50}
              className="rounded-full"
            />
          </div>
        </Link>
      </div>
    </>

    // <div className=" bg-black text-white mb-10">
    //   <div className="flex justify-center items-center">
    //     <Image
    //       src={Logo}
    //       alt="logo"
    //       width={50}
    //       height={50}
    //       className="rounded-full"
    //     />
    //     <div className="">
    //       <Link href="/auth/signin">Ingresar</Link>
    //     </div>
    //   </div>
    //   {loggedIn && <p>Bienvenido Alejandro!</p>} */}
    //   {/* <nav className="flex w-full justify-end items-center gap-5 pr-10">
    //     <div>
    //       <Link href="/">Home</Link>
    //     </div>

    //     {loggedIn ? (
    //       <div>
    //         <Link href={"/dashboard"}>Dashboard</Link>
    //       </div>
    //     ) : (
    //       <div>
    //         <Link href={"/auth/signin"}>Ingresar</Link>
    //       </div>
    //     )}
    //     {loggedIn && (
    //       <SignOutButton>
    //         <div className="cursor-pointer">Logout</div>
    //       </SignOutButton>
    //     )}
    //   </nav>
    // </div>
  );
};

export default Navbar;
