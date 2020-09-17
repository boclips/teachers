import { Button, Form } from 'antd';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editUser } from 'src/services/users/updateUser';
import { UserProfile } from 'src/services/users/UserProfile';
import { Country } from 'src/types/Country';
import { Links } from 'src/types/Links';
import { UsaState } from 'src/types/UsaState';
import {
  ScreenReaderError,
  ScreenReaderErrors,
} from '../../common/a11y/ScreenReaderErrors';
import NotificationFactory from '../../common/NotificationFactory';
import { transformErrors } from '../form/FormHelper';
import { SchoolForm, UNKNOWN_SCHOOL } from '../form/SchoolForm';
import { StatesForm } from '../form/StatesForm';
import { updateUserAction } from './redux/actions/updateUserAction';

interface Props {
  country: Country;
  toggleForm: () => void;
  links: Links;
  userProfile: UserProfile;
}

export const EditSchoolSettingsForm = (props: Props) => {
  const { userProfile, country, links, toggleForm } = props;
  const [screenReaderErrors, setScreenReaderErrors] = useState<
    ScreenReaderError[]
  >([]);
  const [usaState, setUsaState] = useState<UsaState>(userProfile.state);

  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const submit = (values) => {
    editUser(links, {
      state: values.state,
      schoolName: values.schoolName,
      schoolId: values.schoolId === UNKNOWN_SCHOOL ? null : values.schoolId,
    })
      .then(() => {
        dispatch(updateUserAction());
        toggleForm();
      })
      .catch((ex) => {
        console.error(ex);
        NotificationFactory.error({
          message: 'Ooops! Something went wrong...',
          description: 'Please try again or contact our support team.',
        });
      });
  };

  const changeUsaState = (value: UsaState) => {
    if (usaState.id !== value.id) {
      form.setFieldsValue({ schoolId: undefined });
      form.setFieldsValue({ schoolName: undefined });
    }

    setUsaState(value);
  };

  const validationFailed = (errorInfo) =>
    setScreenReaderErrors(transformErrors(errorInfo.errorFields));

  return (
    <Form
      data-qa="school-settings-form"
      className="account-settings__form"
      form={form}
      onFinish={submit}
      onFinishFailed={validationFailed}
      initialValues={{
        state: userProfile.state.id,
        schoolName: userProfile.school.name,
        schoolId: userProfile.school.name,
      }}
    >
      {screenReaderErrors && <ScreenReaderErrors errors={screenReaderErrors} />}
      <section>
        <StatesForm
          formItemId="state"
          states={country.states}
          onChange={changeUsaState}
        />

        <SchoolForm
          formItemId="schoolId"
          country={country}
          state={usaState}
          allowUnknownSchools={false}
        />
      </section>
      <section className="buttons">
        <Button
          data-qa="cancel-edit-button"
          type="ghost"
          onClick={toggleForm}
          size="large"
        >
          Cancel
        </Button>
        <Button
          htmlType="submit"
          type="primary"
          data-qa="save-button"
          size="large"
        >
          Save changes
        </Button>
      </section>
    </Form>
  );
};
