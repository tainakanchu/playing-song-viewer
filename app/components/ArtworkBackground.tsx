"use client";
import {useSongInfo} from "@/contexts";
import React, {useMemo} from "react";

type Props = {
  children: React.ReactNode;
};

export const ArtworkBackground: React.FC<Props> = ({children}) => {
  const songInfo = useSongInfo();

  const style = useMemo(() => {
    if (songInfo.status === "success" && songInfo.artworkSrc) {
      return {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.8)), url(${songInfo.artworkSrc})`,
      };
    }
    return {};
  }, [songInfo]);

  return (
    <>
      {children}
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat blur-xl"
        style={style}
      />
    </>
  );
};
