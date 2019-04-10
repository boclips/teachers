import { Button, Checkbox, Col, Form, Input, Row } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import registrationLogo from '../../../resources/images/registration-logo.svg';
import wavingHand from '../../../resources/images/waving-hand.png';
import {
  createAccount,
  CreateAccountRequest,
} from '../../services/account/createAccount';
import AnalyticsFactory from '../../services/analytics/AnalyticsFactory';
import { Links } from '../../types/Links';
import State from '../../types/State';
import BlankTargetLink from '../common/BlankTargetLink';
import NotificationFactory from '../common/NotificationFactory';
import './CreateAccountForm.less';
import { extractReferralCode } from './extractReferralCode';
import { Recaptcha } from './recaptcha/Recaptcha';
import TwoColumnInlineForm from './TwoColumnInlineFormItem';

interface StateProps {
  links: Links;
  referralCode: string;
}

interface InternalState {
  showConfirmation: boolean;
  confirmDirty: boolean;
  creating: boolean;
  renderRecaptcha: boolean;
}

class RegistrationForm extends React.Component<
  StateProps & FormComponentProps,
  InternalState
> {
  public state = {
    showConfirmation: false,
    confirmDirty: false,
    creating: false,
    renderRecaptcha: true,
  };

  private handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll(
      (err, values: CreateAccountRequest) => {
        if (!err) {
          this.setState({ ...this.state, creating: true });
          createAccount(this.props.links, values)
            .then(() => {
              this.setState({ ...this.state, showConfirmation: true });
            })
            .catch(error => {
              if (error.response.status === 409) {
                NotificationFactory.error({
                  message: 'This email is already registered',
                  description:
                    'If you forgot your password, try to reset it instead.',
                });
              } else {
                NotificationFactory.error({
                  message: 'Ooops! Something went wrong...',
                  description: 'Please try again or contact our support team.',
                });
              }
              this.setState({
                ...this.state,
                creating: false,
                renderRecaptcha: true,
              });
            });
        }
      },
    );
  };

  private handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({
      ...this.state,
      confirmDirty: this.state.confirmDirty || !!value,
    });
  };

  private compareToFirstPassword = (_, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('The passwords are not the same');
    } else {
      callback();
    }
  };

  private validateToNextPassword = (_, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  public componentDidMount() {
    AnalyticsFactory.getInstance().trackAccountRegistration();
  }

  public render() {
    return this.state.showConfirmation
      ? this.renderConfirmation()
      : this.renderForm();
  }

  public renderConfirmation() {
    return (
      <section className="illustrated-page">
        <Row>
          <Col sm={{ span: 24 }} md={{ span: 8 }}>
            <section className="illustration">
              <img src={wavingHand} />
            </section>
          </Col>
          <Col sm={{ span: 24 }} md={{ span: 16 }}>
            <section className="message">
              <h1 className="big-title">Welcome to Boclips for teachers!</h1>
              <p>
                Thanks for registering. Please login to activate your account.
              </p>
              <p className="action">
                <Link to={'/'}>Click here to log in</Link>
              </p>
            </section>
          </Col>
        </Row>
      </section>
    );
  }

  public renderForm() {
    const { getFieldDecorator } = this.props.form;
    return (
      <section className="create-account-form__container">
        <Row>
          <Col xs={{ span: 0 }} lg={{ span: 12 }}>
            <img className="create-account__logo" src={registrationLogo} />
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 12 }}>
            <Form onSubmit={this.handleSubmit}>
              <h1 className="alt create-account-form__title">Create account</h1>

              <section className="create-account-form__form">
                <TwoColumnInlineForm
                  leftColumn={getFieldDecorator('firstName', {
                    rules: [
                      {
                        required: true,
                        message: 'Please enter your first name',
                      },
                    ],
                  })(
                    <Input
                      data-qa="first-name"
                      size="large"
                      placeholder="First name"
                      className="create-account-form__first-name"
                    />,
                  )}
                  rightColumn={getFieldDecorator('lastName', {
                    rules: [
                      {
                        required: true,
                        message: 'Please enter your last name',
                      },
                    ],
                  })(
                    <Input
                      data-qa="last-name"
                      size="large"
                      placeholder="Last name"
                      className="create-account-form__last-name"
                    />,
                  )}
                />

                <Form.Item>
                  {getFieldDecorator('subjects', {
                    rules: [],
                  })(
                    <Input
                      data-qa="subjects"
                      size="large"
                      placeholder="Subject(s) taught"
                    />,
                  )}
                </Form.Item>

                <Row>
                  <Col xs={{ span: 24 }} md={{ span: 16 }} xl={{ span: 16 }}>
                    <Form.Item>
                      {getFieldDecorator('email', {
                        rules: [
                          {
                            type: 'email',
                            message: 'The input is not valid email',
                          },
                          {
                            required: true,
                            message: 'Please enter your email',
                          },
                        ],
                      })(
                        <Input
                          data-qa="email"
                          size="large"
                          placeholder="Email"
                        />,
                      )}
                    </Form.Item>
                  </Col>
                </Row>

                <TwoColumnInlineForm
                  leftColumn={getFieldDecorator('password', {
                    rules: [
                      {
                        required: true,
                        min: 8,
                        message: 'Please enter at least 8 characters',
                      },
                      {
                        validator: this.validateToNextPassword,
                      },
                    ],
                  })(
                    <Input
                      data-qa="password"
                      size="large"
                      type="password"
                      placeholder="Password"
                    />,
                  )}
                  rightColumn={getFieldDecorator('confirm', {
                    rules: [
                      {
                        required: true,
                        message: 'Please confirm your password',
                      },
                      {
                        validator: this.compareToFirstPassword,
                      },
                    ],
                  })(
                    <Input
                      data-qa="password-confirm"
                      size="large"
                      type="password"
                      onBlur={this.handleConfirmBlur}
                      placeholder="Confirm password"
                    />,
                  )}
                />

                <Form.Item>
                  {getFieldDecorator('privacy_policy', {
                    rules: [
                      {
                        required: true,
                      },
                    ],
                  })(
                    <Checkbox
                      className="create-account-form__checkbox"
                      data-qa="privacy-policy"
                    >
                      I have read and agree with the Boclips{' '}
                      <BlankTargetLink
                        className="create-account-form__checkbox-link"
                        href="https://www.boclips.com/terms-and-conditions"
                      >
                        Terms and Conditions
                      </BlankTargetLink>
                      . Boclips will collect and process data as described in
                      the <PrivacyPolicyLink />.
                    </Checkbox>,
                  )}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator('hasOptedIntoMarketing', {
                    rules: [],
                    initialValue: false,
                  })(
                    <Checkbox className="create-account-form__checkbox">
                      I want to receive marketing information about Boclips's
                      similar products or services which may be of interest to
                      me in accordance with the <PrivacyPolicyLink />.
                    </Checkbox>,
                  )}
                </Form.Item>
                <p className="recaptcha-notice">
                  This site is protected by reCAPTCHA and the Google{' '}
                  <a href="https://policies.google.com/privacy">
                    Privacy Policy
                  </a>{' '}
                  and{' '}
                  <a href="https://policies.google.com/terms">
                    Terms of Service
                  </a>{' '}
                  apply.
                </p>
              </section>

              <div style={{ display: 'none' }}>
                <Form.Item>
                  {getFieldDecorator('referralCode', {
                    rules: [],
                    initialValue: this.props.referralCode,
                  })(<Input type="text" />)}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator('analyticsId', {
                    rules: [],
                    initialValue: AnalyticsFactory.getInstance().getId(),
                  })(<Input type="text" />)}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator('recaptchaToken', {
                    rules: [],
                    initialValue: '',
                  })(<Input type="text" />)}
                </Form.Item>
                {this.state.renderRecaptcha && (
                  <Recaptcha verifyCallback={this.updateRecaptchaToken} />
                )}
              </div>

              <Button
                data-qa="register-button"
                className="create-account-form__submit"
                size="large"
                type="primary"
                htmlType="submit"
                disabled={
                  this.state.creating ||
                  !this.props.form.getFieldValue('privacy_policy')
                }
                loading={this.state.creating}
              >
                Register
              </Button>
            </Form>
            <p className="create-account-form__existing">
              Already have an account? <Link to={'/'}>Login</Link>
            </p>
          </Col>
        </Row>
      </section>
    );
  }

  private updateRecaptchaToken = recaptchaToken => {
    this.props.form.setFieldsValue({ recaptchaToken });
    this.setState({ renderRecaptcha: false });
  };
}

function mapStateToProps(state: State): StateProps {
  const queryParam = state.router.location.search;
  return {
    links: state.links,
    referralCode: extractReferralCode(queryParam),
  };
}

export default connect<StateProps, {}, {}>(
  mapStateToProps,
  null,
)(Form.create<StateProps>()(RegistrationForm));

const PrivacyPolicyLink = () => (
  <BlankTargetLink
    className="create-account-form__checkbox-link"
    href="https://www.boclips.com/privacy-policy"
  >
    Privacy Policy
  </BlankTargetLink>
);
