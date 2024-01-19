"use client";

import { useContext } from "react";

export const formatAddress = (addr: string | undefined) => {
  return `${addr?.substring(0, 8)}...`;
};

export const isMobile =
  typeof window !== "undefined" &&
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

export const host = isMobile
  ? "mobileHost"
  : typeof window !== "undefined"
  ? window.location.host
  : "defaultHost";

export const sdkOptions = {
  logging: { developerMode: false },
  checkInstallationImmediately: false,
  dappMetadata: {
    name: "Next-Metamask-Boilerplate",
    url: "http://mobileHost" || "http://defaultHost",
  },
};
