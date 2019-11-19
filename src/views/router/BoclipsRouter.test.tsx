import { mount } from 'enzyme';
import createMemoryHistory from 'history/createMemoryHistory';
import React from 'react';
import { Provider } from 'react-redux';
import {
  MockStoreFactory,
  UserProfileFactory,
} from '../../../test-support/factories';
import AccountSettings from '../../components/account/accountSettings/AccountSettings';
import DisciplineCardList from '../../components/disciplines/DisciplineCardList';
import CreateAccountView from '../account/CreateAccountView';
import { OnboardingView } from '../account/OnboardingView';
import { BookmarkedCollectionListView } from '../collection/BookmarkedCollectionListView';
import CollectionDetailsView from '../collection/CollectionDetailsView';
import { DiscoverCollectionsView } from '../collection/DiscoverCollectionsView';
import MyCollectionListView from '../collection/MyCollectionListView';
import { PublicCollectionListView } from '../collection/PublicCollectionListView';
import HomeView from '../home/HomeView';
import LoggedOutView from '../loggedout/LoggedOutView';
import SearchResultsView from '../searchResults/SearchResultsView';
import VideoDetailsView from '../videoDetails/VideoDetailsView';
import BoclipsRouter from './BoclipsRouter';

test('shows video details view on /videos/{id}', () => {
  const history = createMemoryHistory({
    initialEntries: ['/videos/123'],
  });

  const wrapper = mount(
    <Provider store={buildStore()}>
      <BoclipsRouter history={history} />
    </Provider>,
  );

  const videoDetailsView = wrapper.find(VideoDetailsView);
  expect(videoDetailsView).toExist();
  expect(videoDetailsView).toHaveProp('videoId', '123');
});

test('scrolls to top on navigation', () => {
  const history = createMemoryHistory({
    initialEntries: ['/collections'],
  });
  const store = buildStore();

  mount(
    <Provider store={store}>
      <BoclipsRouter history={history} />
    </Provider>,
  );

  history.push('/create-account');

  expect(window.scrollTo).toBeCalledWith(0, 0);
});

describe('when authorised', () => {
  test('shows search results view on /videos', () => {
    const history = createMemoryHistory({
      initialEntries: ['/videos?q=earthquakes'],
    });

    const wrapper = mount(
      <Provider store={buildStore()}>
        <BoclipsRouter history={history} />
      </Provider>,
    );

    const videoDetailsView = wrapper.find(SearchResultsView);
    expect(videoDetailsView).toExist();
  });

  test('shows home page on /', () => {
    const history = createMemoryHistory({
      initialEntries: ['/'],
    });

    const wrapper = mount(
      <Provider store={buildStore()}>
        <BoclipsRouter history={history} />
      </Provider>,
    );

    const videoDetailsView = wrapper.find(HomeView);
    expect(videoDetailsView).toExist();
  });

  test('shows collections view on /collections', () => {
    const history = createMemoryHistory({
      initialEntries: ['/collections'],
    });

    const wrapper = mount(
      <Provider store={buildStore()}>
        <BoclipsRouter history={history} />
      </Provider>,
    );

    const collectionsView = wrapper.find(MyCollectionListView);
    expect(collectionsView).toExist();
  });

  test('shows public collections view on /public-collections', () => {
    const history = createMemoryHistory({
      initialEntries: ['/public-collections'],
    });

    const wrapper = mount(
      <Provider store={buildStore()}>
        <BoclipsRouter history={history} />
      </Provider>,
    );

    const collectionsView = wrapper.find(PublicCollectionListView);
    expect(collectionsView).toExist();
  });

  test('shows discover collections view on /discover-collections', () => {
    const history = createMemoryHistory({
      initialEntries: ['/discover-collections?subject=maths'],
    });

    const wrapper = mount(
      <Provider store={buildStore(true)}>
        <BoclipsRouter history={history} />
      </Provider>,
    );

    const collectionsView = wrapper.find(DiscoverCollectionsView);
    expect(collectionsView).toExist();
    expect(collectionsView).toHaveProp('subjectIds', ['maths']);
    expect(collectionsView).toHaveProp('disciplineId', undefined);
  });

  test('shows discover collections by subject view on /discover-collections', () => {
    const history = createMemoryHistory({
      initialEntries: [
        '/discover-collections?discipline=stuff&subject=maths&subject=myths',
      ],
    });

    const wrapper = mount(
      <Provider store={buildStore(true)}>
        <BoclipsRouter history={history} />
      </Provider>,
    );

    const collectionsView = wrapper.find(DiscoverCollectionsView);
    expect(collectionsView).toExist();
    expect(collectionsView).toHaveProp('subjectIds', ['maths', 'myths']);
    expect(collectionsView).toHaveProp('disciplineId', 'stuff');
  });

  test('shows bookmarked collections view on /bookmarked-collections', () => {
    const history = createMemoryHistory({
      initialEntries: ['/bookmarked-collections'],
    });

    const wrapper = mount(
      <Provider store={buildStore()}>
        <BoclipsRouter history={history} />
      </Provider>,
    );

    const collectionsView = wrapper.find(BookmarkedCollectionListView);
    expect(collectionsView).toExist();
  });

  test('shows new account form on /onboarding', () => {
    const history = createMemoryHistory({
      initialEntries: ['/onboarding'],
    });

    const wrapper = mount(
      <Provider store={buildStore()}>
        <BoclipsRouter history={history} />
      </Provider>,
    );

    const view = wrapper.find(OnboardingView);
    expect(view).toExist();
  });

  test('shows default collection view on /collections/default', () => {
    const history = createMemoryHistory({
      initialEntries: ['/collections/default'],
    });

    const wrapper = mount(
      <Provider store={buildStore()}>
        <BoclipsRouter history={history} />
      </Provider>,
    );

    const videoDetailsView = wrapper.find(CollectionDetailsView);
    expect(videoDetailsView).toExist();
  });

  test('shows our subjects page', () => {
    const history = createMemoryHistory({
      initialEntries: ['/our-subjects'],
    });

    const wrapper = mount(
      <Provider store={buildStore()}>
        <BoclipsRouter history={history} />
      </Provider>,
    );

    const subjectView = wrapper.find(DisciplineCardList);
    expect(subjectView).toExist();
  });

  test('shows the account settings page', () => {
    const history = createMemoryHistory({
      initialEntries: ['/account-settings'],
    });

    const wrapper = mount(
      <Provider store={buildStore()}>
        <BoclipsRouter history={history} />
      </Provider>,
    );

    const accountEditForm = wrapper.find(AccountSettings);
    expect(accountEditForm).toExist();
  });
});

describe('when not authorised', () => {
  test('shows new account form on /create-account', () => {
    const history = createMemoryHistory({
      initialEntries: ['/create-account'],
    });

    const wrapper = mount(
      <Provider store={buildStore(false)}>
        <BoclipsRouter history={history} />
      </Provider>,
    );

    const createAccountView = wrapper.find(CreateAccountView);
    expect(createAccountView).toExist();
  });

  test('does not show search results view on /videos', () => {
    const history = createMemoryHistory({
      initialEntries: ['/videos?q=earthquakes'],
    });

    const wrapper = mount(
      <Provider store={buildStore(false)}>
        <BoclipsRouter history={history} />
      </Provider>,
    );

    const videoDetailsView = wrapper.find(SearchResultsView);
    expect(videoDetailsView).not.toExist();
  });

  test('does not show home page on /', () => {
    const history = createMemoryHistory({
      initialEntries: ['/'],
    });

    const wrapper = mount(
      <Provider store={buildStore(false)}>
        <BoclipsRouter history={history} />
      </Provider>,
    );

    const videoDetailsView = wrapper.find(HomeView);
    expect(videoDetailsView).not.toExist();
  });

  test('does not show collections view', () => {
    const history = createMemoryHistory({
      initialEntries: ['/collections'],
    });

    const wrapper = mount(
      <Provider store={buildStore(false)}>
        <BoclipsRouter history={history} />
      </Provider>,
    );

    const collectionsView = wrapper.find(MyCollectionListView);
    expect(collectionsView).not.toExist();
  });

  test('does not show default collection view', () => {
    const history = createMemoryHistory({
      initialEntries: ['/collections/default'],
    });

    const wrapper = mount(
      <Provider store={buildStore(false)}>
        <BoclipsRouter history={history} />
      </Provider>,
    );

    const videoDetailsView = wrapper.find(CollectionDetailsView);
    expect(videoDetailsView).not.toExist();
  });

  test('shows logged out page', () => {
    const history = createMemoryHistory({
      initialEntries: ['/bye'],
    });

    const wrapper = mount(
      <Provider store={buildStore()}>
        <BoclipsRouter history={history} />
      </Provider>,
    );

    const loggedOutView = wrapper.find(LoggedOutView);
    expect(loggedOutView).toExist();
  });

  test('does not show subjects page', () => {
    const history = createMemoryHistory({
      initialEntries: ['/our-subjects'],
    });

    const wrapper = mount(
      <Provider store={buildStore(false)}>
        <BoclipsRouter history={history} />
      </Provider>,
    );

    const ourSubjectsView = wrapper.find(DisciplineCardList);
    expect(ourSubjectsView).not.toExist();
  });

  test('does not show the account settings page', () => {
    const history = createMemoryHistory({
      initialEntries: ['/account-settings'],
    });

    const wrapper = mount(
      <Provider store={buildStore(false)}>
        <BoclipsRouter history={history} />
      </Provider>,
    );

    const accountEditForm = wrapper.find(AccountSettings);
    expect(accountEditForm).not.toExist();
  });
});

function buildStore(authorised: boolean = true) {
  return MockStoreFactory.sample({
    user: authorised ? UserProfileFactory.sample() : null,
  });
}
