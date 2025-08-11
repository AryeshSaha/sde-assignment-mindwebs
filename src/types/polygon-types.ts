import L from "leaflet";

export type PolygonData = {
  id: string;
  layer: L.Polygon;
  latlngs: L.LatLng[];
};
