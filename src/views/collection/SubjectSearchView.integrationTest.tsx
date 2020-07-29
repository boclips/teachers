import { renderWithBoclipsStore } from 'test-support/renderWithStore';
import eventually from 'test-support/eventually';
import React from 'react';
import SubjectSearchView from 'src/views/collection/SubjectSearchView';
import { DisciplineFactory, MockStoreFactory } from 'test-support/factories';

describe('SubjectSearchView', () => {
  it('displays search results page with subject subheader', async () => {
    const view = renderWithBoclipsStore(
      <SubjectSearchView subjectId="arts-subject-2" />,
      MockStoreFactory.sampleState({
        disciplines: [
          DisciplineFactory.sample({
            id: 'id 1',
            name: 'Arts',
            subjects: [
              {
                id: 'arts-subject-1',
                name: 'Art history',
              },
              {
                id: 'arts-subject-2',
                name: 'Modern art',
              },
            ],
          }),
          DisciplineFactory.sample({ id: 'id 2', name: 'Maths' }),
        ],
      }),
    );

    await eventually(() => {
      expect(view.queryByText('Arts')).toBeInTheDocument();
      expect(view.queryByText('Modern art')).toBeInTheDocument();
    });
  });
});
