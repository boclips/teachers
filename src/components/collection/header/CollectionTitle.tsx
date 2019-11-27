import classnames from 'classnames';
import React from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import PublicLogoSVG from '../../../../resources/images/global.svg';
import PrivateLogoSVG from '../../../../resources/images/private.svg';
import { VideoCollection } from '../../../types/VideoCollection';
import './CollectionTitle.less';
import { ButtonMenu } from '../../common/buttons/ButtonMenu';
import StopClickPropagation from '../../common/StopClickPropagation';
import BookmarkCollectionButton from '../buttons/bookmark/BookmarkCollectionButton';

interface Props extends RouteComponentProps {
  collection: VideoCollection;
  showBookmarkButton?: boolean;
}

export class CollectionTitle extends React.PureComponent<Props> {
  public static defaultProps = {
    showBookmarkButton: false,
  };

  public render() {
    const isPublic = this.props.collection.isPublic;

    const Logo = isPublic ? PublicLogoSVG : PrivateLogoSVG;

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
          {this.props.collection.isMine && (
            <Logo
              className={classnames('collection-title__logo', {
                'collection-title__logo--public': isPublic,
                'collection-title__logo--private': !isPublic,
              })}
              data-qa="collection-visibility"
              data-state={this.props.collection.isPublic + ''}
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

export default withRouter(CollectionTitle);
