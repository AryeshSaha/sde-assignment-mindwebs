/* eslint-disable @typescript-eslint/no-explicit-any */
import { PolygonData } from "@/types/polygon-types";
import { ThresholdState } from "@/types/threshold-types";
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

// For single-handle slider (default: [0])
export const singleTimelineAtom = atomWithStorage<number[]>("timeline-single", [
  0,
]);

// For dual-handle slider (default: [100, 300])
export const dualTimelineAtom = atomWithStorage<number[]>(
  "timeline-dual",
  [100, 300]
);

// Mode atom (true = single, false = dual)
export const isSingleModeAtom = atomWithStorage<boolean>(
  "timeline-isSingle",
  true
);

export const thresholdAtom = atomWithStorage<ThresholdState>("thresholdState", {
  field: "",
  rules: [],
});

export const polygonsAtom = atom<PolygonData[]>([]);


export const fetchedDataAtom = atom<Record<string, any>>({});

export const loadingAtom = atom<boolean>(false);
export const errorAtom = atom<string | null>(null);