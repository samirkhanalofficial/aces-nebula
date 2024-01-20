import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

function HistoryContainer() {
  return (
    <div className="flex gap-8 items-center border-2 p-8 ">
      <div>
        <Image src={"/profile.png"} alt="profile" width={100} height={100} />
      </div>
      <div className="flex flex-col  items-start rounded-lg gap-4">
        <div className="flex items-start  gap-2 ">
          <span className="font-bold">ID</span>
          <span>12012</span>
        </div>

        <div className="flex items-start  gap-2  ">
          <span className="font-bold">From</span>
          <span>Dharan</span>
        </div>

        <div className="flex items-start justify-start gap-2 ">
          <span className="font-bold">To</span>
          <span>Kathmandu</span>
        </div>
      </div>
    </div>
  );
}

export default HistoryContainer;
