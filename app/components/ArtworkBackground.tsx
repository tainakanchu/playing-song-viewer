"use client";
import {useSongInfo} from "@/contexts";
import React from "react";

type Props = {
  children: React.ReactNode;
};

export const ArtworkBackground: React.FC<Props> = ({children}) => {
  const songInfo = useSongInfo();

  if (songInfo.status !== "success") return children;
  if (songInfo.artworkSrc === null) return children;

  return (
    <>
      {children}
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat blur-lg"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.8)), url(${songInfo.artworkSrc})`,
        }}
      />
    </>
  );
};
