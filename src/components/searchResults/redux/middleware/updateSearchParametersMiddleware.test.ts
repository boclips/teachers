import { push } from 'connected-react-router';
import { DurationRange } from 'src/types/DurationRange';
import eventually from 'test-support/eventually';
import setupStore from 'test-support/setupStore';
import { AgeRange } from 'src/types/AgeRange';
import { clearSearchFilterParametersAction } from '../actions/clearSearchFilterParametersAction';
import {
  bulkUpdateSearchParamsAction,
  updateSearchParamsAction,
} from '../actions/updateSearchParametersActions';

describe('updateSearchParametersMiddleware', () => {
  it('updates query in url parameters', async () => {
    const store = setupStore('q=test&duration=0-1', '/videos');
    store.dispatch(updateSearchParamsAction({ q: '123' }));

    await eventually(() => {
      expect(store.getActions()).toContainEqual(
        push('/videos?duration=0-1&page=1&q=123'),
      );
    });
  });

  it('updates duration filter in url parameters', async () => {
    const store = setupStore('q=hi&page=10', '/videos');

    store.dispatch(
      updateSearchParamsAction({
        duration: [new DurationRange({ min: 123, max: 4321 })],
      }),
    );

    await eventually(() => {
      expect(store.getActions()).toContainEqual(
        push('/videos?duration=123-4321&page=1&q=hi'),
      );
    });
  });

  it('updates age range filter in url parameters', async () => {
    const store = setupStore('q=hi&page=10', '/videos');

    store.dispatch(
      updateSearchParamsAction({
        age_range: [new AgeRange(5, 11)],
      }),
    );

    await eventually(() => {
      expect(store.getActions()).toContainEqual(
        push('/videos?age_range=5-11&page=1&q=hi'),
      );
    });
  });

  it('updates subject filter in url parameters', async () => {
    const store = setupStore('q=hi', '/videos');

    store.dispatch(
      updateSearchParamsAction({
        subject: ['5'],
      }),
    );

    await eventually(() => {
      expect(store.getActions()).toContainEqual(
        push('/videos?page=1&q=hi&subject=5'),
      );
    });
  });

  it('does not include null values in url parameters', async () => {
    const store = setupStore('', '/videos');

    store.dispatch(
      updateSearchParamsAction({
        duration: [new DurationRange({ min: 123, max: 123 })],
      }),
    );

    await eventually(() => {
      expect(store.getActions()).toContainEqual(
        push('/videos?duration=123-123&page=1'),
      );
    });
  });

  it('updates multiple url parameters in one dispatch', async () => {
    const store = setupStore('q=hi&page=1&subject=6', '/videos');

    const durationUpdate = {
      duration: [new DurationRange({ min: 1, max: 2 })],
    };

    const subjectUpdate = { subject: ['new'] };

    store.dispatch(
      bulkUpdateSearchParamsAction([durationUpdate, subjectUpdate]),
    );

    await eventually(() => {
      expect(store.getActions()).toContainEqual(
        push('/videos?duration=1-2&page=1&q=hi&subject=new'),
      );
    });
  });

  it('removes parameters if they are undefined', async () => {
    const store = setupStore('subject=5&q=hi', '/videos');

    store.dispatch(updateSearchParamsAction({ subject: undefined }));

    await eventually(() => {
      expect(store.getActions()).toContainEqual(push('/videos?page=1&q=hi'));
    });
  });

  it('clears filter on clear search filters action', async () => {
    const store = setupStore(
      'mode=hello&q=hi&duration=123&age_range=5-11&subject=1&page=10',
      '/videos',
    );

    store.dispatch(clearSearchFilterParametersAction());

    await eventually(() => {
      expect(store.getActions()).toContainEqual(
        push('/videos?mode=hello&page=1&q=hi'),
      );
    });
  });

  it('goes to /videos and keeps params including subject when a new search is done from subjects page', async () => {
    const store = setupStore('age_range=3-5', '/subjects/1');

    store.dispatch(
      bulkUpdateSearchParamsAction([
        {
          q: 'test query',
        },
      ]),
    );

    await eventually(() => {
      expect(store.getActions()).toContainEqual(
        push('/videos?age_range=3-5&page=1&q=test%20query&subject=1'),
      );
    });
  });

  it('stays on subject search and keeps params when changing filters', async () => {
    const store = setupStore('age_range=3-5&page=1', '/subjects/1');

    store.dispatch(
      bulkUpdateSearchParamsAction([
        {
          duration: [new DurationRange({ min: 123, max: 123 })],
        },
      ]),
    );

    await eventually(() => {
      expect(store.getActions()).toContainEqual(
        push('/subjects/1?age_range=3-5&duration=123-123&page=1'),
      );
    });
  });
});
