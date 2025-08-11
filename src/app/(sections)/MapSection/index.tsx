/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import osmConfig from "@/constants/osm-providers";
import React, { KeyboardEvent, useRef, useState } from "react";
import {
  MapContainer,
  TileLayer,
  FeatureGroup,
  Marker,
  Popup,
  Tooltip,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import ResetCenterButton from "@/app/(sections)/MapSection/_components/center-reset";
import { EditControl } from "react-leaflet-draw";
import L from "leaflet";
import { useAtom } from "jotai";
import { errorAtom, loadingAtom, polygonsAtom } from "@/atoms/global";
import { usePolygonStyling } from "@/hooks/use-polygon";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { PolygonData } from "@/types/polygon-types";
import { calculateCentroid } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});

const MapSection = () => {
  const [loading] = useAtom(loadingAtom);
  const [error] = useAtom(errorAtom);
  const [polygons, setPolygons] = useAtom(polygonsAtom);
  const [editingName, setEditingName] = useState<string | null>(null);
  const [tempName, setTempName] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const popupRefs = useRef<{ [key: string]: L.Popup }>({});

  usePolygonStyling();

  const handleCreatePolygon = (e: L.DrawEvents.Created) => {
    if (e.layerType !== "polygon") return;
    const layer = e.layer as L.Polygon;
    const latlngs = layer.getLatLngs()[0] as L.LatLng[];

    // Assign an ID for later reference
    const id = crypto.randomUUID();
    (layer as any).customId = id;
    const newPolygon: PolygonData = {
      id,
      layer,
      latlngs,
      name: `Polygon ${polygons.length + 1}`, // Default name
    };
    setPolygons((prev: PolygonData[]) => [...prev, newPolygon]);
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

  const handleNameEdit = (polygonId: string) => {
    const polygon = polygons.find((p) => p.id === polygonId);
    if (polygon) {
      setEditingName(polygonId);
      setTempName(polygon.name);
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  };

  const handleNameSave = (polygonId: string) => {
    setPolygons((prev: PolygonData[]) =>
      prev.map((p) =>
        p.id === polygonId
          ? { ...p, name: tempName.trim() || `Polygon ${prev.indexOf(p) + 1}` }
          : p
      )
    );
    setEditingName(null);
    setTempName("");
  };

  const handleNameCancel = () => {
    setEditingName(null);
    setTempName("");
  };

  const handleKeyPress = (e: KeyboardEvent, polygonId: string) => {
    if (e.key === "Enter") {
      handleNameSave(polygonId);
    } else if (e.key === "Escape") {
      handleNameCancel();
    }
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

            {(polygons as PolygonData[]).map((polygon) => {
              const center = calculateCentroid(polygon.latlngs);
              const isEditing = editingName === polygon.id;

              return (
                <Marker key={polygon.id} position={center}>
                  <Tooltip permanent direction="top" offset={[0, -10]}>
                    {polygon.name}
                  </Tooltip>

                  <Popup
                    ref={(popupRef) => {
                      if (popupRef) {
                        popupRefs.current[polygon.id] = popupRef;
                      }
                    }}
                    autoClose={false}
                    closeOnClick={false}
                    closeButton={true}
                  >
                    <div className="min-w-48 p-2">
                      <div className="mb-2 font-semibold text-gray-700">
                        Polygon Details
                      </div>

                      {isEditing ? (
                        <div className="mb-3">
                          <Label className="block text-sm font-medium text-gray-600 mb-1">
                            Name:
                          </Label>
                          <Input
                            ref={inputRef}
                            type="text"
                            value={tempName}
                            onChange={(e) => setTempName(e.target.value)}
                            onKeyDown={(e) => handleKeyPress(e, polygon.id)}
                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500"
                            placeholder="Enter polygon name"
                          />
                          <div className="flex gap-1 mt-2">
                            <Button
                              onClick={() => handleNameSave(polygon.id)}
                              className="px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 focus:outline-none"
                            >
                              Save
                            </Button>
                            <Button
                              onClick={handleNameCancel}
                              className="px-2 py-1 bg-gray-500 text-white text-xs rounded hover:bg-gray-600 focus:outline-none"
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="mb-3">
                          <div className="text-sm text-gray-600 mb-1">
                            Name:
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{polygon.name}</span>
                            <Button
                              onClick={() => handleNameEdit(polygon.id)}
                              className="ml-2 px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded hover:bg-gray-200 focus:outline-none cursor-pointer"
                            >
                              Edit
                            </Button>
                          </div>
                        </div>
                      )}

                      <div className="text-xs text-gray-500">
                        <div>Points: {polygon.latlngs.length}</div>
                        <div>
                          Center: {center.lat.toFixed(4)},{" "}
                          {center.lng.toFixed(4)}
                        </div>
                        {loading && (
                          <div className="flex items-center gap-1 mt-1 text-blue-600">
                            <div className="animate-spin rounded-full h-3 w-3 border border-blue-600 border-t-transparent"></div>
                            <span>Loading data...</span>
                          </div>
                        )}
                        {error && (
                          <div className="text-red-500 mt-1 text-xs">
                            Weather data unavailable
                          </div>
                        )}
                      </div>
                    </div>
                  </Popup>
                </Marker>
              );
            })}

            <ResetCenterButton center={[51.505, -0.09]} zoom={15} />
          </MapContainer>
        </div>
      </div>
    </section>
  );
};

export default MapSection;
