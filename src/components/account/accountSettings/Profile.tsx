import { Button, Col, Row } from 'antd';
import React from 'react';
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
          <Col xs={{ span: 12 }} md={{ span: 12 }}>
            <h1 className={'account-settings__title'}>Profile</h1>
          </Col>
          <Col xs={{ span: 12 }} md={{ span: 12 }}>
            <Button data-qa="profile-edit-button" onClick={this.props.onEdit}>
              Edit
            </Button>
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
