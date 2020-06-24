import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { ShareCode } from 'src/components/account/accountSettings/ShareCode';
import Mock = jest.Mock;
import { By } from 'test-support/By';
import {
  CountryFactory,
  MockStoreFactory,
  UserProfileFactory,
} from 'test-support/factories';
import { analyticsMock } from 'test-support/getAnalyticsMock';
import { fetchUser } from 'src/services/users/fetchUser';
import AnalyticsFactory from '../../../services/analytics/AnalyticsFactory';
import { SubjectTag } from '../../common/tags/SubjectTag';
import AccountSettings from './AccountSettings';
import { EditProfileForm } from './EditProfileForm';
import { EditSchoolSettingsForm } from './EditSchoolSettingsForm';
import { Profile } from './Profile';
import SchoolSettings from './SchoolSettings';

jest.mock('../../../services/users/fetchUser');

AnalyticsFactory.externalAnalytics = jest.fn(() => analyticsMock);

const mockFetchUser = fetchUser as Mock;

describe('account settings form', () => {
  let wrapperWithAmericanTeacher;
  beforeEach(() => {
    mockFetchUser.mockReturnValue(Promise.resolve());
    wrapperWithAmericanTeacher = mount(
      <Provider
        store={MockStoreFactory.sample({
          countries: [
            CountryFactory.sample({ id: 'ES', name: 'Spain' }),
            CountryFactory.sample({ id: 'UK', name: 'England' }),
            CountryFactory.sample({
              id: 'USA',
              name: 'United States',
              states: [{ id: 'state-1', name: 'State 1' }],
            }),
          ],
          user: UserProfileFactory.sample({
            country: { name: 'United States', id: 'USA' },
            state: { name: 'State 1', id: 'state-1' },
            shareCode: 'GR47',
          }),
        })}
      >
        <AccountSettings />
      </Provider>,
    );
  });

  it(`renders the page with existing first and last name populated`, () => {
    const currentProfile = wrapperWithAmericanTeacher.find(
      By.dataQa('current-profile'),
    );
    const subjectTags = currentProfile.find(By.dataQa('profile-subjects'));

    expect(currentProfile.find(By.dataQa('profile-name')).text()).toEqual(
      'joe boclips',
    );
    expect(subjectTags).toExist();
    expect(subjectTags.children().length).toEqual(2);
    expect(subjectTags.find(SubjectTag).first().text()).toEqual('subject one');
  });

  it(`renders profile view by default and profile form when editing`, () => {
    expect(wrapperWithAmericanTeacher.find(EditProfileForm)).not.toExist();
    expect(wrapperWithAmericanTeacher.find(Profile)).toExist();

    wrapperWithAmericanTeacher
      .find(By.dataQa('profile-edit-button'))
      .first()
      .simulate('click');
    wrapperWithAmericanTeacher.update();

    expect(wrapperWithAmericanTeacher.find(Profile)).not.toExist();
    expect(wrapperWithAmericanTeacher.find(EditProfileForm)).toExist();
  });

  it('renders the share code', () => {
    const shareCodeComponent = wrapperWithAmericanTeacher
      .find(ShareCode)
      .find(By.dataQa('share-code'));
    expect(shareCodeComponent.text()).toEqual('GR47');
  });

  describe('school settings', () => {
    it('renders school settings section if user has school information and is from the USA', () => {
      expect(wrapperWithAmericanTeacher.find(SchoolSettings)).toExist();
    });

    it('does not render school settings section for non-US teachers', () => {
      const mockStore = MockStoreFactory.sample({
        user: UserProfileFactory.sample({
          country: { name: 'France', id: 'FRA' },
        }),
      });

      const wrapperWithEuropeanTeacher = mount(
        <Provider store={mockStore}>
          <AccountSettings />
        </Provider>,
      );

      expect(wrapperWithEuropeanTeacher.find(SchoolSettings)).not.toExist();
    });

    it('renders school settings form when edit button clicked', () => {
      expect(
        wrapperWithAmericanTeacher.find(EditSchoolSettingsForm),
      ).not.toExist();
      expect(wrapperWithAmericanTeacher.find(SchoolSettings)).toExist();

      wrapperWithAmericanTeacher
        .find(By.dataQa('school-settings-edit-button'))
        .first()
        .simulate('click');
      wrapperWithAmericanTeacher.update();

      expect(wrapperWithAmericanTeacher.find(SchoolSettings)).not.toExist();
      expect(wrapperWithAmericanTeacher.find(EditSchoolSettingsForm)).toExist();
    });
  });
});
