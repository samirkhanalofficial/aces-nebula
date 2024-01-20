"use client";
import useBlockchain from "@/services/useBlockchain";
import Image from "next/image";
import React, { useLayoutEffect } from "react";
import { Peer } from "peerjs";
import NavBar from "../components/nav/Navbar";
import { MyMap } from "../components/ui/Map";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
export default function SearchPage() {
  const [acceptor, setAcceptor] = React.useState<any>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [bookings, setBookings] = React.useState<any[]>([]);
  const { getMyHistory } = useBlockchain();
  var peer;
  useLayoutEffect(() => {
    setTimeout(async () => {
      const res = await getMyHistory();
      console.log(res);
      setBookings(res);
      setLoading(false);
    }, 2000);
  }, []);
  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-screen ">
        <div>
          <center>
            <Image
              className="animate-pulse duration-1000"
              src={"/searching.png"}
              alt="searching"
              width={100}
              height={100}
            />
            <br />

            <h2 className="font-bold">Stay Calm !</h2>
            <p> We are searching customers for you.</p>
          </center>
        </div>
      </div>
    );
  }

  return (
    <>
      <NavBar route={"user"} />

      <div>
        {bookings.map((a) => (
          <div
            key={a[0]}
            className="p-5 rounded-2xl shadow-lg m-5 overflow-x-hidden"
          >
            <div className="flex justify-between">
              <div className="w-24 h-24 bg-slate-300 rounded-3xl">
                <APIProvider apiKey={"AIzaSyBULo4a_0EflZdjjRzOqdGQBuLftnctlb0"}>
                  <Map
                    center={{
                      lat: Number(a[2]),
                      lng: Number(a[3]),
                    }}
                    zoom={11}
                  >
                    <Marker
                      position={{ lat: Number(a[2]), lng: Number(a[3]) }}
                    />
                  </Map>
                  <br />
                  Pickupfrom
                </APIProvider>
              </div>
              <div></div>
              <div className="w-24 h-24 bg-slate-300 rounded-3xl">
                <APIProvider apiKey={"AIzaSyBULo4a_0EflZdjjRzOqdGQBuLftnctlb0"}>
                  <Map
                    center={{
                      lat: Number(a[4]),
                      lng: Number(a[5]),
                    }}
                    zoom={11}
                  >
                    <Marker
                      position={{ lat: Number(a[4]), lng: Number(a[5]) }}
                    />
                  </Map>
                  <br />
                  Destination
                </APIProvider>
              </div>
            </div>
            <div className=" w-full pr-3 overflow-hidden">
              <br />
              <br />
              {/* uid {Number(a[0])} */}
              <br />
              initiatior {a[1]}
              <br />
              {/* fromlat {Number(a[2])}
            <br />
            fromlong {Number(a[3])}
            <br />
            tolat {a[4]}
            <br />
            tolong {a[5]}
            <br /> */}
              {a[6] !== "0x0000000000000000000000000000000000000000" && (
                <>
                  <b>Acceptor:</b> a[6]
                </>
              )}
              <br />
              {a[6] !== "0x0000000000000000000000000000000000000000" && (
                <>
                  <b>Price:</b> a[7]
                </>
              )}
              <br />
            </div>
            <br />
          </div>
        ))}
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
    </>
  );
}
