import { Button, Col, Form, Icon, Input, Row } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import wavingHand from '../../../resources/images/waving-hand.png';
import {
  createAccount,
  CreateAccountRequest,
} from '../../services/account/createAccount';
import AnalyticsFactory from '../../services/analytics/AnalyticsFactory';
import { Links } from '../../types/Links';
import State from '../../types/State';
import NotificationFactory from '../common/NotificationFactory';
import './CreateAccountForm.less';
import { extractReferralCode } from './extractReferralCode';

interface StateProps {
  links: Links;
  referralCode: string;
}

interface InternalState {
  showConfirmation: boolean;
  confirmDirty: boolean;
  creating: boolean;
}

class RegistrationForm extends React.Component<
  StateProps & FormComponentProps,
  InternalState
> {
  public state = {
    showConfirmation: false,
    confirmDirty: false,
    creating: false,
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
              this.setState({ ...this.state, creating: false });
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
          <Col
            xs={{ span: 24 }}
            md={{ span: 14, push: 5 }}
            xl={{ span: 10, push: 7 }}
          >
            <Form onSubmit={this.handleSubmit}>
              <h1 className="alt create-account-form__title">
                Create an account
              </h1>

              <section className="create-account-form__form">
                <Form.Item>
                  {getFieldDecorator('firstName', {
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
                      prefix={<Icon type="user" />}
                      placeholder="First name"
                    />,
                  )}
                </Form.Item>

                <Form.Item>
                  {getFieldDecorator('lastName', {
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
                      prefix={<Icon type="user" />}
                      placeholder="Last name"
                    />,
                  )}
                </Form.Item>

                <Form.Item>
                  {getFieldDecorator('subjects', {
                    rules: [],
                  })(
                    <Input
                      data-qa="subjects"
                      size="large"
                      prefix={<Icon type="book" />}
                      placeholder="Subject(s) taught"
                    />,
                  )}
                </Form.Item>

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
                      prefix={<Icon type="mail" />}
                      placeholder="email"
                    />,
                  )}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator('password', {
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
                      prefix={<Icon type="lock" />}
                      type="password"
                      placeholder="Password"
                    />,
                  )}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator('confirm', {
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
                      prefix={<Icon type="lock" />}
                      type="password"
                      onBlur={this.handleConfirmBlur}
                      placeholder="Confirm password"
                    />,
                  )}
                </Form.Item>
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
              </div>

              <Button
                data-qa="register-button"
                className="create-account-form__submit"
                size="large"
                type="primary"
                htmlType="submit"
                disabled={this.state.creating}
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
