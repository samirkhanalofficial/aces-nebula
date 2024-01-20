"use client";
import Image from "next/image";
import React from "react";

export default function SearchPage() {
  const [acceptor, setAcceptor] = React.useState<any>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
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

  return <></>;
}
