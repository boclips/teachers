import { mount, ReactWrapper } from 'enzyme';
import Cookies from 'js-cookie';
import React from 'react';
import { Provider } from 'react-redux';
import Mock = jest.Mock;
import { By } from 'test-support/By';
import {
  CountryFactory,
  LinksFactory,
  LinksStateValueFactory,
  MockStoreFactory,
  SubjectFactory,
} from 'test-support/factories';
import { analyticsMock } from 'test-support/getAnalyticsMock';
import AnalyticsFactory from 'src/services/analytics/AnalyticsFactory';
import { RegistrationContext } from 'src/services/session/RegistrationContext';
import { onboardUser } from 'src/services/users/updateUser';
import { Link } from 'src/types/Link';
import { OnboardingFormHelper } from './OnboardingFormHelper';
import OnboardingForm from './OnboardingForm';

jest.mock('../../../services/users/updateUser', () => ({
  onboardUser: jest.fn().mockReturnValue(Promise.resolve()),
}));
jest.mock('../../../services/schools/searchSchools', () => ({
  searchSchools: jest.fn().mockResolvedValue([]),
}));

AnalyticsFactory.externalAnalytics = jest.fn(() => analyticsMock);

const mockOnboardUser = onboardUser as Mock;
const links = LinksFactory.sample({
  activate: new Link({ href: '/users', templated: false }),
});

describe('onboarding form', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <Provider
        store={MockStoreFactory.sample({
          subjects: [
            // TODO(AO): Make this use the (non-existent) SubjectFactory from api client
            SubjectFactory.sample({ id: '1', name: 's1' }),
            SubjectFactory.sample({ id: '2', name: 's2' }),
          ],
          countries: [
            CountryFactory.sample({ id: 'ES', name: 'Spain' }),
            CountryFactory.sample({ id: 'EU', name: 'England' }),
            CountryFactory.sample({
              id: 'USA',
              name: 'Trumpity Trump',
              states: [{ id: 'state-1', name: 'State 1' }],
            }),
          ],
          links: LinksStateValueFactory.sample(links),
        })}
      >
        <OnboardingForm />
      </Provider>,
    );
  });

  describe('when USA', () => {
    it('renders school and state', () => {
      OnboardingFormHelper.editCountry(wrapper, 'USA');

      expect(wrapper.find(By.dataQa('states-filter-select'))).toExist();
      expect(wrapper.find(By.dataQa('school-name'))).not.toExist();
    });
  });

  describe('when not USA', () => {
    it('renders school input', () => {
      OnboardingFormHelper.editCountry(wrapper, 'ES');

      expect(wrapper.find(By.dataQa('school'))).toExist();
      expect(wrapper.find(By.dataQa('states-filter-select'))).not.toExist();
    });

    it('sends all information with full form', () => {
      fillValidForm(wrapper);

      OnboardingFormHelper.save(wrapper);

      expect(mockOnboardUser).toHaveBeenCalledWith(
        links,
        {
          firstName: 'Rebecca',
          lastName: 'Sanchez',
          subjects: ['1'],
          ages: [3, 4, 5],
          country: 'ES',
          hasOptedIntoMarketing: true,
          schoolName: 'school',
        },
        'joe@boclips.com',
      );
    });
  });

  it('sends marketing information from cookies with full form', () => {
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
    fillValidForm(wrapper);
    OnboardingFormHelper.save(wrapper);

    expect(mockOnboardUser).toHaveBeenCalledWith(
      links,
      {
        firstName: 'Rebecca',
        lastName: 'Sanchez',
        subjects: ['1'],
        ages: [3, 4, 5],
        country: 'ES',
        schoolName: 'school',
        schoolId: undefined,
        hasOptedIntoMarketing: true,
        referralCode: 'REFERRALCODE',
        utm: {
          source: 'some-source-value',
          term: 'some-term-value',
          medium: 'some-medium-value',
          campaign: 'some-campaign-value',
          content: 'some-content-value',
        },
      },
      'joe@boclips.com',
    );
  });

  it('sends partial marketing information from the cookie', () => {
    const marketingData: RegistrationContext = {
      referralCode: 'REFERRALCODE',
      utm: undefined,
    };

    Cookies.set('registrationContext', marketingData);
    fillValidForm(wrapper);
    OnboardingFormHelper.save(wrapper);

    expect(mockOnboardUser).toHaveBeenCalledWith(
      links,
      {
        firstName: 'Rebecca',
        lastName: 'Sanchez',
        subjects: ['1'],
        ages: [3, 4, 5],
        country: 'ES',
        schoolName: 'school',
        hasOptedIntoMarketing: true,
        referralCode: 'REFERRALCODE',
      },
      'joe@boclips.com',
    );
  });

  it('does not send information if no firstName', () => {
    fillValidForm(wrapper);

    OnboardingFormHelper.editName(wrapper, '', 'Sanchez');

    OnboardingFormHelper.save(wrapper);

    expect(mockOnboardUser).not.toHaveBeenCalled();
  });

  it('does not send information if no lastName', () => {
    fillValidForm(wrapper);

    OnboardingFormHelper.editName(wrapper, 'Dog', '');

    OnboardingFormHelper.save(wrapper);

    expect(mockOnboardUser).not.toHaveBeenCalled();
  });

  it('does not send information if no T&C', () => {
    fillValidForm(wrapper);

    OnboardingFormHelper.setTermsAndConditions(wrapper, false);

    OnboardingFormHelper.save(wrapper);

    expect(mockOnboardUser).not.toHaveBeenCalled();
  });

  it('sends a page changed event if page has not already been visited', () => {
    OnboardingFormHelper.editName(wrapper, 'Rebecca', 'Sanchez');

    OnboardingFormHelper.moveCarousel(wrapper, 1);

    expect(analyticsMock.trackOnboardingPageChanged).toHaveBeenCalledWith(0);
  });

  it('does not send page changed event if page has already been visited', () => {
    OnboardingFormHelper.editName(wrapper, 'Rebecca', 'Sanchez');

    OnboardingFormHelper.moveCarousel(wrapper, 1);
    OnboardingFormHelper.moveCarousel(wrapper, 0);
    OnboardingFormHelper.moveCarousel(wrapper, 1);

    expect(analyticsMock.trackOnboardingPageChanged).toHaveBeenCalledTimes(1);
  });
});

function fillValidForm(wrapper: ReactWrapper) {
  OnboardingFormHelper.editName(wrapper, 'Rebecca', 'Sanchez');
  OnboardingFormHelper.moveCarousel(wrapper, 1);
  OnboardingFormHelper.editSubjects(wrapper, ['1']);
  OnboardingFormHelper.editAgeRange(wrapper, ['3-5']);
  OnboardingFormHelper.moveCarousel(wrapper, 2);
  OnboardingFormHelper.editCountry(wrapper, 'ES');
  OnboardingFormHelper.enterSchool(wrapper, 'school');
  OnboardingFormHelper.moveCarousel(wrapper, 3);
  OnboardingFormHelper.setMarketingOptIn(wrapper, true);
  OnboardingFormHelper.setTermsAndConditions(wrapper, true);
}
