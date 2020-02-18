import { Col, Icon, Row } from 'antd';
import Layout from 'antd/lib/layout';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SubjectsSVG from 'resources/images/subjects.svg';
import collectionsImg from 'resources/images/collections.png';
import { Discipline } from 'src/types/Discipline';
import MediaBreakpoints from 'src/types/MediaBreakpoints';
import { DisciplineState } from 'src/types/State';
import { Subject } from 'src/types/Subject';
import AnalyticsFactory from '../../services/analytics/AnalyticsFactory';
import PageLayout from '../../components/layout/PageLayout';
import DisciplineLogo from '../../components/disciplines/DisciplineLogo';
import withMediaBreakPoint, {
  WithMediaBreakPointProps,
} from '../../components/common/higerOrderComponents/withMediaBreakPoint';
import PageableCollectionCardList from '../../components/collection/card/list/PageableCollectionCardList';
import './DiscoverCollectionsView.less';

interface OwnProps {
  subjectIds?: string[];
  disciplineId?: string;
}

interface StateProps {
  subjects: Subject[];
  discipline: Discipline;
}

const { Content } = Layout;
const refresh = () => true;

export class DiscoverCollectionsView extends PureComponent<
  OwnProps & StateProps & WithMediaBreakPointProps
> {
  public render() {
    if (!this.props.discipline) {
      return null; // TODO loading vs not found kind of business
    }

    let pageTitle = this.props.discipline.name;

    if (this.props.subjects && this.props.subjects.length === 1) {
      pageTitle += ` > ${this.props.subjects[0].name}`;
    }

    return (
      <section>
        <PageLayout
          title={pageTitle}
          showNavigation={true}
          showSearchBar={true}
          showFooter={true}
          subheader={
            <section className="discover-collections__header-container">
              <Content>
                <section className="discover-collections__header">
                  <h1>
                    <strong className="discipline-name">
                      <Link
                        to={`/discover-collections?discipline=${this.props.discipline.id}`}
                      >
                        {this.props.discipline.name}
                      </Link>
                    </strong>
                    {this.props.subjects && this.props.subjects.length === 1 && (
                      <span className="discipline-subject">
                        <strong> &gt; </strong>
                        {this.props.subjects[0].name}
                      </span>
                    )}
                  </h1>
                  <section className="discover-collections__header-logo display-tablet-and-desktop">
                    <DisciplineLogo discipline={this.props.discipline} />
                  </section>
                </section>
              </Content>
            </section>
          }
        >
          {!this.props.subjectIds || this.props.subjectIds.length === 0 ? (
            <section
              className="discover-collections__subjects"
              data-qa="discover-collections-discipline-subjects"
            >
              <h1 className="big-title alt display-tablet-and-desktop">
                <Icon component={SubjectsSVG} /> Subjects
              </h1>
              <Row
                className="discover-collections__subjects-list"
                type="flex"
                gutter={[12, 12]}
              >
                {this.props.discipline.subjects.map(subject => (
                  <Col md={6} key={subject.id}>
                    <Link
                      className={this.subjectClassName()}
                      to={`/discover-collections?subject=${subject.id}`}
                    >
                      <span data-qa="discipline-subject-link">
                        {subject.name}
                      </span>
                    </Link>
                  </Col>
                ))}
              </Row>
            </section>
          ) : null}

          <section
            className="discover-collections__container collection-list"
            data-qa="discover-collections-list-page"
            key={`container-${this.props.subjects.map(s => s.id).join()}`}
          >
            <PageableCollectionCardList
              key={this.props.subjects.map(s => s.id).join()}
              title={
                <span>
                  <img src={collectionsImg} alt="" /> Video collections
                </span>
              }
              grid={true}
              collectionKey="discoverCollections"
              collectionFiler={{
                filters: { subject: this.props.subjects.map(s => s.id) },
              }}
              shouldRefresh={refresh}
            />
          </section>
        </PageLayout>
      </section>
    );
  }

  public componentDidMount(): void {
    AnalyticsFactory.externalAnalytics().trackDiscoveryPage(
      this.props.subjectIds,
      this.props.disciplineId,
    );
  }

  private isDesktop(): boolean {
    return this.props.mediaBreakpoint.width > MediaBreakpoints.md.width;
  }

  private subjectClassName(): string {
    return this.isDesktop()
      ? 'discover-collections__subject-link link--tabbable ant-btn ant-btn-lg'
      : 'discover-collections__subject-link link--tabbable';
  }
}

function getDisciplineBySubject(
  disciplines: Discipline[],
  subjectIds: string[],
) {
  return (
    subjectIds &&
    subjectIds.length === 1 &&
    disciplines &&
    disciplines.find(
      d =>
        d.subjects &&
        d.subjects.find(s => s.id === subjectIds[0]) !== undefined,
    )
  );
}

function getDisciplineById(disciplines: Discipline[], disciplineId: string) {
  return disciplineId && disciplines.find(d => d.id === disciplineId);
}

function getSubjectIfOneDefined(discipline: Discipline, subjectIds: string[]) {
  const subject =
    subjectIds &&
    subjectIds.length === 1 &&
    discipline &&
    discipline.subjects &&
    discipline.subjects.find(s => s.id === subjectIds[0]);

  return subject && [subject];
}

function getDisciplineSubjects(discipline) {
  return discipline && discipline.subjects;
}

function mapStateToProps(
  state: DisciplineState,
  ownProps: OwnProps,
): StateProps {
  const discipline =
    getDisciplineById(state.disciplines, ownProps.disciplineId) ||
    getDisciplineBySubject(state.disciplines, ownProps.subjectIds);
  return {
    discipline,
    subjects:
      getSubjectIfOneDefined(discipline, ownProps.subjectIds) ||
      getDisciplineSubjects(discipline) ||
      [],
  };
}

export default connect(mapStateToProps)(
  withMediaBreakPoint(DiscoverCollectionsView),
);
