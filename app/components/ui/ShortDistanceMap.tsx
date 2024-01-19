import React from "react";
import { MyMap } from "./Map";

// @ts-ignore
function ShortDistanceMap({ value, setValue }) {
  return (
    <main>
      <MyMap lat={value.lat} lng={value.lng} setCoordinates={setValue} />
    </main>
  );
}

export default ShortDistanceMap;
