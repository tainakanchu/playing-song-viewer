import {useCallback, useEffect, useState} from "react";
import useSWR from "swr";
import {IcecastStats, IcecastStatsStreaming} from "../types";

const fetchUrl = "api/streaming-data";

type SongInfo = {
  status: "fetching" | "error" | "success";
  title: string;
  artist: string;
  errorMsg: string;
};

export const useSongInfo = (): SongInfo => {
  const [iceCastStats, setIceCastStats] = useState<IcecastStats | null>(null);

  const handleFetchJson = useCallback(() => {
    console.log("💖fetch");
    fetch(fetchUrl)
      .then(
        // FIXME: as のキャストでなくしたい
        (response) => response.json() as Promise<IcecastStats>,
      )
      .then((data) => {
        // 全く同一の場合は更新しない
        if (JSON.stringify(data) !== JSON.stringify(iceCastStats)) {
          console.log("💖set new value");
          setIceCastStats(data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data", error);
        if (iceCastStats !== null) setIceCastStats(null);
      });
  }, [iceCastStats]);

  useSWR(fetchUrl, handleFetchJson, {
    refreshInterval: 1000,
  });

  if (iceCastStats === null) {
    return {
      status: "fetching",
      title: "",
      artist: "",
      errorMsg: "",
    };
  }

  if (isIcecastStatsStreaming(iceCastStats)) {
    const {artist, title} = iceCastStats.icestats.source;

    if (artist && title) {
      return {
        status: "success",
        title,
        artist,
        errorMsg: "",
      };
    } else {
      return {
        status: "error",
        title: "",
        artist: "",
        errorMsg: "The song is not played now.",
      };
    }
  } else {
    return {
      status: "error",
      title: "",
      artist: "",
      errorMsg: "No streaming",
    };
  }
};

const isIcecastStatsStreaming = (
  stats: IcecastStats,
): stats is IcecastStatsStreaming => {
  return stats.icestats.hasOwnProperty("source");
};
