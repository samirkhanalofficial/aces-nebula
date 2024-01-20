import React from "react";
import QRCode from "react-qr-code";

const QrCodeGenerator = ({
  amount,
  address,
}: {
  amount: number;
  address: string;
}) => {
  const qrCodeValue = [
    {
      amount,
      address,
    },
  ];

  return (
    <div
      style={{
        height: "auto",
        margin: "0 auto",

        width: "100%",
      }}
    >
      <QRCode
        size={256}
        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
        value={JSON.stringify(qrCodeValue)}
        viewBox={`0 0 256 256`}
      />
    </div>
  );
};

export default QrCodeGenerator;
