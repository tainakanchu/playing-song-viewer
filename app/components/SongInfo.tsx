"use client";
import React from "react";
import {useSongInfo} from "@/contexts";
import {SongInfoPlaying} from "./SongInfoPlaying";

export const SongInfo: React.FC = () => {
  const info = useSongInfo();

  if (info.status === "error") {
    return (
      <div className="flex flex-col items-center">
        <h1>Something occurred</h1>
        <h2>Unable to fetch song info</h2>
        <p>{info.message}</p>
      </div>
    );
  }

  if (info.status === "fetching") {
    return (
      <div className="flex flex-col items-center">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <SongInfoPlaying
      title={info.title}
      artist={info.artist}
      artwork={info.artworkSrc}
    />
  );
};
