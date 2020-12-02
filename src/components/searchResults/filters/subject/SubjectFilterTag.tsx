import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import State from '../../../../types/State';
import { Subject } from '../../../../types/Subject';
import { ClosableTag } from '../../../common/tags/Tag';
import { updateSearchParamsAction } from '../../redux/actions/updateSearchParametersActions';

interface Props {
  subjectId?: string;
  subjectIds: string[];
}

interface StateProps {
  subject?: Subject;
}

interface DispatchProps {
  onClose: () => void;
}

const SubjectFilterTag = ({
  subject,
  onClose,
}: Props & DispatchProps & StateProps) =>
  subject ? (
    <span data-qa="subject-filter-tag">
      <ClosableTag label="Subject" value={subject.name} onClose={onClose} />
    </span>
  ) : null;

function mapStateToProps(state: State, ownProps: Props): StateProps {
  return {
    subject: state.subjects.filter(
      (subject) => subject.id === ownProps.subjectId,
    )[0],
  };
}

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: Props,
): DispatchProps => ({
  onClose: () => {
    dispatch(
      updateSearchParamsAction({
        subject: ownProps.subjectIds.filter(
          (item) => item !== ownProps.subjectId,
        ),
      }),
    );
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SubjectFilterTag);
