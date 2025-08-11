import L from "leaflet";

export type PolygonData = {
  id: string;
  name: string;
  layer: L.Polygon;
  latlngs: L.LatLng[];
};
