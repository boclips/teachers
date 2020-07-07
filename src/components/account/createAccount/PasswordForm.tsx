import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Form, Input } from 'antd';
import React from 'react';
import ErrorSvg from '../../../../resources/images/validation-error.svg';
import SuccessSvg from '../../../../resources/images/validation-success.svg';
import './PasswordForm.less';

interface State {
  show: boolean;
}

interface Constraint {
  regex: RegExp;
  label: React.ReactNode;
}

export class PasswordForm extends React.Component<{}, State> {
  private constraints: Constraint[] = [
    {
      regex: /^(.){8,}$/,
      label: '8 characters',
    },
    {
      regex: /(?=.*[A-Z])/,
      label: '1 uppercase',
    },
    {
      regex: /(?=.*[\d])/,
      label: '1 number',
    },
    {
      regex: /(?=.*[a-z])/,
      label: '1 lowercase',
    },
  ];

  public constructor() {
    super(null);
  }

  private validatePassword = (_, value, callback) => {
    if (this.constraints.find((c) => !value.match(c.regex))) {
      callback(
        <section className="password-form__rules-container">
          Your password must have at least:
          <section data-qa="password-rules" className="password-form__rules">
            {this.constraints.map((c) => (
              <Criteria
                key={`criteria-${c.label}`}
                regex={c.regex}
                value={value}
              >
                {c.label}
              </Criteria>
            ))}
          </section>
        </section>,
      );
    } else {
      callback();
    }
  };

  public render() {
    return (
      <Form.Item
        label="Password:"
        required={false}
        className="password-form__container"
        colon
        name="password"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 18 }}
        rules={[
          {
            validator: this.validatePassword,
          },
        ]}
      >
        <Input.Password
          data-qa="password"
          size="large"
          className="password-form__input"
          placeholder="Enter your password"
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
        />
      </Form.Item>
    );
  }
}

interface CriteriaProps {
  regex: RegExp;
  value: string;
  children: React.ReactNode;
}

function Criteria({ regex, children, value }: CriteriaProps) {
  const valid = value.match(regex);
  return (
    <section
      data-qa="password-rule"
      className={`password-form__rule ${
        valid ? 'password-form__rule__valid' : 'password-form__rule__error'
      }`}
    >
      <section data-qa={valid ? 'password-success' : 'password-error'}>
        {valid ? <SuccessSvg aria-hidden /> : <ErrorSvg aria-hidden />}
        {children}
      </section>
    </section>
  );
}
