import React from 'react';
import { Video } from '../../../types/Video';
import { VideoCollection } from '../../../types/VideoCollection';
import { ClickableCard } from '../../common/ClickableCard/ClickableCard';
import { CollectionSubtitle } from '../CollectionSubtitle';
import CollectionHeader from '../header/CollectionHeader';
import CollectionCardVideoPreviews from './CollectionCardVideoPreviews';

import './CollectionCard.less';

export interface Props {
  collection: VideoCollection;
  videos: Video[];
}

export class CollectionCardTiny extends React.PureComponent<Props> {
  public static Skeleton = () => (
    <section
      className={
        'collection-card skeleton ant-skeleton ant-skeleton-active tiny'
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
      <ClickableCard
        href={`/collections/${this.props.collection.id}`}
        bordered={false}
        key={`card-${this.props.collection.id}`}
        className="collection-card tiny"
        data-qa="collection-card"
        data-state={this.props.collection.title}
      >
        <CollectionHeader collection={this.props.collection} mode="tiny-card" />
        <CollectionCardVideoPreviews
          numberOfPreviews={4}
          videos={this.props.videos}
          isGrid={true}
          id={this.props.collection.id}
          numberOfVideos={this.props.collection.videoIds.length}
        />
        <CollectionSubtitle
          classname="highlight collection-subtitle tiny"
          collection={this.props.collection}
        />
        {this.props.collection.description && (
          <div
            data-qa="collection-description"
            className="collection-card__description-preview tiny"
          >
            {this.props.collection.description}
          </div>
        )}
      </ClickableCard>
    );
  }
}
