export type IcecastStats = {
  icestats: {
    admin: string;
    host: string;
    location: string;
    server_id: string;
    server_start: string;
    server_start_iso8601: string;
    source: {
      artist: string;
      audio_bitrate: number;
      audio_channels: number;
      audio_info: string;
      audio_samplerate: number;
      bitrate: string;
      genre: string;
      "ice-bitrate": number;
      "ice-channels": number;
      "ice-samplerate": number;
      listener_peak: number;
      listeners: number;
      listenurl: string;
      server_description: string;
      server_name: string;
      server_type: string;
      stream_start: string;
      stream_start_iso8601: string;
      subtype: string;
      title: string;
      dummy: null;
    };
  };
};
