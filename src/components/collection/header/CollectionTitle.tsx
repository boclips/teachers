import React from 'react';
import { Link } from 'react-router-dom';
import PrivateLogoSVG from '../../../../resources/images/private.svg';
import { VideoCollection } from '../../../types/VideoCollection';
import './CollectionTitle.less';
import { ButtonMenu } from '../../common/buttons/ButtonMenu';
import StopClickPropagation from '../../common/StopClickPropagation';
import BookmarkCollectionButton from '../buttons/bookmark/BookmarkCollectionButton';

interface Props {
  collection: VideoCollection;
  showBookmarkButton?: boolean;
}

export class CollectionTitle extends React.PureComponent<Props> {
  public static defaultProps = {
    showBookmarkButton: false,
  };

  public render() {
    return (
      <section className={'collection-title-section'}>
        <h1
          data-qa="collection-title"
          id={this.props.collection.id}
          tabIndex={0}
          className="collection-title"
        >
          <Link to={`/collections/${this.props.collection.id}`} tabIndex={-1}>
            {this.props.collection.title}
          </Link>
          {this.props.collection.isMine && !this.props.collection.isPublic && (
            <PrivateLogoSVG
              className={'collection-title__logo'}
              data-qa="collection-visibility"
            />
          )}
        </h1>
        {this.props.showBookmarkButton && (
          <StopClickPropagation wrapper="div">
            <ButtonMenu
              className="display-mobile"
              buttons={[
                <BookmarkCollectionButton collection={this.props.collection} />,
              ]}
            />
          </StopClickPropagation>
        )}
      </section>
    );
  }
}
