import { Col, Row } from 'antd';
import React from 'react';
import EditButton from '../../common/buttons/EditButton';
import AccountSettingsItem from './AccountSettingsItem';

interface Props {
  school: string;
  state: string;
  onEdit: () => void;
}

class SchoolSettings extends React.PureComponent<Props> {
  public render() {
    const { state, school, onEdit } = this.props;
    return (
      <section data-qa="school-settings">
        <Row>
          <Col xs={{ span: 24 }}>
            <section className="account-settings__section-header">
              <h1 className="alt account-settings__title">School</h1>
              <EditButton
                data-qa="school-settings-edit-button"
                onClick={onEdit}
              />
            </section>
          </Col>
        </Row>
        <AccountSettingsItem label="State">
          <span data-qa="state-name">{state}</span>
        </AccountSettingsItem>

        <AccountSettingsItem label="School">
          <span data-qa="school-name">{school}</span>
        </AccountSettingsItem>
      </section>
    );
  }
}

export default SchoolSettings;
