import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { IoMdClose } from "react-icons/io";
export default function UserDetails() {
  return (
    <div className=" m-5">
      <div className="w-full h-40 bg-black/10 rounded-lg relative p-2">
        <div className="w-24 h-24 rounded-full bg-black"></div>
        <div className="flex flex-col absolute right-10 top-5">
          <p>Name:Adish Bhattarai</p>
          <p>TukTuk</p>
          <p>Rs.200</p>
        </div>
        <IoMdClose
          size={25}
          className="top-0 right-0 absolute m-2 text-black"
        />
        <div className="flex gap-x-4 bottom-0 right-0 absolute px-2 py-1 ">
          <Button
            variant={`default`}
            size={`xl`}
            className={cn(" bg-green-700")}
          >
            Accept
          </Button>
          <Button variant={`destructive`} size={`xl`}>
            Reject
          </Button>
        </div>
      </div>
    </div>
  );
}
