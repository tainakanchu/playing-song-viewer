import {itunesMediaDirectory} from "@/config";
import {NextRequest} from "next/server";

import {glob} from "glob";
import mm from "music-metadata";

type Artwork = {
  type: string;
  data: Buffer;
};

export type GetSongDetailResponse = {
  artwork: Artwork | null;
  albumArtist: string;
};

const musicFileExtensions = ["mp3", "m4a", "flac", "wav", "aac"];
const musicFilePattern = `.{${musicFileExtensions.join(",")}}`;

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;

  const rawArtist = searchParams.get("artist");
  const rawTitle = searchParams.get("title");

  if (!rawTitle) {
    // 曲名がないのはさすがに無理
    return new Response("error", {status: 400});
  }
  // ; を _ に変換
  const artist = rawArtist?.replace(/;/g, "_") ?? "";

  // itunes が整理したファイルはファイル名が最大36文字なので、余裕をもって32文字で切る
  const title = rawTitle.slice(0, 32);

  const patternWithArtist = `${itunesMediaDirectory}/*${artist}*/**/*${title}*${musicFilePattern}`;
  const patternOnlyTitle = `${itunesMediaDirectory}/**/*${title}*${musicFilePattern}`;

  try {
    console.log("💖search with pattern", patternWithArtist);
    const results = await glob(patternWithArtist)
      .then((matches) => {
        if (matches.length == 0)
          throw new Error("next search with another pattern");
        return matches;
      })
      .catch(() => {
        console.log("💖search with pattern", patternOnlyTitle);
        return glob(patternOnlyTitle).then((matches) => {
          return matches;
        });
      });

    console.log("💖results", results);

    if (results.length === 0) {
      console.error("💖no result");
      throw new Error("No result");
    }

    const metadata = await mm.parseFile(results[0]);
    const picture = metadata.common.picture ? metadata.common.picture[0] : null;
    const artwork: Artwork | null = picture
      ? {
          type: picture.format,
          data: picture.data,
        }
      : null;

    console.log("💖metadata.common", metadata.common);

    const result: GetSongDetailResponse = {
      artwork,
      albumArtist: metadata.common.albumartist ?? metadata.common.artist ?? "",
    };

    return new Response(JSON.stringify(result), {
      status: 200,
    });
  } catch (error) {
    console.error("💖error", error);

    return new Response("error", {status: 500});
  }
};
