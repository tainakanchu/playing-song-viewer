import {IcecastStats, IcecastStatsStreaming} from "@/types";
export const isIcecastStatsStreaming = (
  stats: IcecastStats,
): stats is IcecastStatsStreaming => {
  return stats.icestats.hasOwnProperty("source");
};
