import React from 'react';
import { Link } from 'react-router-dom';
import BookmarkedIcon from '../../../../resources/images/bookmarked-collections.svg?react';
import CollectionsIcon from '../../../../resources/images/collections-grey.svg?react';
import LogoutIcon from '../../../../resources/images/logout.svg?react';

type Props = React.AnchorHTMLAttributes<HTMLAnchorElement>;

class BookmarkedCollectionsLink extends React.PureComponent<Props> {
  public render = () => (
    <Link
      to={'/bookmarked-collections'}
      data-qa="bookmarked-collections"
      onClick={this.props.onClick}
    >
      <BookmarkedIcon />
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
      <CollectionsIcon />
      <span>My videos</span>
    </Link>
  );
}

class LogoutLink extends React.PureComponent<Props> {
  public render = () => (
    <a data-qa="logout-button" href="#" onClick={this.props.onClick}>
      <LogoutIcon />
      <span>Log out</span>
    </a>
  );
}

export { VideoCollectionsLink, BookmarkedCollectionsLink, LogoutLink };
