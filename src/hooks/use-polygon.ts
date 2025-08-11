import { useEffect } from "react";
import { useAtom } from "jotai";
import { fetchedDataAtom, polygonsAtom, thresholdAtom } from "@/atoms/global";
import { getColorFromRules } from "@/lib/utils";

export function usePolygonStyling() {
  const [polygons] = useAtom(polygonsAtom);
  const [thresholdState] = useAtom(thresholdAtom);
  const [fetchedData] = useAtom(fetchedDataAtom);

  useEffect(() => {
    polygons.forEach((poly) => {
      const data = fetchedData[poly.id];
      if (data == null) return;
      const whatever = data.hourly?.[thresholdState.field];
      const value =
        whatever?.reduce((sum: number, value: number) => sum + value, 0) /
        whatever?.length;
      const color = getColorFromRules(value, thresholdState.rules);
      poly.layer.setStyle({
        color,
        fillColor: color,
        fillOpacity: 0.5,
      });
    });
  }, [polygons, thresholdState, fetchedData]);
}
