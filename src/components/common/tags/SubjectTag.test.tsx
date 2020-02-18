import { SubjectFactory } from 'boclips-api-client/dist/test-support';
import React from 'react';
import { SubjectsFactory } from 'test-support/factories';
import { renderWithStore } from 'test-support/renderWithStore';
import { ConnectedSubjectTag } from './SubjectTag';

describe('Subject tag', () => {
  it('Renders the correct name when only id is passed', () => {
    const { getByText } = renderWithStore(
      <ConnectedSubjectTag id={'maths-id'} />,
      {
        initialState: {
          subjects: SubjectsFactory.sample([
            SubjectFactory.sample({ id: 'maths-id', name: 'Maths' }),
          ]),
        },
      },
    );

    expect(getByText('Maths')).toBeInTheDocument();
  });

  it('Does not render if the subject name is not found', () => {
    const { queryByText, queryByTestId } = renderWithStore(
      <ConnectedSubjectTag id={'not-maths-id'} />,
      {
        initialState: {
          subjects: SubjectsFactory.sample([
            SubjectFactory.sample({ id: 'maths-id', name: 'Maths' }),
          ]),
        },
      },
    );

    expect(queryByText('Maths')).not.toBeInTheDocument();
    expect(queryByTestId('subject-tag')).not.toBeInTheDocument();
  });
});
