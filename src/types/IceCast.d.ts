export type IcecastStats = typeof icecastStatsExampleData;

const icecastStatsExampleData = {
  icestats: {
    admin: "icemaster@localhost",
    host: "localhost",
    location: "Earth",
    server_id: "Icecast 2.4.4",
    server_start: "Fri, 09 Apr 2021 21:49:50 +0200",
    server_start_iso8601: "2021-04-09T21:49:50+0200",
    source: {
      audio_bitrate: 128000,
      audio_channels: 1,
      audio_samplerate: 48000,
      bitrate: 128,
      genre: "various",
      "ice-bitrate": 128,
      listener_peak: 1,
      listeners: 0,
      listenurl: "http://localhost:8000/test2",
      server_description: "Unspecified description",
      server_name: "Unspecified name",
      server_type: "application/ogg",
      stream_start: "Fri, 09 Apr 2021 21:49:52 +0200",
      stream_start_iso8601: "2021-04-09T21:49:52+0200",
      subtype: "Vorbis",
      dummy: null,
    },
  },
};
