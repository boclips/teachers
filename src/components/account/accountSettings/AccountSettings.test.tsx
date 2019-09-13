import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { By } from '../../../../test-support/By';
import { MockStoreFactory } from '../../../../test-support/factories';
import { analyticsMock } from '../../../../test-support/getAnalyticsMock';
import AnalyticsFactory from '../../../services/analytics/AnalyticsFactory';
import { fetchUser } from '../../../services/users/fetchUser';
import { SubjectTag } from '../../common/tags/SubjectTag';
import AccountSettings from './AccountSettings';
import { Profile } from './Profile';
import Mock = jest.Mock;

jest.mock('../../../services/users/fetchUser');

AnalyticsFactory.mixpanel = jest.fn(() => analyticsMock);

const mockFetchUser = fetchUser as Mock;

describe('account settings form', () => {
  let wrapper;
  beforeEach(() => {
    mockFetchUser.mockReturnValue(Promise.resolve());
    wrapper = mount(
      <Provider store={MockStoreFactory.sample()}>
        <AccountSettings />
      </Provider>,
    );
  });

  it(`renders the page with existing first and last name populated`, () => {
    const currentProfile = wrapper.find(By.dataQa('current-profile'));
    expect(currentProfile.find(By.dataQa('profile-name')).text()).toEqual(
      'joe boclips',
    );

    const subjectTags = currentProfile.find(By.dataQa('profile-subjects'));
    expect(subjectTags).toExist();
    expect(subjectTags.children().length).toEqual(1);
    expect(subjectTags.find(SubjectTag).text()).toEqual('Subject:subject one');
  });

  it(`renders the Profile component`, () => {
    expect(wrapper.find(Profile)).toExist();
  });
});
