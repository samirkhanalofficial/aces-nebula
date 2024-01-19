import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IoLocationSharp } from "react-icons/io5";
import { cn } from "@/lib/utils";
export default function Home() {
  return (
    <div className="p-10 h-[100vh]">
      <div className="flex flex-row items-center">
        <Input type="text" className={cn("")} />
        <IoLocationSharp
          size={25}
          className="text-green-700 fixed ml-[300px] "
        />
      </div>
      <div className="flex flex-row items-center my-5">
        <IoLocationSharp
          size={25}
          className="text-green-700 fixed ml-[300px] "
        />
        <Input type="text" />
      </div>
      <Button variant="default">Find a Ride</Button>
    </div>
  );
}
