import React from "react";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

function LoginInputs() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-4 pt-0">
      <div className="flex items-center justify-center flex-col gap-4 ">
        <span className="font-bold text-xl uppercase mb-1">
          Choose Your Role
        </span>
        <div className="flex items-center justify-center gap-3 flex-col">
          <Link
            className={`${buttonVariants({
              variant: "default",
            })} bg-green-700 hover:bg-green-900 w-96 h-16 text-2xl sm:h-10 sm:text-lg`}
            href="/home"
          >
            User
          </Link>
          <Link
            className={`${buttonVariants({
              variant: "outline",
            })} border-green-700 border-2 hover:bg-green-200 w-96 h-16 text-2xl sm:h-10 sm:text-lg`}
            href="/home"
          >
            Vechile Owner
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginInputs;
