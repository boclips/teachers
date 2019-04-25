import React from 'react';
import { Link } from 'react-router-dom';
import CollectionsIcon from '../../../../resources/images/collections-grey.svg';
import LogoutIcon from '../../../../resources/images/logout.svg';
import BookmarkedIcon from '../../../../resources/images/my-bookmarks.svg';
import ReferAFriendIcon from '../../../../resources/images/refer-a-friend-icon.svg';
import ReferAFriend from '../../ReferAFriend';

type Props = React.AnchorHTMLAttributes<HTMLAnchorElement>;

class BookmarkedCollectionsLink extends React.PureComponent<Props> {
  public render = () => (
    <Link
      to={'/bookmarked-collections'}
      data-qa="bookmarked-collections"
      onClick={this.props.onClick}
    >
      <span className="icon-container">
        <BookmarkedIcon aria-hidden="true" />
      </span>
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
      <span className="icon-container">
        <CollectionsIcon aria-hidden="true" />
      </span>
      <span>My videos</span>
    </Link>
  );
}

class LogoutLink extends React.PureComponent<Props> {
  public render = () => (
    <a data-qa="logout-button" href="#" onClick={this.props.onClick}>
      <span className="icon-container">
        <LogoutIcon aria-hidden="true" />
      </span>
      <span>Log out</span>
    </a>
  );
}

class ReferAFriendLink extends React.PureComponent<{}> {
  public render() {
    return (
      <ReferAFriend>
        <a data-qa="refer-a-friend-button" href="#">
          <span className="icon-container">
            <ReferAFriendIcon aria-hidden="true" />
          </span>
          <span>Refer a friend</span>
        </a>
      </ReferAFriend>
    );
  }
}

export {
  VideoCollectionsLink,
  BookmarkedCollectionsLink,
  LogoutLink,
  ReferAFriendLink,
};
