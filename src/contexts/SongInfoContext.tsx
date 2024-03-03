"use client";
import {
  createContext,
  useState,
  useContext,
  useCallback,
  useEffect,
  useRef,
} from "react";
import useSWR from "swr";

import {IcecastStats} from "@/types";
import {isIcecastStatsStreaming} from "@/utils";

import {GetSongDetailResponse} from "../../app/api/";
import {SongInfoFetching, SongInfo} from "./SongInfo";

const defaultProvider: SongInfoFetching = {
  status: "fetching",
  title: null,
  artist: null,
  artwork: null,
  message: "Fetching song info...",
};

const icecastServerUrl = "api/streaming-data";
const songDetailEndpoint = "api/song-detail";

const presetImagePathMap = {
  noImage: "/no_image.svg",
  loading: "/loading.svg",
} as const;

const DataContext = createContext<SongInfo>(defaultProvider);

export const useSongInfo = () => {
  return useContext(DataContext);
};

export const SongInfoProvider = ({children}: {children: React.ReactNode}) => {
  const icecastStatsRef = useRef<IcecastStats | null>(null);
  const [songInfo, setSongInfo] = useState<SongInfo>(defaultProvider);

  const handleFetchIcecastServer = useCallback(async () => {
    try {
      const currentStats = await fetch(icecastServerUrl)
        .then((response) => {
          if (!response.ok)
            throw new Error("Response is not ok while fetching icecast.");
          return response.json() as Promise<IcecastStats>;
        })
        .catch((error) => {
          // icecast server が立ち上がってないときはここに来る
          console.error("Error fetching data", error);
          throw new Error(
            "Error fetching song info. Perhaps icecast server is not running.",
          );
        });

      // ストリーミング中でないときはデフォルトをセットする
      if (!isIcecastStatsStreaming(currentStats)) {
        if (songInfo.message !== "The song is not played now.")
          setSongInfo({
            status: "error",
            title: null,
            artist: null,
            artwork: null,
            message: "The song is not played now.",
          });
        return;
      }
      // 前回値と全く同一の場合はここで終わり
      if (
        JSON.stringify(icecastStatsRef.current) === JSON.stringify(currentStats)
      )
        return;

      icecastStatsRef.current = currentStats;
      const {artist, title} = currentStats.icestats.source;

      setSongInfo({
        status: "success",
        title: title ?? "",
        artist: artist ?? "",
        artworkSrc: presetImagePathMap.loading,
        message: "Song info fetched successfully.",
      });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Something unknown error occurred.";

      setSongInfo({
        status: "error",
        title: null,
        artist: null,
        artwork: null,
        message,
      });
    }
  }, [songInfo]);

  useSWR(icecastServerUrl, handleFetchIcecastServer, {
    refreshInterval: 1000,
  });

  const handleFetchSongDetail = useCallback(async () => {
    const title = songInfo.title;
    const artist = songInfo.artist;

    if (!title) return;

    const encodedTitle = encodeURIComponent(title);
    const encodedArtist = encodeURIComponent(artist ?? "");
    const detailApi = `${songDetailEndpoint}?title=${encodedTitle}&artist=${encodedArtist}`;

    const detail = await fetch(detailApi)
      .then((response) => {
        if (!response.ok)
          throw new Error(
            "Response is not ok while fetching icecast while detail api.",
          );
        return response.json() as Promise<GetSongDetailResponse>;
      })
      .catch((error) => {
        // サーバー側でファイルの情報が取れないときはここに来る
        // これはまあ普通に起こることなので、エラーにはしないで適当に握りつぶす
        console.error("Error fetching data", error);
        const songDetail: GetSongDetailResponse = {
          artwork: null,
          albumArtist: "",
        };
        return songDetail;
      });

    const artworkSrc = detail.artwork
      ? `data:${detail.artwork.type};base64,${Buffer.from(detail.artwork.data).toString("base64")}`
      : presetImagePathMap.noImage;

    setSongInfo({
      status: "success",
      title: title,
      artist: artist ?? "",
      artworkSrc,
      message: "Song info fetched successfully.",
    });
  }, [songInfo.title, songInfo.artist]);

  useEffect(() => {
    handleFetchSongDetail();
  }, [handleFetchSongDetail]);

  return (
    <DataContext.Provider value={songInfo}>{children}</DataContext.Provider>
  );
};
