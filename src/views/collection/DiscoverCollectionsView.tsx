import React, { PureComponent } from 'react';
import collectionsImg from '../../../resources/images/collections.png';
import PageableCollectionCardList from '../../components/collection/card/list/PageableCollectionCardList';
import PageLayout from '../../components/layout/PageLayout';
import './CollectionDetailsView.less';

interface Props {
  subject: string;
}

export class DiscoverCollectionsView extends PureComponent<Props> {
  public render() {
    return (
      <PageLayout>
        <section
          className="discover-collections-list collection-list"
          data-qa="discover-collections-list-page"
        >
          <PageableCollectionCardList
            title={
              <span>
                <img src={collectionsImg} alt="" /> Video collections
              </span>
            }
            grid={true}
            collectionKey="discoverCollections"
            collectionFiler={{ subjects: this.props.subject }}
          />
        </section>
      </PageLayout>
    );
  }
}

export default DiscoverCollectionsView;
