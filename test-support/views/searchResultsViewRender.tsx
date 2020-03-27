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
  videosSearchResponse,
} from 'test-support/api-responses';
import { renderWithConnectedRoutes } from 'test-support/renderWithStore';
import { Route } from 'react-router';
import React from 'react';
import { ConnectedNewSearchResultsView } from 'src/views/searchResults/SearchResultsView';

export const renderSearchResultsView = (initialQuery: string) => {
  const history = createMemoryHistory({
    initialEntries: [`/videos?q=${initialQuery}`],
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

  return renderWithConnectedRoutes(
    <Route path={'/videos'} component={ConnectedNewSearchResultsView} />,
    store,
    history,
  );
};

export const renderSearchResultsViewWithSampleData = (
  initialQuery: string = 'hello',
) => {
  new ApiStub()
    .defaultUser()
    .queryVideos({ query: initialQuery, results: videosSearchResponse })
    .queryCollections({
      query: initialQuery,
      results: collectionsResponse([collectionResponse()]),
    });

  return renderSearchResultsView(initialQuery);
};
