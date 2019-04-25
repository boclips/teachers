import classnames from 'classnames';
import React from 'react';
import { VideoCollection } from '../../../types/VideoCollection';
import './CollectionCard.less';
import CollectionCardVideoPreviews from './CollectionCardVideoPreviews';
import CollectionCardHeader from './header/CollectionCardHeader';

interface Props {
  collection: VideoCollection;
  numberOfPreviews: number;
  tiny?: boolean;
  onClick?: React.MouseEventHandler;
}

export class CollectionCard extends React.PureComponent<Props> {
  public render() {
    return (
      <section
        key={`card-${this.props.collection.id}`}
        className={classnames('collection-card', {
          tiny: this.props.tiny,
          clickable: !!this.props.onClick,
        })}
        data-qa="collection-card"
        data-state={this.props.collection.title}
        onClick={this.props.onClick}
      >
        <CollectionCardHeader
          collection={this.props.collection}
          showRemoveButton={!this.props.tiny}
        />
        <CollectionCardVideoPreviews
          numberOfPreviews={this.props.numberOfPreviews}
          videos={this.props.collection.videoIds.map(
            videoId => this.props.collection.videos[videoId.id],
          )}
          isGrid={this.props.tiny}
          id={this.props.collection.id}
        />
      </section>
    );
  }

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
}
