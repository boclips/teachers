import { Video } from '../../../types/Video';

export const toMixpanelSegment = (
  video: Video,
  segmentStartSeconds: number,
  segmentEndSeconds: number,
) => ({
    playback_segment_start_seconds: segmentStartSeconds,
    playback_segment_end_seconds: segmentEndSeconds,
    playback_video_duration_seconds: video.duration.asSeconds(),
  });
