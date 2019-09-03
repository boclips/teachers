import { Button, Carousel, Col, Form, Row } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import { push } from 'connected-react-router';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import AnalyticsFactory from '../../../services/analytics/AnalyticsFactory';
import { RegistrationContext } from '../../../services/session/RegistrationContext';
import { RegistrationContextService } from '../../../services/session/RegistrationContextService';
import updateUser from '../../../services/users/updateUser';
import { UserProfile } from '../../../services/users/UserProfile';
import { AgeRange } from '../../../types/AgeRange';
import { Country } from '../../../types/Country';
import { Links } from '../../../types/Links';
import State from '../../../types/State';
import { Subject } from '../../../types/Subject';
import NotificationFactory from '../../common/NotificationFactory';
import { fetchSubjectsAction } from '../../multipleSelect/redux/actions/fetchSubjectsAction';
import { fetchCountriesAction } from '../createAccount/redux/actions/fetchCountriesAction';
import { AgeRangeForm } from '../form/AgeRangeForm';
import { CountriesForm } from '../form/CountriesForm';
import { MarketingAgreementForm } from '../form/MarketingAgreementForm';
import { NameForm } from '../form/NameForm';
import { PrivacyPolicyAgreementForm } from '../form/PrivacyPolicyAgreementForm';
import { SubjectsForm } from '../form/SubjectsForm';
import SvgStep2 from './dwarf-with-pencil.svg';
import './OnboardingForm.less';
import { OnboardingProgressDots } from './OnboardingProgressDots';
import SvgStep3 from './teacher-micromanaging.svg';
import SvgStep4 from './teacher-presenting.svg';
import SvgStep1 from './teachers-waving.svg';

const validationFields = [
  ['firstName', 'lastName'],
  ['ageRange', 'subjects'],
  ['country'],
  ['hasOptedIntoMarketing', 'privacyPolicy'],
];

interface OnboardingProps {
  links: Links;
  subjects: Subject[];
  countries: Country[];
  ageRanges: AgeRange[];
  userProfile: UserProfile;
}

interface InternalState {
  updating: boolean;
  currentIndex: number;
  formCarousel: Carousel;
  imageCarousel: Carousel;
  numberOfSlides: number;
  visitedIndices: Set<number>;
}

interface DispatchProps {
  fetchSubjects: () => void;
  fetchCountries: () => void;
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
  };

  public componentDidMount() {
    AnalyticsFactory.getInstance().trackAccountRegistration();

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
                >
                  <section>
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
                  <section>
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
                      ageRanges={this.props.ageRanges}
                    />
                  </section>
                  <section>
                    <h1 className="alt onboarding-form__title big-title">
                      Your school
                    </h1>
                    <p className="onboarding-form__text">
                      We'd like to know where you teach so that we can provide
                      your community with the most relevant resources.
                    </p>
                    <CountriesForm
                      label="Your country"
                      form={this.props.form}
                      countries={this.props.countries}
                      placeholder="Choose country"
                    />
                  </section>
                  <section>
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
                  data-qa="onboard-button"
                  className="onboarding-form__submit"
                  size="large"
                  type="primary"
                  htmlType="submit"
                  disabled={this.state.updating}
                  loading={this.state.updating}
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
    this.state.currentIndex === this.state.numberOfSlides;

  private isFirstSlide = () => this.state.currentIndex === 0;

  private back = () => {
    this.setState({
      ...this.state,
      currentIndex: --this.state.currentIndex,
    });
    this.state.formCarousel.prev();
  };

  private next = () => {
    const currentIndex = this.state.currentIndex;
    const nextIndex = currentIndex + 1;
    this.props.form.validateFieldsAndScroll(
      validationFields[currentIndex],
      validationErrors => {
        if (!validationErrors) {
          const visitedIndices = new Set(this.state.visitedIndices);
          if (!this.state.visitedIndices.has(currentIndex)) {
            AnalyticsFactory.getInstance().trackOnboardingPageChanged(
              currentIndex,
            );

            visitedIndices.add(currentIndex);
          }

          this.setState({
            ...this.state,
            currentIndex: nextIndex,
            visitedIndices,
          });

          this.state.formCarousel.next();
        }
      },
    );
  };

  private handleSubmit = e => {
    e.preventDefault();
    if (e.stopPropagation) {
      e.stopPropagation();
    }

    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const registrationContext: RegistrationContext = RegistrationContextService.retrieve();

        this.setState({ ...this.state, updating: true });
        updateUser(this.props.links, {
          ...this.props.userProfile,
          firstName: values.firstName,
          lastName: values.lastName,
          ages: values.ageRange,
          subjects: values.subjects,
          country: values.country,
          hasOptedIntoMarketing: values.hasOptedIntoMarketing,
          referralCode: registrationContext && registrationContext.referralCode,
          utm: registrationContext && registrationContext.utm,
        })
          .then(() => {
            this.props.goToHomepage();
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
    ageRanges: state.ageRanges,
    userProfile: state.user,
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    fetchSubjects: () => dispatch(fetchSubjectsAction()),
    fetchCountries: () => dispatch(fetchCountriesAction()),
    goToHomepage: () => dispatch(push('/')),
  };
}

export default connect<OnboardingProps, DispatchProps, {}>(
  mapStateToProps,
  mapDispatchToProps,
)(Form.create<OnboardingProps & FormComponentProps>()(OnboardingForm));
