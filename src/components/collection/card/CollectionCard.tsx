import classnames from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';
import { VideoCollection } from '../../../types/VideoCollection';
import { CollectionSubtitle } from '../CollectionSubtitle';
import './CollectionCard.less';
import CollectionCardVideoPreviews from './CollectionCardVideoPreviews';
import CollectionCardHeader from './header/CollectionCardHeader';

interface Props {
  collection: VideoCollection;
  numberOfPreviews: number;
  tiny?: boolean;
  showPrivacy?: boolean;
}

export class CollectionCard extends React.PureComponent<Props> {
  public render() {
    return (
      <section
        key={`card-${this.props.collection.id}`}
        className={classnames('collection-card', {
          tiny: this.props.tiny,
        })}
        data-qa="collection-card"
        data-state={this.props.collection.title}
      >
        <CollectionCardHeader
          collection={this.props.collection}
          showPrivacy={this.props.showPrivacy}
          showFullCard={!this.props.tiny}
          showTagsIfEmpty={this.props.tiny}
        />
        {!this.props.tiny && (
          <div
            data-qa="collection-description"
            className="collection-header__description-preview"
          >
            {this.props.collection.description}
          </div>
        )}

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
              className="collection-header__description-preview tiny"
            >
              {this.props.collection.description}
            </div>
          </span>
        )}
        <Link
          className="no-underline collection-card__link"
          to={'/collections/' + this.props.collection.id}
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
