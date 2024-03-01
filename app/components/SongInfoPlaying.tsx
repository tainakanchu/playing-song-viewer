"use client";
import React, {useMemo} from "react";
import Link from "next/link";
import QRCode from "react-qr-code";

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

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-5xl font-bold">Now Playing!</h1>
      <div className="flex items-center gap-4">
        <div className="flex flex-col content-around items-center">
          <h2 className="text-4xl">{title}</h2>
          <h3 className="text-3xl">{`by ${artist}`}</h3>
        </div>
        <div className="flex flex-col items-center">
          <div className="bg-white p-4">
            <QRCode value={spotifySearchUriEncoded} size={144} bgColor="#fff" />
          </div>

          <Link href={spotifySearchUriEncoded}>View on Spotify</Link>
        </div>
      </div>
    </div>
  );
};
