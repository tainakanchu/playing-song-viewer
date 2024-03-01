import { useEffect, useState } from "react";
import { IcecastStats } from "../types";

const fetchUrl = "http://localhost:8000/status-json.xsl";

export const useSongInfo = () => {
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

  return iceCastStats?.icestats.source;
};
