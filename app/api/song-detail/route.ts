import {NextRequest} from "next/server";

import {glob} from "glob";
import mm from "music-metadata";

const itunesMediaDirectorySlash =
  "C:\\Users\\kanch\\Music\\iTunes\\iTunes Media\\Music\\";

// \\ を / に変換
const itunesMediaDirectoryBackSlash = itunesMediaDirectorySlash.replace(
  /\\/g,
  "/",
);

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

  const patternWithArtist = `${itunesMediaDirectoryBackSlash}*${artist}*/**/*${title}*`;
  const patternOnlyTitle = `${itunesMediaDirectoryBackSlash}**/*${title}*`;

  console.log("💖pattern", patternWithArtist);
  console.log("💖pattern", patternOnlyTitle);

  try {
    const results = await glob([patternWithArtist, patternOnlyTitle]);

    if (results.length === 0) {
      console.error("💖no result");
      throw new Error("No result");
    }

    const metadata = await mm.parseFile(results[0]);
    const picture = metadata.common.picture
      ? metadata.common.picture[0].data
      : null;

    console.log("💖metadata.common", metadata.common);

    const result = {
      picture,
      albumArtist: metadata.common.albumartist ?? metadata.common.artist ?? "",
    };

    return new Response(JSON.stringify(result), {});
  } catch (error) {
    console.error("💖error", error);

    return new Response("error", {status: 500});
  }
};