import React, { ReactElement } from 'react';
import { Video } from 'src/types/Video';
import { VideoCollection } from 'src/types/VideoCollection';
import { Card, Icon, Skeleton as AntSkeleton } from 'antd';
import s from './style.module.less';

export interface Props {
  video: Video | null;
  videoIndex?: number;
  currentCollection?: VideoCollection;
  referer?: string;
  emitVideoLinkClickEvent?: () => void;
  cardHeader?: ReactElement;
  displayDuration?: boolean;
  title: string;
  duration?: string;
}

export const VideoCardSkeleton = () => (
  <Card className="video-card skeleton" bordered={false}>
    <AntSkeleton
      loading={true}
      active={true}
      title={{ width: '150px' }}
      paragraph={{ rows: 5 }}
      avatar={{ shape: 'square', size: 'large' }}
    />
  </Card>
);

const durationFormatter = (duration: string) =>
  duration
    .replace('PT', '')
    .replace('H', 'h ')
    .replace('M', 'm ')
    .replace('S', 's');

export const VideoCard = (props: Props): any => {
  const ClickableCard = () => (
    <Card
      bodyStyle={{ width: '100%' }}
      className={s.videoCard}
      bordered={false}
      data-qa="video-card"
    >
      {/* CARD HEADER START */}
      <section className={s.cardHeader}>
        <h1 className={s.headerTitle}> {props.title} </h1>
        {props.displayDuration && props.duration ? (
          <div className={s.duration}>
            <Icon type="clock-circle" />
            <span>{durationFormatter(props.duration)}</span>
          </div>
        ) : null}
      </section>
      {/* CARD HEADER END */}
      {/* CARD SUB-HEADER START */}
      <section className={s.subHeader}>

      </section>
      {/* CARD SUB-HEADER END */}
    </Card>
  );

  return props.video ? <ClickableCard /> : <VideoCardSkeleton />;
};
