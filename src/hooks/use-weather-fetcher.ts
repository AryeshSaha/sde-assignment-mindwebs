import { fetchWeatherForPolygons } from "@/api/fetchWeather";
import {
  dualTimelineAtom,
  errorAtom,
  fetchedDataAtom,
  isSingleModeAtom,
  loadingAtom,
  polygonsAtom,
  singleTimelineAtom,
  thresholdAtom,
} from "@/atoms/global";
import useDebounce from "@/hooks/use-debounce";
import { indexToDateTime } from "@/lib/utils";
import { useAtom } from "jotai";
import { useEffect } from "react";

export function useWeatherFetcher() {
  const [polygons] = useAtom(polygonsAtom);
  const [thresholdState] = useAtom(thresholdAtom);
  const [singleTime] = useAtom(singleTimelineAtom);
  const [dualTime] = useAtom(dualTimelineAtom);
  const debouncedSingleTime = useDebounce(singleTime, 500);
  const debouncedDualTime = useDebounce(dualTime, 500);
  const [isSingle] = useAtom(isSingleModeAtom);
  const [, setFetchedData] = useAtom(fetchedDataAtom);

  const [, setLoading] = useAtom(loadingAtom);
  const [, setError] = useAtom(errorAtom);

  useEffect(() => {
    if (polygons.length === 0) return;
    setLoading(true);
    let startTime: string, endTime: string;
    if (isSingle) {
      startTime = indexToDateTime(0);
      endTime = indexToDateTime(debouncedSingleTime[0]);
    } else {
      startTime = indexToDateTime(debouncedDualTime[0]);
      endTime = indexToDateTime(debouncedDualTime[1]);
    }
    async function fetchData() {
      const data = await fetchWeatherForPolygons(
        polygons,
        startTime,
        endTime,
        thresholdState.field,
        setError
      );
      setFetchedData(data);
      setLoading(false);
    }

    fetchData();
  }, [
    polygons,
    debouncedSingleTime,
    debouncedDualTime,
    isSingle,
    thresholdState.field,
    setFetchedData,
    setError,
    setLoading,
  ]);
}
