"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IoClose } from "react-icons/io5";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import React, { useState } from "react";
import Logo from "../components/ui/Logo";
import QrCodeGenerator from "../components/scan/Scanner";

function Page() {
  const [qrclicked, setQrClicked] = useState(false);
  const handleQrButtonClick = () => {
    setQrClicked(!qrclicked);
  };
  return (
    <main className="flex flex-col items-center justify-center h-screen p-4">
      <Logo />
      <div className="flex flex-col items-center justify-center h-screen gap-8">
        <Button
          onClick={() => {
            setQrClicked((prev) => !prev);
          }}
          variant="outline"
          className=" border-green-700 text-3xl p-8 w-80 h-20 border-2"
        >
          Generate Scan
        </Button>
        {qrclicked && (
          <div className="fixed inset-0 flex items-center justify-center z-10">
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="z-10 w-1/2 mx-auto p-4 bg-white rounded-md shadow-lg">
              <IoClose
                size={25}
                onClick={handleQrButtonClick}
                className="absolute top-2 right-2 cursor-pointer"
              />
              <QrCodeGenerator address="112" amount={100} />
            </div>
          </div>
        )}
        <Dialog>
          <DialogTrigger className=" bg-green-700 text-3xl p-8 w-80 h-20 flex items-center justify-center text-white rounded-lg">
            Generate Amount
          </DialogTrigger>
          <DialogContent className="w-11/12 rounded-lg">
            <DialogHeader>
              <DialogTitle className="mb-4 text-3xl">
                How much amount do you want to charge?
              </DialogTitle>
              <DialogDescription>
                <Input
                  type="number"
                  placeholder="Rs."
                  className="text-4xl p-8 "
                />
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </main>
  );
}

export default Page;
