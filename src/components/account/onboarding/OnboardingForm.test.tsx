import { mount } from 'enzyme';
import Cookies from 'js-cookie';
import React from 'react';
import { Provider } from 'react-redux';
import {
  LinksFactory,
  MockStoreFactory,
  SubjectFactory,
  UserProfileFactory,
} from '../../../../test-support/factories';
import Mock = jest.Mock;
import { RegistrationContext } from '../../../services/session/RegistrationContext';
import updateUser from '../../../services/users/updateUser';
import { AgeRange } from '../../../types/AgeRange';
import { Link } from '../../../types/Link';
import OnboardingForm from './OnboardingForm';
import { OnboardingFormHelper } from './OnboardingFormHelper';

jest.mock('../../../services/users/updateUser');

const mockUpdateUser = updateUser as Mock;
const links = LinksFactory.sample({
  activate: new Link({ href: '/users', templated: false }),
});

describe('onboarding form', () => {
  let wrapper;
  beforeEach(() => {
    mockUpdateUser.mockReturnValue(Promise.resolve());
    wrapper = mount(
      <Provider
        store={MockStoreFactory.sample({
          ageRanges: [new AgeRange(3, 5), new AgeRange(6, 7)],
          subjects: [
            SubjectFactory.sample({ id: '1', name: 's1' }),
            SubjectFactory.sample({ id: '2', name: 's2' }),
          ],
          countries: [
            SubjectFactory.sample({ id: 'ES', name: 'Spain' }),
            SubjectFactory.sample({ id: 'EU', name: 'England' }),
          ],
          links,
        })}
      >
        <OnboardingForm />
      </Provider>,
    );
  });

  it('sends all information with full form', () => {
    fillValidForm(wrapper);

    OnboardingFormHelper.save(wrapper);

    expect(mockUpdateUser).toHaveBeenCalledWith(links, {
      ...UserProfileFactory.sample(),
      firstName: 'Rebecca',
      lastName: 'Sanchez',
      subjects: ['1'],
      ages: [3, 4, 5],
      country: 'ES',
      hasOptedIntoMarketing: true,
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

    expect(mockUpdateUser).toHaveBeenCalledWith(links, {
      ...UserProfileFactory.sample(),
      firstName: 'Rebecca',
      lastName: 'Sanchez',
      subjects: ['1'],
      ages: [3, 4, 5],
      country: 'ES',
      hasOptedIntoMarketing: true,
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

  it('sends partial marketing information from the cookie', () => {
    const marketingData: RegistrationContext = {
      referralCode: 'REFERRALCODE',
      utm: undefined,
    };

    Cookies.set('registrationContext', marketingData);
    fillValidForm(wrapper);
    OnboardingFormHelper.save(wrapper);

    expect(mockUpdateUser).toHaveBeenCalledWith(links, {
      ...UserProfileFactory.sample(),
      firstName: 'Rebecca',
      lastName: 'Sanchez',
      subjects: ['1'],
      ages: [3, 4, 5],
      country: 'ES',
      hasOptedIntoMarketing: true,
      referralCode: 'REFERRALCODE',
    });
  });

  it('does not send information if no firstName', () => {
    fillValidForm(wrapper);

    OnboardingFormHelper.editName(wrapper, '', 'Sanchez');

    OnboardingFormHelper.save(wrapper);

    expect(mockUpdateUser).not.toHaveBeenCalled();
  });

  it('does not send information if no lastName', () => {
    fillValidForm(wrapper);

    OnboardingFormHelper.editName(wrapper, 'Dog', '');

    OnboardingFormHelper.save(wrapper);

    expect(mockUpdateUser).not.toHaveBeenCalled();
  });

  it('does not send information if no T&C', () => {
    fillValidForm(wrapper);

    OnboardingFormHelper.setTermsAndConditions(wrapper, false);

    OnboardingFormHelper.save(wrapper);

    expect(mockUpdateUser).not.toHaveBeenCalled();
  });
});

function fillValidForm(wrapper) {
  OnboardingFormHelper.editName(wrapper, 'Rebecca', 'Sanchez');
  OnboardingFormHelper.editSubjects(wrapper, ['1']);
  OnboardingFormHelper.editCountry(wrapper, 'ES');
  OnboardingFormHelper.editAgeRange(wrapper, ['3-5']);
  OnboardingFormHelper.setMarketingOptIn(wrapper, true);
  OnboardingFormHelper.setTermsAndConditions(wrapper, true);
}
