import React from 'react';
import { Link } from 'react-router-dom';
import collectionsIcon from '../../../../resources/images/collections-grey.svg';
import logoutIcon from '../../../../resources/images/logout.svg';
import bookmarkedIcon from '../../../../resources/images/my-bookmarks.svg';

type Props = React.AnchorHTMLAttributes<HTMLAnchorElement>;

class BookmarkedCollectionsLink extends React.PureComponent<Props> {
  public render = () => (
    <Link
      to={'/bookmarked-collections'}
      data-qa="bookmarked-collections"
      onClick={this.props.onClick}
    >
      <img src={bookmarkedIcon} />
      <span>My bookmarks</span>
    </Link>
  );
}

class VideoCollectionsLink extends React.PureComponent<Props> {
  public render = () => (
    <Link
      to={'/collections'}
      data-qa="video-collection"
      onClick={this.props.onClick}
    >
      <img src={collectionsIcon} />
      <span>My videos</span>
    </Link>
  );
}

class LogoutLink extends React.PureComponent<Props> {
  public render = () => (
    <a data-qa="logout-button" href="#" onClick={this.props.onClick}>
      <img src={logoutIcon} />
      <span>Log out</span>
    </a>
  );
}

export { VideoCollectionsLink, BookmarkedCollectionsLink, LogoutLink };
