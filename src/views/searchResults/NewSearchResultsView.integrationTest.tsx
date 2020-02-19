import React from 'react';
import { within, fireEvent } from '@testing-library/react';
import { waitForElement } from '@testing-library/react';
import {
  renderWithCreatedStore,
  renderWithStore,
} from '../../../test-support/renderWithStore';
import {
  LinksStateValueFactory,
  RouterFactory,
  SearchFactory,
  SubjectFactory,
  SubjectsFactory,
  UserProfileFactory,
} from '../../../test-support/factories';
import { createBoclipsStore } from '../../app/redux/store';
import { ConnectedNewSearchResultsView } from './NewSearchResultsView';

describe('SearchResultsView', () => {
  it('Filter panel is visible', () => {
    const view = renderWithStore(<ConnectedNewSearchResultsView />, {
      initialState: {
        subjects: SubjectsFactory.sample(),
        search: SearchFactory.sample(),
        router: RouterFactory.sample(),
        user: UserProfileFactory.sample(),
        links: LinksStateValueFactory.sample(),
      },
    });
    const sidebar = view.getByText('Filter results').closest('div');

    expect(sidebar).toBeInTheDocument();
    expect(within(sidebar).getByText('Age')).toBeInTheDocument();
    expect(within(sidebar).getByText('Subjects')).toBeInTheDocument();
    expect(within(sidebar).getByText('Duration')).toBeInTheDocument();
  });

  it(`contains an apply filters button`, () => {
    const view = renderWithStore(<ConnectedNewSearchResultsView />, {
      initialState: {
        subjects: SubjectsFactory.sample(),
        search: SearchFactory.sample(),
        router: RouterFactory.sample(),
        user: UserProfileFactory.sample(),
        links: LinksStateValueFactory.sample(),
      },
    });

    expect(view.getByText('Apply filters')).toBeInTheDocument();
  });

  xit(`clicking on Apply filters adds selected filters to search params`, async () => {
    const store = createBoclipsStore({
      subjects: SubjectsFactory.sample([
        SubjectFactory.sample({ name: 'Arts' }),
      ]),
      search: SearchFactory.sample(),
      router: RouterFactory.sample({
        location: {
          pathname: '/new-filters',
          search: '',
          hash: '',
          state: null,
        },
      }),
      user: UserProfileFactory.sample(),
      links: LinksStateValueFactory.sample(),
    });

    const { getByText, findByText, getByTestId } = renderWithCreatedStore(
      <ConnectedNewSearchResultsView />,
      store,
    );

    const subjectsInput = getByText('Choose from our list..');
    await fireEvent.click(subjectsInput);

    const artsOption = await findByText('Arts');
    await fireEvent.click(artsOption);

    const applyFilters = getByText('Apply filters').closest('button');
    await fireEvent.click(getByText('Filter results'));
    await fireEvent.click(applyFilters);

    await waitForElement(() => getByTestId('subject-filter-tag'));
  });
});
