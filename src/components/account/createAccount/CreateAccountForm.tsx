import { Button, Col, Input, Row, Form } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { requestAuthentication } from 'src/app/redux/authentication/actions/requestAuthentication';
import GoogleSVG from '../../../../resources/images/google.svg';
import MicrosoftSVG from '../../../../resources/images/office-365.svg';
import RegistrationLogoSVG from '../../../../resources/images/registration-logo.svg';
import { requestSsoAuthentication } from '../../../app/redux/authentication/actions/requestSsoAuthentication';
import {
  createAccount,
  CreateAccountRequest,
} from '../../../services/account/createAccount';
import { RegistrationContext } from '../../../services/session/RegistrationContext';
import { RegistrationContextService } from '../../../services/session/RegistrationContextService';
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
import { LoginLink } from './LoginLink';
import { PasswordForm } from './PasswordForm';
import { Recaptcha } from './recaptcha/Recaptcha';

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

const CreateAccountForm = () => {
  const [creating, setCreating] = useState<boolean>(false);
  const [renderRecaptcha, setRenderRecaptcha] = useState<boolean>(true);
  const [screenReaderErrors, setScreenReaderErrors] = useState<
    ScreenReaderError[] | null
  >(null);

  const queryParam = useSelector(
    (state: State) => state.router.location.search,
  );

  const links = useSelector((state: State) => state.links.entries);
  const referralCode = extractQueryParam(queryParam, 'REFERRALCODE');
  const utm = extractUtmParams(queryParam);

  const dispatch = useDispatch();

  useEffect(() => {
    const registrationContext: RegistrationContext = {
      referralCode,
      utm,
    };

    RegistrationContextService.store(registrationContext);
  }, [referralCode, utm]);

  const handleGoogleSsoLogin = () => {
    dispatch(requestSsoAuthentication('google'));
  };

  const handleMicrosoftSsoLogin = () => {
    dispatch(requestSsoAuthentication('microsoft'));
  };

  const onSuccesfulRegistration = (username: string, password: string) => {
    dispatch(
      requestAuthentication({
        authenticationRequired: true,
        username,
        password,
      }),
    );
  };

  const updateRecaptchaToken = (recaptchaToken) => {
    form.setFieldsValue({ recaptchaToken });
    setRenderRecaptcha(false);
  };

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    form
      .validateFields()
      .then((values: CreateAccountRequest) => {
        setCreating(true);
        createAccount(links, values)
          .then(() => {
            onSuccesfulRegistration(values.email, values.password);
          })
          .catch((error) => {
            if (error && error.response.status === 409) {
              handleUserExists();
            } else {
              handleError();
            }
            setCreating(false);
            setRenderRecaptcha(true);
          });
      })
      .catch((err) => {
        setScreenReaderErrors(transformErrors(err));
      });
  };

  const [form] = Form.useForm();

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
          {screenReaderErrors && (
            <ScreenReaderErrors errors={screenReaderErrors} />
          )}
          <Form form={form}>
            <h1 className="alt create-account-form__title">Create account</h1>

            <section className="create-account-form__form">
              <Form.Item
                label="Work Email:"
                required={false}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 18 }}
                className="email-form__container"
                name="email"
                rules={[
                  {
                    type: 'email',
                    message: 'The input is not valid email',
                  },
                  {
                    required: true,
                    message: 'Please enter your email',
                  },
                ]}
                colon
              >
                <Input
                  data-qa="email"
                  size="large"
                  placeholder="Enter your email"
                  aria-required
                />
              </Form.Item>
              <PasswordForm />
            </section>

            <div style={{ display: 'none' }}>
              <Form.Item name="recaptchaToken" initialValue="">
                <Input type="text" />
              </Form.Item>
              {renderRecaptcha && (
                <Recaptcha verifyCallback={updateRecaptchaToken} />
              )}
            </div>

            <Button
              data-qa="register-button"
              className="create-account-form__button create-account-form__submit"
              size="large"
              type="primary"
              htmlType="submit"
              disabled={creating}
              loading={creating}
              onClick={handleSubmit}
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
              <Col sm={24} md={24}>
                <Button
                  data-qa="google-button"
                  className="create-account-form__button create-account-form__social-button"
                  size="large"
                  type="primary"
                  htmlType="submit"
                  disabled={creating}
                  loading={creating}
                  onClick={handleGoogleSsoLogin}
                >
                  <span className="create-account-form__social-button-icon">
                    <GoogleSVG aria-hidden />
                  </span>
                  <span>Continue with Google</span>
                </Button>
              </Col>

              <Col sm={24} md={24}>
                <Button
                  data-qa="microsoft-button"
                  className="create-account-form__button create-account-form__social-button"
                  size="large"
                  type="primary"
                  htmlType="submit"
                  disabled={creating}
                  loading={creating}
                  onClick={handleMicrosoftSsoLogin}
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
};

export default CreateAccountForm;
