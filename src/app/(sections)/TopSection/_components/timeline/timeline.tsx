"use client";

import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import SingleHandleTimeline from "@/app/(sections)/TopSection/_components/timeline/single-draggable-slider";
import DualHandleTimeline from "@/app/(sections)/TopSection/_components/timeline/dual-ended-range-slider";
import { MAX, MIN, STEP } from "@/constants/timeline";
import { useAtom } from "jotai";
import { isSingleModeAtom } from "@/atoms/global";

const Timeline = () => {
  const [isSingle, setIsSingle] = useAtom(isSingleModeAtom);

  return (
    <>
      <div className="container mx-auto flex justify-start items-center gap-3">
        <Label
          htmlFor="point-switch"
          className={
            isSingle ? "font-bold text-primary" : "text-muted-foreground"
          }
        >
          Single Point
        </Label>

        <Switch
          id="point-switch"
          checked={!isSingle}
          onCheckedChange={(checked) => setIsSingle(!checked)}
          className="cursor-pointer"
        />

        <Label
          htmlFor="point-switch"
          className={
            !isSingle ? "font-bold text-primary" : "text-muted-foreground"
          }
        >
          Dual Point
        </Label>
      </div>
      <div>
        {isSingle ? (
          <SingleHandleTimeline step={STEP} min={MIN} max={MAX} />
        ) : (
          <DualHandleTimeline step={STEP} min={MIN} max={MAX} />
        )}
      </div>
    </>
  );
};

export default Timeline;
