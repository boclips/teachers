import React from 'react';
import { renderWithStore } from 'test-support/renderWithStore';
import {
  DisciplineFactory,
  SubjectFactory,
  UserProfileFactory,
} from '../../../test-support/factories';
import DisciplineCardList from './DisciplineCardList';

describe('discipline card limits', () => {
  const subjects = [
    SubjectFactory.sample({ id: 'subject-id-1', name: 'Subject 1' }),
    SubjectFactory.sample({ id: 'subject-id-2', name: 'Subject 2' }),
    SubjectFactory.sample({ id: 'subject-id-3', name: 'Subject 3' }),
    SubjectFactory.sample({ id: 'subject-id-4', name: 'Subject 4' }),
    SubjectFactory.sample({ id: 'subject-id-5', name: 'Subject 5' }),
    SubjectFactory.sample({ id: 'subject-id-6', name: 'Subject 6' }),
  ];

  const store = {
    initialState: {
      user: UserProfileFactory.sample({
        subjects: ['subject-id-5', 'subject-id-6'],
      }),
      disciplines: [
        DisciplineFactory.sample({ id: 'discipline-1' }),
        DisciplineFactory.sample({ id: 'discipline-2' }),
        DisciplineFactory.sample({ id: 'discipline-3' }),
        DisciplineFactory.sample({ id: 'discipline-4' }),
        DisciplineFactory.sample({
          id: 'discipline-5',
          name: "Our Teacher's favourite discipline",
          subjects,
        }),
      ],
    },
  };

  it('only renders 4 cards when limited to 4', () => {
    const wrapper = renderWithStore(<DisciplineCardList limit={4} />, store);
    expect(wrapper.getAllByTestId('discipline-card')).toHaveLength(4);
  });

  it('renders every discipline when a limit is not given', () => {
    const wrapper = renderWithStore(<DisciplineCardList />, store);

    expect(wrapper.getAllByTestId('discipline-card')).toHaveLength(5);
  });

  it('renders user disciplines and subjects at top of list', () => {
    const wrapper = renderWithStore(<DisciplineCardList limit={1} />, store);

    expect(
      wrapper.getByText("Our Teacher's favourite discipline"),
    ).toBeInTheDocument();
    expect(wrapper.getByText('Subject 5')).toBeInTheDocument();
    expect(wrapper.getByText('Subject 6')).toBeInTheDocument();
    expect(wrapper.getByText('Subject 1')).toBeInTheDocument();
    expect(wrapper.getByText('Subject 2')).toBeInTheDocument();
    expect(wrapper.queryByText('Subject 3')).not.toBeInTheDocument();
    expect(wrapper.queryByText('Subject 4')).not.toBeInTheDocument();
  });
});
