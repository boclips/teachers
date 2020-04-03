import { Playback } from 'boclips-api-client/dist/sub-clients/common/model/Playback';
import { Video } from '../../../types/Video';

export const toAppcuesVideo = (video: Video) => ({
  video_id: video.id,
  video_title: video.title,
  video_description: video.description,
  video_duration: video.duration.toISOString(),
  video_releasedOn: video.releasedOn.toISOString(),
  video_contentPartner: video.createdBy,
  video_subjects: video.subjects,
  video_playback: convertPlaybackInfo(video.playback),
  video_badges: video.badges.join(', '),
});

const convertPlaybackInfo = (playback: Playback) =>
  playback.type === 'STREAM'
    ? { id: playback.id, streamUrl: playback.links.hlsStream.getOriginalLink() }
    : { id: playback.id };
