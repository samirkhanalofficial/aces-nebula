import React from "react";
import History from "@/app/components/history/History";
import BlockChainProfile from "@/app/components/history/BlockChainProfile";
import NavBar from "@/app/components/nav/Navbar";

function page() {
  return (
    <main className="flex flex-col items-center justify-between p-8 h-screen gap-8">
      <BlockChainProfile />
      <h1 className="text-3xl font-bold ">History</h1>

      <History />
      <NavBar route="history" />
    </main>
  );
}

export default page;
