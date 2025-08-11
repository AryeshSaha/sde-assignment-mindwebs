"use client";

import { singleTimelineAtom } from "@/atoms/global";
import { indexToDateTime } from "@/lib/utils";
import { propsType } from "@/types/timeline-props-types";
import { useAtom } from "jotai";
import { Range, getTrackBackground } from "react-range";

export default function SingleHandleTimeline({ step, min, max }: propsType) {
  const [values, setValues] = useAtom(singleTimelineAtom);

  return (
    <div className="w-full max-w-3xl mx-auto p-6">
      <h2 className="text-lg font-semibold mb-4">Single Handle Timeline</h2>
      <Range
        values={values}
        step={step}
        min={min}
        max={max}
        onChange={(vals) => setValues(vals)}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            className="h-2 w-full rounded bg-gray-200"
            style={{
              background: getTrackBackground({
                values,
                colors: ["#3b82f6", "#e5e7eb"],
                min: min,
                max: max,
              }),
            }}
          >
            {children}
          </div>
        )}
        renderThumb={({ props, isDragged }) => (
          <div
            {...props}
            key={props.key}
            className={`h-5 w-5 rounded-full ${
              isDragged ? "bg-blue-500" : "bg-black"
            } shadow-md flex items-center justify-center`}
          />
        )}
      />
      <div className="mt-4 text-sm text-gray-700">
        Selected date:{" "}
        <span className="font-mono">
          {indexToDateTime(values[0]).toLocaleString().split("T")[0]} at {" "}
          {indexToDateTime(values[0]).toLocaleString().split("T")[1]}
        </span>
      </div>
    </div>
  );
}
