import { Button, Icon } from 'antd';
import React, { useCallback } from 'react';
import AnalyticsFactory from 'src/services/analytics/AnalyticsFactory';
import { fetchVideoTranscript } from 'src/services/videos/fetchVideoTranscript';
import { Video } from 'src/types/Video';
import DownloadTranscriptSVG from '../../../../../resources/images/download-transcript.svg';

interface Props {
  video: Video;
}

export const DownloadTranscriptButton = ({ video }: Props) => {
  const handleTranscriptClick = useCallback(() => {
    fetchVideoTranscript(video);
    AnalyticsFactory.internalAnalytics().trackVideoTranscriptDownloaded(video);
  }, [video]);

  if (video.links.transcript) {
    return (
      <Button
        size={'large'}
        onClick={handleTranscriptClick}
        data-qa="download-transcript"
      >
        <Icon component={DownloadTranscriptSVG} /> Transcript
      </Button>
    );
  } else {
    return null;
  }
};
