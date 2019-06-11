import Layout from 'antd/lib/layout';
import React, { PureComponent } from 'react';
import collectionsImg from '../../../resources/images/collections.png';
import PageableCollectionCardList from '../../components/collection/card/list/PageableCollectionCardList';
import PageLayout from '../../components/layout/PageLayout';
import SubjectLabel from '../../components/SubjectLabel';
import './DiscoverCollectionsView.less';

interface Props {
  subject: string;
}

const { Content } = Layout;

export class DiscoverCollectionsView extends PureComponent<Props> {
  public render() {
    return (
      <section>
        <PageLayout
          subheader={
            <section className="discover-collections__header">
              <Content>
                <h1>
                  <SubjectLabel subjectId={this.props.subject} />
                </h1>
              </Content>
            </section>
          }
        >
          <section
            className="discover-collections__container collection-list"
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
      </section>
    );
  }
}

export default DiscoverCollectionsView;
