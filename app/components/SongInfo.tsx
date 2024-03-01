"use client";
import React from "react";
import {useSongInfo} from "@/hooks";

export const SongInfo: React.FC = () => {
  const info = useSongInfo();

  if (info.status === "error") {
    return (
      <div className="flex flex-col items-center">
        <h1>Something occurred</h1>
        <h2>Unable to fetch song info</h2>
        <p>{info.errorMsg}</p>
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
    <div className="flex flex-col items-center">
      <h1 className="text-5xl font-bold">Now Playing!</h1>
      <div className="flex items-center">
        <div className="flex flex-col items-center">
          <h2 className="text-4xl">{info.title}</h2>
          <h3 className="text-3xl">{`by ${info.artist}`}</h3>
        </div>
      </div>
    </div>
  );
};
