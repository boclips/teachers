import React from 'react';
import { renderWithStore } from 'test-support/renderWithStore';
import { DisciplineFactory } from '../../../test-support/factories';
import { DisciplineCardLimited } from './DisciplineCardLimited';

describe('Discipline Cards', () => {
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
  it('renders a card with title', () => {
    const view = renderWithStore(
      <DisciplineCardLimited
        discipline={DisciplineFactory.sample({ name: 'Arts' })}
      />,
    );

    expect(view.getByText('Arts')).toBeVisible();
  });

  it('Can limit the visible subjects', () => {
    const view = renderWithStore(
      <DisciplineCardLimited discipline={discipline} limit={4} />,
    );

    expect(view.queryByText('expressionist art')).toBeNull();
    expect(view.queryByText('abstract art')).toBeVisible();
    expect(view.queryByText('classical art')).toBeVisible();
    expect(view.queryByText('view all (5)')).toBeVisible();
  });

  it('If limit is not defined all subjects are rendered', () => {
    const view = renderWithStore(
      <DisciplineCardLimited discipline={discipline} />,
    );

    expect(view.getByText('classical art')).toBeVisible();
    expect(view.getByText('modern art')).toBeVisible();
    expect(view.getByText('post-modern art')).toBeVisible();
    expect(view.getByText('abstract art')).toBeVisible();
    expect(view.getByText('expressionist art')).toBeVisible();
    expect(view.queryByText('view all (5)')).toBeNull();
  });

  it('does not render view all when there are fewer subjects than the limit', () => {
    const view = renderWithStore(
      <DisciplineCardLimited discipline={discipline} limit={6} />,
    );
    expect(view.queryByText('view all (5)')).toBeNull();
  });

  it('renders a link to subjects page when view all exists', () => {
    const view = renderWithStore(
      <DisciplineCardLimited discipline={discipline} limit={2} />,
    );

    const viewAll = view.getByText('view all (5)') as HTMLAnchorElement;
    expect(viewAll.href).toMatch(/\/our-subjects#Arts/);
  });

  it('adds an anchor to the subject page link when a discipline is clicked', () => {
    const view = renderWithStore(
      <DisciplineCardLimited discipline={discipline} limit={2} />,
    );

    const disciplineLink = view
      .getByText('Arts')
      .closest('a') as HTMLAnchorElement;
    expect(disciplineLink.href).toMatch(/\/our-subjects#Arts/);
  });
});
