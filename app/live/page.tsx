import { useSearchParams } from "next/navigation";
import React from "react";

function page() {
  const params = useSearchParams();
  return <div>page</div>;
}

export default page;
