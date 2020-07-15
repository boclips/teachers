import { Card } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ForwardArrowIcon from '../../../resources/images/forward-arrow.svg';
import { Discipline } from '../../types/Discipline';
import DisciplineLogo from './DisciplineLogo';

import './DisciplineCard.less';

interface Props {
  discipline: Discipline;
  className?: string;
  limit?: number;
  headerClickable?: boolean;
  nameToFocusOn?: string;
}

export const DisciplineCard = ({
                                 discipline,
                                 className,
                                 limit,
                                 headerClickable,
                                 nameToFocusOn
                               }: Props) => {
  if (!discipline) {
    return null;
  }
  const [isDisciplineOpen, setIsDisciplineOpen] = useState(false);

  useEffect(() => {
    if (nameToFocusOn == discipline.name && isDisciplineOpen === false) {
      setIsDisciplineOpen(true);
    }
    if (nameToFocusOn !== discipline.name) {
      setIsDisciplineOpen(false);
    }
  }, [nameToFocusOn])

  const visibleSubjects = limit
    ? discipline.subjects.slice(0, limit)
    : discipline.subjects;

  const basicHeader = (
    <div
      onClick={() => {
        return setIsDisciplineOpen(!isDisciplineOpen);
      }}
    >
      <h1 data-qa="discipline-title" className="discipline-card__title">
        {discipline.name}
      </h1>
      <span className="discipline-card__icon">
        <DisciplineLogo discipline={discipline}/>
      </span>
    </div>
  );

  const getLinkedHeader = () => (
    <Link
      className="discipline-card__link"
      to={{
        pathname: '/our-subjects',
        hash: discipline.name,
      }}
    >
      <>
        <h1 data-qa="discipline-title" className="discipline-card__title">
          {discipline.name}
        </h1>
        <span className="discipline-card__icon">
        <DisciplineLogo discipline={discipline}/>
      </span>
      </>
    </Link>
  );
  return (
    <Card
      data-qa="discipline-card"
      className={`discipline-card ${className}`}
      bordered={false}
      title={
        headerClickable ? getLinkedHeader() : basicHeader
      }
    >
      <div
        className={`discipline-card__body display-tablet-and-desktop ${
          isDisciplineOpen ? 'display-subjects' : null
        }`}
      >
        <ul className="discipline-card__subjects">
          {visibleSubjects.map((subject) => (
            <li
              className="discipline-card__subject-item"
              data-qa="discipline-subject"
              key={`subject-${subject.id}`}
            >
              <Link
                to={`/discover-collections?subject=${subject.id}`}
                className="discipline-card__subject-link link--tabbable"
              >
                {subject.name}
              </Link>
            </li>
          ))}
        </ul>
        {limit && discipline.subjects.length > limit && (
          <Link
            data-qa="view-all-subjects"
            className="discipline-card__view-all no-underline link--tabbable"
            to={{
              pathname: '/our-subjects',
              hash: discipline.name,
            }}
          >
            view all ({discipline.subjects.length}) <ForwardArrowIcon/>
          </Link>
        )}
      </div>
    </Card>
  );
};
export const DisciplineCardSkeleton = ({
                                         className,
                                       }: {
  className?: string;
}) => (
  <section
    className={`discipline-card skeleton ant-skeleton ant-skeleton-active ${className}`}
  >
    <section className="ant-skeleton-content">
      <h3 className="discipline-title ant-skeleton-title"></h3>
      <span className="highlight">
        <span/>
      </span>
      <section className="discipline-subjects">
        <section className="ant-skeleton-title"/>
        <section className="ant-skeleton-title"/>
        <section className="ant-skeleton-title"/>
        <section className="ant-skeleton-title"/>
        <section className="ant-skeleton-title"/>
      </section>
    </section>
  </section>
);
