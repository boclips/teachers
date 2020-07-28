import { createMemoryHistory } from 'history';
import React from 'react';
import { render } from '@testing-library/react';
import { OnboardingSections } from 'src/components/account/onboarding/OnboardingFormValues';
import { OnboardingFormHelper } from 'test-support/OnboardingFormHelper';
import App from '../../src/app/App';

class OnboardingPage {
  public constructor(public wrapper) {}

  public static async navigateToOnboarding() {
    const page = new OnboardingPage(
      render(
        <App
          history={createMemoryHistory({
            initialEntries: ['/onboarding'],
          })}
          apiPrefix="https://api.example.com"
        />,
      ),
    );

    await page.hasLoaded();
    return page;
  }

  public static async loadHomeExpectingRedirectToOnboarding() {
    const page = new OnboardingPage(
      render(
        <App
          history={createMemoryHistory({
            initialEntries: ['/'],
          })}
          apiPrefix="https://api.example.com"
        />,
      ),
    );

    await page.hasLoaded();
    return page;
  }

  private async hasLoaded() {
    await this.wrapper.findByText(OnboardingSections[0].title);
  }

  public setName(firstName: string, lastName: string) {
    OnboardingFormHelper.editName(this.wrapper, firstName, lastName);
  }

  public setRole(value: string) {
    OnboardingFormHelper.editRole(this.wrapper, value);
  }

  public setSubjects(subjectIds: string[]) {
    OnboardingFormHelper.editSubjects(this.wrapper, subjectIds);
  }

  public setCountry(countryId: string) {
    OnboardingFormHelper.editCountry(this.wrapper, countryId);
  }

  public enterSchool(schoolName: string) {
    OnboardingFormHelper.enterSchool(this.wrapper, schoolName);
  }

  public setMarketingOptIn() {
    OnboardingFormHelper.tickMarketingOptIn(this.wrapper);
  }

  public setAgreeTerms() {
    OnboardingFormHelper.tickTermsAndConditions(this.wrapper);
  }

  public async navigateTo(nextPage: number) {
    await OnboardingFormHelper.moveCarouselForward(
      this.wrapper,
      OnboardingSections[nextPage - 1],
    );
  }

  public save() {
    OnboardingFormHelper.save(this.wrapper);
  }

  public setAgeRanges(ageRanges: string[]) {
    OnboardingFormHelper.editAgeRange(this.wrapper, ageRanges);
  }

  public async hasRedirectedToHome() {
    await this.wrapper.findByText("Let's plan your next lesson:");
  }
}

export default OnboardingPage;
