import { Button, Carousel, Col, Form, Row } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import { push } from 'connected-react-router';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import AnalyticsFactory from '../../../services/analytics/AnalyticsFactory';
import { RegistrationContext } from '../../../services/session/RegistrationContext';
import { RegistrationContextService } from '../../../services/session/RegistrationContextService';
import { onboardUser } from '../../../services/users/updateUser';
import { UserProfile } from '../../../services/users/UserProfile';
import { AgeRange } from '../../../types/AgeRange';
import { Country } from '../../../types/Country';
import { Links } from '../../../types/Links';
import State from '../../../types/State';
import { Subject } from '../../../types/Subject';
import { UsaState } from '../../../types/UsaState';
import NotificationFactory from '../../common/NotificationFactory';
import { fetchSubjectsAction } from '../../multipleSelect/redux/actions/fetchSubjectsAction';
import { updateUserAction } from '../accountSettings/redux/actions/updateUserAction';
import { AgeRangeForm } from '../form/AgeRangeForm';
import { CountriesForm } from '../form/CountriesForm';
import { MarketingAgreementForm } from '../form/MarketingAgreementForm';
import { NameForm } from '../form/NameForm';
import { PrivacyPolicyAgreementForm } from '../form/PrivacyPolicyAgreementForm';
import { SchoolForm, UNKNOWN_SCHOOL } from '../form/SchoolForm';
import { StatesForm } from '../form/StatesForm';
import { SubjectsForm } from '../form/SubjectsForm';
import SvgStep2 from './dwarf-with-pencil.svg';
import './OnboardingForm.less';
import { OnboardingProgressDots } from './OnboardingProgressDots';
import { fetchCountriesAction } from './redux/actions/fetchCountriesAction';
import SvgStep3 from './teacher-micromanaging.svg';
import SvgStep4 from './teacher-presenting.svg';
import SvgStep1 from './teachers-waving.svg';

const validationFields = [
  ['firstName', 'lastName'],
  ['ageRange', 'subjects'],
  ['country', 'state', 'schoolName', 'schoolId'],
  ['hasOptedIntoMarketing', 'privacyPolicy'],
];

interface OnboardingProps {
  links: Links;
  subjects: Subject[];
  countries: Country[];
  userProfile: UserProfile;
}

interface InternalState {
  updating: boolean;
  currentIndex: number;
  formCarousel: Carousel;
  imageCarousel: Carousel;
  numberOfSlides: number;
  visitedIndices: Set<number>;
  invisibleSlides: boolean[];
  country?: Country;
  state?: UsaState;
}

interface DispatchProps {
  fetchSubjects: () => void;
  fetchCountries: () => void;
  updateUser: () => void;
  goToHomepage: () => void;
}

class OnboardingForm extends React.Component<
  OnboardingProps & FormComponentProps & DispatchProps,
  InternalState
> {
  private formCarousel: Carousel;
  private imageCarousel: Carousel;

  public state = {
    updating: false,
    currentIndex: 0,
    formCarousel: null,
    imageCarousel: null,
    numberOfSlides: 0,
    visitedIndices: new Set(),
    invisibleSlides: [false, true, true, true],
    country: null,
    state: null,
  };

  public componentDidMount() {
    AnalyticsFactory.externalAnalytics().trackAccountRegistration();

    this.props.fetchSubjects();
    this.props.fetchCountries();
    this.setState({
      ...this.state,
      formCarousel: this.formCarousel,
      imageCarousel: this.imageCarousel,
      numberOfSlides: React.Children.toArray(this.imageCarousel.props.children)
        .length,
    });
  }

  public render() {
    return this.renderForm();
  }

  private beforeSlideChange = (prev, next) => {
    const invisibleSlides = [true, true, true, true];
    invisibleSlides[prev] = false;
    invisibleSlides[next] = false;

    this.setState({ ...this.state, invisibleSlides });
  };

  private afterSlideChange = currentIndex => {
    const invisibleSlides = [true, true, true, true];
    invisibleSlides[currentIndex] = false;

    const visitedIndices = new Set(this.state.visitedIndices);
    const previousIndex = currentIndex - 1;

    if (currentIndex > 0) {
      visitedIndices.add(previousIndex);

      if (!this.state.visitedIndices.has(previousIndex)) {
        AnalyticsFactory.externalAnalytics().trackOnboardingPageChanged(
          previousIndex,
        );
      }
    }

    this.setState({
      ...this.state,
      currentIndex,
      visitedIndices,
      invisibleSlides,
    });
  };

  public renderForm() {
    return (
      <section className="onboarding-form__container">
        <Row>
          <Col xs={{ span: 0 }} lg={{ span: 12 }}>
            <Carousel
              ref={imageCarousel => (this.imageCarousel = imageCarousel)}
              effect={'fade'}
              dots={false}
            >
              <SvgStep1 className="onboarding__logo" />
              <SvgStep2 className="onboarding__logo" />
              <SvgStep3 className="onboarding__logo" />
              <SvgStep4 className="onboarding__logo" />
            </Carousel>
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 12 }}>
            <span
              key={`counter-${this.state.currentIndex}`}
              className="onboarding-form__page-count"
            >
              {this.state.currentIndex + 1} of {this.state.numberOfSlides}
            </span>
            <Form
              onSubmit={this.handleSubmit}
              layout="vertical"
              data-qa="onboarding-form"
              className="onboarding-form__form"
            >
              <section className="onboarding-form__form-body">
                <Carousel
                  ref={formCarousel => (this.formCarousel = formCarousel)}
                  infinite={false}
                  asNavFor={this.state.imageCarousel}
                  dots={false}
                  swipe={false}
                  beforeChange={this.beforeSlideChange}
                  afterChange={this.afterSlideChange}
                >
                  <section
                    className={
                      this.state.invisibleSlides[0]
                        ? 'onboarding-form__slide__invisible'
                        : ''
                    }
                  >
                    <h1 className="alt onboarding-form__title big-title">
                      Hello
                    </h1>
                    <p className="onboarding-form__text">
                      Before you get started, we’d like to get to know you a bit
                      better to help you get the most out of Boclips for
                      Teachers.
                    </p>
                    <NameForm form={this.props.form} />
                    <p className="onboarding-form__notes">
                      <span className={'onboarding-form__asterisk'}>*</span>{' '}
                      Required field
                    </p>
                  </section>
                  <section
                    className={
                      this.state.invisibleSlides[1]
                        ? 'onboarding-form__slide__invisible'
                        : ''
                    }
                  >
                    <h1 className="alt onboarding-form__title big-title">
                      Your students
                    </h1>
                    <p className="onboarding-form__text">
                      Tell us what you teach so we can help you find the most
                      relevant videos for your classroom.
                    </p>
                    <SubjectsForm
                      label="Your subjects"
                      form={this.props.form}
                      subjects={this.props.subjects}
                      placeholder="Choose subjects"
                      initialValue={[]}
                    />
                    <AgeRangeForm
                      label="Your age groups"
                      form={this.props.form}
                    />
                  </section>
                  <section
                    className={
                      this.state.invisibleSlides[2]
                        ? 'onboarding-form__slide__invisible'
                        : ''
                    }
                  >
                    <h1 className="alt onboarding-form__title big-title">
                      Your school
                    </h1>
                    <p className="onboarding-form__text">
                      We'd like to know where you teach so that we can provide
                      your community with the most relevant resources.
                    </p>
                    <CountriesForm
                      label="Country"
                      form={this.props.form}
                      countries={this.props.countries}
                      placeholder="Choose country"
                      onCountryChange={this.onCountryChange}
                    />
                    {this.state.country &&
                      (this.state.country.id === 'USA' ? (
                        <section data-qa="usa-school-details">
                          <StatesForm
                            label="State"
                            form={this.props.form}
                            states={this.state.country.states}
                            placeholder="Choose state"
                            onStateChange={this.onStateChange}
                          />
                          <SchoolForm
                            form={this.props.form}
                            country={this.state.country}
                            placeholder="Enter the name of your school"
                            label="School"
                            state={this.state.state}
                            allowUnknownSchools={false}
                          />
                        </section>
                      ) : (
                        <section data-qa="non-usa-school-details">
                          <SchoolForm
                            form={this.props.form}
                            country={this.state.country}
                            placeholder="Enter the name of your school"
                            label="School"
                            allowUnknownSchools={true}
                          />
                        </section>
                      ))}
                  </section>
                  <section
                    className={
                      this.state.invisibleSlides[3]
                        ? 'onboarding-form__slide__invisible'
                        : ''
                    }
                  >
                    <h1 className="alt onboarding-form__title big-title">
                      Almost there!
                    </h1>
                    <p className="onboarding-form__text">
                      We’d love to find out about your experience using Boclips
                      for Teachers. To do this, we’d like to ask for your
                      opinion and send you information about our new features
                      and similar products or services which may be of interest
                      to you.
                    </p>
                    <MarketingAgreementForm form={this.props.form} />
                    <PrivacyPolicyAgreementForm form={this.props.form} />
                  </section>
                </Carousel>
                <OnboardingProgressDots
                  numberOfSteps={this.state.numberOfSlides}
                  currentStep={this.state.currentIndex + 1}
                />
              </section>
              {!this.isFirstSlide() && (
                <Button
                  data-qa="onboard-back-button"
                  className="onboarding-form__back"
                  size="large"
                  onClick={this.back}
                >
                  Back
                </Button>
              )}

              {this.isLastSlide() ? (
                <Button
                  data-qa="onboard-submit-button"
                  className="onboarding-form__submit"
                  size="large"
                  type="primary"
                  onClick={this.handleSubmit}
                >
                  Finish
                </Button>
              ) : (
                <Button
                  data-qa="onboard-next-button"
                  className="onboarding-form__next"
                  size="large"
                  type="primary"
                  onClick={this.next}
                >
                  Next
                </Button>
              )}
            </Form>
          </Col>
        </Row>
      </section>
    );
  }

  private isLastSlide = () =>
    this.state.currentIndex === this.state.numberOfSlides - 1;

  private isFirstSlide = () => this.state.currentIndex === 0;

  private back = () => {
    this.state.formCarousel.prev();
  };

  private next = () => {
    const currentIndex = this.state.currentIndex;

    this.props.form.validateFieldsAndScroll(
      validationFields[currentIndex],
      validationErrors => {
        if (!validationErrors) {
          this.state.formCarousel.next();
        }
      },
    );
  };

  private onCountryChange = country => {
    return this.setState({ ...this.state, country });
  };

  private onStateChange = state => {
    return this.setState({ ...this.state, state });
  };

  private handleSubmit = () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const registrationContext: RegistrationContext = RegistrationContextService.retrieve();
        const ageRanges = (values.ageRange as string[]).map(it =>
          AgeRange.decodeJSON(it),
        );
        const ages = AgeRange.extractContainedAges(ageRanges);

        this.setState({ ...this.state, updating: true });
        onboardUser(
          this.props.links,
          {
            firstName: values.firstName,
            lastName: values.lastName,
            ages,
            subjects: values.subjects,
            country: values.country,
            state: values.state,
            schoolName: values.schoolName,
            schoolId:
              values.schoolId === UNKNOWN_SCHOOL ? null : values.schoolId,
            hasOptedIntoMarketing: values.hasOptedIntoMarketing,
            referralCode:
              registrationContext && registrationContext.referralCode,
            utm: registrationContext && registrationContext.utm,
          },
          this.props.userProfile.email,
        )
          .then(() => {
            this.props.goToHomepage();
            this.props.updateUser();
          })
          .catch(ex => {
            console.error(ex);
            NotificationFactory.error({
              message: 'Ooops! Something went wrong...',
              description: 'Please try again or contact our support team.',
            });

            this.setState({
              ...this.state,
              updating: false,
            });
          });
      } else {
        this.setState({
          ...this.state,
        });
      }
    });
  };
}

function mapStateToProps(state: State): OnboardingProps {
  return {
    links: state.links,
    subjects: state.subjects,
    countries: state.countries,
    userProfile: state.user,
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    fetchSubjects: () => dispatch(fetchSubjectsAction()),
    fetchCountries: () => dispatch(fetchCountriesAction()),
    updateUser: () => dispatch(updateUserAction()),
    goToHomepage: () => dispatch(push('/')),
  };
}

export default connect<OnboardingProps, DispatchProps, {}>(
  mapStateToProps,
  mapDispatchToProps,
)(Form.create<OnboardingProps & FormComponentProps>()(OnboardingForm));
