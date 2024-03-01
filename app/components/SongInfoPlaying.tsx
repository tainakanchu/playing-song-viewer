"use client";
import React, {useMemo} from "react";
import Image from "next/image";
import QRCode from "react-qr-code";
import {useSongDetail} from "@/hooks";

type Props = {
  title: string;
  artist: string;
};

export const SongInfoPlaying: React.FC<Props> = ({title, artist}) => {
  const spotifySearchUriEncoded = useMemo(() => {
    const spotifySearchBaseUri = "spotify:search:artist:";
    const spotifySearchUri = `${spotifySearchBaseUri}${artist} ${title}`;
    return encodeURI(spotifySearchUri);
  }, [artist, title]);

  const detail = useSongDetail({title, artist});

  const src = useMemo(() => {
    if (isError(detail)) {
      return null;
    }
    if (detail.picture) {
      const base64 = Buffer.from(detail.picture).toString("base64");
      return `data:image/jpeg;base64,${base64}`;
    }
    return null;
  }, [detail]);

  return (
    <div className="flex flex-col items-center gap-8">
      <h1 className="text-5xl font-bold">Now Playing!</h1>
      <div className="flex items-center gap-8">
        <div className="flex w-[32rem] flex-col content-around items-center gap-2">
          <Image
            src={src ?? "/no_image.svg"}
            alt="Album Art"
            width={256}
            height={256}
            // アスペクト比は維持する
            layout="responsive"
          />

          <h2 className="text-3xl">{title}</h2>
          <h3 className="text-xl">{`by ${artist}`}</h3>
        </div>
        <div className="flex w-36 flex-col items-center gap-2 ">
          <div className="bg-white p-2">
            <QRCode value={spotifySearchUriEncoded} size={144} bgColor="#fff" />
          </div>
          <p className="text-sm">View on Spotify</p>
        </div>
      </div>
    </div>
  );
};

const isError = (detail: any): detail is {error: string} => {
  return "error" in detail;
};
