"use client";

import React, { useEffect } from "react";
import { MetaMaskProvider } from "@metamask/sdk-react";
import { formatAddress, sdkOptions } from "@/utils/metamask";

import { ConnectWallet } from "../wallet/wallet";

const LoginInputs: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-4 pt-0">
      <div className="flex items-center justify-center flex-col gap-4 ">
        <span className="font-bold text-xl uppercase mb-1">
          Choose Your Role
        </span>
        <MetaMaskProvider debug={false} sdkOptions={sdkOptions}>
          <ConnectWallet />
        </MetaMaskProvider>
      </div>
    </div>
  );
};

export default LoginInputs;
