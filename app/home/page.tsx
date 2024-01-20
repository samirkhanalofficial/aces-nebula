"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IoLocationSharp } from "react-icons/io5";
import { cn } from "@/lib/utils";
import { FaMap, FaSearch } from "react-icons/fa";
import { MyMap } from "../components/ui/Map";
import { Ref, useEffect, useLayoutEffect, useState } from "react";
import Logo from "../components/ui/Logo";
import ShortDistanceMap from "../components/ui/ShortDistanceMap";
import { toast } from "react-toastify";
import NavBar from "../components/nav/Navbar";
export default function Home() {
  const [fromLat, setFromLat] = useState(26);
  const [fromLng, setFromLng] = useState(87);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [searchTermFrom, setSearchTermFrom] = useState("");
  const [searchTermTo, setSearchTermTo] = useState("");
  const [toLat, setToLat] = useState<number>(26);
  const [toLng, setToLng] = useState<number>(87);
  const [hints, setHints] = useState<
    {
      id: string;
      formattedAddress: string;
      location: {
        latitude: number;
        longitude: number;
      };
    }[]
  >([]);

  useEffect(() => {
    // Define a delay for the debounce
    const delay = 300;

    // Set up a timer
    const timerId = setTimeout(() => {
      // Your logic here (e.g., make an API request)
      searchText(searchTermFrom);
    }, delay);

    // Cleanup the timer if the component is unmounted or searchTerm changes
    return () => clearTimeout(timerId);
  }, [searchTermFrom]);
  useEffect(() => {
    // Define a delay for the debounce
    const delay = 300;

    // Set up a timer
    const timerId = setTimeout(() => {
      // Your logic here (e.g., make an API request)
      searchText(searchTermTo);
    }, delay);

    // Cleanup the timer if the component is unmounted or searchTerm changes
    return () => clearTimeout(timerId);
  }, [searchTermTo]);

  async function searchText(text: string) {
    //fetch locations from google maps api and set them to hints
    try {
      const res = await fetch(
        `https://places.googleapis.com/v1/places/:searchText?textQuery=${text}`,
        {
          method: "POST",
          body: JSON.stringify({
            textQuery: text,
          }),
          headers: {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": "AIzaSyBULo4a_0EflZdjjRzOqdGQBuLftnctlb0",
            "X-Goog-FieldMask": "*",
          },
        }
      );

      if (res.status == 200) {
        const data = await res.json();
        console.log(data.places);
        setHints(data.places);
      }
    } catch (error: any) {
      toast.error(error);
    }
  }
  const [selectedInput, setSelectedInput] = useState("from");
  useLayoutEffect(() => {
    function getLocation() {
      if (!navigator.geolocation) {
        return toast.error(
          "Please provide location permission to make better use of this service."
        );
      }
      navigator.permissions.query({ name: "geolocation" }).then((result) => {
        if (result.state === "denied") {
          toast.error(
            "Please provide location permission to make better use of this service."
          );
          return;
        }
      });
      let location = null;
      let latitude = null;
      let longitude = null;
      if (window.navigator && window.navigator.geolocation) {
        location = window.navigator.geolocation;
      } else {
        return toast.error("please provide location permission.");
      }
      location.getCurrentPosition(async function (position) {
        latitude = position.coords.latitude.toString();
        longitude = position.coords.longitude.toString();
        setToLat(position.coords.latitude);
        setFromLat(position.coords.latitude);
        setFromLng(position.coords.longitude);
        setToLng(position.coords.longitude);
      });
    }
    getLocation();
  }, []);

  useEffect(
    function () {
      async function fetchFrom() {
        try {
          const res = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${fromLat},${fromLng}&key=AIzaSyBULo4a_0EflZdjjRzOqdGQBuLftnctlb0`
          );

          if (res.ok) {
            const data = await res.json();
            setFrom(data.plus_code.compound_code);
          }
        } catch (error: any) {
          toast.error(error);
        }
      }

      fetchFrom();
    },
    [fromLat, fromLng]
  );

  useEffect(
    function () {
      async function fetchTo() {
        try {
          const res = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${toLat},${toLng}&key=AIzaSyBULo4a_0EflZdjjRzOqdGQBuLftnctlb0`
          );

          if (res.ok) {
            const data = await res.json();
            setTo(data.plus_code.compound_code);
          }
        } catch (error: any) {
          toast.error(error);
        }
      }

      fetchTo();
    },
    [toLng, toLat]
  );

  return (
    <>
      <NavBar route={"home"} />

      <div className="p-8 h-[100vh]">
        {selectedInput == "from" ? (
          <>
            <MyMap
              lat={fromLat}
              lng={fromLng}
              setLat={(lat: number) => {
                setFromLat(lat);
              }}
              setLong={(long: number) => {
                setFromLng(long);
              }}
            />
          </>
        ) : (
          <>
            <MyMap
              lat={toLat}
              lng={toLng}
              setLat={(lat: number) => {
                setToLat(lat);
              }}
              setLong={(long: number) => {
                setToLng(long);
              }}
            />
          </>
        )}
        <div id="locations" className=" mt-5">
          <b>
            <small>Pickup Location : </small>
          </b>
          <br />
          <div className="flex  items-center relative justify-center ">
            <Input
              type="text"
              className={cn("", selectedInput === "from" && "border-green-700")}
              placeholder="From"
              onFocus={() => setSelectedInput("from")}
              value={from}
              list="locations"
              onChange={(e) => {
                setFrom(e.target.value);
                setSearchTermFrom(e.target.value);
              }}
            />
            <div className="absolute right-0 flex items-center justify-center gap-2 p-2">
              <button>
                <IoLocationSharp size={25} className="text-green-700   " />
              </button>
            </div>
          </div>
          {selectedInput == "from" &&
            hints.map((hint) => (
              <div
                className="border-b-2 border-gray-200 p-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => {
                  setFromLat(hint.location.latitude);
                  setFromLng(hint.location.longitude);
                  setFrom(hint.formattedAddress);
                  setHints([]);
                }}
                key={hint.id}
              >
                {hint.formattedAddress}
              </div>
            ))}
        </div>
        {/* <MyMap lat={lat} lng={lng} setLat={setLat} setLong={setLng} /> */}
        <br />
        <b>
          <small>Destination : </small>
        </b>
        <div id="locations" className=" mb-5">
          <div className="flex flex-row items-center  relative">
            <Input
              type="text"
              placeholder="To"
              className={cn("", selectedInput === "to" && "border-green-700")}
              list="locations"
              value={to}
              onChange={(e) => {
                setTo(e.target.value);
                setSearchTermTo(e.target.value);
              }}
              onFocus={() => setSelectedInput("to")}
            />

            <div className="absolute right-0 flex items-center justify-center gap-2 p-2">
              <button>
                <IoLocationSharp size={25} className="text-green-700   " />
              </button>
            </div>
          </div>
          {selectedInput != "from" &&
            hints.map((hint) => (
              <div
                className="border-b-2 border-gray-200 p-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => {
                  setToLat(hint.location.latitude);
                  setToLng(hint.location.longitude);
                  setTo(hint.formattedAddress);
                  setHints([]);
                }}
                key={hint.id}
              >
                {hint.formattedAddress}
              </div>
            ))}
        </div>
        <Button
          onClick={() => {
            console.log(fromLat, fromLng, toLat, toLng);
          }}
          variant="default"
          className="text-md w-full  bg-green-800"
        >
          <div className="flex items-center justify-center gap-4">
            <span>Find a Ride</span>
          </div>
        </Button>
      </div>
      <br />
      <br />
      <br />
    </>
  );
}
