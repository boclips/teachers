import { links, userResponse } from 'test-support/api-responses';
import By from 'test-support/By';
import { fakeSubjectsSetup } from 'test-support/fakeApiClientSetup';
import AccountSettingsPage from 'test-support/page-objects/AccountSettingsPage';
import { Profile } from 'src/components/account/accountSettings/Profile';
import { SubjectTag } from 'src/components/common/tags/SubjectTag';
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
      .fetchUser(userResponse({ id: 'user-id' }))
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
});
