"use client";
import useBlockchain from "@/services/useBlockchain";
import Image from "next/image";
import React, { useLayoutEffect, useState } from "react";
import { Peer } from "peerjs";
import AfterSearch from "./page2";
export default function SearchPage() {
  const [acceptor, setAcceptor] = React.useState<any>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const { getMyWalletAddress, getAllBookings } = useBlockchain();
  const [bookings, setBookings] = useState<any[]>([]);

  const fsdj = async () => {
    console.log("calling");
    await getAllBookings().then((res: any) => {
      console.log(res);
      setBookings(res);
    });
  };
  useLayoutEffect(() => {
    fsdj();
  }, []);

  const [peer, setPeer] = useState<Peer>();
  useLayoutEffect(() => {
    setTimeout(async () => {
      const res = await getMyWalletAddress();
      console.log(res);
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
            <p> We are searching for your ride.</p>
          </center>
        </div>
      </div>
    );
  }

  return (
    <>
      <div>
        <AfterSearch />
      </div>
    </>
  );
}
