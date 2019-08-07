import ApiStub from '../../../test-support/ApiStub';
import { DiscoverCollectionListPage } from '../../../test-support/page-objects/DiscoverCollectionListPage';

test('displays maths collections', async () => {
  new ApiStub()
    .defaultUser()
    .fetchCollections()
    .fetchDisciplines()
    .fetchCollectionsBySubjects('arts-subject-1')
    .fetchVideo();

  const collectionPage = await DiscoverCollectionListPage.loadBySubject(
    'arts-subject-1',
  );

  expect(collectionPage.getCollections()).toHaveLength(1);
  expect(collectionPage.getDisciplineSubjects()).toHaveLength(0);
  expect(collectionPage.getCollections()[0]).toMatchObject({
    title: 'funky collection',
    numberOfVideos: 1,
    updatedAt: 'Jan 16, 2019',
    createdBy: 'AI',
  });
});

test('displays arts discipline', async () => {
  new ApiStub()
    .defaultUser()
    .fetchCollections()
    // art discipline contains arts-subject-1 and art-subjects-2
    .fetchDisciplines()
    .fetchCollectionsBySubjects('arts-subject-2', 'arts-subject-1')
    .fetchVideo();

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
    updatedAt: 'Jan 16, 2019',
    createdBy: 'AI',
  });
});
