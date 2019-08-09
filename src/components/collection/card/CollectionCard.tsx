import classnames from 'classnames';
import React from 'react';
import { VideoCollection } from '../../../types/VideoCollection';
import { A11yButton } from '../../common/A11yButton';
import { CollectionSubtitle } from '../CollectionSubtitle';
import CollectionHeader from '../header/CollectionHeader';
import './CollectionCard.less';
import CollectionCardVideoPreviews from './CollectionCardVideoPreviews';

interface Props {
  collection: VideoCollection;
  numberOfPreviews: number;
  tiny?: boolean;
  showPrivacy?: boolean;
  onClick: () => void;
}

export class CollectionCard extends React.PureComponent<Props> {
  public render() {
    return (
      <A11yButton callback={this.props.onClick} disableClick={false}>
        <section
          key={`card-${this.props.collection.id}`}
          className={classnames('collection-card', {
            tiny: this.props.tiny,
          })}
          data-qa="collection-card"
          data-state={this.props.collection.title}
        >
          <CollectionHeader
            collection={this.props.collection}
            showPrivacy={this.props.showPrivacy}
            showFullCard={!this.props.tiny}
            showTagsContainerIfEmpty={this.props.tiny}
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
                className="collection-header__description-preview tiny"
              >
                {this.props.collection.description}
              </div>
            </span>
          )}
        </section>
      </A11yButton>
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
