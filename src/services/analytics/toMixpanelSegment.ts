import SegmentWatchedEvent from 'boclips-react-player/dist/src/SegmentWatchedEvent';

export const toMixpanelSegment = (watchedSegment: SegmentWatchedEvent) => {
  return {
    playback_segment_start_seconds: watchedSegment.segmentStartSeconds,
    playback_segment_end_seconds: watchedSegment.segmentEndSeconds,
    playback_video_duration_seconds: watchedSegment.videoDurationSeconds,
  };
};
