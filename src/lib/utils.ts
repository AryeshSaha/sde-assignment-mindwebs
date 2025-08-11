import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import L from "leaflet";
import { ThresholdRule } from "@/types/threshold-types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const indexToDateTime = (index: number): string => {
  const now = new Date();
  const start = new Date(now.getTime() - 15 * 24 * 60 * 60 * 1000);
  const date = new Date(start.getTime() + index * 60 * 60 * 1000);

  return date.toISOString().slice(0, 16);
};

export function calculateCentroid(latlngs: L.LatLng[]): {
  lat: number;
  lng: number;
} {
  const totalPoints = latlngs.length;
  let sumLat = 0;
  let sumLng = 0;

  latlngs.forEach(({ lat, lng }) => {
    sumLat += lat;
    sumLng += lng;
  });

  return {
    lat: sumLat / totalPoints,
    lng: sumLng / totalPoints,
  };
}

export function getColorFromRules(
  value: number,
  rules: ThresholdRule[]
): string | undefined {
  for (const rule of rules) {
    switch (rule.operator) {
      case "<":
        if (value < rule.value) return rule.color;
        break;
      case "<=":
        if (value <= rule.value) return rule.color;
        break;
      case ">":
        if (value > rule.value) return rule.color;
        break;
      case ">=":
        if (value >= rule.value) return rule.color;
        break;
      case "==":
        if (value === rule.value) return rule.color;
        break;
      case "!=":
        if (value !== rule.value) return rule.color;
        break;
      default:
        console.warn(`Unknown operator ${rule.operator}`);
        break;
    }
  }
  return "#000000";
}
