"use client";

import { dualTimelineAtom } from "@/atoms/global";
import { indexToDateTime } from "@/lib/utils";
import { propsType } from "@/types/timeline-props-types";
import { useAtom } from "jotai";
import { Range, getTrackBackground } from "react-range";

export default function DualHandleTimeline({ step, min, max }: propsType) {
  const [values, setValues] = useAtom(dualTimelineAtom);

  return (
    <div className="w-full max-w-3xl mx-auto p-6">
      <h2 className="text-lg font-semibold mb-4">Dual Handle Timeline</h2>
      <Range
        draggableTrack
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
                colors: ["#e5e7eb", "#3b82f6", "#e5e7eb"],
                min: min,
                max: max,
              }),
            }}
          >
            {children}
          </div>
        )}
        renderThumb={({ props, index, isDragged }) => (
          <div
            {...props}
            key={index}
            className={`h-5 w-5 rounded-full ${
              isDragged ? "bg-blue-500" : "bg-black"
            } shadow-md flex items-center justify-center`}
          >
            <span className="text-[10px] text-white">{index + 1}</span>
          </div>
        )}
      />
      <div className="mt-4 text-sm text-gray-700">
        <div>
          Start date →{" "}
          {indexToDateTime(values[0]).toLocaleString().split("T")[0]} at{" "}
          {indexToDateTime(values[0]).toLocaleString().split("T")[1]}
        </div>
        <div>
          End date → {indexToDateTime(values[1]).toLocaleString().split("T")[0]}{" "}
          at {indexToDateTime(values[1]).toLocaleString().split("T")[1]}
        </div>
      </div>
    </div>
  );
}
