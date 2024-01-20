import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

function Loading() {
  return (
    <div className="flex items-center justify-center">
      <ClipLoader color={"green"} size={30} />
    </div>
  );
}

export default Loading;
