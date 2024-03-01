import {NextRequest} from "next/server";

import {glob} from "glob";

const itunesMediaDirectorySlash =
  "C:\\Users\\kanch\\Music\\iTunes\\iTunes Media\\Music\\";

// \\ を / に変換
const itunesMediaDirectoryBackSlash = itunesMediaDirectorySlash.replace(
  /\\/g,
  "/",
);

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;

  const artist = searchParams.get("artist");
  const title = searchParams.get("title");

  const pattern = `${itunesMediaDirectoryBackSlash}*${artist}*/**/*${title}*`;

  console.log("💖glob");

  try {
    const results = await glob(pattern);
    console.log("💖results", results);

    return new Response(JSON.stringify(results), {});
  } catch (error) {
    console.error("💖error", error);

    return new Response("error", {status: 500});
  }
};
