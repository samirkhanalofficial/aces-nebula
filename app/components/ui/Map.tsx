"use client";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import { toast } from "react-toastify";
import { useState } from "react";
import { FaMapMarked } from "react-icons/fa";

interface MyMapProps {
  lat: any;
  lng: any;
  setLat: any;
  setLong: any;
}

export function MyMap({ lat, lng, setLat, setLong }: MyMapProps) {
  return (
    <div className="w-full  h-48 sm:h-96 bg-red-600 rounded-3xl">
      <APIProvider apiKey={"AIzaSyBULo4a_0EflZdjjRzOqdGQBuLftnctlb0"}>
        <Map
          onCenterChanged={(data: any) => {
            setLat(data.detail.center.lat);
            setLong(data.detail.center.lng);
          }}
          center={{ lat: 27.670438703148488, lng: 85.34437201488507 }}
          zoom={11}
        >
          <Marker position={{ lat, lng }} />
        </Map>
      </APIProvider>
    </div>
  );
}
