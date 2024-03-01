import { IcecastStats } from "@/types";

/**
 *
 */
const icecastServerHost = "http://localhost:8000";

// const icecastServerStatusJsonUrl = `${icecastServerHost}/status-json.xsl`;
const icecastServerStatusJsonUrl = `${icecastServerHost}/status-json.xsl`;

/**
 * Icecast サーバーにアクセスして、JSONをそのまま返す
 * @returns
 */
export const GET = async () => {
  try {
    const icecastStats = await handleFetchIcecastStats();

    return new Response(JSON.stringify(icecastStats), {
      headers: {
        "content-type": "application/json",
      },
    });
  } catch (error) {
    return new Response("Error fetching data", { status: 500 });
  }
};

const handleFetchIcecastStats = async () => {
  const result = await fetch(icecastServerStatusJsonUrl)
    .then(
      // FIXME: as のキャストでなくしたい
      (response) => response.json() as Promise<IcecastStats>
    )
    .catch((error) => {
      console.error("Error fetching data", error);
      throw new Error("Error fetching data");
    });

  return result;
};
