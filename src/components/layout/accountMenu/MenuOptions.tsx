import React from 'react';
import { Link } from 'react-router-dom';
import CollectionsIcon from '../../../../resources/images/collections-grey.svg';
import LogoutIconSVG from '../../../../resources/images/logout.svg';
import BookmarkedIconSVG from '../../../../resources/images/my-bookmarks.svg';
import SettingsSVG from '../../../../resources/images/settings.svg';

type Props = React.AnchorHTMLAttributes<HTMLAnchorElement>;

class BookmarkedCollectionsLink extends React.PureComponent<Props> {
  public render = () => (
    <Link
      to={'/bookmarked-collections'}
      data-qa="bookmarked-collections"
      onClick={this.props.onClick}
    >
      <span className="icon-container">
        <BookmarkedIconSVG aria-hidden="true" />
      </span>
      <span>Your bookmarks</span>
    </Link>
  );
}

class UserCollectionsLink extends React.PureComponent<Props> {
  public render = () => (
    <Link
      to={'/collections'}
      data-qa="user-videos"
      onClick={this.props.onClick}
    >
      <span className="icon-container">
        <CollectionsIcon aria-hidden="true" />
      </span>
      <span>Your collections</span>
    </Link>
  );
}

class AccountSettingsLink extends React.PureComponent<Props> {
  public render = () => (
    <Link
      to={'/account-settings'}
      data-qa="account-settings-button"
      onClick={this.props.onClick}
    >
      <span className="icon-container">
        <SettingsSVG aria-hidden="true" />
      </span>
      <span>Settings</span>
    </Link>
  );
}

class LogoutLink extends React.PureComponent<Props> {
  public render = () => (
    <a data-qa="logout-button" href="#" onClick={this.props.onClick}>
      <span className="icon-container">
        <LogoutIconSVG aria-hidden="true" />
      </span>
      <span>Log out</span>
    </a>
  );
}

export {
  AccountSettingsLink,
  BookmarkedCollectionsLink,
  UserCollectionsLink,
  LogoutLink,
};
