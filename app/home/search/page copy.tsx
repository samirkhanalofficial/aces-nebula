"use client";
import useBlockchain from "@/services/useBlockchain";
import Image from "next/image";
import React, { useLayoutEffect } from "react";

export default function SearchPage() {
  const [acceptor, setAcceptor] = React.useState<any>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [bookings, setBookings] = React.useState<any[]>([]);
  const { getMyHistory } = useBlockchain();
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
            <p> We are searching for your ride.</p>
          </center>
        </div>
      </div>
    );
  }

  return (
    <>
      <div>
        {bookings.map((a) => (
          <div key={a[0]} className="p-5 rounded-2xl shadow-lg m-5">
            uid {a[0]}
            <br />
            initiatior {a[1]}
            <br />
            fromlat {a[2]}
            <br />
            fromlong {a[3]}
            <br />
            tolat {a[4]}
            <br />
            tolong {a[5]}
            <br />
            acceptor {a[6]}
            <br />
            price {a[7]}
            <br />
            <br />
          </div>
        ))}
      </div>
    </>
  );
}
