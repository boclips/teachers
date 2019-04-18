import { mount, ReactWrapper, shallow } from 'enzyme';
import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import {
  MockStoreFactory,
  UserProfileFactory,
} from '../../test-support/factories';
import ReferAFriend from './ReferAFriend';
import ReferAFriendUrlBuilder from './ReferAFriendUrlBuilder';

let wrapper: ReactWrapper;

const user = UserProfileFactory.sample({
  firstName: 'Matt',
  lastName: 'Jones',
  email: 'matt@boclips.com',
  id: '123',
  authenticated: true,
});

beforeEach(() => {
  wrapper = mount(
    <Provider store={MockStoreFactory.sample({ user })}>
      <MemoryRouter>
        <ReferAFriend>
          <p>Hello</p>
        </ReferAFriend>
      </MemoryRouter>
    </Provider>,
  );
});

test('it renders a child component', () => {
  expect(wrapper.find(ReferAFriend).prop('children')).toEqual(<p>Hello</p>);
});

test('on click a modal pops up', () => {
  wrapper.find(ReferAFriend).simulate('click');
  expect(wrapper.debug()).toContain('visible={true}');
});

test('on click a modal opens with correct source', () => {
  wrapper.find(ReferAFriend).simulate('click');

  const {
    dangerouslySetInnerHTML: { __html },
  } = wrapper.find('.iframeWrapper').props();

  const source = shallow(<div>{ReactHtmlParser(__html)}</div>)
    .find('iframe')
    .prop('src');

  expect(source).toEqual(
    new ReferAFriendUrlBuilder()
      .setFirstName('Matt')
      .setLastName('Jones')
      .setEmail('matt@boclips.com')
      .setUserId('123')
      .setBaseUrl(
        'https://boclips.referralrock.com/access/?programidentifier=adf9b438-bfa6-4d55-a9d7-418d8d520333',
      )
      .build(),
  );
});
