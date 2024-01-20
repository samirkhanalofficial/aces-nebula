"use client";
import useBlockchain, { bookingType } from "@/services/useBlockchain";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";

import { useEffect, useLayoutEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Loading from "@/app/components/ui/Loading";

export default function AfterSearch() {
  const { getAllBookings, pay, acceptBooking, getMyWalletAddress } =
    useBlockchain();
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
  const [clicked, setClicked] = useState(false);

  const [rejectedBookingId, setRejectedBookingId] = useState<number | null>(
    null
  );
  const router = useRouter();

  return (
    <div className="flex items-center justify-center flex-col mx-auto p-4">
      <h2 className="text-4xl font-bold mb-4 uppercase">EV Details</h2>

      {isLoading ? (
        <Loading />
      ) : (
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex flex-col gap-4  justify-center items-center">
            {bookings
              .filter((booking) => booking[0] !== rejectedBookingId)
              .map((a, index) =>
                index != bookings.length - 1 ? (
                  <></>
                ) : (
                  <div key={a[0]} className=" border-2 p-4 shadow rounded-lg ">
                    <div className="w-full  justify-between items-center">
                      <div className="w-full block clear-both h-80">
                        <APIProvider
                          apiKey={"AIzaSyBULo4a_0EflZdjjRzOqdGQBuLftnctlb0"}
                        >
                          <Map
                            center={{
                              lat: Number(a[4]), // Assuming the first booking for centering
                              lng: Number(a[5]),
                            }}
                            zoom={15}
                          ></Map>
                        </APIProvider>
                        EV live Location:
                      </div>
                      {/* <div className="w-40 block clear-both h-40">
                        <APIProvider
                          apiKey={"AIzaSyBULo4a_0EflZdjjRzOqdGQBuLftnctlb0"}
                        >
                          <Map
                            center={{
                              lat: Number(a[4]), // Assuming the first booking for centering
                              lng: Number(a[5]),
                            }}
                            zoom={15}
                          ></Map>
                        </APIProvider>
                        To
                      </div> */}
                    </div>
                    <br />
                    <span className="font-bold  w-1/2">Acceptor: {a[6]}</span>
                    {/* <p>
                    <span className="font-bold">uid: {Number(a[0])}</span>
                  </p> */}
                    {/* <p className="flex">
                      <span className="font-bold w-1/2">Initiator: {a[1]}</span>
                    </p> */}
                    {/* <p>
                    <span className="font-bold">
                      From Latitude: {Number(a[2])}
                    </span>
                  </p>
                  <p>
                    <span className="font-bold">
                      From Longitude: {Number(a[3])}
                    </span>
                  </p>
                  <p>
                    <span className="font-bold">
                      To Latitude: {Number(a[4])}
                    </span>
                  </p>
                  <p>
                    <span className="font-bold">
                      To Longitude: {Number(a[5])}
                    </span>
                  </p>
                  <p>
                    <span className="font-bold  w-1/2">
                      Acceptor: {Number(a[6])}
                    </span>
                  </p> */}
                    {/* <p>
                    <span className="font-bold">Price: {Number(a[7])}</span>
                  </p> */}

                    <div className="flex  items-center justify-between gap-8">
                      <div className="flex items-center justify-center gap-2">
                        {!isLoading ? (
                          <Button
                            variant="default"
                            onClick={async () => {
                              const address = await getMyWalletAddress();
                              pay("200", address).then((res) => {
                                router.push("/Home");
                                toast.success("Payment Successful");
                              });
                            }}
                          >
                            Complete Ride
                          </Button>
                        ) : (
                          <Loading />
                        )}
                        <Button
                          variant="default"
                          className={`bg-red-700 hover:bg-red-900 `}
                          onClick={() => {
                            toast.success("Ride Cancelled");
                            router.push("/home");
                          }}
                        >
                          Cancel ride
                        </Button>
                      </div>
                    </div>
                  </div>
                )
              )}
          </div>
        </div>
      )}
    </div>
  );
}
