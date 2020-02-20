import { mount, ReactWrapper } from 'enzyme';
import { createMemoryHistory } from 'history';
import React from 'react';
import App from '../../src/app/App';
import { OnboardingFormHelper } from '../../src/components/account/onboarding/OnboardingFormHelper';
import { findOne } from '../enzymeHelpers';
import eventually from '../eventually';

export class OnboardingPage {
  public constructor(public wrapper: ReactWrapper) {}

  public static async navigateToOnboarding() {
    const page = new OnboardingPage(
      mount(
        <App
          history={createMemoryHistory({
            initialEntries: [`/onboarding`],
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
      mount(
        <App
          history={createMemoryHistory({
            initialEntries: [`/`],
          })}
          apiPrefix="https://api.example.com"
        />,
      ),
    );

    await page.hasLoaded();
    return page;
  }

  private async hasLoaded() {
    await eventually(() => {
      this.wrapper = this.wrapper.update();
      findOne(this.wrapper, 'onboarding-page');
    });
  }

  public setName(firstName: string, lastName: string) {
    OnboardingFormHelper.editName(this.wrapper, firstName, lastName);
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

  public setMarketingOptIn(optIn: boolean) {
    OnboardingFormHelper.setMarketingOptIn(this.wrapper, optIn);
  }

  public setAgreeTerms(accept: boolean) {
    OnboardingFormHelper.setTermsAndConditions(this.wrapper, accept);
  }

  public save() {
    OnboardingFormHelper.save(this.wrapper);
  }

  public setAgeRanges(ageRanges: string[]) {
    OnboardingFormHelper.editAgeRange(this.wrapper, ageRanges);
  }

  public async hasRedirectedToHome() {
    await eventually(() => {
      this.wrapper = this.wrapper.update();
      findOne(this.wrapper, 'home-page');
    });
  }
}
