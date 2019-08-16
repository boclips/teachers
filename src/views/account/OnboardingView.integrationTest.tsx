import { links, userResponse } from '../../../test-support/api-responses';
import ApiStub from '../../../test-support/ApiStub';
import eventually from '../../../test-support/eventually';
import MockFetchVerify, {
  axiosMock,
} from '../../../test-support/MockFetchVerify';
import { OnboardingPage } from '../../../test-support/page-objects/OnboardingPage';

describe('When user is not activated', () => {
  beforeEach(() => {
    new ApiStub({
      _links: {
        ...links._links,
        activate: { href: 'https://api.example.com/v1/activate' },
      },
    }).defaultUser();
  });

  test('renders onboarding screen when user is not activated', async () => {
    await OnboardingPage.loadHomeExpectingRedirectToOnboarding();
  });

  test('filling the form PUTs account details and redirects to HOME', async () => {
    new ApiStub({
      _links: {
        ...links._links,
        profile: { href: 'https://api.example.com/v1/users/user-id' },
        activate: { href: 'https://api.example.com/v1/users/user-id' },
      },
    })
      .fetchUser(userResponse('user-id'))
      .fetchPublicCollections()
      .fetchVideo()
      .fetchSubjects();

    const onboardingPage = await OnboardingPage.navigateToOnboarding();

    onboardingPage.setName('Rebecca', 'Sanchez');
    onboardingPage.setSubjects(['1', '3']);
    onboardingPage.setAgeRanges(['3-5']);
    onboardingPage.setMarketingOptIn(true);
    onboardingPage.setAgreeTerms(true);

    MockFetchVerify.put('https://api.example.com/v1/users/user-id');

    onboardingPage.save();

    await eventually(() => {
      expect(JSON.parse(axiosMock.history.put[0].data)).toEqual({
        firstName: 'Rebecca',
        lastName: 'Sanchez',
        subjects: ['1', '3'],
        ages: [3, 4, 5],
        hasOptedIntoMarketing: true,
      });
    });

    await onboardingPage.hasRedirectedToHome();
  });
});
