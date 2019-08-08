import React from 'react';
import PublicLogoSVG from '../../../../../resources/images/global.svg';
import PrivateLogoSVG from '../../../../../resources/images/private.svg';
import { VideoCollection } from '../../../../types/VideoCollection';
import './CollectionCardTitle.less';

interface Props {
  collection: VideoCollection;
  showPrivacy?: boolean;
}

export class CollectionCardTitle extends React.Component<Props> {
  public render() {
    const Logo = this.props.collection.isPublic
      ? PublicLogoSVG
      : PrivateLogoSVG;
    return (
      <section>
        <h1
          data-qa="collection-title"
          tabIndex={0}
          className="collection-title"
        >
          {this.props.collection.title}
          {this.props.showPrivacy && (
            <Logo
              className="collection-title__logo"
              data-qa="collection-visibility"
              data-state={this.props.collection.isPublic + ''}
            />
          )}
        </h1>
      </section>
    );
  }
}

export default CollectionCardTitle;
