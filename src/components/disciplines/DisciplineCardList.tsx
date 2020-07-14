import { Col } from 'antd';
import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Subject } from 'src/types/Subject';
import { Discipline } from 'src/types/Discipline';
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
  useLegacyDisciplineLink?: boolean;
}

export const DisciplineCardList = ({
  visibleDisciplines,
  visibleSubjects,
  columns = 2,
  nameToFocusOn,
  useLegacyDisciplineLink,
}: Props) => {
  const disciplines = useSelector((state: State) => state.disciplines);
  const userSubjects = useSelector(
    (state: State) => state.user && state.user.subjects,
  );
  const inputRef = useRef(null);

  const subjectSavedByUser = (subject: Subject) =>
    userSubjects?.indexOf(subject.id) > -1;

  const numberOfUserSubjectsInDiscipline = (discipline: Discipline) =>
    discipline.subjects.filter(subjectSavedByUser).length;

  const prioritiseDisciplinesWithUserSubjects = (a, b) =>
    numberOfUserSubjectsInDiscipline(b) - numberOfUserSubjectsInDiscipline(a);

  const prioritiseUserSubjects = (a, b) =>
    userSubjects?.indexOf(b.id) - userSubjects?.indexOf(a.id);

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
            .sort(prioritiseDisciplinesWithUserSubjects)
            .slice(0, visibleDisciplines || disciplines.length)
            .map((discipline, index, slicedArray) => {
              discipline.subjects.sort(prioritiseUserSubjects);
              const userSubjectCount = discipline.subjects.filter(
                (subject) =>
                  userSubjects && userSubjects.indexOf(subject.id) > -1,
              ).length;
              console.log(userSubjectCount);
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
                        limit={
                          visibleSubjects
                            ? Math.max(visibleSubjects, userSubjectCount)
                            : undefined
                        }
                        overrideDisciplineLink={
                          useLegacyDisciplineLink
                            ? `discover-collections?discipline=${discipline.id}`
                            : undefined
                        }
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
