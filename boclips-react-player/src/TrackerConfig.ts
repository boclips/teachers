interface TrackerConfig {
  trackingEndpoint?: URL;
  onSegmentWatched?: (event: SegmentWatchedEvent) => void;
}
