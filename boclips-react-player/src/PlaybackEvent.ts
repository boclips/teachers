interface PlaybackEvent {
  playerIdentifier: string;
  segmentStartSeconds: number;
  segmentEndSeconds: number;
  videoDurationSeconds: number;
  captureTime: Date;
}
