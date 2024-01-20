import useBlockchain from "@/services/useBlockchain";
import UserDetails from "../components/user/UserDetail";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function User() {
  const { getAllBookings } = useBlockchain();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(function () {
    async function fetchBookings() {
      try {
        setIsLoading(true);
        const data = await getAllBookings();
      } catch (err) {
        toast.error("error occured whle fetching");
      }
    }
    fetchBookings();
  }, []);
  return <></>;
}
