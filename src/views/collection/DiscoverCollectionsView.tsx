import { Col, Icon, Row } from 'antd';
import Layout from 'antd/lib/layout';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import collectionsImg from '../../../resources/images/collections.png';
import SubjectsSVG from '../../../resources/images/subjects.svg';
import PageableCollectionCardList from '../../components/collection/card/list/PageableCollectionCardList';
import DisciplineLogo from '../../components/disciplines/DisciplineLogo';
import PageLayout from '../../components/layout/PageLayout';
import AnalyticsFactory from '../../services/analytics/AnalyticsFactory';
import { Discipline } from '../../types/Discipline';
import { DisciplineState } from '../../types/State';
import { Subject } from '../../types/Subject';
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
  OwnProps & StateProps
> {
  public render() {
    if (!this.props.discipline) {
      return null; // TODO loading vs not found kind of business
    }

    return (
      <section>
        <PageLayout
          subheader={
            <section className="discover-collections__header-container">
              <Content>
                <section className="discover-collections__header">
                  <h1>
                    <strong className="discipline-name">
                      <Link
                        to={`/discover-collections?discipline=${
                          this.props.discipline.id
                        }`}
                      >
                        {this.props.discipline.name}
                      </Link>
                    </strong>
                    {this.props.subjects && this.props.subjects.length === 1 && (
                      <span className="discipline-subject">
                        <strong> > </strong>
                        {this.props.subjects[0].name}
                      </span>
                    )}
                  </h1>
                  <section className="discover-collections__header-logo">
                    <DisciplineLogo
                      discipline={this.props.discipline}
                      large={true}
                    />
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
              <h1 className="big-title alt">
                <Icon component={SubjectsSVG} /> Subjects
              </h1>
              <Row gutter={16}>
                {this.props.discipline.subjects.map(subject => (
                  <Col md={6} key={subject.id}>
                    <Link
                      className="ant-btn discover-collections__subject-button ant-btn-lg"
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
              collectionFiler={{ subject: this.props.subjects.map(s => s.id) }}
              shouldRefresh={refresh}
            />
          </section>
        </PageLayout>
      </section>
    );
  }

  public componentDidMount(): void {
    AnalyticsFactory.getInstance().trackDiscoveryPage(
      this.props.subjectIds,
      this.props.disciplineId,
    );
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

export default connect(mapStateToProps)(DiscoverCollectionsView);
