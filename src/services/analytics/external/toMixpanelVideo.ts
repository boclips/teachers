import { Video } from '../../../types/Video';

export const toMixpanelVideo = (video: Video) => ({
    video_id: video.id,
    video_title: video.title,
    video_description: video.description,
    video_duration: video.duration.toISOString(),
    video_releasedOn: video.releasedOn.toISOString(),
    video_contentPartner: video.createdBy,
    video_subjects: video.subjects,
    video_playback: video.playback,
    video_badges: video.badges.join(', '),
  });
