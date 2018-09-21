import { Icon } from 'antd';
import Button from 'antd/lib/button/button';
import { FormComponentProps } from 'antd/lib/form';
import Form from 'antd/lib/form/Form';
import Col from 'antd/lib/grid/col';
import Row from 'antd/lib/grid/row';
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
      <Form data-qa="login-form" layout="horizontal" onSubmit={this.handleSubmit}>
        <Row gutter={{ md: 16 }}>
          <Col className="centered expand" md={{ span: 12 }} xs={{ span: 24 }}>
            <FormItem
              validateStatus={usernameError ? 'error' : null}
              help={usernameError || ''}
            >
              {getFieldDecorator('username', {
                rules: [
                  { required: true, message: 'Please enter your username' },
                ],
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder="Username"
                  data-qa="username-input"
                />,
              )}
            </FormItem>
          </Col>
          <Col className="centered expand" md={{ span: 12 }} xs={{ span: 24 }}>
            <FormItem
              validateStatus={passwordError ? 'error' : null}
              help={passwordError || ''}
            >
              {getFieldDecorator('password', {
                rules: [
                  { required: true, message: 'Please enter your Password' },
                ],
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  type="password"
                  placeholder="Password"
                  data-qa="password-input"
                />,
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col className="centered expand button-container" xs={{ span: 24 }}>
            <FormItem>
              <Button
                className="login-button"
                type="primary"
                htmlType="submit"
                disabled={hasErrors(getFieldsError())}
                data-qa="login-button"
              >
                Login
              </Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default Form.create()(LoginForm);
