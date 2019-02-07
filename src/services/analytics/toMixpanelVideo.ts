import { Video } from '../../types/Video';

export const toMixpanelVideo = (video: Video) => {
  return {
    video_id: video.id,
    video_title: video.title,
    video_description: video.description,
    video_duration: video.duration.toISOString(),
    video_releasedOn: video.releasedOn.toISOString(),
    video_contentPartner: video.contentPartner,
    video_subjects: video.subjects.join(', '),
    video_playback: video.playback,
    video_badges: video.badges.join(', '),
    video_type: video.type.name,
  };
};
