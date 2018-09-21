export default interface SegmentWatchedEvent {
  playerId: string;
  segmentStartSeconds: number;
  segmentEndSeconds: number;
  videoDurationSeconds: number;
  captureTime: Date;
}
