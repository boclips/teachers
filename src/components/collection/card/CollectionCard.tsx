import { Card } from 'antd';
import classnames from 'classnames';
import React from 'react';
import AnalyticsFactory from '../../../services/analytics/AnalyticsFactory';
import { Video } from '../../../types/Video';
import { VideoCollection } from '../../../types/VideoCollection';
import { ButtonRow } from '../../common/buttons/ButtonRow';
import { ClickableCard } from '../../common/ClickableCard/ClickableCard';
import './CollectionCard.less';
import { CollectionTitle } from '../header/CollectionTitle';
import BookmarkCollectionButton from '../buttons/bookmark/BookmarkCollectionButton';
import StopClickPropagation from '../../common/StopClickPropagation';
import LessonPlanSVG from '../../../../resources/images/lesson-plan-icon.svg';
import { ConnectedSubjectTag } from '../../common/tags/SubjectTag';
import { AgeRangeTag } from '../../common/tags/AgeRangeTag';
import { EditCollectionButton } from '../buttons/EditCollectionButton';
import { RemoveCollectionButton } from '../buttons/RemoveCollectionButton';
import withMediaBreakPoint, {
  WithMediaBreakPointProps,
} from '../../common/higerOrderComponents/withMediaBreakPoint';
import MediaBreakpoints from '../../../types/MediaBreakpoints';
import { ButtonMenu } from '../../common/buttons/ButtonMenu';
import { CollectionCardPreview } from './CollectionCardPreview';

export interface Props {
  collection: VideoCollection;
  videos: Video[];
  grid: boolean;
}

export class CollectionCardInner extends React.PureComponent<
  Props & WithMediaBreakPointProps
> {
  public static Skeleton = () => (
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

  public render() {
    const leftButtons = [
      (this.props.collection.links.bookmark ||
        this.props.collection.links.unbookmark) && (
        <BookmarkCollectionButton
          key="bookmark"
          collection={this.props.collection}
        />
      ),
    ];
    const rightButtons = [
      this.props.collection.links.edit && (
        <EditCollectionButton key="edit" collection={this.props.collection} />
      ),
      this.props.collection.links.remove && (
        <RemoveCollectionButton
          key="remove"
          collection={this.props.collection}
        />
      ),
    ];

    return (
      <ClickableCard
        href={`/collections/${this.props.collection.id}`}
        bordered={false}
        key={`card-${this.props.collection.id}`}
        className={classnames('collection-card collection-card--search', {
          'collection-card--grid': this.isSmallCard(),
        })}
        data-qa="collection-card"
        data-state={this.props.collection.title}
        onMouseDown={this.emitCollectionInteractedWithEvent}
      >
        <section className="collection-card__title">
          <CollectionTitle collection={this.props.collection} />

          {this.isSmallCard() && (
            <StopClickPropagation
              wrapper="div"
              wrapperProps={{ className: 'button-menu-container' }}
            >
              <ButtonMenu buttons={[...leftButtons, ...rightButtons]} />
            </StopClickPropagation>
          )}
        </section>
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
            <CollectionCardPreview
              collection={this.props.collection}
              videos={this.props.videos}
            />
          </section>
          <section className="collection-card__column-detail">
            <div className="tags-container">
              {this.props.collection.subjects.slice(0, 1).map(subjectId => (
                <ConnectedSubjectTag key={subjectId} id={subjectId} />
              ))}
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
            {!this.isSmallCard() && (
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
  }

  private isSmallCard = () =>
    this.props.grid ||
    this.props.mediaBreakpoint.width <= MediaBreakpoints.sm.width;

  private emitCollectionInteractedWithEvent = () => {
    AnalyticsFactory.internalAnalytics().trackCollectionInteractedWith(
      this.props.collection,
      'NAVIGATE_TO_COLLECTION_DETAILS',
    );
  };
}

export const CollectionCard = withMediaBreakPoint(CollectionCardInner);
