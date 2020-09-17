import { Button, Form } from 'antd';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { extractContainedAges } from 'src/components/ageRanges/extractContainedAges';
import { updateUserAction } from 'src/components/account/accountSettings/redux/actions/updateUserAction';
import { editUser } from 'src/services/users/updateUser';
import { UserProfile } from 'src/services/users/UserProfile';
import { AgeRange } from 'src/types/AgeRange';
import { Links } from 'src/types/Links';
import {
  ScreenReaderError,
  ScreenReaderErrors,
} from '../../common/a11y/ScreenReaderErrors';
import NotificationFactory from '../../common/NotificationFactory';
import { AgeRangeForm } from '../form/AgeRangeForm';
import { transformErrors } from '../form/FormHelper';
import { NameForm } from '../form/NameForm';
import { SubjectsForm } from '../form/SubjectsForm';

interface Props {
  userProfile: UserProfile;
  toggleForm: () => void;
  links: Links;
}

export const EditProfileForm = (props: Props) => {
  const { userProfile, links, toggleForm } = props;
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [screenReaderErrors, setScreenReaderErrors] = useState<
    ScreenReaderError[]
  >([]);

  const submit = (values) => {
    const ageRanges = (values.ageRange as string[]).map((it) =>
      AgeRange.fromJson(it),
    );
    const ages = extractContainedAges(ageRanges);
    editUser(links, {
      firstName: values.firstName,
      lastName: values.lastName,
      ages,
      subjects: values.subjects,
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

  const validationFailed = (errorInfo) => {
    setScreenReaderErrors(transformErrors(errorInfo.errorFields));
  };

  return (
    <Form
      form={form}
      data-qa="profile-form"
      className="account-settings__form"
      onFinish={submit}
      onFinishFailed={validationFailed}
      initialValues={{
        firstName: userProfile.firstName,
        lastName: userProfile.lastName,
        subjects: userProfile.subjects,
      }}
    >
      {screenReaderErrors && <ScreenReaderErrors errors={screenReaderErrors} />}
      <NameForm firstNameFormItemId="firstName" lastNameFormItemId="lastName" />

      <SubjectsForm
        formItemId="subjects"
        label="Your subjects"
        placeholder="Choose subjects"
      />

      <AgeRangeForm
        formItemId="ageRange"
        initialValue={userProfile.ages}
        label="Age groups"
      />
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
          data-qa="submit-update-user"
          size="large"
        >
          Save changes
        </Button>
      </section>
    </Form>
  );
};
