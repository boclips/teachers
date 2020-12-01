import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import State from '../../../../types/State';
import { ClosableTag } from '../../../common/tags/Tag';
import { updateSearchParamsAction } from '../../redux/actions/updateSearchParametersActions';

interface Props {
  subjectId?: string;
  subjectIds: string[];
}

export const SubjectFilterTag = ({ subjectId, subjectIds }: Props) => {
  const dispatch = useDispatch();
  const subject = useSelector(
    (state: State) =>
      state.subjects.filter((subject) => subject.id === subjectId)[0],
  );

  const onClose = () => {
    dispatch(
      updateSearchParamsAction({
        subject: subjectIds.filter((item) => item !== subjectId),
      }),
    );
  };

  return subject ? (
    <span data-qa="subject-filter-tag">
      <ClosableTag label="Subject" value={subject.name} onClose={onClose} />
    </span>
  ) : null;
};
