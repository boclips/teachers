import React from 'react';
import { renderWithStore } from 'test-support/renderWithStore';
import {
  DisciplineFactory,
  SubjectFactory,
  UserProfileFactory,
} from '../../../test-support/factories';
import DisciplineCardList from './DisciplineCardList';

describe('discipline card list', () => {
  const subjects = [
    SubjectFactory.sample({ id: 'subject-id-1', name: 'Subject 1' }),
    SubjectFactory.sample({ id: 'subject-id-2', name: 'Subject 2' }),
    SubjectFactory.sample({ id: 'subject-id-3', name: 'Subject 3' }),
    SubjectFactory.sample({ id: 'subject-id-4', name: 'Subject 4' }),
    SubjectFactory.sample({ id: 'subject-id-5', name: 'Subject 5' }),
    SubjectFactory.sample({ id: 'subject-id-6', name: 'Subject 6' }),
    SubjectFactory.sample({ id: 'subject-id-7', name: 'Subject 7' }),
    SubjectFactory.sample({ id: 'subject-id-8', name: 'Subject 8' }),
    SubjectFactory.sample({ id: 'subject-id-9', name: 'Subject 9' }),
  ];

  const stateDisciplines = [
    DisciplineFactory.sample({ id: 'discipline-1' }),
    DisciplineFactory.sample({ id: 'discipline-2' }),
    DisciplineFactory.sample({ id: 'discipline-3' }),
    DisciplineFactory.sample({ id: 'discipline-4' }),
    DisciplineFactory.sample({
      id: 'discipline-5',
      name: "Our Teacher's favourite discipline",
      subjects,
    }),
  ];

  it('can limit the number of visible disciplines', () => {
    const wrapper = renderWithStore(
      <DisciplineCardList visibleDisciplines={4} />,
      {
        initialState: { disciplines: stateDisciplines },
      },
    );
    expect(wrapper.getAllByTestId('discipline-card')).toHaveLength(4);
  });

  it('renders every discipline when a limit is not given', () => {
    const wrapper = renderWithStore(<DisciplineCardList />, {
      initialState: { disciplines: stateDisciplines },
    });

    expect(wrapper.getAllByTestId('discipline-card')).toHaveLength(5);
  });

  it('prioritise user disciplines and user subjects', () => {
    const wrapper = renderWithStore(
      <DisciplineCardList visibleDisciplines={1} visibleSubjects={4} />,
      {
        initialState: {
          disciplines: stateDisciplines,
          user: UserProfileFactory.sample({
            subjects: ['subject-id-5', 'subject-id-6'],
          }),
        },
      },
    );

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

  it('can limit number of visible subjects in discipline cards', () => {
    const wrapper = renderWithStore(
      <DisciplineCardList visibleSubjects={1} />,
      {
        initialState: {
          disciplines: [
            DisciplineFactory.sample({
              id: 'discipline-1',
              subjects: [
                SubjectFactory.sample({
                  id: 'subject-id-1',
                  name: 'Subject 1',
                }),
                SubjectFactory.sample({
                  id: 'subject-id-2',
                  name: 'Subject 2',
                }),
              ],
            }),
          ],
        },
      },
    );

    expect(wrapper.getByText('Subject 1')).toBeInTheDocument();
    expect(wrapper.queryByText('Subject 2')).not.toBeInTheDocument();
  });

  it('renders all user subjects if there are more than the visibleSubjects limit', () => {
    const wrapper = renderWithStore(
      <DisciplineCardList visibleDisciplines={1} visibleSubjects={4} />,
      {
        initialState: {
          disciplines: stateDisciplines,
          user: UserProfileFactory.sample({
            subjects: [
              'subject-id-5',
              'subject-id-6',
              'subject-id-7',
              'subject-id-8',
              'subject-id-9',
            ],
          }),
        },
      },
    );

    expect(wrapper.getByText('Subject 9')).toBeInTheDocument();
    expect(wrapper.getByText('Subject 5')).toBeInTheDocument();
    expect(wrapper.getByText('Subject 6')).toBeInTheDocument();
    expect(wrapper.getByText('Subject 7')).toBeInTheDocument();
    expect(wrapper.getByText('Subject 8')).toBeInTheDocument();
    expect(wrapper.queryByText('Subject 1')).not.toBeInTheDocument();
    expect(wrapper.queryByText('Subject 2')).not.toBeInTheDocument();
    expect(wrapper.queryByText('Subject 3')).not.toBeInTheDocument();
    expect(wrapper.queryByText('Subject 4')).not.toBeInTheDocument();
  });

  it('show description of our subjects in desktop view', () => {
    const view = renderWithStore(
      <DisciplineCardList visibleDisciplines={4} />,
      {
        initialState: { disciplines: stateDisciplines },
      },
    );

    expect(
      view.getByText(
        "Browse our range of videos for the subjects that you teach and find collections tailored to your students' needs.",
      ),
    ).toBeVisible();
  });
});
