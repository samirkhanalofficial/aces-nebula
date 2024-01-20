import LoginInputs from "@/app/components/login/LoginInputs";
import Logo from "@/app/components/ui/Logo";
import React from "react";

function page() {
  return (
    <main className="flex  flex-col h-screen ">
      <Logo />
      <LoginInputs />
    </main>
  );
}

export default page;
