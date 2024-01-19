import Image from "next/image";
import React from "react";

function Logo() {
  return (
    <div className="flex flex-col  justify-center items-center flex-1">
      <Image
        className=" rounded-full p-4"
        src={"/logo.png"}
        alt="Logo"
        width={300}
        height={300}
      />
      <h1 className="font-bold text-3xl tracking-wider text-green-700 uppercase p-4">
        Nebula EV
      </h1>
      <span className=" item-center text-lg tracking-wide italic text-stone-500">
        &quot; Reward for Saving Enviornment &quot;
      </span>
    </div>
  );
}

export default Logo;
