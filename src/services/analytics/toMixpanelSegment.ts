import { PlaybackEvent } from 'boclips-player/esm/Events/AnalyticsEvents';

export const toMixpanelSegment = (watchedSegment: PlaybackEvent) => {
  return {
    playback_segment_start_seconds: watchedSegment.segmentStartSeconds,
    playback_segment_end_seconds: watchedSegment.segmentEndSeconds,
    playback_video_duration_seconds: watchedSegment.videoDurationSeconds,
  };
};
