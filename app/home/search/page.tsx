"use client";
import useBlockchain from "@/services/useBlockchain";
import Image from "next/image";
import React, { useLayoutEffect, useState } from "react";
import { Peer } from "peerjs";
export default function SearchPage() {
  const [acceptor, setAcceptor] = React.useState<any>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const { getMyWalletAddress } = useBlockchain();
  const [peer, setPeer] = useState<Peer>();
  useLayoutEffect(() => {
    setTimeout(async () => {
      const res = await getMyWalletAddress();
      console.log(res);
      setPeer(new Peer(res));
      peer?.on("connection", (conn) => {
        console.log(conn);
        conn.on("data", (data) => {
          // Will print 'hi!'
          console.log(data);
        });
      });
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
      <div></div>
    </>
  );
}
