import React from 'react';
import badgeAdFree from '../../../../resources/images/badge-ad-free.png';
import badgeYoutube from '../../../../resources/images/badge-youtube.png';
import { Video } from '../../../types/Video';

interface Props {
  video: Video;
}

const badges = {
  youtube: { src: badgeYoutube, alt: 'YouTube' },
  'ad-free': { src: badgeAdFree, alt: 'Ad free' },
};

export default class VideoPreviewBadge extends React.PureComponent<Props> {
  public render() {
    const badge = badges[this.props.video.badges[0]];

    if (badge) {
      return <img src={badge.src} className={'video-badge'} alt={badge.alt} />;
    }
  }
}
