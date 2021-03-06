import { ClockCircleOutlined } from '@ant-design/icons';
import { Col, Row, Skeleton } from 'antd';
import React from 'react';
import { Authenticated } from 'src/components/common/Authenticated/Authenticated';
import { BestForTag } from 'src/components/common/tags/BestForTag';
import { AgeRangeTag } from 'src/components/common/tags/AgeRangeTag';
import { AttachmentDetails } from 'src/components/common/AttachmentDetails';
import AnalyticsFactory from 'src/services/analytics/AnalyticsFactory';
import { DownloadTranscriptButton } from 'src/components/video/buttons/downloadTranscriptButton/DownloadTranscriptButton';
import ContentWarningIcon from 'resources/images/warning.svg';
import { getAttachmentLabels } from 'src/components/common/AttachmentConstants';
import { Video } from 'src/types/Video';
import DateFormatter from '../../common/formatters/DateFormatter';
import DurationFormatter from '../../common/formatters/DurationFormatter';
import { SubjectTag } from '../../common/tags/SubjectTag';
import VideoButtons from '../buttons/videoButtons/VideoButtons';
import VideoPlayer from '../player/VideoPlayer';
import Rating from '../rating/Rating';
import './VideoDetails.less';

interface VideoDetailsProps {
  video: Video | null;
  showOnlyThumbnail?: boolean;
}

interface SkeletonProps {
  video: Video | null;
  children?: React.ReactNode;
}

const VideoDetailsContent = (props: VideoDetailsProps) => {
  const { video, showOnlyThumbnail } = props;
  if (!video) {
    return null;
  }

  const hasAttachments = video.attachments && video.attachments.length > 0;

  return (
    <section
      className="video-details-container video-content"
      itemScope
      itemType="http://schema.org/Article"
    >
      <Row justify="space-between" className="video-header">
        <Col>
          <h1
            className="title clamp-2-lines big-title"
            data-qa="video-title"
            itemProp="name"
          >
            {video.title}
          </h1>
        </Col>
        <Authenticated>
          <Col>
            <section className="buttons-row">
              <VideoButtons video={video} mode="default" />
            </section>
          </Col>
        </Authenticated>
      </Row>
      <Row>
        <section className="badges-row">
          <div className="subjects-container">
            <Authenticated>
              {video.ageRange && <AgeRangeTag ageRange={video.ageRange} />}
              {video.subjects.map((subject) => (
                <SubjectTag subjectName={subject.name} key={subject.name} />
              ))}
              {video.bestFor && <BestForTag value={video.bestFor} />}
            </Authenticated>
          </div>
          <section className="badge-container">
            <p data-qa="video-duration" className="duration">
              <ClockCircleOutlined />
              &nbsp;
              <DurationFormatter duration={video.duration} />
            </p>
          </section>
        </section>
      </Row>
      <Row className="subtitle">
        <Rating video={video} />
        <div className="releasedOn">
          Released on&nbsp;
          <span data-qa="video-released-on">
            <DateFormatter date={video.releasedOn} />
          </span>
          &nbsp;by&nbsp;
          <span data-qa="video-created-by">{video.createdBy}</span>
        </div>
      </Row>
      <Row className="video-player-container">
        <Col
          className="player"
          sm={hasAttachments && { span: 24 }}
          md={hasAttachments && { span: 24 }}
          lg={hasAttachments && { span: 18 }}
        >
          {showOnlyThumbnail ? (
            <div className="thumbnail-preview-container">
              <img
                alt={video.title}
                data-qa="thumbnail-image"
                src={video.thumbnailUrl}
                itemProp="image"
                className="thumbnail-image"
              />
            </div>
          ) : (
            <div data-qa="video-player">
              <VideoPlayer collectionKey="myCollections" video={video} />
            </div>
          )}
          <div className="transcript-button">
            <DownloadTranscriptButton video={video} />
          </div>
        </Col>
        <Authenticated>
          {hasAttachments && (
            <Col sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 6 }}>
              {video.attachments?.map((it) => (
                <AttachmentDetails
                  key={it.id}
                  link={it.linkToResource}
                  description={it.description}
                  labels={getAttachmentLabels(it.type)}
                  onClick={() => {
                    AnalyticsFactory.internalAnalytics().trackVideoActivityClicked(
                      video,
                    );
                  }}
                />
              ))}
            </Col>
          )}
        </Authenticated>
      </Row>
      <Row>
        <section className="video-details">
          <p
            className={
              hasAttachments
                ? 'narrow-description-paragraph'
                : 'description-paragraph'
            }
          >
            <div
              data-qa="video-description"
              className="description"
              itemProp="description"
            >
              {video.description}
            </div>
            {!!video.additionalDescription && (
              <div
                className="additional-description"
                data-qa="additional-description"
              >
                {video.additionalDescription}
              </div>
            )}
          </p>
          <Authenticated>
            {video.contentWarnings?.length > 0 && (
              <p className="content-warnings">
                <span className="content-warnings__icon">
                  <ContentWarningIcon />
                </span>
                <span>
                  <span className="content-warnings__title">
                    Content warning:
                  </span>{' '}
                  {video.contentWarnings.map((it) => it.label).join(', ')}
                </span>
              </p>
            )}
          </Authenticated>
        </section>
      </Row>
    </section>
  );
};

const VideoDetailsSkeleton = ({ video, children }: SkeletonProps) => (
  <section className="video-details">
    <Skeleton
      loading={!video}
      active
      title={{ width: '150px' }}
      paragraph={{ rows: 5 }}
      avatar={{ shape: 'square', size: 'large' }}
    >
      {children}
    </Skeleton>
  </section>
);

const VideoDetails = ({ video, showOnlyThumbnail }: VideoDetailsProps) => (
  <VideoDetailsSkeleton video={video}>
    <VideoDetailsContent video={video} showOnlyThumbnail={showOnlyThumbnail} />
  </VideoDetailsSkeleton>
);

export default VideoDetails;
