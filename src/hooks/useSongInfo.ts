import axios from "axios";
import { useEffect, useState } from "react";
import { IcecastStats } from "../types/IceCast";

const fetchUrl = "http://localhost:3000/data/sample.json";

export const useIceCastStats = () => {
  const [iceCastStats, setIceCastStats] = useState<IcecastStats | null>(null);

  useEffect(() => {
    const handleFetchJson = () => {
      axios.get<IcecastStats>(fetchUrl).then((response) => {
        setIceCastStats(response.data);
      });
    };

    const timeout = setTimeout(handleFetchJson, 1000);

    const handleClearTimeout = () => {
      clearTimeout(timeout);
    };

    return handleClearTimeout;
  }, [iceCastStats]);

  return iceCastStats;
};
