import { calculateCentroid } from "@/lib/utils";
import { PolygonData } from "@/types/polygon-types";

export async function fetchWeatherForPolygons(
  polygons: PolygonData[],
  start_hour: string,
  end_hour: string,
  field: string,
  setError: (error: string) => void,
) {
  const result: Record<string, object | null> = {};

  for (const poly of polygons) {
    const centroid = calculateCentroid(poly.latlngs);
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${centroid.lat}&longitude=${centroid.lng}&start_hour=${start_hour}&end_hour=${end_hour}&hourly=${field}`;

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      result[poly.id] = data;
    } catch (error) {
      setError(JSON.stringify(error, null, 2) || "Failed to fetch weather");
      console.error(`Failed to fetch weather for polygon ${poly.id}`, error);
      result[poly.id] = null;
    }
  }

  return result;
}
