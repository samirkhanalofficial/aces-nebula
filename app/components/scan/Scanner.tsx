"use client";
import React, { useState } from "react";
import { QrScanner } from "@yudiel/react-qr-scanner";

const Scanner = () => {
  return (
    <div className="sm:w-1/4 w-1/3">
      <QrScanner
        onDecode={(result) => console.log(result)}
        onError={(error) => console.log(error?.message)}
      />
    </div>
  );
};

export default Scanner;
