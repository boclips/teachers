import Layout from 'antd/lib/layout';
import React, { PureComponent } from 'react';
import collectionsImg from '../../../resources/images/collections.png';
import PageableCollectionCardList from '../../components/collection/card/list/PageableCollectionCardList';
import DisciplineName from '../../components/disciplines/DisciplineName';
import SubjectLogo from '../../components/disciplines/SubjectLogo';
import PageLayout from '../../components/layout/PageLayout';
import SubjectLabel from '../../components/SubjectLabel';
import './DiscoverCollectionsView.less';

interface Props {
  subject: string;
}

const { Content } = Layout;
const refresh = () => true;

export class DiscoverCollectionsView extends PureComponent<Props> {
  public render() {
    return (
      <section>
        <PageLayout
          subheader={
            <section className="discover-collections__header-container">
              <Content>
                <section className="discover-collections__header">
                  <h1>
                    <DisciplineName subjectId={this.props.subject} />
                    <SubjectLabel subjectId={this.props.subject} />
                  </h1>
                  <section className="discover-collections__header-logo">
                    <SubjectLogo subjectId={this.props.subject} large={true} />
                  </section>
                </section>
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
              shouldRefresh={refresh}
            />
          </section>
        </PageLayout>
      </section>
    );
  }
}

export default DiscoverCollectionsView;
