import Layout from 'antd/lib/layout';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Subject } from 'src/types/Subject';
import { Discipline } from 'src/types/Discipline';
import { CollectionState, DisciplineState } from 'src/types/State';
import {
  withMediaBreakPoint,
  WithMediaBreakPointProps,
} from 'src/components/common/higherOrderComponents/withMediaBreakPoint';
import './SubjectSearchView.less';
import ConnectedNewSearchResultsView from 'src/views/searchResults/SearchResultsView';
import AnalyticsFactory from 'src/services/analytics/AnalyticsFactory';
import { Link } from 'react-router-dom';
import DisciplineLogo from '../../components/disciplines/DisciplineLogo';

interface OwnProps {
  subjectId: string;
  disciplineId?: string;
}

interface StateProps {
  subject: Subject;
  discipline: Discipline;
}

const { Content } = Layout;

class SubjectSearchView extends PureComponent<
  OwnProps & StateProps & WithMediaBreakPointProps
> {
  public componentDidMount(): void {
    const { subjectId } = this.props;
    AnalyticsFactory.externalAnalytics().trackDiscoveryPage([subjectId]);
  }

  private renderSubheader = (discipline: Discipline, subject: Subject) => {
    return (
      subject && (
        <section className="subjects__subheader-container">
          <Content>
            <section className="subjects__subheader">
              <h1>
                {discipline && (
                  <strong className="discipline-name">
                    <Link to="/our-subjects">{discipline.name}</Link>
                  </strong>
                )}
                <div className="discipline-subject">{subject?.name}</div>
              </h1>
              {discipline && (
                <section className="subjects__subheader-logo display-tablet-and-desktop">
                  <DisciplineLogo discipline={discipline} />
                </section>
              )}
            </section>
          </Content>
        </section>
      )
    );
  };

  public render() {
    const { discipline, subject } = this.props;

    return (
      <div className="subject-search-page">
        <ConnectedNewSearchResultsView
          subheader={this.renderSubheader(discipline, subject)}
          hideFilterTypes={['subjects']}
        />
      </div>
    );
  }
}

function getDisciplineBySubject(disciplines: Discipline[], subjectId: string) {
  return disciplines?.find(
    (d) => d.subjects?.find((s) => s.id === subjectId) !== undefined,
  );
}

function getSubject(discipline: Discipline, subjectId: string) {
  return discipline?.subjects?.find((s) => s.id === subjectId);
}

function mapStateToProps(
  { disciplines }: DisciplineState & CollectionState,
  { subjectId }: OwnProps,
): StateProps {
  const discipline = getDisciplineBySubject(disciplines, subjectId);
  return {
    discipline,
    subject: getSubject(discipline, subjectId),
  };
}

export default connect(mapStateToProps)(withMediaBreakPoint(SubjectSearchView));
