import { Icon } from 'antd';
import React from 'react';
import collectionsSvg from '../../../../resources/images/our-collections.svg';
import PageableCollectionCardList from '../card/list/PageableCollectionCardList';

interface Props {
  maxNumberOfCollections?: number;
  description?: string;
}

export class PromotedCollectionsGrid extends React.PureComponent<Props> {
  public render() {
    return (
      <PageableCollectionCardList
        title={
          <span>
            <Icon component={collectionsSvg} /> Most recent video collections
          </span>
        }
        description={this.props.description}
        grid={true}
        maxNumberOfCollections={this.props.maxNumberOfCollections}
        collectionKey="promotedCollections"
      />
    );
  }
}
