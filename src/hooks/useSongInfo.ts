import axios from "axios";
import { useEffect, useState } from "react";
import { IcecastStats } from "../types";

const fetchUrl = "http://localhost:8000/status-json.xsl";

export const useSongInfo = () => {
  const [iceCastStats, setIceCastStats] = useState<IcecastStats | null>(null);

  useEffect(() => {
    const handleFetchJson = () => {
      axios
        .get<IcecastStats>(fetchUrl)
        .then((response) => {
          setIceCastStats(response.data);
        })
        .catch((e) => {
          return null;
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
