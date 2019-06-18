import React from 'react';
import { connect } from 'react-redux';
import { Discipline } from '../../types/Discipline';
import { DisciplineState } from '../../types/State';

interface Props {
  subjectId: string;
}

interface StateProps {
  currentDiscipline?: Discipline;
}

class DisciplineName extends React.Component<Props & StateProps> {
  public render() {
    return this.props.currentDiscipline ? (
      <strong className="discipline-name">
        {`${this.props.currentDiscipline.name} > `}
      </strong>
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

export default connect(mapStateToProps)(DisciplineName);
