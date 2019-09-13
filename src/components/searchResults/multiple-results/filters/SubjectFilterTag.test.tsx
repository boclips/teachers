import { shallow } from 'enzyme';
import React from 'react';
import {
  MockStoreFactory,
  RouterFactory,
} from '../../../../../test-support/factories';
import { ClosableTag } from '../../../common/tags/Tag';
import { updateSearchParamsAction } from '../../redux/actions/updateSearchParametersActions';
import SubjectFilterTag from './SubjectFilterTag';

const getWrapper = (subjectId?: string) => {
  const store = MockStoreFactory.sample();

  return shallow(
    <SubjectFilterTag subjectIds={[subjectId]} subjectId={subjectId} />,
    {
      context: { store },
    },
  ).dive();
};

it('renders subject with correct name', () => {
  const wrapper = getWrapper('subject-one-id');
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

  const wrapper = shallow(
    <SubjectFilterTag subjectIds={['subject-one-id']} subjectId={subjectId} />,
    {
      context: { store },
    },
  ).dive();

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

  const wrapper = shallow(
    <SubjectFilterTag
      subjectIds={['subject-one-id', 'subject-two-id']}
      subjectId={subjectId}
    />,
    {
      context: { store },
    },
  ).dive();

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
