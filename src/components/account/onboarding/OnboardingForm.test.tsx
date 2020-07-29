import Cookies from 'js-cookie';
import React from 'react';
import { ApiClientWrapper } from 'src/services/apiClient';
import { FakeBoclipsClient } from 'boclips-api-client/dist/test-support';
import {
  renderWithBoclipsStore,
  ResultingContext,
} from 'test-support/renderWithStore';
import { OnboardingSections } from 'src/components/account/onboarding/OnboardingFormValues';
import {
  CountryFactory,
  LinksFactory,
  LinksStateValueFactory,
  MockStoreFactory,
  SubjectFactory,
} from 'test-support/factories';
import { analyticsMock } from 'test-support/getAnalyticsMock';
import { RegistrationContext } from 'src/services/session/RegistrationContext';
import { onboardUser } from 'src/services/users/updateUser';
import { Link } from 'src/types/Link';
import eventually from 'test-support/eventually';
import { OnboardingFormHelper } from 'test-support/OnboardingFormHelper';
import { within } from '@testing-library/dom';
import AnalyticsFactory from '../../../services/analytics/AnalyticsFactory';
import { OnboardingForm } from './OnboardingForm';

import Mock = jest.Mock;

jest.mock('../../../services/users/updateUser', () => ({
  onboardUser: jest.fn().mockReturnValue(Promise.resolve()),
}));
jest.mock('../../../services/schools/searchSchools', () => ({
  searchSchools: jest.fn().mockResolvedValue([
    { id: 'id1', name: 'school 1' },
    { id: 'id2', name: 'school 2' },
    { id: 'id3', name: 'school 3' },
  ]),
}));
jest.mock('../../../services/users/fetchUser', () => ({
  fetchUser: jest.fn().mockResolvedValue(Promise.resolve()),
}));

AnalyticsFactory.externalAnalytics = jest.fn(() => analyticsMock);
const timeoutForFullOnboarding = 10000;
const mockOnboardUser = onboardUser as Mock;
const SECTIONS = OnboardingSections;
const links = LinksFactory.sample({
  activate: new Link({ href: '/users', templated: false }),
});

describe('onboarding form', () => {
  beforeEach(async () => {
    const client = (await ApiClientWrapper.get()) as FakeBoclipsClient;
    client.events.clear();
  });

  const getView = (): ResultingContext =>
    renderWithBoclipsStore(
      <OnboardingForm />,
      MockStoreFactory.sampleState({
        subjects: [
          SubjectFactory.sample({ id: '1', name: 's1' }),
          SubjectFactory.sample({ id: '2', name: 's2' }),
        ],
        countries: [
          CountryFactory.sample({ id: 'ES', name: 'Spain' }),
          CountryFactory.sample({ id: 'EU', name: 'England' }),
          CountryFactory.sample({
            id: 'USA',
            name: 'United States',
            states: [{ id: 'state-1', name: 'State 1' }],
          }),
        ],
        links: LinksStateValueFactory.sample(links),
      }),
    );

  describe('when USA', () => {
    it('have to select a state then a school', async () => {
      const wrapper = getView();
      await fillStep1(wrapper);
      await fillStep2(wrapper);
      await OnboardingFormHelper.editCountry(wrapper, 'United States');

      await OnboardingFormHelper.editState(wrapper, 'State 1');
      await OnboardingFormHelper.selectSchool(wrapper, 'school 1');

      const selectedSchoolItem = wrapper.getAllByTestId('school-option')[0];
      expect(within(selectedSchoolItem).getByText('school 1'));
      expect(selectedSchoolItem).toBeVisible();
      expect(selectedSchoolItem.getAttribute('aria-selected')).toBeTruthy();
    });
  });

  describe('when not USA', () => {
    it('renders school input', async () => {
      const wrapper = getView();

      await fillStep1(wrapper);
      await fillStep2(wrapper);
      await OnboardingFormHelper.editCountry(wrapper, 'Spain');

      expect(wrapper.getByLabelText('School')).toBeInTheDocument();
      expect(wrapper.queryByLabelText('State')).toBeNull();
    });

    it(
      'sends all information with full form',
      async () => {
        const wrapper = getView();

        await fillValidForm(wrapper);
        OnboardingFormHelper.save(wrapper);

        await eventually(() => {
          expect(mockOnboardUser).toHaveBeenCalledWith(links, {
            firstName: 'Rebecca',
            lastName: 'Sanchez',
            subjects: ['1'],
            role: 'TEACHER',
            ages: [3, 4, 5],
            country: 'ES',
            hasOptedIntoMarketing: true,
            schoolName: 'school',
          });
        });
      },
      timeoutForFullOnboarding,
    );
  });

  it(
    'sends marketing information from cookies with full form',
    async () => {
      const wrapper = getView();

      const marketingData: RegistrationContext = {
        referralCode: 'REFERRALCODE',
        utm: {
          source: 'some-source-value',
          term: 'some-term-value',
          medium: 'some-medium-value',
          campaign: 'some-campaign-value',
          content: 'some-content-value',
        },
      };

      Cookies.set('registrationContext', marketingData);
      await fillValidForm(wrapper);
      OnboardingFormHelper.save(wrapper);

      await eventually(() => {
        expect(mockOnboardUser).toHaveBeenCalledWith(links, {
          firstName: 'Rebecca',
          lastName: 'Sanchez',
          subjects: ['1'],
          ages: [3, 4, 5],
          country: 'ES',
          schoolName: 'school',
          schoolId: undefined,
          hasOptedIntoMarketing: true,
          role: 'TEACHER',
          referralCode: 'REFERRALCODE',
          utm: {
            source: 'some-source-value',
            term: 'some-term-value',
            medium: 'some-medium-value',
            campaign: 'some-campaign-value',
            content: 'some-content-value',
          },
        });
      });
    },
    timeoutForFullOnboarding,
  );

  it(
    'sends partial marketing information from the cookie',
    async () => {
      const wrapper = getView();

      const marketingData: RegistrationContext = {
        referralCode: 'REFERRALCODE',
        utm: undefined,
      };

      Cookies.set('registrationContext', marketingData);
      await fillValidForm(wrapper);
      OnboardingFormHelper.save(wrapper);
      await eventually(() => {
        expect(mockOnboardUser).toHaveBeenCalledWith(links, {
          firstName: 'Rebecca',
          lastName: 'Sanchez',
          role: 'TEACHER',
          subjects: ['1'],
          ages: [3, 4, 5],
          country: 'ES',
          schoolName: 'school',
          hasOptedIntoMarketing: true,
          referralCode: 'REFERRALCODE',
        });
      });
    },
    timeoutForFullOnboarding,
  );

  it(
    'does not send information if no firstName',
    async () => {
      const wrapper = getView();

      await fillValidForm(wrapper);

      OnboardingFormHelper.editName(wrapper, '', 'Sanchez');

      OnboardingFormHelper.save(wrapper);

      expect(mockOnboardUser).not.toHaveBeenCalled();
    },
    timeoutForFullOnboarding,
  );

  it(
    'does not send information if no lastName',
    async () => {
      const wrapper = getView();

      await fillValidForm(wrapper);

      OnboardingFormHelper.editName(wrapper, 'Dog', '');

      OnboardingFormHelper.save(wrapper);

      expect(mockOnboardUser).not.toHaveBeenCalled();
    },
    timeoutForFullOnboarding,
  );

  it('does not send information if no T&C', async () => {
    const wrapper = getView();

    await fillStep1(wrapper);
    await fillStep2(wrapper);
    await fillStep3(wrapper);

    OnboardingFormHelper.save(wrapper);

    expect(mockOnboardUser).not.toHaveBeenCalled();
  });

  it('sends a page changed event to Appcues if page has not already been visited', async () => {
    const wrapper = getView();
    const trackedPageIndex = 0;
    await fillStep1(wrapper);

    expect(analyticsMock.trackOnboardingPageChanged).toHaveBeenCalledWith(
      trackedPageIndex,
    );
  });

  it('does not send duplicated page changed event to Appcues if page has already been visited', async () => {
    const wrapper = getView();

    await fillStep1(wrapper);
    await OnboardingFormHelper.moveCarouselBackward(wrapper, SECTIONS[0]);
    await OnboardingFormHelper.moveCarouselForward(wrapper, SECTIONS[1]);

    expect(analyticsMock.trackOnboardingPageChanged).toHaveBeenCalledTimes(1);
  });

  it('sends a platform interaction event when visiting a page ', async () => {
    const wrapper = getView();

    await fillStep1(wrapper);
    const client = (await ApiClientWrapper.get()) as FakeBoclipsClient;

    expect(client.events.getEvents()).toEqual([
      {
        anonymous: true,
        subtype: 'ONBOARDING_PAGE_2_STARTED',
        type: 'PLATFORM_INTERACTED_WITH',
      },
    ]);
  });

  it('does not send duplicated platform interaction event if page has already been visited', async () => {
    const wrapper = getView();

    await fillStep1(wrapper);
    await OnboardingFormHelper.moveCarouselBackward(wrapper, SECTIONS[0]);
    await OnboardingFormHelper.moveCarouselForward(wrapper, SECTIONS[1]);

    const client = (await ApiClientWrapper.get()) as FakeBoclipsClient;

    expect(client.events.getEvents()).toEqual([
      {
        anonymous: true,
        subtype: 'ONBOARDING_PAGE_2_STARTED',
        type: 'PLATFORM_INTERACTED_WITH',
      },
    ]);
  });
});

const fillStep1 = async (wrapper: ResultingContext) => {
  OnboardingFormHelper.editName(wrapper, 'Rebecca', 'Sanchez');
  await OnboardingFormHelper.editRole(wrapper, 'Teacher');
  await OnboardingFormHelper.moveCarouselForward(wrapper, SECTIONS[1]);
};

const fillStep2 = async (wrapper: ResultingContext) => {
  OnboardingFormHelper.editSubjects(wrapper, ['s1']);
  OnboardingFormHelper.editAgeRange(wrapper, ['3-5']);
  await OnboardingFormHelper.moveCarouselForward(wrapper, SECTIONS[2]);
};

const fillStep3 = async (wrapper: ResultingContext) => {
  await OnboardingFormHelper.editCountry(wrapper, 'Spain');
  await OnboardingFormHelper.enterSchool(wrapper, 'school');
  await OnboardingFormHelper.moveCarouselForward(wrapper, SECTIONS[3]);
};

const fillStep4 = async (wrapper: ResultingContext) => {
  OnboardingFormHelper.tickMarketingOptIn(wrapper);
  await OnboardingFormHelper.tickTermsAndConditions(wrapper);
};

const fillValidForm = async (wrapper: ResultingContext) => {
  await fillStep1(wrapper);
  await fillStep2(wrapper);
  await fillStep3(wrapper);
  await fillStep4(wrapper);
  await OnboardingFormHelper.moveCarouselBackward(wrapper, SECTIONS[2]);
  await OnboardingFormHelper.moveCarouselForward(wrapper, SECTIONS[3]);
};
