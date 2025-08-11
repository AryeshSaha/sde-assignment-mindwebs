"use client";

import { useMap } from "react-leaflet";

function ResetCenterButton({
  center,
  zoom,
}: {
  center: [number, number];
  zoom: number;
}) {
  const map = useMap();

  return (
    <button
      onClick={() => map.setView(center, zoom)}
      className="absolute bottom-10 right-2.5 bg-white shadow px-3 py-1 rounded z-[1000]"
    >
      Reset View
    </button>
  );
}

export default ResetCenterButton;
