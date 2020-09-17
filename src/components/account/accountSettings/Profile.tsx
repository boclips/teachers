import { Col, Row } from 'antd';
import React from 'react';
import { AgeRangeTags } from 'src/components/common/tags/AgeRangeTags';
import EditButton from '../../common/buttons/EditButton';
import { ConnectedSubjectTag } from '../../common/tags/SubjectTag';
import AccountSettingsItem from './AccountSettingsItem';

interface Props {
  firstName: string;
  lastName: string;
  subjects: string[];
  ages: number[];
  onEdit: () => void;
}

export const Profile = ({
  firstName,
  lastName,
  ages,
  subjects,
  onEdit,
}: Props) => {
  return (
    <section data-qa="current-profile">
      <Row>
        <Col xs={{ span: 24 }}>
          <section className="account-settings__section-header">
            <h1 className="alt account-settings__title">Profile</h1>
            <EditButton data-qa="profile-edit-button" onClick={onEdit} />
          </section>
        </Col>
      </Row>
      <AccountSettingsItem label="Name">
        <span data-qa="profile-name">
          {firstName} {lastName}
        </span>
      </AccountSettingsItem>

      <AccountSettingsItem label="Subjects">
        <span data-qa="profile-subjects">
          {subjects.map((subject) => (
            <ConnectedSubjectTag id={subject} key={subject} hideLabel />
          ))}
        </span>
      </AccountSettingsItem>

      <AccountSettingsItem label="Age groups">
        <span data-qa="profile-age-ranges">
          <AgeRangeTags ageRanges={ages} hideLabel />
        </span>
      </AccountSettingsItem>
    </section>
  );
};
