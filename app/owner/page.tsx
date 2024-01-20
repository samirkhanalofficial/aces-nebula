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

import React, { useEffect, useState } from "react";
import Logo from "../components/ui/Logo";
import QrCodeGenerator from "../components/scan/Scanner";
import useBlockchain from "@/services/useBlockchain";
import { useRouter } from "next/navigation";

function Page() {
  const { getMyWalletAddress } = useBlockchain();
  const [qrclicked, setQrClicked] = useState(false);
  const [amount, setAmount] = useState(0);

  const [walletAddress, setWalletAddress] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchWalletAddress = async () => {
      try {
        const address = await getMyWalletAddress();
        setWalletAddress(address);
      } catch (error) {
        console.error("Error fetching wallet address:", error);
      }
    };

    fetchWalletAddress();
  }, [getMyWalletAddress]);

  const handleQrButtonClick = async () => {
    setQrClicked(!qrclicked);
  };

  async function logout() {
    localStorage.clear();
    sessionStorage.clear();
  }

  return (
    <main className="flex flex-col items-center justify-center h-screen p-4">
      <div className="flex justify-end w-full">
        <Button
          onClick={() => {
            logout();
            router.push("/");
          }}
          className="right-0 left-auto m-3 uppercase justify-end "
        >
          logout
        </Button>
      </div>
      <Logo />
      <div className="flex flex-col items-center justify-center h-screen gap-8">
        <Input
          type="number"
          placeholder="Rs."
          className="text-3xl p-8 w-80 h-20 border-2 "
          value={amount.toString()}
          onChange={(e) => {
            setAmount(Number(e.target.value));
          }}
        />
        <Button
          onClick={async () => {
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
              <QrCodeGenerator address={walletAddress!} amount={amount} />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default Page;
