import { fireEvent, waitFor } from '@testing-library/dom';
import { ResultingContext } from 'test-support/renderWithStore';
import { act } from 'react-dom/test-utils';
import { OnboardingSectionAttributes } from 'src/components/account/onboarding/OnboardingFormValues';

export class OnboardingFormHelper {
  public static editName(
    wrapper: ResultingContext,
    firstName: string,
    lastName: string,
  ) {
    fireEvent.change(wrapper.getByPlaceholderText('Enter first name'), {
      target: { value: firstName },
    });

    fireEvent.change(wrapper.getByPlaceholderText('Enter last name'), {
      target: { value: lastName },
    });
  }

  public static async editRole(wrapper: ResultingContext, value: string) {
    fireEvent.mouseDown(wrapper.getByLabelText("I'm a"));
    fireEvent.click(wrapper.getByText(value));
  }

  public static tickMarketingOptIn(wrapper: ResultingContext) {
    fireEvent.click(wrapper.getByTestId('marketing-optin'));
  }

  public static async tickTermsAndConditions(wrapper: ResultingContext) {
    const checkbox = wrapper.getByTestId('privacy-policy') as HTMLInputElement;
    fireEvent.click(checkbox);
    await waitFor(() => expect(checkbox.checked).toEqual(true));
  }

  public static editSubjects(wrapper: ResultingContext, subjects: string[]) {
    fireEvent.mouseDown(wrapper.getByText('Choose subjects'));

    subjects.forEach((subject) => {
      fireEvent.click(wrapper.getByText(subject));
    });
  }

  public static editCountry(wrapper: ResultingContext, countryName: string) {
    fireEvent.mouseDown(wrapper.getByLabelText('Country'));
    fireEvent.click(wrapper.getByText(countryName));
  }

  public static enterSchool(wrapper: ResultingContext, schoolName: string) {
    fireEvent.change(wrapper.getByLabelText('School'), {
      target: { value: schoolName },
    });
  }

  public static editAgeRange(wrapper: ResultingContext, ageRanges: string[]) {
    fireEvent.mouseDown(wrapper.getByText('Choose ages'));

    ageRanges.forEach((ageRange) => {
      fireEvent.click(wrapper.getByText(ageRange));
    });
  }

  public static async moveCarouselForward(
    wrapper: ResultingContext,
    newSection: OnboardingSectionAttributes,
  ) {
    fireEvent.click(wrapper.getByText('Next').closest('button'));
    await this.carouselPageIsVisible(wrapper, newSection.title);
  }

  public static async moveCarouselBackward(
    wrapper: ResultingContext,
    newSection: OnboardingSectionAttributes,
  ) {
    fireEvent.click(wrapper.getByText('Back').closest('button'));
    await this.carouselPageIsVisible(wrapper, newSection.title);
  }

  public static carouselPageIsVisible = async (
    wrapper: ResultingContext,
    title: string,
  ) => waitFor(() => expect(wrapper.getByText(title)).toBeVisible());

  public static save(wrapper: ResultingContext) {
    act(() => {
      fireEvent.click(wrapper.getByText('Finish').closest('button'));
    });
  }
}
