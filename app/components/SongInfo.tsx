"use client";
import React from "react";
import { useSongInfo } from "@/hooks";

export const SongInfo: React.FC = () => {
  const info = useSongInfo();
  return <div>{JSON.stringify(info)}</div>;
};
