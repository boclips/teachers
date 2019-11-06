import { Col, Row } from 'antd';
import React from 'react';
import { connect } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import SubjectsSVG from '../../../resources/images/our-subjects.svg';
import { Discipline } from '../../types/Discipline';
import State from '../../types/State';
import { SectionHeader } from '../common/SectionHeader';
import { DisciplineCard } from './DisciplineCard';
import './DisciplineCardList.less';

export interface DisciplineCardListProps {
  disciplines: Discipline[];
}

export interface Props {
  limit?: number;
}

class DisciplineCardList extends React.PureComponent<
  DisciplineCardListProps & Props
> {
  public render() {
    return (
      <section className="discipline-card-list__container">
        <SectionHeader
          title={'Our subjects'}
          description={
            "Browse our range of videos for the subjects that you teach and find collections tailored to your students' needs."
          }
          image={SubjectsSVG}
        />
        <Row className="discipline-card-list__grid" gutter={20}>
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
          this.props.disciplines
            .slice(0, this.props.limit || this.props.disciplines.length)
            .map(discipline => {
              return (
                <CSSTransition
                  classNames="card-list"
                  timeout={500}
                  key={discipline.id}
                >
                  <Col xs={{ span: 24 }} md={{ span: 12 }}>
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
