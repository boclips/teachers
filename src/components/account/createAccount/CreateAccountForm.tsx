import { Form } from '@ant-design/compatible';
import { Button, Col, Input, Row } from 'antd';
import { FormComponentProps } from '@ant-design/compatible/es/form';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { requestAuthentication } from 'src/app/redux/authentication/actions/requestAuthentication';
import GoogleSVG from '../../../../resources/images/google.svg';
import MicrosoftSVG from '../../../../resources/images/office-365.svg';
import RegistrationLogoSVG from '../../../../resources/images/registration-logo.svg';
import { requestSsoAuthentication } from '../../../app/redux/authentication/actions/requestSsoAuthentication';
import {
  createAccount,
  CreateAccountRequest,
} from '../../../services/account/createAccount';
import Utm from '../../../services/account/Utm';
import { RegistrationContext } from '../../../services/session/RegistrationContext';
import { RegistrationContextService } from '../../../services/session/RegistrationContextService';
import { Links } from '../../../types/Links';
import State from '../../../types/State';
import {
  ScreenReaderError,
  ScreenReaderErrors,
} from '../../common/a11y/ScreenReaderErrors';
import { transformErrors } from '../form/FormHelper';
import { extractQueryParam } from '../referral/extractQueryParam';
import { CaptchaNotice } from './CaptchaNotice';
import './CreateAccountForm.less';
import { handleError, handleUserExists } from './createAccountHelpers';
import { EmailForm } from './EmailForm';
import { LoginLink } from './LoginLink';
import { PasswordForm } from './PasswordForm';
import { Recaptcha } from './recaptcha/Recaptcha';

interface CreateAccountProps {
  links: Links;
  referralCode: string;
  utm: Utm;
}

interface InternalState {
  confirmDirty: boolean;
  creating: boolean;
  renderRecaptcha: boolean;
  screenReaderErrors: ScreenReaderError[];
}

interface DispatchProps {
  onSsoLogin: (idpHint: string) => void;
  onSuccesfulRegistration: (username: string, password: string) => void;
}

class CreateAccountForm extends React.Component<
  CreateAccountProps & FormComponentProps & DispatchProps,
  InternalState
> {
  constructor(props) {
    super(props);
    this.state = {
      confirmDirty: false,
      creating: false,
      renderRecaptcha: true,
      screenReaderErrors: null,
    };
  }

  public componentDidMount() {
    const registrationContext: RegistrationContext = {
      referralCode: this.props.referralCode,
      utm: this.props.utm,
    };

    RegistrationContextService.store(registrationContext);
  }

  private updateRecaptchaToken = (recaptchaToken) => {
    this.props.form.setFieldsValue({ recaptchaToken });
    this.setState({ renderRecaptcha: false });
  };

  private handleGoogleSsoLogin = () => {
    this.props.onSsoLogin('google');
  };

  private handleMicrosoftSsoLogin = () => {
    this.props.onSsoLogin('microsoft');
  };

  private handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    this.props.form.validateFieldsAndScroll(
      (err, values: CreateAccountRequest) => {
        if (!err) {
          this.setState((state) => ({
            ...state,
            creating: true,
          }));
          createAccount(this.props.links, values)
            .then(() => {
              this.props.onSuccesfulRegistration(values.email, values.password);
            })
            .catch((error) => {
              if (error && error.response.status === 409) {
                handleUserExists();
              } else {
                handleError();
              }

              this.setState((state) => ({
                ...state,
                creating: false,
                renderRecaptcha: true,
              }));
            });
        } else {
          this.setState((state) => ({
            ...state,
            screenReaderErrors: transformErrors(err),
          }));
        }
      },
    );
  };

  public render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <section
        className="create-account-form__container"
        data-qa="create-account-form"
      >
        <Row>
          <Col xs={{ span: 0 }} lg={{ span: 12 }}>
            <RegistrationLogoSVG className="create-account__logo" />
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 12 }}>
            {this.state.screenReaderErrors && (
              <ScreenReaderErrors errors={this.state.screenReaderErrors} />
            )}

            <Form onSubmit={this.handleSubmit} colon>
              <h1 className="alt create-account-form__title">Create account</h1>

              <section className="create-account-form__form">
                <EmailForm form={this.props.form} />
                <PasswordForm form={this.props.form} />
              </section>

              <div style={{ display: 'none' }}>
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
                className="create-account-form__button create-account-form__submit"
                size="large"
                type="primary"
                htmlType="submit"
                disabled={this.state.creating}
                loading={this.state.creating}
              >
                Create account
              </Button>
            </Form>
            <LoginLink />

            <section className="create-account-form__divider-container">
              <span className="create-account-form__divider-label">or</span>
              <hr className="create-account-form__divider" />
            </section>

            <section className="create-account-form__social-buttons-container">
              <Row gutter={16}>
                <Col sm={24} md={12}>
                  <Button
                    data-qa="google-button"
                    className="create-account-form__button create-account-form__social-button"
                    size="large"
                    type="primary"
                    htmlType="submit"
                    disabled={this.state.creating}
                    loading={this.state.creating}
                    onClick={this.handleGoogleSsoLogin}
                  >
                    <span className="create-account-form__social-button-icon">
                      <GoogleSVG aria-hidden />
                    </span>
                    <span>Continue with Google</span>
                  </Button>
                </Col>
                <Col>
                  <Button
                    data-qa="google-button"
                    className="create-account-form__button create-account-form__social-button"
                    size="large"
                    type="primary"
                    htmlType="submit"
                    disabled={this.state.creating}
                    loading={this.state.creating}
                    onClick={this.handleGoogleSsoLogin}
                  >
                    <span className="create-account-form__social-button-icon">
                      <GoogleSVG aria-hidden />
                    </span>
                    <span>Continue with Google</span>
                  </Button>
                </Col>
                <Col sm={24} md={12}>
                  <li className="create-account-form__social-buttons-list-item">
                    <Button
                      data-qa="microsoft-button"
                      className="create-account-form__button create-account-form__social-button"
                      size="large"
                      type="primary"
                      htmlType="submit"
                      disabled={this.state.creating}
                      loading={this.state.creating}
                      onClick={this.handleMicrosoftSsoLogin}
                    >
                      <span className="create-account-form__social-button-icon">
                        <MicrosoftSVG aria-hidden />
                      </span>
                      <span>Continue with Office 365</span>
                    </Button>
                  </li>
                  <Button
                    data-qa="microsoft-button"
                    className="create-account-form__button create-account-form__social-button"
                    size="large"
                    type="primary"
                    htmlType="submit"
                    disabled={this.state.creating}
                    loading={this.state.creating}
                    onClick={this.handleMicrosoftSsoLogin}
                  >
                    <span className="create-account-form__social-button-icon">
                      <MicrosoftSVG aria-hidden />
                    </span>
                    <span>Continue with Office 365</span>
                  </Button>
                </Col>
              </Row>
            </section>

            <section className="create-account-form__recaptcha">
              <CaptchaNotice />
            </section>
          </Col>
        </Row>
      </section>
    );
  }
}

function mapStateToProps(state: State): CreateAccountProps {
  const queryParam = state.router.location.search;

  const utm = extractUtmParams(queryParam);

  return {
    links: state.links.entries,
    referralCode: extractQueryParam(queryParam, 'REFERRALCODE'),
    utm,
  };
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
  return {
    onSsoLogin: (idpHint: string) =>
      dispatch(requestSsoAuthentication(idpHint)),
    onSuccesfulRegistration: (username: string, password: string) =>
      dispatch(
        requestAuthentication({
          authenticationRequired: true,
          username,
          password,
        }),
      ),
  };
}

const extractUtmParams = (queryParam) => {
  const source = extractQueryParam(queryParam, 'utm_source');
  const term = extractQueryParam(queryParam, 'utm_term');
  const medium = extractQueryParam(queryParam, 'utm_medium');
  const campaign = extractQueryParam(queryParam, 'utm_campaign');
  const content = extractQueryParam(queryParam, 'utm_content');

  if (source || term || medium || campaign || content) {
    return {
      ...(source && { source }),
      ...(term && { term }),
      ...(medium && { medium }),
      ...(campaign && { campaign }),
      ...(content && { content }),
    };
  }
  return undefined;
};

export default connect<CreateAccountProps, {}, {}>(
  mapStateToProps,
  mapDispatchToProps,
)(Form.create<CreateAccountProps & FormComponentProps>()(CreateAccountForm));
