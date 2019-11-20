import { Col, Row } from 'antd';
import React from 'react';
import { connect } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import SubjectsSVG from '../../../resources/images/our-subjects.svg';
import { Discipline } from '../../types/Discipline';
import State from '../../types/State';
import { generateBorderRadiusClassNames } from '../../utils';
import { SectionHeader } from '../common/SectionHeader';
import { DisciplineCard } from './DisciplineCard';
import './DisciplineCardList.less';

export interface DisciplineCardListProps {
  disciplines: Discipline[];
}

export interface Props {
  limit?: number;
  columns?: number;
}

class DisciplineCardList extends React.PureComponent<
  DisciplineCardListProps & Props
> {
  public static defaultProps: Partial<Props> = {
    columns: 2,
  };
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
        <Row
          type="flex"
          className="discipline-card-list__grid"
          gutter={[20, 20]}
        >
          {this.props.disciplines && this.props.disciplines.length
            ? this.renderDisciplines()
            : this.renderLoading()}
        </Row>
      </section>
    );
  }

  private renderDisciplines() {
    return [
      <TransitionGroup
        component={null}
        exit={true}
        key={'disciplines-container'}
      >
        {this.props.disciplines &&
          this.props.disciplines
            .slice(0, this.props.limit || this.props.disciplines.length)
            .map((discipline, index, slicedArray) => (
              <CSSTransition
                classNames="card-list"
                timeout={500}
                key={discipline.id}
              >
                <Col xs={{ span: 24 }} md={{ span: 24 / this.props.columns }}>
                  <DisciplineCard
                    className={generateBorderRadiusClassNames(
                      index,
                      this.props.columns,
                      slicedArray.length,
                    )}
                    discipline={discipline}
                  />
                </Col>
              </CSSTransition>
            ))}
      </TransitionGroup>,
    ];
  }

  public renderLoading() {
    return [0, 1, 2, 3].map((count, _, array) => (
      <Col
        key={`sk-${count}`}
        xs={{ span: 24 }}
        md={{ span: 12 }}
        lg={{ span: 24 / this.props.columns }}
      >
        <DisciplineCard.Skeleton
          className={generateBorderRadiusClassNames(
            count,
            this.props.columns,
            array.length,
          )}
        />
      </Col>
    ));
  }
}

function mapStateToProps({ disciplines }: State): DisciplineCardListProps {
  return {
    disciplines,
  };
}

export default connect(mapStateToProps, null)(DisciplineCardList);
