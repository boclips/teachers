import { createMemoryHistory } from 'history';
import { createBoclipsStore } from 'src/app/redux/store';
import {
  LinksStateValueFactory,
  SubjectFactory,
  SubjectsFactory,
} from 'test-support/factories';
import ApiStub from 'test-support/ApiStub';
import {
  collectionResponse,
  collectionsResponse,
  videos as videoResults,
} from 'test-support/api-responses';
import { renderWithConnectedRoutes } from 'test-support/renderWithStore';
import { Route } from 'react-router';
import { ConnectedNewSearchResultsView } from 'src/views/searchResults/NewSearchResultsView';
import React from 'react';

export function renderSearchResultsViewWithSampleData() {
  const initialQuery = 'hello';
  const history = createMemoryHistory({
    initialEntries: [`/new-filters?q=${initialQuery}`],
  });
  const store = createBoclipsStore(
    {
      subjects: SubjectsFactory.sample([
        SubjectFactory.sample({ name: 'Arts', id: 'art-id' }),
        SubjectFactory.sample({ name: 'Other subject', id: 'other-id' }),
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

  return renderWithConnectedRoutes(
    <Route path={'/new-filters'} component={ConnectedNewSearchResultsView} />,
    store,
    history,
  );
}