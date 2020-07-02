import React from 'react';

export default class AccountSettingsItem extends React.PureComponent<{
  label: string;
}> {
  public render() {
    return (
      <section className="account-settings__item-container">
        <section className="account-settings__item-label">
          {this.props.label}
        </section>
        <section className="account-settings__item-value">
          {this.props.children}
        </section>
      </section>
    );
  }
}
