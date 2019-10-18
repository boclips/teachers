import classnames from 'classnames';
import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { VideoCollection } from '../../../types/VideoCollection';
import { CollectionSubtitle } from '../CollectionSubtitle';
import CollectionHeader from '../header/CollectionHeader';
import CollectionCardVideoPreviews from './CollectionCardVideoPreviews';

import './CollectionCard.less';

export interface Props extends RouteComponentProps {
  collection: VideoCollection;
  numberOfPreviews: number;
  tiny?: boolean;
  navigateToCollectionDetails: () => void;
}

export class CollectionCardForRouter extends React.PureComponent<Props> {
  public static Skeleton = (props: { tiny: boolean }) => (
    <section
      className={
        'collection-card skeleton ant-skeleton ant-skeleton-active' +
        (props.tiny ? ' tiny' : '')
      }
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
      <section
        key={`card-${this.props.collection.id}`}
        className={classnames('collection-card', {
          tiny: this.props.tiny,
        })}
        data-qa="collection-card"
        data-state={this.props.collection.title}
        onClick={this.handleOnCardClick}
      >
        <CollectionHeader
          collection={this.props.collection}
          mode={this.props.tiny ? 'tiny-card' : 'card'}
        />
        <CollectionCardVideoPreviews
          numberOfPreviews={this.props.numberOfPreviews}
          videos={this.props.collection.videoIds.map(
            videoId => this.props.collection.videos[videoId.id],
          )}
          isGrid={this.props.tiny}
          id={this.props.collection.id}
        />
        {this.props.tiny && (
          <span>
            <CollectionSubtitle
              classname="highlight collection-subtitle tiny"
              collection={this.props.collection}
            />
            <div
              data-qa="collection-description"
              className="collection-card__description-preview tiny"
            >
              {this.props.collection.description}
            </div>
          </span>
        )}
      </section>
    );
  }

  private handleOnCardClick = (event: React.MouseEvent) => {
    if (event.ctrlKey || event.metaKey) {
      window.open(`/collections/${this.props.collection.id}`);
    } else {
      this.props.history.push(`/collections/${this.props.collection.id}`);
    }
  };
}

export const CollectionCard = withRouter(CollectionCardForRouter);
