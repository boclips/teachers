import { Col } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import SubjectsSVG from '../../../resources/images/our-subjects.svg';
import State from '../../types/State';
import { generateBorderRadiusClassNames } from '../../utils';
import { SectionHeader } from '../common/SectionHeader';
import { FiniteGrid } from '../common/Grid/FiniteGrid';
import { DisciplineCard } from './DisciplineCard';
import './DisciplineCardList.less';

export interface Props {
  limit?: number;
  columns?: number;
}

const DisciplineCardList = ({ limit, columns = 2 }: Props) => {
  const disciplines = useSelector((state: State) => state.disciplines);
  const userSubjects = useSelector((state: State) => state.user.subjects);

  const boostUserDisciplines = (a, b) =>
    a.subjects.filter((it) => userSubjects.indexOf(it.id) > -1).length >
    b.subjects.filter((it) => userSubjects.indexOf(it.id) > -1).length
      ? -1
      : 1;
  const boostUserSubjects = (a, b) =>
    userSubjects.indexOf(a.id) > userSubjects.indexOf(b.id) ? -1 : 1;

  const renderDisciplines = () => {
    return [
      <TransitionGroup component={null} exit key="disciplines-container">
        {disciplines &&
          disciplines
            .sort(boostUserDisciplines)
            .slice(0, limit || disciplines.length)
            .map((discipline, index, slicedArray) => {
              discipline.subjects.sort(boostUserSubjects);
              return (
                <CSSTransition
                  classNames="card-list"
                  timeout={500}
                  key={discipline.id}
                >
                  <Col xs={{ span: 24 }} md={{ span: 24 / columns }}>
                    <DisciplineCard
                      className={generateBorderRadiusClassNames(
                        index,
                        columns,
                        slicedArray.length,
                      )}
                      discipline={discipline}
                    />
                  </Col>
                </CSSTransition>
              );
            })}
      </TransitionGroup>,
    ];
  };

  const renderLoading = () => {
    return [0, 1, 2, 3].map((count, _, array) => (
      <Col
        key={`sk-${count}`}
        xs={{ span: 24 }}
        md={{ span: 12 }}
        lg={{ span: 24 / columns }}
      >
        <DisciplineCard.Skeleton
          className={generateBorderRadiusClassNames(
            count,
            columns,
            array.length,
          )}
        />
      </Col>
    ));
  };

  return (
    <section className="discipline-card-list__container">
      <SectionHeader
        title="Our subjects"
        description={
          "Browse our range of videos for the subjects that you teach and find collections tailored to your students' needs."
        }
        image={SubjectsSVG}
      />
      <FiniteGrid className="discipline-card-list__grid">
        {disciplines && disciplines.length
          ? renderDisciplines()
          : renderLoading()}
      </FiniteGrid>
    </section>
  );
};
export default DisciplineCardList;
