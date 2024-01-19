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

  const handleConnect = () => {
    try {
      sdk?.connect();
      router.push("/home");
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
      {!connected ? (
        <div className="flex items-center justify-center gap-3 flex-col">
          <Button
            className={`${buttonVariants({
              variant: "default",
            })} bg-green-700 hover:bg-green-900 w-96 h-16 text-2xl sm:h-10 sm:text-lg`}
            onClick={handleConnect}
          >
            User
          </Button>
          <Button
            className={`${buttonVariants({
              variant: "outline",
            })} border-green-700 border-2 hover:bg-green-200 w-96 h-16 text-2xl sm:h-10 sm:text-lg`}
            onClick={handleConnect}
          >
            Vehicle Owner
          </Button>
        </div>
      ) : (
        <Popover>
          <PopoverTrigger>
            <Button>{formatAddress(account)}</Button>
          </PopoverTrigger>
          <PopoverContent className="mt-2 w-44 bg-gray-100 border rounded-md shadow-lg right-0 z-10 top-10">
            <Button
              onClick={handleDisconnect}
              className="block w-full pl-2 pr-4 py-2 text-left text-[#F05252] hover:bg-gray-200"
            >
              Disconnect
            </Button>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
};
