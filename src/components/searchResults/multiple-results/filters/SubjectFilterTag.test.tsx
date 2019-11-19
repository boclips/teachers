import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import {
  MockStoreFactory,
  RouterFactory,
} from '../../../../../test-support/factories';
import { ClosableTag } from '../../../common/tags/Tag';
import { updateSearchParamsAction } from '../../redux/actions/updateSearchParametersActions';
import SubjectFilterTag from './SubjectFilterTag';

const getWrapper = (subjectIds: string[], subjectId?: string, store?: Store) =>
  mount(
    <Provider store={store || MockStoreFactory.sample()}>
      <SubjectFilterTag subjectIds={subjectIds} subjectId={subjectId} />
    </Provider>,
  );

it('renders subject with correct name', () => {
  const wrapper = getWrapper(['subject-one-id'], 'subject-one-id');
  expect(wrapper.find(ClosableTag).props().value).toEqual('subject one');
});

it('does not render anything if no subject', () => {
  const wrapper = getWrapper(null);
  expect(wrapper).toBeEmptyRender();
});
it('removes subject from url on close', () => {
  const subjectId = 'subject-one-id';
  const store = MockStoreFactory.sample({
    router: RouterFactory.sample({
      location: {
        pathname: '',
        search: '?hi&subject=subject-one-id',
        hash: '',
        state: null,
      },
    }),
  });

  const wrapper = getWrapper(['subject-one-id'], subjectId, store);

  wrapper
    .find(ClosableTag)
    .props()
    .onClose();

  expect(store.getActions().length).toEqual(1);
  expect(store.getActions()).toContainEqual(
    updateSearchParamsAction({
      subject: [],
    }),
  );
});

it('removes only one subject from url on close', () => {
  const subjectId = 'subject-one-id';
  const store = MockStoreFactory.sample({
    router: RouterFactory.sample({
      location: {
        pathname: '',
        search: '?hi&subject=subject-one-id,subject-two-id',
        hash: '',
        state: null,
      },
    }),
  });

  const wrapper = getWrapper(
    ['subject-one-id', 'subject-two-id'],
    subjectId,
    store,
  );

  wrapper
    .find(ClosableTag)
    .props()
    .onClose();

  expect(store.getActions().length).toEqual(1);
  expect(store.getActions()).toContainEqual(
    updateSearchParamsAction({
      subject: ['subject-two-id'],
    }),
  );
});
