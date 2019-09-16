import { Col, Row } from 'antd';
import React from 'react';
import EditButton from '../../common/buttons/EditButton';
import AgeRangeTags from '../../common/tags/AgeRangeTags';
import { ConnectedSubjectTag } from '../../common/tags/SubjectTag';

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
        <Row>
          <Col xs={{ span: 24 }} md={{ span: 12 }}>
            <span className={'profile-label'}>Name</span>
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 12 }}>
            <span data-qa="profile-name">
              {this.props.firstName} {this.props.lastName}
            </span>
          </Col>
        </Row>
        <Row>
          <Col xs={{ span: 24 }} md={{ span: 12 }}>
            <span className={'profile-label'}>Subjects</span>
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 12 }}>
            <span data-qa="profile-subjects">
              {this.props.subjects.map((subject, index) => (
                <ConnectedSubjectTag
                  id={subject}
                  key={index}
                  clickable={false}
                />
              ))}
            </span>
          </Col>
        </Row>
        <Row>
          <Col xs={{ span: 24 }} md={{ span: 12 }}>
            <span className={'profile-label'}>Age groups</span>
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 12 }}>
            <span data-qa="profile-age-ranges">
              <AgeRangeTags ages={this.props.ages} />
            </span>
          </Col>
        </Row>
      </section>
    );
  }
}
