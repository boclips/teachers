import { renderWithConnectedRoutes } from 'test-support/renderWithStore';
import eventually from 'test-support/eventually';
import React from 'react';
import SubjectSearchView from 'src/views/collection/SubjectSearchView';
import {
  DisciplineFactory,
  LinksStateValueFactory,
  SubjectFactory,
  SubjectsFactory,
} from 'test-support/factories';
import { ApiClientWrapper } from 'src/services/apiClient';
import { FakeBoclipsClient } from 'boclips-api-client/dist/test-support';
import { VideoFactory } from 'boclips-api-client/dist/test-support/VideosFactory';
import { createMemoryHistory } from 'history';
import { createBoclipsStore } from 'src/app/redux/store';
import { defaultDurations } from 'src/components/durations/redux/durationReducer';
import { Route } from 'react-router';
import ApiStub from 'test-support/ApiStub';
import { collectionsResponse } from 'test-support/api-responses';
import { waitForDomChange } from '@testing-library/dom';
import { FacetsFactory } from 'boclips-api-client/dist/test-support/FacetsFactory';
import { VideoType } from 'src/types/Video';

describe('SubjectSearchView', () => {
  const renderSubjectSearchView = () => {
    const history = createMemoryHistory({
      initialEntries: [`/subjects/arts-subject-1?referer=some-ref`],
    });

    const store = createBoclipsStore(
      {
        disciplines: [
          DisciplineFactory.sample({
            name: 'Arts',
            subjects: [
              SubjectFactory.sample({
                name: 'Art history',
                id: 'arts-subject-1',
              }),
            ],
          }),
        ],
        subjects: SubjectsFactory.sample([
          SubjectFactory.sample({ name: 'Arts', id: 'arts-subject-1' }),
          SubjectFactory.sample({ name: 'Math', id: 'math-subject-1' }),
        ]),
        durations: defaultDurations,
        links: LinksStateValueFactory.sample({}, '/v1'),
      },
      history,
    );

    return renderWithConnectedRoutes(
      <Route
        path="/subjects/arts-subject-1"
        component={() => <SubjectSearchView subjectId="arts-subject-1" />}
      />,
      store,
      history,
    );
  };

  beforeEach(async () => {
    const client = (await ApiClientWrapper.get()) as FakeBoclipsClient;
    client.videos.clear();
    client.videos.insertVideo(
      VideoFactory.sample({
        id: '177',
        title: `video 1 hello`,
        subjects: [SubjectFactory.sample({ id: 'arts-subject-1' })],
        types: [{ id: 0, name: VideoType.INSTRUCTIONAL }],
      }),
    );
    client.videos.insertVideo(
      VideoFactory.sample({
        id: '456',
        title: `video 2 hello`,
        subjects: [SubjectFactory.sample({ id: 'arts-subject-2' })],
        types: [{ id: 0, name: VideoType.INSTRUCTIONAL }],
      }),
    );
    new ApiStub().defaultUser().queryCollections({
      query: '',
      results: collectionsResponse([]),
    });
  });

  it('displays search results with subheader pre-filtered for subject', async () => {
    const view = renderSubjectSearchView();

    await eventually(() => {
      expect(view.queryByText('Arts')).toBeInTheDocument();
      expect(view.queryByText('Art history')).toBeInTheDocument();
      expect(view.queryByText('video 1 hello')).toBeInTheDocument();
      expect(view.queryByText('video 2 hello')).not.toBeInTheDocument();
    });
  });

  it('page title contains discipline and subject name', async () => {
    renderSubjectSearchView();
    await waitForDomChange();
    expect(document.title).toEqual('Arts - Art history');
  });

  it('subject filters are not displayed', async () => {
    const client = (await ApiClientWrapper.get()) as FakeBoclipsClient;
    client.videos.setFacets(
      FacetsFactory.sample({
        subjects: [
          {
            id: 'arts-subject-1',
            name: 'Arts',
            hits: 1,
          },
        ],
        ageRanges: [
          {
            id: '3-5',
            name: '3-5',
            hits: 1,
          },
        ],
        durations: [
          {
            id: 'PT0S-PT2M',
            name: 'PT0S-PT2M',
            hits: 1,
          },
        ],
      }),
    );
    const view = renderSubjectSearchView();
    const sidebar = view.getByText('Filter results').closest('div');

    expect(sidebar).toBeInTheDocument();

    await eventually(() => {
      expect(view.queryByText('Age')).toBeInTheDocument();
      expect(view.queryByText('Duration')).toBeInTheDocument();
      expect(view.queryByText('Subjects')).not.toBeInTheDocument();
      expect(view.queryByText('Math')).not.toBeInTheDocument();
    });
  });
});
