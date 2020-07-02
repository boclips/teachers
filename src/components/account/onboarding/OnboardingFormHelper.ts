import { Carousel } from 'antd';
import { ReactWrapper } from 'enzyme';
import By from '../../../../test-support/By';
import EventSimulator from '../../../../test-support/EventSimulator';
import { SelectSubjects } from '../../multipleSelect/SelectSubjects';

export class OnboardingFormHelper {
  public static editName(wrapper, firstName: string, lastName: string) {
    const events = new EventSimulator(wrapper);
    events.setText(firstName, wrapper.find(By.dataQa('first-name', 'input')));
    events.setText(lastName, wrapper.find(By.dataQa('last-name', 'input')));
  }

  public static editRole(wrapper, value: string) {
    wrapper
      .find(By.dataQa('select-role'))
      .find('.ant-select-selector')
      .simulate('mousedown');

    wrapper.find(`[data-state="${value}"]`).first().simulate('click');

    wrapper.find(SelectSubjects).simulate('mouseDown');
    wrapper.update();
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
    wrapper
      .find(By.dataQa('subjects'))
      .find('.ant-select-selector')
      .simulate('mousedown');

    subjectIds.forEach((subjectId) => {
      wrapper.find(`[data-qa="${subjectId}"]`).first().simulate('click');
    });

    wrapper.find(SelectSubjects).simulate('mouseDown');
  }

  public static editCountry(wrapper: ReactWrapper, countryName: string) {
    wrapper
      .find(By.dataQa('countries-filter-select'))
      .find('.ant-select-selector')
      .simulate('mousedown');

    wrapper
      .find('[data-qa="country-option"]')
      .findWhere((n) => n.text() === countryName)
      .first()
      .simulate('click');

    wrapper.find(SelectSubjects).simulate('mousedown');
    wrapper.update();
  }

  public static enterSchool(wrapper: ReactWrapper, schoolName: string) {
    const events = new EventSimulator(wrapper);
    events.setText(schoolName, wrapper.find(By.dataQa('school')).find('input'));
    wrapper.update();
  }

  public static editAgeRange(wrapper: ReactWrapper, ageRanges: string[]) {
    wrapper
      .find(By.dataQa('age-select'))
      .find('.ant-select-selector')
      .simulate('mousedown');

    ageRanges.forEach((ageRange) => {
      wrapper.find(`[data-qa="${ageRange}"]`).first().simulate('click');
    });

    wrapper.find(SelectSubjects).simulate('mousedown');
    wrapper.update();
  }

  public static moveCarousel(wrapper: ReactWrapper, currentSlide: number) {
    const carousel = wrapper.find(Carousel).last();

    carousel.props().afterChange(currentSlide);

    wrapper.update();
  }

  public static save(wrapper) {
    const events = new EventSimulator(wrapper);
    events.submit(wrapper.find(By.dataQa('onboarding-form')).find('Form'));
  }
}
