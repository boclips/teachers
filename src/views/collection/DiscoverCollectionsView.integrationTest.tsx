import { renderWithBoclipsStore } from 'test-support/renderWithStore';
import { createMemoryHistory } from 'history';
import DiscoverCollectionsView from 'src/views/collection/DiscoverCollectionsView';
import eventually from 'test-support/eventually';
import React from 'react';
import { video177 } from 'test-support/api-responses';
import { fakeVideoSetup } from 'test-support/fakeApiClientSetup';
import { DiscoverCollectionListPage } from '../../../test-support/page-objects/DiscoverCollectionListPage';
import ApiStub from '../../../test-support/ApiStub';

it('redirects if discipline is not found', () => {
  const history = createMemoryHistory();

  renderWithBoclipsStore(
    <DiscoverCollectionsView disciplineId={'223'} />,
    {},
    history,
  );

  return eventually(() => {
    expect(history.location.pathname).toEqual('/');
  });
});

test('displays maths collections', async () => {
  new ApiStub()
    .defaultUser()
    .fetchCollections()
    .fetchDisciplines()
    .fetchCollectionsBySubjects('arts-subject-1');

  await fakeVideoSetup(video177);

  const collectionPage = await DiscoverCollectionListPage.loadBySubject(
    'arts-subject-1',
  );

  expect(collectionPage.getCollections()).toHaveLength(1);
  expect(collectionPage.getDisciplineSubjects()).toHaveLength(0);
  expect(collectionPage.getCollections()[0]).toMatchObject({
    title: 'funky collection',
    numberOfVideos: 1,
  });
});

test('displays arts discipline', async () => {
  new ApiStub()
    .defaultUser()
    .fetchCollections()
    // Art discipline contains arts-subject-1 and art-subjects-2
    .fetchDisciplines()
    .fetchCollectionsBySubjects('arts-subject-1', 'arts-subject-2');

  await fakeVideoSetup(video177);

  const collectionPage = await DiscoverCollectionListPage.loadByDiscipline(
    'arts',
  );

  expect(collectionPage.getCollections()).toHaveLength(1);
  expect(collectionPage.getDisciplineSubjects()).toMatchObject([
    'Art History',
    'Performing Arts',
  ]);
  expect(collectionPage.getCollections()[0]).toMatchObject({
    title: 'funky collection',
    numberOfVideos: 1,
  });
});
