import { Card } from 'antd';
import classnames from 'classnames';
import React from 'react';
import { CollectionShareButton } from 'src/components/collection/sharing/CollectionShareButton/CollectionShareButton';
import { AttachmentTag } from 'src/components/common/tags/AttachmentTag';
import AnalyticsFactory from '../../../services/analytics/AnalyticsFactory';
import { Video } from '../../../types/Video';
import { VideoCollection } from '../../../types/VideoCollection';
import { ButtonRow } from '../../common/buttons/ButtonRow';
import { ClickableCard } from '../../common/ClickableCard/ClickableCard';
import './CollectionCard.less';
import { CollectionTitle } from '../title/CollectionTitle';
import BookmarkCollectionButton from '../buttons/bookmark/BookmarkCollectionButton';
import StopClickPropagation from '../../common/StopClickPropagation';
import { ConnectedSubjectTag } from '../../common/tags/SubjectTag';
import { AgeRangeTag } from '../../common/tags/AgeRangeTag';
import MyCollectionSVG from '../../../../resources/images/my-account.svg';
import { EditCollectionButton } from '../buttons/EditCollectionButton';
import {
  withMediaBreakPoint,
  WithMediaBreakPointProps,
} from '../../common/higherOrderComponents/withMediaBreakPoint';
import MediaBreakpoints from '../../../types/MediaBreakpoints';
import { ButtonMenu } from '../../common/buttons/ButtonMenu';
import BulletSVG from '../../../../resources/images/bullet.svg';
import { CollectionCardPreview } from './CollectionCardPreview';

export interface Props {
  collection: VideoCollection;
  videos: Video[];
  grid: boolean;
}

export const CollectionCard = withMediaBreakPoint(
  React.memo((props: Props & WithMediaBreakPointProps) => {
    const isSmallCard =
      props.grid || props.mediaBreakpoint.width <= MediaBreakpoints.md.width;

    const collectionHasTags =
      props.collection.subjects.length > 0 ||
      props.collection.ageRange.isBounded();

    const displayTags = props.grid || collectionHasTags;

    const leftButtons = [
      (props.collection.links.bookmark ||
        props.collection.links.unbookmark) && (
        <BookmarkCollectionButton
          key="bookmark"
          collection={props.collection}
        />
      ),
      <CollectionShareButton key="share" collection={props.collection} />,
    ];

    const rightButtons = [
      props.collection.links.edit && (
        <EditCollectionButton key="edit" collection={props.collection} />
      ),
    ];

    const filteredButtons = [...leftButtons, ...rightButtons].filter(
      (button) => button !== undefined,
    );

    const collectionHasNoDescription =
      props.collection.description === null ||
      props.collection.description === '';

    const renderDescription = () => {
      if (props.videos.length === 0) {
        return (
          <div className={'empty-collection-message'}>
            This video collection is empty.
          </div>
        );
      }

      if (collectionHasNoDescription) {
        return (
          <ul>
            {props.videos.map((video) => (
              <li key={video.id}>
                <BulletSVG className="collection-card__description-preview__icon" />
                <span>{`"${video.title}" by ${video.createdBy}`}</span>
              </li>
            ))}
          </ul>
        );
      }

      return props.collection.description;
    };

    return (
      <ClickableCard
        href={`/collections/${props.collection.id}`}
        bordered={false}
        key={`card-${props.collection.id}`}
        className={classnames('collection-card collection-card--search', {
          'collection-card--grid': isSmallCard,
        })}
        data-qa="collection-card"
        data-state={props.collection.title}
        onMouseDown={() => {
          AnalyticsFactory.internalAnalytics().trackCollectionInteractedWith(
            props.collection,
            'NAVIGATE_TO_COLLECTION_DETAILS',
          );
        }}
      >
        <section className="collection-card__title">
          <CollectionTitle collection={props.collection} />
          {isSmallCard && (
            <StopClickPropagation
              wrapper="div"
              wrapperProps={{ className: 'button-menu-container' }}
            >
              <ButtonMenu buttons={filteredButtons} />
            </StopClickPropagation>
          )}
        </section>
        {!isSmallCard && (
          <section className="collection-card__subtitle">
            {props.collection.isMine && (
              <span className="collection-card__owner-label">
                <MyCollectionSVG /> Your collection
              </span>
            )}
          </section>
        )}
        {displayTags && (
          <div className="tags-container" data-qa={'tags-container'}>
            {props.collection.ageRange.isBounded() && (
              <AgeRangeTag ageRange={props.collection.ageRange} />
            )}
            {props.collection.subjects.slice(0, 1).map((subjectId) => (
              <ConnectedSubjectTag key={subjectId} id={subjectId} />
            ))}
            {props.collection.attachments &&
              props.collection.attachments.length > 0 && (
                <AttachmentTag label={'Lesson guide'} />
              )}
          </div>
        )}
        <div className="collection-card__detail-row">
          <section className="collection-card__column-preview">
            <CollectionCardPreview
              collection={props.collection}
              videos={props.videos}
            />
          </section>
          <section className="collection-card__column-detail">
            <div
              className="collection-card__description-preview"
              data-qa="collection-description"
            >
              {renderDescription()}
            </div>
            {!isSmallCard && (
              <StopClickPropagation
                wrapperProps={{
                  className:
                    'collection-card__buttons display-tablet-and-desktop',
                }}
              >
                <ButtonRow
                  leftButtons={leftButtons}
                  rightButtons={rightButtons}
                />
              </StopClickPropagation>
            )}
          </section>
        </div>
      </ClickableCard>
    );
  }),
);

export const CollectionCardSkeleton = () => (
  <Card
    className={
      'collection-card collection-card--search skeleton ant-skeleton ant-skeleton-active'
    }
    bordered={false}
  >
    <section className="ant-skeleton-content">
      <h3 className="collection-title ant-skeleton-title" />
      <div className="collection-card__detail-row">
        <section className="collection-card__column-preview">
          <CollectionCardPreview.Skeleton />
        </section>
        <section className="collection-card__column-detail">
          <ul className="ant-skeleton-paragraph">
            <li />
            <li />
            <li />
          </ul>
        </section>
      </div>
    </section>
  </Card>
);
