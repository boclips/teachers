import React from 'react';
import publicLogo from '../../../../resources/images/global.svg';
import privateLogo from '../../../../resources/images/private.svg';
import './CollectionTitle.less';

export interface Props {
  title: string;
  isPublic: boolean;
}

export class CollectionTitle extends React.Component<Props> {
  private getLogo() {
    return this.props.isPublic ? publicLogo : privateLogo;
  }

  public render() {
    return (
      <section className="collection-title__container">
        <h1 data-qa="collection-name" className="text--secondary">
          {this.props.title}
          <img src={this.getLogo()} data-qa="collection-visibility" />
        </h1>
      </section>
    );
  }
}
