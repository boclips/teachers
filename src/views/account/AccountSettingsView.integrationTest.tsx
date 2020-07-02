import Button from 'antd/lib/button';
import {
  links,
  schoolsResponse,
  userResponse,
} from 'test-support/api-responses';
import { By } from 'test-support/By';
import { fakeSubjectsSetup } from 'test-support/fakeApiClientSetup';
import { AccountSettingsPage } from 'test-support/page-objects/AccountSettingsPage';
import { Profile } from 'src/components/account/accountSettings/Profile';
import { SchoolForm } from 'src/components/account/form/SchoolForm';
import Mock = jest.Mock;
import { SubjectTag } from 'src/components/common/tags/SubjectTag';
import { editUser } from 'src/services/users/updateUser';
import EditButton from '../../components/common/buttons/EditButton';
import SchoolSettings from '../../components/account/accountSettings/SchoolSettings';
import ApiStub from '../../../test-support/ApiStub';

jest.mock('../../services/users/updateUser');

describe('when view is mounted', () => {
  let accountSettingsPage;

  beforeEach(async () => {
    new ApiStub({
      _links: {
        ...links._links,
        profile: { href: 'https://api.example.com/v1/users/user-id' },
      },
    })
      .fetchUser(userResponse('user-id'))
      .fetchCountries()
      .fetchAmericanSchools('sch', 'CA')
      .fetchTags();

    await fakeSubjectsSetup();

    accountSettingsPage = await AccountSettingsPage.load();
  });

  it('loads the page with user values prepopulated', async () => {
    const accountSettings = accountSettingsPage.wrapper;

    expect(accountSettings.find(Profile)).toExist();

    expect(accountSettings.find(By.dataQa('profile-name')).text()).toEqual(
      'Bob Someone',
    );

    const subjectTags = accountSettings.find(By.dataQa('profile-subjects'));
    expect(subjectTags).toExist();
    expect(subjectTags.children().length).toEqual(1);
    expect(subjectTags.find(SubjectTag).text()).toEqual('Maths');
  });

  describe('editing school settings', () => {
    it('sends the correct information when the state and school are both updated', async () => {
      const mockUpdateUser = editUser as Mock;

      const accountForm = getAccountSettingsWithEditor();

      editState('state-1');
      editSchool('S2');

      accountForm
        .find(By.dataQa('save-button'))
        .find(Button)
        .props()
        .onClick(null);

      expect(mockUpdateUser).toHaveBeenCalledWith(expect.any(Object), {
        state: 'state-1',
        schoolId: 'S2',
        schoolName: undefined,
      });
    });
  });

  const getAccountSettingsWithEditor = () => {
    accountSettingsPage.wrapper
      .find(SchoolSettings)
      .find(EditButton)
      .props()
      .onClick(null);

    accountSettingsPage.wrapper.update();

    const form = accountSettingsPage.wrapper.find(SchoolForm);

    accountSettingsPage.wrapper.find(SchoolForm).setState({
      ...form.state,
      schools: schoolsResponse()._embedded.schools,
    });

    return accountSettingsPage.wrapper;
  };

  const editState = (stateId: string) => {
    accountSettingsPage.wrapper
      .find(By.dataQa('states-filter-select', 'div'))
      .simulate('click');

    accountSettingsPage.wrapper
      .find('Trigger')
      .find('MenuItem')
      .find(`[value="${stateId}"]`)
      .simulate('click');

    accountSettingsPage.wrapper.update();
  };

  const editSchool = (schoolId: string) => {
    accountSettingsPage.wrapper
      .find(By.dataQa('school-filter-select', 'div'))
      .simulate('click');

    accountSettingsPage.wrapper
      .find('Trigger')
      .find('MenuItem')
      .find(`[value="${schoolId}"]`)
      .simulate('click');

    accountSettingsPage.wrapper.update();
  };
});
