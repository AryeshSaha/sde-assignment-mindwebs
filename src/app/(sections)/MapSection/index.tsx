/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import osmConfig from "@/constants/osm-providers";
import React from "react";
import { MapContainer, TileLayer, FeatureGroup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import ResetCenterButton from "@/app/(sections)/MapSection/_components/center-reset";
import { EditControl } from "react-leaflet-draw";
import L from "leaflet";
import { useAtom } from "jotai";
import { polygonsAtom } from "@/atoms/global";
import { usePolygonStyling } from "@/hooks/use-polygon";

const MapSection = () => {
  const [, setPolygons] = useAtom(polygonsAtom);

  usePolygonStyling()

  const handleCreatePolygon = (e: L.DrawEvents.Created) => {
    if (e.layerType !== "polygon") return;
    const layer = e.layer as L.Polygon;
    const latlngs = layer.getLatLngs()[0] as L.LatLng[];

    // Assign an ID for later reference
    const id = crypto.randomUUID();
    (layer as any).customId = id;
    setPolygons((prev) => [...prev, { id, layer, latlngs }]);
  };

  const handleEditPolygon = (e: L.DrawEvents.Edited) => {
    setPolygons((prev) => {
      const updated = [...prev];
      e.layers.eachLayer((layer) => {
        const id = (layer as any).customId;
        const latlngs = (layer as L.Polygon).getLatLngs()[0] as L.LatLng[];
        const idx = updated.findIndex((p) => p.id === id);
        if (idx !== -1) {
          updated[idx] = {
            ...updated[idx],
            latlngs,
            layer: layer as L.Polygon,
          };
        }
      });
      return updated;
    });
  };

  const handleDeletePolygons = (e: L.DrawEvents.Deleted) => {
    setPolygons((prev) => {
      const idsToRemove: string[] = [];
      e.layers.eachLayer((layer) => {
        idsToRemove.push((layer as any).customId);
      });
      return prev.filter((p) => !idsToRemove.includes(p.id));
    });
  };

  return (
    <section className="w-full">
      <div className="container mx-auto flex justify-center items-center">
        <div className="h-96 w-full max-w-5xl">
          <MapContainer
            center={[51.505, -0.09]}
            zoom={15}
            minZoom={15}
            maxZoom={15}
            zoomControl={false}
            scrollWheelZoom={false}
            style={{ height: "100%", width: "100%" }}
          >
            <FeatureGroup>
              <EditControl
                position="topright"
                onCreated={handleCreatePolygon}
                onEdited={handleEditPolygon}
                onDeleted={handleDeletePolygons}
                draw={{
                  polygon: {
                    maxPoints: 12,
                    shapeOptions: {
                      color: "red",
                      fillColor: "red",
                      weight: 2,
                    },
                  },
                  polyline: false,
                  rectangle: false,
                  circle: false,
                  marker: false,
                  circlemarker: false,
                }}
              />
            </FeatureGroup>
            <TileLayer
              attribution={osmConfig.maptiler.attribution}
              url={osmConfig.maptiler.url}
            />
            <ResetCenterButton center={[51.505, -0.09]} zoom={15} />
          </MapContainer>
        </div>
      </div>
    </section>
  );
};

export default MapSection;
