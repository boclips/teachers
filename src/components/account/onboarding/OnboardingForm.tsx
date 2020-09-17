import { Carousel, Col, Row, Form } from 'antd';

import React, { useRef, useState } from 'react';
import { OnboardingProgressDots } from 'src/components/account/onboarding/OnboardingProgressDots';
import { OnboardingSection } from 'src/components/account/onboarding/OnboardingSection';
import { NameForm } from 'src/components/account/form/NameForm';
import { RoleForm } from 'src/components/account/form/RoleForm';
import { ScreenReaderError } from 'src/components/common/a11y/ScreenReaderErrors';
import { transformErrors } from 'src/components/account/form/FormHelper';
import { SubjectsForm } from 'src/components/account/form/SubjectsForm';
import { AgeRangeForm } from 'src/components/account/form/AgeRangeForm';
import { MarketingAgreementForm } from 'src/components/account/form/MarketingAgreementForm';
import { PrivacyPolicyAgreementForm } from 'src/components/account/form/PrivacyPolicyAgreementForm';
import { SchoolDetailsForm } from 'src/components/account/onboarding/SchoolDetailsForm';
import { OnboardingButtons } from 'src/components/account/onboarding/OnboardingButtons';
import { OnboardingStepsIndicator } from 'src/components/account/onboarding/OnboardingStepsIndicator';
import { RegistrationContext } from 'src/services/session/RegistrationContext';
import { RegistrationContextService } from 'src/services/session/RegistrationContextService';
import { onboardUser, UpdateUserRequest } from 'src/services/users/updateUser';
import NotificationFactory from 'src/components/common/NotificationFactory';
import { useDispatch, useSelector } from 'react-redux';
import State from 'src/types/State';
import { updateUserAction } from 'src/components/account/accountSettings/redux/actions/updateUserAction';
import { push } from 'connected-react-router';
import {
  OnboardingFormValues,
  OnboardingSections,
} from 'src/components/account/onboarding/OnboardingFormValues';
import AnalyticsFactory from 'src/services/analytics/AnalyticsFactory';
import { PlatformInteractionType } from 'src/services/analytics/boclips/PlatformInteractionType';
import './OnboardingForm.less';
import { OnboardingIllustration } from 'src/components/account/onboarding/OnboardingIllustration';
import { convertFormValues } from 'src/components/account/onboarding/convertOnboardingFormValues';
import { fetchPageableCollectionsAction } from 'src/components/collection/redux/actions/fetchPageableCollectionsAction';

const getFormId = (name: keyof OnboardingFormValues): string => name;

export const OnboardingForm = () => {
  const links = useSelector((state: State) => state.links.entries);
  const imageCarousel = useRef<Carousel>();
  const formCarousel = useRef<Carousel>();
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const [section, setSection] = useState(OnboardingSections[0]);
  const [farthestVisitedPage, setFarthestVisitedPage] = useState(-1);
  const [role, setRole] = useState<string>(null);

  const [screenReaderErrors, setScreenReaderErrors] = useState<
    ScreenReaderError[]
  >([]);

  const stepBack = () => formCarousel.current.prev();
  const stepForward = () => {
    form
      .validateFields(section.fields)
      .then(() => formCarousel.current.next())
      .catch((errorInfo) => {
        setScreenReaderErrors(transformErrors(errorInfo.errorFields));
      });
  };
  const onSubmit = (values: OnboardingFormValues) => {
    const registrationContext: RegistrationContext = RegistrationContextService.retrieve();
    const userValues: Partial<UpdateUserRequest> = convertFormValues(values);

    onboardUser(links, {
      ...userValues,
      referralCode: registrationContext?.referralCode,
      utm: registrationContext?.utm,
    })
      .then(() => {
        dispatch(updateUserAction());
        dispatch(fetchPageableCollectionsAction({ key: 'myCollections' }));
        dispatch(push('/'));
      })
      .catch((ex) => {
        console.error(ex);
        NotificationFactory.generalError();
      });
  };

  const onSubmitFailed = (errorInfo) =>
    setScreenReaderErrors(transformErrors(errorInfo.errorFields));

  const afterCarouselChange = (index: number) => {
    if (index > farthestVisitedPage) {
      AnalyticsFactory.externalAnalytics().trackOnboardingPageChanged(
        index - 1,
      );
      AnalyticsFactory.internalAnalytics().trackPlatformInteraction(
        PlatformInteractionType[`ONBOARDING_PAGE_${index + 1}_STARTED`],
        true,
      );
      setFarthestVisitedPage(index);
    }
    setSection(OnboardingSections[index]);
  };

  return (
    <section className="onboarding-form__container">
      <Row>
        <Col
          xs={{ span: 0 }}
          lg={{ span: 12 }}
          className="onboarding__illustrations"
        >
          <Carousel ref={imageCarousel} effect="fade" dots={false}>
            {OnboardingSections.map((onboardingSection) => (
              <OnboardingIllustration
                key={onboardingSection.pageIndex}
                section={onboardingSection}
              />
            ))}
          </Carousel>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 12 }}>
          <OnboardingStepsIndicator
            page={section.pageIndex}
            total={OnboardingSections.length}
          />
          <Form
            form={form}
            layout="vertical"
            className="onboarding-form__form"
            onFinish={onSubmit}
            onFinishFailed={onSubmitFailed}
          >
            <section className="onboarding-form__form-body">
              <Carousel
                ref={formCarousel}
                asNavFor={imageCarousel.current as any}
                dots={false}
                swipe={false}
                infinite={false}
                effect="scrollx"
                afterChange={(index) => afterCarouselChange(index)}
              >
                <OnboardingSection
                  section={OnboardingSections[0]}
                  screenReaderErrors={screenReaderErrors}
                  visibleIndex={section.pageIndex}
                >
                  <NameForm
                    firstNameFormItemId={getFormId('firstName')}
                    lastNameFormItemId={getFormId('lastName')}
                  />
                  <RoleForm formItemId={getFormId('role')} onChange={setRole} />
                </OnboardingSection>
                <OnboardingSection
                  section={OnboardingSections[1]}
                  screenReaderErrors={screenReaderErrors}
                  visibleIndex={section.pageIndex}
                >
                  <SubjectsForm
                    formItemId={getFormId('subjects')}
                    label="Your subjects"
                    placeholder="Choose subjects"
                  />
                  <AgeRangeForm
                    formItemId={getFormId('ageRange')}
                    label="Your age groups"
                  />
                </OnboardingSection>
                <OnboardingSection
                  section={OnboardingSections[2]}
                  screenReaderErrors={screenReaderErrors}
                  visibleIndex={section.pageIndex}
                >
                  <SchoolDetailsForm
                    role={role}
                    countryFormItemId={getFormId('country')}
                    schoolIdFormItemId={getFormId('schoolId')}
                    schoolNameFormItemId={getFormId('schoolName')}
                    stateFormItemId={getFormId('state')}
                  />
                </OnboardingSection>
                <OnboardingSection
                  section={OnboardingSections[3]}
                  screenReaderErrors={screenReaderErrors}
                  visibleIndex={section.pageIndex}
                >
                  <MarketingAgreementForm
                    formItemId={getFormId('hasOptedIntoMarketing')}
                  />
                  <PrivacyPolicyAgreementForm
                    formItemId={getFormId('privacyPolicy')}
                  />
                </OnboardingSection>
              </Carousel>
              <OnboardingProgressDots
                numberOfPages={OnboardingSections.length}
                page={section.pageIndex}
              />
            </section>
            <OnboardingButtons
              page={section.pageIndex}
              numberOfPages={OnboardingSections.length}
              stepBack={stepBack}
              stepForward={stepForward}
            />
          </Form>
        </Col>
      </Row>
    </section>
  );
};
