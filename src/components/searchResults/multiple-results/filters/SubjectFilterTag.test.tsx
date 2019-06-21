import { shallow } from 'enzyme';
import React from 'react';
import {
  MockStoreFactory,
  RouterFactory,
  SubjectFactory,
} from '../../../../../test-support/factories';
import { Subject } from '../../../../types/Subject';
import { ClosableTag } from '../../../video/tags/Tag';
import { updateSearchParamsAction } from '../../redux/actions/updateSearchParametersActions';
import SubjectFilterTag from './SubjectFilterTag';

const getWrapper = (subject?: Subject) => {
  const store = MockStoreFactory.sample();

  return shallow(<SubjectFilterTag subject={subject} />, {
    context: { store },
  }).dive();
};

it('renders subject with correct name', () => {
  const wrapper = getWrapper(SubjectFactory.sample({ name: 'subject 1' }));
  expect(wrapper.find(ClosableTag).props().value).toEqual('subject 1');
});

it('does not render anything if no subject', () => {
  const wrapper = getWrapper(null);
  expect(wrapper).toBeEmptyRender();
});

it('removes subject from url on close', () => {
  const subject = SubjectFactory.sample({ name: 'subject 1', id: '1' });
  const store = MockStoreFactory.sample({
    router: RouterFactory.sample({
      location: {
        pathname: '',
        search: '?hi&subject=1',
        hash: '',
        state: null,
      },
    }),
  });

  const wrapper = shallow(<SubjectFilterTag subject={subject} />, {
    context: { store },
  }).dive();

  wrapper
    .find(ClosableTag)
    .props()
    .onClose();

  expect(store.getActions().length).toEqual(1);
  expect(store.getActions()).toContainEqual(
    updateSearchParamsAction({
      subject: undefined,
    }),
  );
});
