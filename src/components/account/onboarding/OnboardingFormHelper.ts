import { ReactWrapper } from 'enzyme';
import { By } from '../../../../test-support/By';
import EventSimulator from '../../../../test-support/EventSimulator';
import { SelectAgeRange } from '../../multipleSelect/SelectAgeRange';
import { SelectSubjects } from '../../multipleSelect/SelectSubjects';

export class OnboardingFormHelper {
  public static editName(wrapper, firstName: string, lastName: string) {
    const events = new EventSimulator(wrapper);
    events.setText(firstName, wrapper.find(By.dataQa('first-name', 'input')));
    events.setText(lastName, wrapper.find(By.dataQa('last-name', 'input')));
  }

  public static setMarketingOptIn(wrapper: ReactWrapper, optIn: boolean) {
    wrapper
      .find(By.dataQa('marketing-optin'))
      .find('input')
      .first()
      .simulate('change', { target: { checked: optIn } });
  }

  public static setTermsAndConditions(wrapper: ReactWrapper, accept: boolean) {
    wrapper
      .find(By.dataQa('privacy-policy'))
      .find('input')
      .first()
      .simulate('change', { target: { checked: accept } });
  }

  public static editSubjects(wrapper: ReactWrapper, subjectIds: string[]) {
    wrapper.find(SelectSubjects).simulate('click');

    const menuItems = wrapper.find('Trigger').find('MenuItem');

    subjectIds.forEach(subjectId => {
      menuItems.find(`[value="${subjectId}"]`).simulate('click');
    });

    wrapper.find(SelectSubjects).simulate('click');
  }

  public static editAgeRange(wrapper: ReactWrapper, ageRanges: string[]) {
    wrapper
      .find(SelectAgeRange)
      .find('.ant-select')
      .simulate('click');

    const menuItems = wrapper.find('Trigger').find('MenuItem');

    ageRanges.forEach(ageRange => {
      menuItems
        .find(`[data-qa="${ageRange}"]`)
        .first()
        .simulate('click');
    });
  }

  public static save(wrapper) {
    const events = new EventSimulator(wrapper);
    events.submit(wrapper.find(By.dataQa('onboarding-form')).find('Form'));
  }
}
