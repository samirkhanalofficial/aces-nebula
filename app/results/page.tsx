"use client";
import useBlockchain, { bookingType } from "@/services/useBlockchain";

import { useEffect, useLayoutEffect, useState } from "react";
import { toast } from "react-toastify";

export default function User() {
  const { getAllBookings } = useBlockchain();
  const [isLoading, setIsLoading] = useState(false);
  const [bookings, setBookings] = useState<any[]>([]);

  const fsdj = async () => {
    console.log("calling");
    await getAllBookings().then((res: any) => {
      console.log(res);
      setBookings(res);
    });
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
  return (
    <div>
      <h2>Bookings</h2>

      <br />
      {bookings.map((a) => (
        <div key={a[0]}>
          uid {a[0]}
          <br />
          initiatior {a[1]}
          <br />
          fromlat {a[2]}
          <br />
          fromlong {a[3]}
          <br />
          tolat {a[4]}
          <br />
          tolong {a[5]}
          <br />
          acceptor {a[6]}
          <br />
          price {a[7]}
          <br />
          <br />
        </div>
      ))}
    </div>
  );
}
