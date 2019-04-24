import React from 'react';
import PublicLogo from '../../../../resources/images/global.react.svg';
import PrivateLogo from '../../../../resources/images/private.react.svg';
import './CollectionTitle.less';

export interface Props {
  title: string;
  isPublic: boolean;
  isMine: boolean;
}

export class CollectionTitle extends React.Component<Props> {
  public render() {
    const Logo = this.props.isPublic ? PublicLogo : PrivateLogo;
    return (
      <section className="collection-title">
        <h1 data-qa="collection-name" className="text--secondary">
          {this.props.title}
          {this.props.isMine && (
            <Logo
              className="collection-title__logo"
              data-qa="collection-visibility"
              data-state={this.props.isPublic + ''}
            />
          )}
        </h1>
      </section>
    );
  }
}
