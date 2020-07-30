import Layout from 'antd/lib/layout';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Subject } from 'src/types/Subject';
import { Discipline } from 'src/types/Discipline';
import { CollectionState, DisciplineState } from 'src/types/State';
import {
  withMediaBreakPoint,
  WithMediaBreakPointProps,
} from 'src/components/common/higherOrderComponents/withMediaBreakPoint';
import './SubjectSearchView.less';
import ConnectedNewSearchResultsView from 'src/views/searchResults/SearchResultsView';
import { updateSearchParamsAction } from 'src/components/searchResults/redux/actions/updateSearchParametersActions';
import AnalyticsFactory from 'src/services/analytics/AnalyticsFactory';
import DisciplineLogo from '../../components/disciplines/DisciplineLogo';

interface OwnProps {
  subjectId: string;
  disciplineId?: string;
}

interface StateProps {
  subject: Subject;
  discipline: Discipline;
}

interface DispatchProps {
  initializeSubjectSearch: () => {};
}

const { Content } = Layout;

class SubjectSearchView extends PureComponent<
  OwnProps & StateProps & DispatchProps & WithMediaBreakPointProps
> {
  public componentDidMount(): void {
    const { initializeSubjectSearch, subjectId } = this.props;
    AnalyticsFactory.externalAnalytics().trackDiscoveryPage([subjectId]);
    initializeSubjectSearch();
  }

  private renderSubheader = (discipline: Discipline, subject: Subject) => {
    return (
      <section className="subjects__subheader-container">
        <Content>
          <section className="subjects__subheader">
            <h1>
              {discipline && (
                <strong className="discipline-name">
                  <Link to="/our-subjects">{discipline.name}</Link>
                </strong>
              )}
              <span className="discipline-subject">
                <strong> &gt; </strong>
                {subject?.name}
              </span>
            </h1>
            {discipline && (
              <section className="subjects__subheader-logo display-tablet-and-desktop">
                <DisciplineLogo discipline={discipline} />
              </section>
            )}
          </section>
        </Content>
      </section>
    );
  };

  public render() {
    const { discipline, subject } = this.props;

    return (
      <ConnectedNewSearchResultsView
        subheader={this.renderSubheader(discipline, subject)}
        hideFilterTypes={['subjects']}
      />
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

const mapDispatchToProps = (dispatch) => {
  return {
    initializeSubjectSearch: (subject: string) =>
      dispatch(updateSearchParamsAction({ subject: [subject] })),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withMediaBreakPoint(SubjectSearchView));
