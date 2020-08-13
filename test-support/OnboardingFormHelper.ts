import { fireEvent, waitFor } from '@testing-library/dom';
import { ResultingContext } from 'test-support/renderWithStore';
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

  public static async editCountry(
    wrapper: ResultingContext,
    countryName: string,
  ) {
    fireEvent.mouseDown(wrapper.getByLabelText('Country'));
    fireEvent.click(wrapper.getByText(countryName));
    await OnboardingFormHelper.waitForSelectionSuccess(wrapper, countryName);
  }

  public static async editState(wrapper: ResultingContext, stateName: string) {
    fireEvent.mouseDown(wrapper.getByLabelText('State'));
    fireEvent.click(wrapper.getByText(stateName));
  }

  public static async selectSchool(
    wrapper: ResultingContext,
    schoolName: string,
  ) {
    fireEvent.change(wrapper.getByLabelText('School'), {
      target: { value: { schoolName } },
    });
    await waitFor(() => wrapper.getByText(schoolName));
    fireEvent.click(wrapper.getByText(schoolName));
  }

  public static async enterSchool(
    wrapper: ResultingContext,
    schoolName: string,
  ) {
    fireEvent.change(wrapper.getByLabelText('School'), {
      target: { value: schoolName },
    });
  }

  private static async waitForSelectionSuccess(
    wrapper: ResultingContext,
    selectedItem: string,
  ) {
    await waitFor(() =>
      expect(
        wrapper.getByText(selectedItem, {
          selector:
            '.ant-select-selection-item > span, ant-select-selection-item',
        }),
      ).toBeVisible(),
    );
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
    return this.carouselPageIsVisible(wrapper, newSection);
  }

  public static async moveCarouselBackward(
    wrapper: ResultingContext,
    newSection: OnboardingSectionAttributes,
  ) {
    fireEvent.click(wrapper.getByText('Back').closest('button'));
    return this.carouselPageIsVisible(wrapper, newSection);
  }

  public static carouselPageIsVisible = async (
    wrapper: ResultingContext,
    section: OnboardingSectionAttributes,
  ) =>
    waitFor(() => {
      expect(
        wrapper.getByTestId(`onboarding-section-${section.pageIndex}`),
      ).toBeVisible();
    });

  public static save(wrapper: ResultingContext) {
    fireEvent.click(wrapper.getByText('Finish').closest('button'));
  }
}
