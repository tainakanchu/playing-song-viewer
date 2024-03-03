import {env} from "process";

/**
 * iTunes に登録している音楽ライブラリのパス
 *
 * Windows 環境でコピーするときパスの区切りは \\ になるが
 * 環境変数ととしてはそのまま設定して動くようにアプリからは / に変換している itunesMediaDirectory を使う
 *
 * @example "C:\\Users\\user-name\\Music\\iTunes\\iTunes Media\\Music\\"
 */
export const itunesMediaDirectorySlash = env.ITUNES_MEDIA_DIRECTORY;

/**
 * itunes media directory
 * @example "C:/Users/user-name/Music/iTunes/iTunes Media/Music/"
 **/
export const itunesMediaDirectory =
  itunesMediaDirectorySlash?.replace(/\\/g, "/") ?? "";

console.log("💖itunesMediaDirectory", itunesMediaDirectory);

/**
 * Icecast サーバーのホスト
 *
 * @example "http://localhost:8000"
 */
export const icecastServerHost = `http://${env.ICECAST_SERVER_HOST}:${env.ICECAST_SERVER_PORT}`;

/**
 * Icecast サーバーのステータスを取得するための URL
 *
 * @example "http://localhost:8000/status-json.xsl"
 */
export const icecastServerStatusJsonUrl = `${icecastServerHost}/status-json.xsl`;

console.log("💖icecastServerStatusJsonUrl", icecastServerStatusJsonUrl);
