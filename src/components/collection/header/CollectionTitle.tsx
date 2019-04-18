import React from 'react';
import publicLogo from '../../../../resources/images/global.svg';
import privateLogo from '../../../../resources/images/private.svg';
import './CollectionTitle.less';

export interface Props {
  title: string;
  isPublic: boolean;
  isMine: boolean;
}

export class CollectionTitle extends React.Component<Props> {
  private getLogo() {
    return this.props.isPublic ? publicLogo : privateLogo;
  }

  public render() {
    return (
      <section className="collection-title">
        <h1 data-qa="collection-name" className="text--secondary">
          {this.props.title}
          {this.props.isMine && (
            <img
              src={this.getLogo()}
              className="collection-title__logo"
              data-qa="collection-visibility"
              data-state={this.props.isPublic + ''}
              alt="Collection logo"
            />
          )}
        </h1>
      </section>
    );
  }
}
