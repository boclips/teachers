import React from 'react';
import { within, fireEvent } from '@testing-library/react';
import { renderWithStore } from 'test-support/renderWithStore';
import {
  LinksStateValueFactory,
  RouterFactory,
  SearchFactory,
  SubjectsFactory,
  UserProfileFactory,
} from 'test-support/factories';
import { renderSearchResultsViewWithSampleData } from 'test-support/views/searchResultsViewRender';
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

  it(`changing the filters triggers a new search`, async () => {
    const {
      findByText,
      getByTestId,
      findByTestId,
    } = renderSearchResultsViewWithSampleData();

    const subjectsInput = await findByText('Choose from our list..');
    await fireEvent.click(subjectsInput);

    const artsOption = await findByText('Arts');
    await fireEvent.click(artsOption);

    await findByTestId('subject-filter-tag');

    expect(getByTestId('subject-filter-tag')).toBeInTheDocument();
  });
});
