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
  function getLocation() {
    if (!navigator.geolocation) {
      return toast.error(
        "Please provide location permission to make better use of this service."
      );
    }
    navigator.permissions.query({ name: "geolocation" }).then((result) => {
      if (result.state === "denied") {
        toast.error(
          "Please provide location permission to make better use of this service."
        );
        return;
      }
    });
    let location = null;
    let latitude = null;
    let longitude = null;
    if (window.navigator && window.navigator.geolocation) {
      location = window.navigator.geolocation;
    } else {
      return toast.error("please provide location permission.");
    }
    location.getCurrentPosition(async function (position) {
      latitude = position.coords.latitude.toString();
      longitude = position.coords.longitude.toString();
    });
  }
  return (
    <div className="w-full  h-48 sm:h-96 bg-red-600 rounded-3xl">
      <APIProvider apiKey={"AIzaSyBULo4a_0EflZdjjRzOqdGQBuLftnctlb0"}>
        <Map
          onCenterChanged={(data: any) => {
            console.log(data.detail.center);
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
