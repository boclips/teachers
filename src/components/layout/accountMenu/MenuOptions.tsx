import React from 'react';
import { Link } from 'react-router-dom';
import CollectionsIcon from '../../../../resources/images/collections-grey.svg';
import LogoutIconSVG from '../../../../resources/images/logout.svg';
import SettingsSVG from '../../../../resources/images/settings.svg';

type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const UserCollectionsLink = (props: LinkProps) => {
  return (
    <Link to="/collections" data-qa="user-videos" onClick={props.onClick}>
      <span className="icon-container">
        <CollectionsIcon aria-hidden="true" />
      </span>
      <span className="account-settings-text">Your resources</span>
    </Link>
  );
};

const AccountSettingsLink = (props: LinkProps) => {
  return (
    <Link
      to="/account-settings"
      data-qa="account-settings-button"
      onClick={props.onClick}
    >
      <span className="icon-container">
        <SettingsSVG aria-hidden="true" />
      </span>
      <span className="account-settings-text">Settings</span>
    </Link>
  );
};

const LogoutLink = (props: ButtonProps) => {
  return (
    <section
      role="button"
      tabIndex={0}
      data-qa="logout-button"
      onKeyPress={(e) => (e.keyCode === 13 ? props.onClick : null)}
      onClick={props.onClick}
    >
      <span className="icon-container">
        <LogoutIconSVG aria-hidden="true" />
      </span>
      <span className="account-settings-text">Log out</span>
    </section>
  );
};

export { AccountSettingsLink, UserCollectionsLink, LogoutLink };
