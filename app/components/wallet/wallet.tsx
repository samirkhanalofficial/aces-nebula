"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useSDK } from "@metamask/sdk-react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { formatAddress } from "@/utils/metamask";
import { useRouter } from "next/navigation";

export const ConnectWallet: React.FC = () => {
  const { sdk, connected, account, connecting } = useSDK();
  const router = useRouter();
  const [isUser, setIsUser] = useState(true);

  useEffect(() => {
    if (connected) {
      if (isUser) router.push("/home");
      else router.push("/owner");
    }
  }, [connected]);
  const handleConnect = () => {
    try {
      sdk?.connect();
    } catch (err) {
      console.warn("Error connecting:", err);
    }
  };

  const handleDisconnect = () => {
    try {
      if (sdk) {
        sdk.terminate();
        router.push("/login");
      }
    } catch (err) {
      console.warn("Error disconnecting:", err);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center gap-3 flex-col">
        <Button
          className={`${buttonVariants({
            variant: "default",
          })} bg-green-700 hover:bg-green-900 w-96 h-16 text-2xl sm:h-10 sm:text-lg`}
          onClick={() => {
            handleConnect();
            setIsUser(true);
          }}
        >
          User
        </Button>
        <Button
          className={`${buttonVariants({
            variant: "outline",
          })} border-green-700 text-green-700 border-2  w-96 h-16 text-2xl sm:h-10 sm:text-lg`}
          onClick={() => {
            handleConnect();
            setIsUser(false);
          }}
        >
          Vehicle Owner
        </Button>
      </div>
    </div>
  );
};
