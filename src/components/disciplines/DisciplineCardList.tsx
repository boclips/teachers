import { Col, Icon, Row } from 'antd';
import React from 'react';
import { connect } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import SubjectsSVG from '../../../resources/images/our-subjects.svg';
import { Discipline } from '../../types/Discipline';
import State from '../../types/State';
import { DisciplineCard } from './DisciplineCard';
import './DisciplineCardList.less';

export interface DisciplineCardListProps {
  disciplines: Discipline[];
}

class DisciplineCardList extends React.PureComponent<DisciplineCardListProps> {
  public render() {
    return (
      <section className="discipline-card-list__container">
        <h1 className="big-title alt discipline-card-list__title">
          <Icon
            component={SubjectsSVG}
            className="discipline-card-list__icon"
          />{' '}
          Our subjects
        </h1>

        <p
          className={
            'discipline-card-list__description display-tablet-and-desktop'
          }
        >
          Browse our range of videos for the subjects that you teach and find
          collections tailored to your students' needs.
        </p>

        <Row gutter={20}>
          {this.props.disciplines && this.props.disciplines.length
            ? this.renderDisciplines()
            : this.renderLoading()}
        </Row>
      </section>
    );
  }

  private renderDisciplines() {
    return [
      <TransitionGroup exit={true} key={'disciplines-container'}>
        {this.props.disciplines &&
          this.props.disciplines.map(discipline => {
            return (
              <CSSTransition
                classNames="card-list"
                timeout={500}
                key={discipline.id}
              >
                <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
                  <DisciplineCard discipline={discipline} />
                </Col>
              </CSSTransition>
            );
          })}
      </TransitionGroup>,
    ];
  }

  public renderLoading() {
    return [0, 1, 2, 3, 4, 5].map(count => (
      <Col
        key={`sk-${count}`}
        xs={{ span: 24 }}
        md={{ span: 12 }}
        lg={{ span: 8 }}
      >
        <DisciplineCard.Skeleton />
      </Col>
    ));
  }
}

function mapStateToProps({ disciplines }: State): DisciplineCardListProps {
  return {
    disciplines,
  };
}

export default connect(
  mapStateToProps,
  null,
)(DisciplineCardList);
