"use client";
import useBlockchain from "@/services/useBlockchain";

import { useEffect, useLayoutEffect, useState } from "react";
import { toast } from "react-toastify";

export default function User() {
  const { getAllBookings } = useBlockchain();
  const [isLoading, setIsLoading] = useState(false);
  const [bookings, setBookings] = useState([]);

  const fsdj = async () => {
    console.log("calling");
    await getAllBookings().then((res) => console.log(res));
  };
  useLayoutEffect(() => {
    fsdj();
  }, []);
  // useEffect(
  //   function () {
  //     async function fetchBookings() {
  //       try {
  //         setIsLoading(true);
  //         const data = await getAllBookings();
  //         setBookings(data);
  //       } catch (err) {
  //         toast.error("error occured whle fetching");
  //       }
  //     }
  //     fetchBookings();
  //   },
  //   [getAllBookings]
  // );
  return <div>{bookings}</div>;
}
