import React from 'react';
import AnalyticsFactory from '../../../services/analytics/AnalyticsFactory';
import { Video } from '../../../types/Video';
import { VideoCollection } from '../../../types/VideoCollection';
import { ButtonRow } from '../../common/buttons/ButtonRow';
import { ClickableCard } from '../../common/ClickableCard/ClickableCard';
import './CollectionCard.less';
import CollectionTitle from '../header/CollectionTitle';
import BookmarkCollectionButton from '../buttons/bookmark/BookmarkCollectionButton';
import StopClickPropagation from '../../common/StopClickPropagation';
import LessonPlanSVG from '../../../../resources/images/lesson-plan-icon.svg';
import { ConnectedSubjectTag } from '../../common/tags/SubjectTag';
import { AgeRangeTag } from '../../common/tags/AgeRangeTag';
import { CollectionCardSearchPreview } from './CollectionCardSearchPreview';

export interface Props {
  collection: VideoCollection;
  videos: Video[];
}

export class CollectionCardSearch extends React.PureComponent<Props> {
  public static Skeleton = () => (
    <section
      className={'collection-card skeleton ant-skeleton ant-skeleton-active'}
    >
      <section className="ant-skeleton-content">
        <h3 className="collection-title ant-skeleton-title" />
        <span className="highlight">
          <span />
        </span>
        <section className="collection-video-previews">
          <section className="ant-skeleton-avatar ant-skeleton-avatar-lg collection-video-preview">
            <section className="ant-skeleton-avatar ant-skeleton-avatar-lg video-container" />
          </section>
          <section className="ant-skeleton-avatar ant-skeleton-avatar-lg collection-video-preview">
            <section className="ant-skeleton-avatar ant-skeleton-avatar-lg video-container" />
          </section>
          <section className="ant-skeleton-avatar ant-skeleton-avatar-lg collection-video-preview">
            <section className="ant-skeleton-avatar ant-skeleton-avatar-lg video-container" />
          </section>
          <section className="ant-skeleton-avatar ant-skeleton-avatar-lg collection-video-preview">
            <section className="ant-skeleton-avatar ant-skeleton-avatar-lg video-container" />
          </section>
        </section>
      </section>
    </section>
  );

  public render() {
    return (
      <ClickableCard
        href={`/collections/${this.props.collection.id}`}
        bordered={false}
        key={`card-${this.props.collection.id}`}
        className="collection-card collection-card--search"
        data-qa="collection-card"
        data-state={this.props.collection.title}
        onMouseDown={this.emitCollectionInteractedWithEvent}
      >
        <CollectionTitle
          collection={this.props.collection}
          showBookmarkButton={true}
        />
        <section className="collection-card__subtitle">
          <span>
            <span data-qa="collection-number-of-videos">
              {this.props.collection.videoIds.length}
            </span>{' '}
            videos
          </span>
          {this.props.collection.attachments &&
            this.props.collection.attachments.length > 0 && (
              <span className="collection-card__lesson-plan">
                {' '}
                + <LessonPlanSVG /> Lesson Plan
              </span>
            )}
        </section>
        <div className="collection-card__detail-row">
          <section className="collection-card__column-preview">
            <CollectionCardSearchPreview
              collection={this.props.collection}
              videos={this.props.videos}
            />
          </section>
          <section className="collection-card__column-detail">
            <div className="tags-container">
              <StopClickPropagation wrapper="span">
                {this.props.collection.subjects.slice(0, 1).map(subjectId => (
                  <ConnectedSubjectTag
                    key={subjectId}
                    id={subjectId}
                    clickable={true}
                  />
                ))}
              </StopClickPropagation>
              {this.props.collection.ageRange.isBounded() && (
                <AgeRangeTag
                  ageRange={this.props.collection.ageRange.getLabel()}
                />
              )}
            </div>
            <div
              className="collection-card__description-preview"
              data-qa="collection-description"
            >
              {this.props.collection.description}
            </div>
            <StopClickPropagation
              wrapperProps={{
                className:
                  'collection-card__buttons display-tablet-and-desktop',
              }}
            >
              <ButtonRow
                buttons={[
                  <BookmarkCollectionButton
                    collection={this.props.collection}
                    key={this.props.collection.id}
                  />,
                ]}
              />
            </StopClickPropagation>
          </section>
        </div>
      </ClickableCard>
    );
  }

  private emitCollectionInteractedWithEvent = () => {
    AnalyticsFactory.internalAnalytics().trackCollectionInteractedWith(
      this.props.collection,
      'NAVIGATE_TO_COLLECTION_DETAILS',
    );
  }
}
