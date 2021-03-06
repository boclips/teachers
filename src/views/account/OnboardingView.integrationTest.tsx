import { render } from '@testing-library/react';
import App from 'src/app/App';
import { createMemoryHistory } from 'history';
import React from 'react';
import { OnboardingSections } from 'src/components/account/onboarding/OnboardingFormValues';
import {
  links,
  userResponse,
  video177,
} from '../../../test-support/api-responses';
import ApiStub from '../../../test-support/ApiStub';
import eventually from '../../../test-support/eventually';
import {
  fakeSubjectsSetup,
  fakeVideoSetup,
} from '../../../test-support/fakeApiClientSetup';
import MockFetchVerify, {
  axiosMock,
} from '../../../test-support/MockFetchVerify';
import OnboardingPage from '../../../test-support/page-objects/OnboardingPage';

describe('When user is not activated', () => {
  const timeoutForFullOnboarding = 30000;
  beforeEach(() => {
    new ApiStub({
      _links: {
        ...links._links,
        activate: { href: 'https://api.example.com/v1/activate' },
      },
    }).defaultUser();
  });

  test(
    'renders onboarding screen when user is not activated',
    async () => {
      const view = render(
        <App
          history={createMemoryHistory({
            initialEntries: ['/'],
          })}
          apiPrefix="https://api.example.com"
        />,
      );

      expect(await view.findByText(OnboardingSections[0].title)).toBeVisible();
    },
    timeoutForFullOnboarding,
  );

  test(
    'filling the form PUTs account details and redirects to HOME',
    async () => {
      new ApiStub({
        _links: {
          ...links._links,
          profile: { href: 'https://api.example.com/v1/users/user-id' },
          activate: { href: 'https://api.example.com/v1/users/user-id' },
        },
      })
        .fetchUser(userResponse({ id: 'user-id' }))
        .fetchSchools('ES', 'school')
        .fetchCollections();

      await fakeSubjectsSetup();
      await fakeVideoSetup(video177);

      const onboardingPage = await OnboardingPage.navigateToOnboarding();

      onboardingPage.setName('Rebecca', 'Sanchez');
      await onboardingPage.setRole('Teacher');
      await onboardingPage.navigateTo(2);
      await onboardingPage.setSubjects(['Maths', 'German']);
      onboardingPage.setAgeRanges(['3-5']);
      await onboardingPage.navigateTo(3);
      await onboardingPage.setCountry('Spain');
      await onboardingPage.enterSchool('school');
      await onboardingPage.navigateTo(4);
      onboardingPage.setMarketingOptIn();
      await onboardingPage.setAgreeTerms();

      MockFetchVerify.put('https://api.example.com/v1/users/user-id');

      onboardingPage.save();

      await eventually(() => {
        expect(JSON.parse(axiosMock.history.put[0].data)).toEqual({
          firstName: 'Rebecca',
          lastName: 'Sanchez',
          subjects: ['1', '3'],
          country: 'ES',
          role: 'TEACHER',
          ages: [3, 4, 5],
          hasOptedIntoMarketing: true,
          schoolName: 'school',
        });
      });

      await onboardingPage.hasRedirectedToHome();
    },
    timeoutForFullOnboarding,
  );
});
