export type SongInfoFetching = {
  status: "fetching";
  title: null;
  artist: null;
  artwork: null;
  message: "Fetching song info...";
};

export type SongInfoError = {
  status: "error";
  title: null;
  artist: null;
  artwork: null;
  message: string;
};

export type SongInfoSuccess = {
  status: "success";
  title: string;
  artist: string;
  artworkSrc: string;
  message: "Song info fetched successfully.";
};

export type SongInfo = SongInfoFetching | SongInfoError | SongInfoSuccess;
