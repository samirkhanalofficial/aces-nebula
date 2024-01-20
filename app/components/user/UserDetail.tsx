"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import useBlockchain from "@/services/useBlockchain";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";
import Loading from "../ui/Loading";

export default function UserDetails() {
  const [isLoading, setIsLoading] = useState(false);
  const { acceptBooking } = useBlockchain();
  return (
    <div className="m-5 flex items-center justify-center">
      <IoMdClose
        size={25}
        className="absolute top-2 right-2 text-gray-700 cursor-pointer z-20"
      />

      <div className="w-full h-40 bg-gray-200/50 rounded-lg relative p-4 shadow-md">
        <div className="w-24 h-24 rounded-full bg-gray-300"></div>

        <div className="flex flex-col absolute right-6 top-6 text-gray-700">
          <p className="text-sm">Rs.200</p>
        </div>

        <div className="flex gap-4 absolute bottom-2 right-2">
          {!isLoading ? (
            <Button
              variant={`default`}
              size={`lg`}
              className={cn("bg-green-500 hover:bg-green-600")}
              onClick={async () => {
                try {
                  setIsLoading(true);
                  const res = await acceptBooking(131231283123, 101);

                  setIsLoading(false);
                } catch (e: any) {
                  console.log(e);
                  toast.error(e.toString());
                  setIsLoading(false);
                }
              }}
            >
              Accept
            </Button>
          ) : (
            <Loading />
          )}
          <Button
            variant={`destructive`}
            size={`lg`}
            className={cn("bg-red-500 hover:bg-red-600")}
          >
            Reject
          </Button>
        </div>
      </div>
    </div>
  );
}
