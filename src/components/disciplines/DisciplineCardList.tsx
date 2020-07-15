import { Col } from 'antd';
import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import SubjectsSVG from '../../../resources/images/our-subjects.svg';
import State from '../../types/State';
import { generateBorderRadiusClassNames } from '../../utils';
import { SectionHeader } from '../common/SectionHeader';
import { FiniteGrid } from '../common/Grid/FiniteGrid';
import { DisciplineCard, DisciplineCardSkeleton } from './DisciplineCard';
import './DisciplineCardList.less';

export interface Props {
  visibleDisciplines?: number;
  visibleSubjects?: number;
  columns?: number;
  nameToFocusOn?: string;
<<<<<<< Updated upstream
=======
  screenIsMobile?: boolean;
  headersClickable?: boolean;
>>>>>>> Stashed changes
}

const DisciplineCardList = ({
  visibleDisciplines,
  visibleSubjects,
  columns = 2,
  nameToFocusOn,
<<<<<<< Updated upstream
=======
  screenIsMobile, headersClickable,
>>>>>>> Stashed changes
}: Props) => {
  const disciplines = useSelector((state: State) => state.disciplines);
  const userSubjects = useSelector(
    (state: State) => state.user && state.user.subjects,
  );
  const inputRef = useRef(null);

  const boostUserDisciplines = (a, b) =>
    a.subjects.filter((it) => userSubjects && userSubjects.indexOf(it.id) > -1)
      .length >
    b.subjects.filter((it) => userSubjects && userSubjects.indexOf(it.id) > -1)
      .length
      ? -1
      : 1;

  const boostUserSubjects = (a, b) =>
    userSubjects && userSubjects.indexOf(a.id) > userSubjects.indexOf(b.id)
      ? -1
      : 1;

  useEffect(() => {
    if (nameToFocusOn && inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  }, [nameToFocusOn, inputRef]);

  const renderDisciplines = () => {
    return [
      <TransitionGroup component={null} exit key="disciplines-container">
        {disciplines &&
          disciplines
            .sort(boostUserDisciplines)
            .slice(0, visibleDisciplines || disciplines.length)
            .map((discipline, index, slicedArray) => {
<<<<<<< Updated upstream
              discipline.subjects.sort(boostUserSubjects);
=======
              discipline.subjects.sort(prioritiseUserSubjects);
              const userSubjectCount = discipline.subjects.filter(
                (subject) =>
                  userSubjects && userSubjects.indexOf(subject.id) > -1,
              ).length;
>>>>>>> Stashed changes
              return (
                <CSSTransition
                  classNames="card-list"
                  timeout={500}
                  key={discipline.id}
                >
                  <Col xs={{ span: 24 }} md={{ span: 24 / columns }}>
                    <div
                      tabIndex={-1}
                      ref={discipline.name === nameToFocusOn ? inputRef : null}
                    >
                      <DisciplineCard
                        className={generateBorderRadiusClassNames(
                          index,
                          columns,
                          slicedArray.length,
                        )}
                        discipline={discipline}
<<<<<<< Updated upstream
                        limit={visibleSubjects}
=======
                        limit={
                          visibleSubjects
                            ? Math.max(visibleSubjects, userSubjectCount)
                            : undefined
                        }
                        displaySubjectsForMobile={
                          screenIsMobile && nameToFocusOn === discipline.name
                        }
                        headerClickable={headersClickable}
>>>>>>> Stashed changes
                      />
                    </div>
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
        <DisciplineCardSkeleton
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
