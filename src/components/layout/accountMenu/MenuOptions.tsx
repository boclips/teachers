import React from 'react';
import { Link } from 'react-router-dom';

interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  logo?: React.ReactNode;
}

class BookmarkedCollectionsLink extends React.PureComponent<Props> {
  public render = () => (
    <Link
      to={'/bookmarked-collections'}
      data-qa="bookmarked-collections"
      onClick={this.props.onClick}
    >
      {this.props.logo}
      My bookmarks
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
      {this.props.logo}
      My videos
    </Link>
  );
}

class LogoutLink extends React.PureComponent<Props> {
  public render = () => (
    <a data-qa="logout-button" href="#" onClick={this.props.onClick}>
      {this.props.logo}
      Log out
    </a>
  );
}

export { VideoCollectionsLink, BookmarkedCollectionsLink, LogoutLink };
