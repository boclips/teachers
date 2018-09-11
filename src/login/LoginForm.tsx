import { Icon } from 'antd';
import Button from 'antd/lib/button/button';
import { FormComponentProps } from 'antd/lib/form';
import Form from 'antd/lib/form/Form';
import Input from 'antd/lib/input/Input';
import * as React from 'react';
import { UserCredentials } from './UserCredentials';

const FormItem = Form.Item;
export interface LoginProps {
  onSubmit: (userCredentials: UserCredentials) => void;
}

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class LoginForm extends React.Component<FormComponentProps & LoginProps> {
  public componentDidMount() {
    this.props.form.validateFields();
  }

  public handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onSubmit(values);
      }
    });
  };

  public render() {
    const {
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched,
    } = this.props.form;

    const usernameError =
      isFieldTouched('username') && getFieldError('username');
    const passwordError =
      isFieldTouched('password') && getFieldError('password');
    return (
      <Form data-qa="login-form" layout="inline" onSubmit={this.handleSubmit}>
        <FormItem
          validateStatus={usernameError ? 'error' : null}
          help={usernameError || ''}
        >
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please enter your username' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
              data-qa="username-input"
            />,
          )}
        </FormItem>
        <FormItem
          validateStatus={passwordError ? 'error' : null}
          help={passwordError || ''}
        >
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please enter your Password' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
              data-qa="password-input"
            />,
          )}
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            htmlType="submit"
            disabled={hasErrors(getFieldsError())}
            data-qa="login-button"
          >
            Login
          </Button>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(LoginForm);
