import React, { ReactElement } from 'react';
import { Video } from 'src/types/Video';
import { Card, Skeleton as AntSkeleton } from 'antd';
import { BadgeList } from 'src/views/bit/badgeList';
import { AgeRangeBadge } from 'src/views/bit/ageRangeBadge';
import { SubjectBadge } from 'src/views/bit/subjectBadge';
import { BestForBadge } from 'src/views/bit/bestForBadge';
import { AttachmentBadge } from 'src/views/bit/attachmentBadge';
import { ReleasedOn } from 'src/views/bit/releasedOn';
import { Duration } from 'src/views/bit/duration';
import s from './style.module.less';

export interface Props {
  video: Video | null;
  videoIndex?: number;
  rating?: ReactElement;
  videoPlayer?: ReactElement;
  videoActionButtons?: ReactElement;
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

export const VideoCard = (props: Props): any => {
  const duration = props.video?.duration?.toISOString();

  const ClickableCard = () => (
    <Card
      bodyStyle={{ width: '100%' }}
      className={s.videoCard}
      bordered={false}
      data-qa="video-card"
    >
      {/* CARD HEADER START */}
      <section className={s.cardHeader}>
        <h1 className={s.headerTitle}> {props.video.title} </h1>
        {props.video.duration && <Duration duration={duration} />}
      </section>
      {/* CARD HEADER END */}

      {/* CARD SUB-HEADER START */}
      <section className={s.subHeader}>
        <BadgeList>
          {props.video.ageRange && (
            <AgeRangeBadge
              ageRange={props.video.ageRange}
              hideAgeRangeLabel={false}
            />
          )}
          {props.video.subjects &&
            props.video.subjects.map((it, i) => (
              <SubjectBadge key={i} subject={it} />
            ))}

          {props.video.bestFor && (
            <BestForBadge bestFor={props.video.bestFor} />
          )}
          {props.video.attachments && <AttachmentBadge />}
        </BadgeList>
      </section>
      {props.rating && <section className={s.rating}> {props.rating} </section>}
      {props.video.releasedOn && props.video.createdBy && (
        <ReleasedOn
          releasedOn={props.video.releasedOn}
          createdBy={props.video.createdBy}
        />
      )}
      {/* CARD SUB-HEADER END */}
      <section className={s.cardBody}>
        <div className={s.left}>
          {/* VIDEO PLAYER START */}
          {props.videoPlayer && (
            <section className={s.videoPlayer}> {props.videoPlayer} </section>
          )}
          {/* VIDEO PLAYER END */}
        </div>
        <div className={s.right}>
          {/* DESCRIPTION START */}
          {props.videoPlayer && (
            <section className={s.description}>
              {props.video.description}
            </section>
          )}
          {/* DESCRIPTION END */}
          {/* BUTTONS START */}
          {props.videoActionButtons && (
            <section className={s.videoActionButtons}>
              {props.videoActionButtons}
            </section>
          )}
          {/* BUTTONS END */}
        </div>
      </section>
    </Card>
  );

  return props.video ? <ClickableCard /> : <VideoCardSkeleton />;
};
