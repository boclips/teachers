import { SubjectsView } from 'src/views/collection/SubjectsView';
import React from 'react';
import { renderWithBoclipsStore } from 'test-support/renderWithStore';
import { DisciplineFactory } from 'test-support/factories';
import { createMemoryHistory } from 'history';
import { within } from '@testing-library/dom';

describe('Subjects view', () => {
  it('When url has an anchor focus on the corresponding discipline ', () => {
    const view = renderWithBoclipsStore(
      <SubjectsView />,
      {
        disciplines: [
          DisciplineFactory.sample({ id: 'id 1', name: 'Arts' }),
          DisciplineFactory.sample({ id: 'id 2', name: 'Maths' }),
          DisciplineFactory.sample({ id: 'id 3', name: 'Test 3' }),
          DisciplineFactory.sample({ id: 'id 4', name: 'Test 4' }),
          DisciplineFactory.sample({ id: 'id 5', name: 'STEM' }),
        ],
      },
      createMemoryHistory({
        initialEntries: ['our-subjects#STEM'],
      }),
    );

    const elementInFocus = view.baseElement?.ownerDocument
      ?.activeElement as HTMLElement;

    expect(within(elementInFocus).getByText('STEM')).toBeVisible();
    expect(within(elementInFocus).queryByText('Maths')).toBeNull();
  });
  it('Discipline card rendered should not have a clickable header', () => {
    const view = renderWithBoclipsStore(
      <SubjectsView />,
      {
        disciplines: [
          DisciplineFactory.sample({ id: 'id 1', name: 'Arts' }),
          DisciplineFactory.sample({ id: 'id 2', name: 'Maths' }),
          DisciplineFactory.sample({ id: 'id 3', name: 'Test 3' }),
          DisciplineFactory.sample({ id: 'id 4', name: 'Test 4' }),
          DisciplineFactory.sample({ id: 'id 5', name: 'STEM' }),
        ],
      },
      createMemoryHistory({
        initialEntries: ['our-subjects'],
      }),
    );

    const disciplineCard = view.getByText('STEM');
    expect(disciplineCard.tagName).toEqual('H1');
  });
  it('when url has no anchor just render the page ', () => {
    const view = renderWithBoclipsStore(
      <SubjectsView />,
      {
        disciplines: [
          DisciplineFactory.sample({ id: 'id 1', name: 'Arts' }),
          DisciplineFactory.sample({ id: 'id 2', name: 'Maths' }),
        ],
      },
      createMemoryHistory({
        initialEntries: ['our-subjects'],
      }),
    );

    expect(view.getByText('Arts')).toBeVisible();
    expect(view.getByText('Maths')).toBeVisible();
  });
});
