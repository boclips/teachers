interface TrackerConfig {
  eventExtraData?: { [key: string]: string | number };
  trackingEndpoint?: string;
  onSegmentWatched?: (event: SegmentWatchedEvent) => void;
}
