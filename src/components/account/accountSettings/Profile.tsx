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

export class Profile extends React.Component<Props> {
  public render() {
    return (
      <section data-qa="current-profile">
        <Row>
          <Col xs={{ span: 24 }}>
            <section className="account-settings__section-header">
              <h1 className={'alt account-settings__title'}>Profile</h1>
              <EditButton
                data-qa="profile-edit-button"
                onClick={this.props.onEdit}
              />
            </section>
          </Col>
        </Row>
        <AccountSettingsItem label="Name">
          <span data-qa="profile-name">
            {this.props.firstName} {this.props.lastName}
          </span>
        </AccountSettingsItem>

        <AccountSettingsItem label="Subjects">
          <span data-qa="profile-subjects">
            {this.props.subjects.map((subject, index) => (
              <ConnectedSubjectTag id={subject} key={index} hideLabel={true} />
            ))}
          </span>
        </AccountSettingsItem>

        <AccountSettingsItem label="Age groups">
          <span data-qa="profile-age-ranges">
            <AgeRangeTags ageRanges={this.props.ages} hideLabel={true} />
          </span>
        </AccountSettingsItem>
      </section>
    );
  }
}
