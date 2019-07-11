import React from 'react';
import PublicLogoSVG from '../../../../resources/images/global.svg';
import PrivateLogoSVG from '../../../../resources/images/private.svg';
import './CollectionTitle.less';

export interface Props {
  title: string;
  isPublic: boolean;
  isMine: boolean;
}

export class CollectionTitle extends React.Component<Props> {
  public render() {
    const Logo = this.props.isPublic ? PublicLogoSVG : PrivateLogoSVG;
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
