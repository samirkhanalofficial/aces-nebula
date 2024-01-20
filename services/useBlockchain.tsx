"use client";

import abi from "./abi.json";
import { Provider, Signer, parseEther } from "ethers";
import { BrowserProvider, Contract } from "ethers";
import { useRouter } from "next/navigation";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { toast } from "react-toastify";

export type bookingType = {
  uid: number;
  initiator: string;
  fromLat: string;
  fromLong: string;
  toLat: string;
  toLong: string;
  acceptor: string;
  price: number;
};

export default function useBlockchain() {
  const router = useRouter();
  //   const deployAddress = "0x6d77eE913BbfEF1aB17a6642b40E48D829Ed5a11";
  //   const deployAddress = "0x193B0785cfD70dfDEce6271166c7e30A344C120B";
  const deployAddress = "0x95841B95c6d1dCc82f00371bD7b93b488e767999";

  let provider: BrowserProvider | undefined,
    contract: Contract | undefined,
    signer: Signer | undefined;
  useLayoutEffect(() => {
    "use client";
    initalize();
  }, []);
  async function initalize() {
    if (!window) return;
    provider = new BrowserProvider((window as any).ethereum);
    signer = await provider?.getSigner();
    contract = await new Contract(deployAddress, abi, signer);
  }

  async function createBooking(
    fromlat: number,
    fromlong: number,
    toLat: number,
    toLong: number
  ) {
    await initalize();
    if (!contract) return toast.error("contract not initialized");
    return await contract
      .createBooking(fromlat, fromlong, toLat, toLong)
      .then(async (res) => {
        console.log("booking created");
        const lastBooking: bookingType | undefined = await getLastBooking();

        router.push(`/home/search/`);
        toast.success("Booking created");
      })
      .catch((err) => {
        throw err;
        toast.error(err);
      });
  }
  async function acceptBooking(uid: number, price: number) {
    await initalize();
    if (!contract) return toast.error("contract not initialized");
    return await contract
      .acceptBooking(uid, price)
      .then(async (res) => {
        console.log("booking accepted");
        console.log("redirecting to routing ");
        router.push(`/home/routing/${uid}`);
      })
      .catch((err) => toast.error(err));
  }
  async function withdraw(amount: number) {
    await initalize();
    if (!contract) return toast.error("contract not initialized");
    return await contract
      .withdraw(amount)
      .then(async (res) => {
        toast.success("Amount withdrawn");
      })
      .catch((err) => toast.error(err));
  }
  async function pay(amount: number, receiver: string) {
    await initalize();
    if (!contract) return toast.error("contract not initialized");
    return await contract
      .pay(amount, receiver, { value: parseEther(amount.toString()) })
      .then(async (res) => {
        toast.success("Amount Paid");
      })
      .catch((err) => toast.error(err));
  }
  async function getLastBooking() {
    const bookings: bookingType[] = await getMyHistory();
    console.log("getting bookings at lastBookingId", bookings);
    if (bookings.length > 0) return bookings[bookings.length - 1];
    toast.error("error getting last booking");
  }
  async function getPriceConversion() {
    await initalize();
    if (!contract) return toast.error("contract not initialized");
    return await contract
      .getChainlinkDataFeedLatestAnswer()
      .then((res) => res)
      .catch((err) => toast.error("error getting price conversion"));
  }
  async function getMyBalance() {
    await initalize();
    if (!contract) return toast.error("contract not initialized");
    return await contract
      .getMyAmount()
      .then((res) => {
        return res;
      })
      .catch((err) => toast.error("Error getting Balance"));
  }
  async function getMyHistory() {
    await initalize();
    if (!contract) return toast.error("contract not initialized");
    return await contract!
      .getMyBookings()
      .then((res) => {
        console.log("getting history", res);
        return res;
      })
      .catch((err) => toast.error(err));
  }
  async function getMyRewardPoint() {
    await initalize();
    if (!contract) return toast.error("contract not initialized");
    return await contract!
      .myRewardPoint()
      .then((res) => {
        console.log("getting reward point", res);
        return res;
      })
      .catch((err) => toast.error(err));
  }

  async function getMyWalletAddress() {
    await initalize();
    if (!contract) return toast.error("contract not initialized");
    return await contract!
      .getMyWalletAddress()
      .then((res) => {
        console.log("getting wallet address", res);
        return res;
      })
      .catch((err) => toast.error(err));
  }
  async function getAllBookings() {
    await initalize();
    if (!contract) return toast.error("contract not initialized");
    return await contract!
      .getAllBookings()
      .then((res) => {
        console.log("getting all bookings", res);
        return res;
      })
      .catch((err) => toast.error(err));
  }

  return {
    createBooking,
    getMyHistory,
    getAllBookings,
    getMyWalletAddress,
    getMyRewardPoint,
    getMyBalance,
    getPriceConversion,
    pay,
    withdraw,
    acceptBooking,
  };
}
