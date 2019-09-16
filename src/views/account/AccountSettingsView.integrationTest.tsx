import { links, userResponse } from '../../../test-support/api-responses';
import ApiStub from '../../../test-support/ApiStub';
import { By } from '../../../test-support/By';
import { AccountSettingsPage } from '../../../test-support/page-objects/AccountSettingsPage';
import AccountSettings from '../../components/account/accountSettings/AccountSettings';
import { Profile } from '../../components/account/accountSettings/Profile';
import { SubjectTag } from '../../components/common/tags/SubjectTag';

describe('when view is mounted', () => {
  beforeEach(async () => {
    new ApiStub({
      _links: {
        ...links._links,
        profile: { href: 'https://api.example.com/v1/users/user-id' },
      },
    })
      .fetchUser(userResponse('user-id'))
      .fetchSubjects()
      .fetchTags();
  });

  it('loads the page with user values prepopulated', async () => {
    const accountSettingsPage = await AccountSettingsPage.load();

    const accountForm = accountSettingsPage.wrapper.find(AccountSettings);

    expect(accountForm.find(Profile)).toExist();

    expect(accountForm.find(By.dataQa('profile-name')).text()).toEqual(
      'Bob Someone',
    );

    const subjectTags = accountForm.find(By.dataQa('profile-subjects'));
    expect(subjectTags).toExist();
    expect(subjectTags.children().length).toEqual(1);
    expect(subjectTags.find(SubjectTag).text()).toEqual('Maths');
  });
});
