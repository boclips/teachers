import React from 'react';
import { within, fireEvent } from '@testing-library/react';
import { waitForElement } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import ApiStub from 'test-support/ApiStub';
import {
  collectionResponse,
  collectionsResponse,
  videos as videoResults,
} from 'test-support/api-responses';
import { Route } from 'react-router';
import {
  renderWithConnectedRoutes,
  renderWithStore,
} from 'test-support/renderWithStore';
import {
  LinksStateValueFactory,
  RouterFactory,
  SearchFactory,
  SubjectFactory,
  SubjectsFactory,
  UserProfileFactory,
} from 'test-support/factories';
import { createBoclipsStore } from 'src/app/redux/store';
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

  it(`clicking on Apply filters adds selected filters to search params`, async () => {
    const initialQuery = 'hello';
    const history = createMemoryHistory({
      initialEntries: [`/new-filters?q=${initialQuery}`],
    });
    const store = createBoclipsStore(
      {
        subjects: SubjectsFactory.sample([
          SubjectFactory.sample({ name: 'Arts' }),
        ]),
        links: LinksStateValueFactory.sample({}, '/v1'),
      },
      history,
    );

    new ApiStub()
      .defaultUser()
      .queryVideos({ query: initialQuery, results: videoResults })
      .queryCollections({
        query: initialQuery,
        results: collectionsResponse([collectionResponse()]),
      });

    const { getByText, findByText, getByTestId } = renderWithConnectedRoutes(
      <Route path={'/new-filters'} component={ConnectedNewSearchResultsView} />,
      store,
      history,
    );

    const subjectsInput = await findByText('Choose from our list..');
    await fireEvent.click(subjectsInput);

    const artsOption = await findByText('Arts');
    await fireEvent.click(artsOption);

    const applyFilters = getByText('Apply filters').closest('button');
    await fireEvent.click(applyFilters);

    await waitForElement(() => getByTestId('subject-filter-tag'));
  });
});
