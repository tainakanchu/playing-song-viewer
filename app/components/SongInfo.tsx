"use client";
import React from "react";
import {useSongInfo} from "@/hooks";

export const SongInfo: React.FC = () => {
  const info = useSongInfo();
  return (
    <div className="flex flex-col items-center">
      <h1 className="">Now Playing!</h1>
      <h2>{info.title}</h2>
      <h3>{`by ${info.artist}`}</h3>
    </div>
  );
};
