import {useEffect, useState} from "react";

const songDetailEndpoint = "api/song-detail";

type ErrorSongDetail = {
  error: string;
};

type SuccessSongDetail = {
  picture: Buffer;
  albumArtist: string;
};

type SongDetail = SuccessSongDetail | ErrorSongDetail;

export const useSongDetail = ({
  title,
  artist,
}: {
  title: string;
  artist: string;
}): SongDetail => {
  const [detail, setDetail] = useState<SongDetail>({
    error: "fetching",
  });

  useEffect(() => {
    setDetail({
      error: "fetching",
    });

    const encodedTitle = encodeURIComponent(title);
    const encodedArtist = encodeURIComponent(artist);

    const api = `${songDetailEndpoint}?title=${encodedTitle}&artist=${encodedArtist}`;

    fetch(api, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            console.log("💖data", data);
            setDetail(data);
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching data", error);
        setDetail({
          error: "error",
        });
      });
  }, [title, artist]);

  return detail;
};
