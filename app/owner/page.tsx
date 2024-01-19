import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import React from "react";
import Logo from "../components/ui/Logo";

function page() {
  return (
    <main className="flex flex-col items-center justify-center h-screen p-4">
      <Logo />
      <div className="flex flex-col items-center justify-center h-screen gap-8">
        <Button
          variant="outline"
          className=" border-green-700 text-3xl p-8 w-80 h-20 border-2"
        >
          Generate Scan
        </Button>
        <Dialog>
          <DialogTrigger className=" bg-green-700 text-3xl p-8 w-80 h-21 text-white rounded-lg">
            Generate Amount
          </DialogTrigger>
          <DialogContent className="w-11/12 rounded-lg">
            <DialogHeader>
              <DialogTitle className="mb-4 text-3xl">
                How much amount do you want to charge?
              </DialogTitle>
              <DialogDescription>
                <Input
                  type="number"
                  placeholder="Rs."
                  className="text-4xl p-8 "
                />
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </main>
  );
}

export default page;
