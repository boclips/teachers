import React from 'react';
import { renderWithStore } from 'test-support/renderWithStore';
import { DisciplineFactory } from '../../../test-support/factories';
import { DisciplineCardFull } from "DisciplineCard.tsx";

describe('Discipline Cards with toggle', () => {
  const discipline = DisciplineFactory.sample({
    name: 'Arts',
    subjects: [
      { name: 'classical art', id: '1' },
      { name: 'modern art', id: '2' },
      { name: 'post-modern art', id: '3' },
      { name: 'abstract art', id: '4' },
      { name: 'expressionist art', id: '5' },
    ],
  });

  it('in mobile view adds a class name to the card which is in the subject page URL', () => {
    const view = renderWithStore(
      <DisciplineCardFull discipline={discipline} />,
    );

    const displaySubjectsForMobileClass = view.baseElement.getElementsByClassName(
      'display-subjects',
    );
    expect(displaySubjectsForMobileClass.length).toEqual(1);
  });
});
