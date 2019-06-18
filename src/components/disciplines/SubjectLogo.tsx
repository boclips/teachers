import React from 'react';
import { connect } from 'react-redux';
import { Discipline } from '../../types/Discipline';
import { DisciplineState } from '../../types/State';
import DisciplineLogo from './DisciplineLogo';

interface Props {
  subjectId: string;
  large?: boolean;
}

interface StateProps {
  currentDiscipline?: Discipline;
}

class SubjectLogo extends React.Component<Props & StateProps> {
  public render() {
    return this.props.currentDiscipline ? (
      <DisciplineLogo discipline={this.props.currentDiscipline} large={true} />
    ) : null;
  }
}

function mapStateToProps(state: DisciplineState, ownProps: Props): StateProps {
  return {
    currentDiscipline:
      state.disciplines &&
      state.disciplines.find(
        d =>
          d.subjects &&
          d.subjects.find(s => s.id === ownProps.subjectId) !== undefined,
      ),
  };
}

export default connect(mapStateToProps)(SubjectLogo);
