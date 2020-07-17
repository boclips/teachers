import React from 'react';
import {
  renderWithStore,
  ResultingContext,
} from 'test-support/renderWithStore';
import { fireEvent } from '@testing-library/react';
import { DisciplineFactory } from '../../../test-support/factories';
import { DisciplineCardFull } from './DisciplineCardFull';

describe('Discipline Cards with toggle', () => {
  const discipline = DisciplineFactory.sample({
    name: 'Arts',
    subjects: [
      { name: 'classical art', id: '1' },
      { name: 'just art', id: '2' },
      { name: 'post-modern art', id: '3' },
      { name: 'abstract art', id: '4' },
      { name: 'expressionist art', id: '5' },
    ],
  });

  it('toggles a class name by clicking on header when closeable', async () => {
    const view = renderWithStore(
      <DisciplineCardFull discipline={discipline} closeable />,
    );

    expect(isSubjectsListOpened(view)).toBeTruthy();

    const clickableHeader = await view.findByText('Arts');
    fireEvent.click(clickableHeader);

    expect(isSubjectsListOpened(view)).toBeFalsy();
  });

  it('doesnt add a class when not closeable', async () => {
    const view = renderWithStore(
      <DisciplineCardFull discipline={discipline} closeable={false} />,
    );

    expect(isSubjectsListOpened(view)).toBeFalsy();

    const clickableHeader = await view.findByText('Arts');
    fireEvent.click(clickableHeader);

    expect(isSubjectsListOpened(view)).toBeFalsy();
  });

  it('alphabetises the subjects when rendering in discipline card', () => {
    const view = renderWithStore(
      <DisciplineCardFull discipline={discipline} />,
    );

    const subjects = view.container.querySelectorAll('li');

    expect(subjects.length).toEqual(5);
    expect(subjects[0]).toBeVisible();
    expect(subjects[0].textContent).toEqual('abstract art');
    expect(subjects[1]).toBeVisible();
    expect(subjects[1].textContent).toEqual('classical art');
    expect(subjects[2]).toBeVisible();
    expect(subjects[2].textContent).toEqual('expressionist art');
    expect(subjects[3]).toBeVisible();
    expect(subjects[3].textContent).toEqual('just art');
    expect(subjects[4]).toBeVisible();
    expect(subjects[4].textContent).toEqual('post-modern art');
  });

  const isSubjectsListOpened = (view: ResultingContext) => {
    const subjectsList = view.baseElement.getElementsByClassName(
      'display-subjects',
    );

    return subjectsList.length === 1;
  };
});
