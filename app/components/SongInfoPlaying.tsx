import React, {useMemo} from "react";
import Image from "next/image";
import QRCode from "react-qr-code";
import { useWindow } from '../../src/hooks/useWindow';

type Props = {
  title: string;
  artist: string;
  artwork: string;
};

const googleSearchBasePath = "https://www.google.com/search?q=";

export const SongInfoPlaying: React.FC<Props> = ({title, artist, artwork}) => {
  const spotifySearchUriEncoded = useMemo(() => {
    const googleSearchUrl = `${googleSearchBasePath}${artist} ${title}`;
    return encodeURI(googleSearchUrl);
  }, [artist, title]);

  const {width, height, orientation} = useWindow();

  const arrangement = orientation === "landscape" ? "flex-row" : "flex-col";

  const artworkSize = Math.min(width, height) * 0.6;

  return (
    <div className="flex w-full flex-col items-center gap-8">
      <h1 className="text-3xl font-bold">Now Playing!</h1>
      <div className={`flex items-center gap-8 ${arrangement}`}>
        <div className="flex w-[32rem] flex-col content-around items-center gap-2">
          <Image
            src={artwork}
            className="rounded-lg shadow-xl shadow-slate-700"
            alt="Album Art"
            width={artworkSize}
            height={artworkSize}
          />

          <h2 className="text-2xl">{title}</h2>
          <h3 className="text-base">{`by ${artist}`}</h3>
        </div>
        <div className="flex w-36 flex-col items-center gap-2 ">
          <div className="bg-white p-2">
            <QRCode value={spotifySearchUriEncoded} size={144} bgColor="#fff" />
          </div>
          <p className="text-sm">Search with Google</p>
        </div>
      </div>
    </div>
  );
};

const isError = (detail: any): detail is {error: string} => {
  return "error" in detail;
};
