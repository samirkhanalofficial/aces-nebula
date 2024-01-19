"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IoLocationSharp } from "react-icons/io5";
import { cn } from "@/lib/utils";
import { FaMap, FaSearch } from "react-icons/fa";
import { MyMap } from "../components/ui/Map";
import { useEffect, useState } from "react";
import Logo from "../components/ui/Logo";
import ShortDistanceMap from "../components/ui/ShortDistanceMap";
import { toast } from "react-toastify";
export default function Home() {
  const [fromLat, setFromLat] = useState(26);
  const [fromLng, setFromLng] = useState(87);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [toLat, setToLat] = useState(null);
  const [toLng, setToLng] = useState(null);

  // useEffect(
  //   function () {
  //     async function fetchFrom() {
  //       try {
  //         const res = await fetch(
  //           `https://maps.googleapis.com/maps/api/geocode/json?latlng=${fromLat},${fromLng}&key=AIzaSyBULo4a_0EflZdjjRzOqdGQBuLftnctlb0`
  //         );

  //         if (res.ok) {
  //           const data = await res.json();
  //           setFrom(data.plus_code.compound_code);
  //         }
  //       } catch (error: any) {
  //         toast.error(error);
  //       }
  //     }

  //     fetchFrom();
  //   },
  //   [fromLat, fromLng]
  // );

  // useEffect(
  //   function () {
  //     async function fetchTo() {
  //       try {
  //         const res = await fetch(
  //           `https://maps.googleapis.com/maps/api/geocode/json?latlng=${toLat},${toLng}&key=AIzaSyBULo4a_0EflZdjjRzOqdGQBuLftnctlb0`
  //         );

  //         if (res.ok) {
  //           const data = await res.json();
  //           setTo(data.plus_code.compound_code);
  //         }
  //       } catch (error: any) {
  //         toast.error(error);
  //       }
  //     }

  //     fetchTo();
  //   },
  //   [toLng, toLat]
  // );

  return (
    <div className="p-8 h-[100vh]">
      <Logo />
      <div className="flex  items-center relative justify-center mt-6">
        <Input
          type="text"
          className={cn("")}
          placeholder="From"
          disabled
          value={from}
        />
        <div className="absolute right-0 flex items-center justify-center gap-2 p-2">
          <button>
            <IoLocationSharp size={25} className="text-green-700   " />
          </button>
        </div>
        <MyMap
          lat={fromLat}
          lng={fromLng}
          setLat={setFromLat}
          setLong={setFromLng}
          setFrom={setFrom}
        />
      </div>
      {/* <MyMap lat={lat} lng={lng} setLat={setLat} setLong={setLng} /> */}
      <div className="flex flex-row items-center my-5 relative">
        <Input type="text" placeholder="To" disabled value={to} />
        <div className="absolute right-0 flex items-center justify-center gap-2 p-2">
          <button>
            <IoLocationSharp size={25} className="text-green-700   " />
          </button>
        </div>
      </div>
      <Button
        variant="default"
        className="text-md w-full uppercase bg-green-800"
      >
        <div className="flex items-center justify-center gap-4">
          <span>Search</span>
          <FaSearch />
        </div>
      </Button>
    </div>
  );
}
