import { useEffect, useState } from "react";
import { IcecastStats, IcecastStatsStreaming } from "../types";

const fetchUrl = "http://localhost:8000/status-json.xsl";

type SongInfo = {
  status: "fetching" | "error" | "success";
  title: string;
  artist: string;
  errorMsg: string;
};

export const useSongInfo = (): SongInfo => {
  const [iceCastStats, setIceCastStats] = useState<IcecastStats | null>(null);

  useEffect(() => {
    const handleFetchJson = () => {
      fetch(fetchUrl)
        .then(
          // FIXME: as のキャストでなくしたい
          (response) => response.json() as Promise<IcecastStats>
        )
        .then((data) => {
          setIceCastStats(data);
        })
        .catch((error) => {
          console.error("Error fetching data", error);
          setIceCastStats(null);
        });
    };

    const timeout = setTimeout(handleFetchJson, 1000);

    const handleClearTimeout = () => {
      clearTimeout(timeout);
    };

    return handleClearTimeout;
  }, [iceCastStats]);

  if (iceCastStats === null) {
    return {
      status: "fetching",
      title: "",
      artist: "",
      errorMsg: "",
    };
  }

  if (isIcecastStatsStreaming(iceCastStats)) {
    const { artist, title } = iceCastStats.icestats.source;

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
  stats: IcecastStats
): stats is IcecastStatsStreaming => {
  return stats.icestats.hasOwnProperty("source");
};
