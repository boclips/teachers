interface PlaybackEvent {
  action: string;
  isPaused: boolean;
  isPlaying: boolean;
  currentTimeSeconds: number;
  durationSeconds: number;
  eventTime: Date;
}
