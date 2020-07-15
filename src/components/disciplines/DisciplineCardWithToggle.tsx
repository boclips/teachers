import { Card } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Discipline } from '../../types/Discipline';
import DisciplineLogo from './DisciplineLogo';

import './DisciplineCard.less';

interface Props {
  discipline: Discipline;
  className?: string;
  limit?: number;
}

export const DisciplineCardWithToggle = ({
  discipline,
  className,
  limit,
}: Props) => {
  const [isDisciplineOpen, setIsDisciplineOpen] = useState(true);

  if (!discipline) {
    return null;
  }

  const visibleSubjects = limit
    ? discipline.subjects.slice(0, limit)
    : discipline.subjects;

  const basicHeader = (
    <div
      role="button"
      onClick={() => {
        return setIsDisciplineOpen(!isDisciplineOpen);
      }}
    >
      <h1 data-qa="discipline-title" className="discipline-card__title">
        {discipline.name}
      </h1>
      <span className="discipline-card__icon">
        <DisciplineLogo discipline={discipline} />
      </span>
    </div>
  );

  return (
    <Card
      data-qa="discipline-card"
      className={`discipline-card ${className}`}
      bordered={false}
      title={basicHeader}
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
      </div>
    </Card>
  );
};
