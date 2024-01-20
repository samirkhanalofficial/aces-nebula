"use client";
import Link from "next/link";
import { FaUser } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import { BiQrScan } from "react-icons/bi";
import { useState } from "react";
import { QrScanner } from "@yudiel/react-qr-scanner";
import { IoClose } from "react-icons/io5";

export default function NavBar({ route }: { route: string }) {
  const [open, setOpen] = useState(false);

  const handleQrButtonClick = () => {
    setOpen(!open);
  };
  return (
    <div className="wrapper">
      <div className="bottom-appbar">
        <div className="tabs">
          <Link
            href={"/home"}
            className={`tab tab--left ${
              route === "home" ? "text-green-500" : "text-black"
            }`}
          >
            <AiFillHome />
          </Link>
          <div className="tab tab--fab">
            <div className="top cursor-pointer">
              <button className={`fab`} onClick={handleQrButtonClick}>
                <BiQrScan size={35} />
              </button>
            </div>
          </div>
          <Link
            href={"/user"}
            className={`tab tab--right ${
              route === "user" ? "text-green-500" : ""
            }`}
          >
            <FaUser
              className={`${route === "user" ? "text-primary" : "text-black"}`}
            />
          </Link>
        </div>
      </div>
      {open && (
        <div className="fixed inset-0 flex items-center justify-center z-10">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="z-10 w-1/2 mx-auto p-4 bg-white rounded-md shadow-lg">
            <IoClose
              size={25}
              onClick={handleQrButtonClick}
              className="absolute top-2 right-2 cursor-pointer"
            />
            <QrScanner
              onDecode={(result) => console.log(result)}
              onError={(error) => console.log(error?.message)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
